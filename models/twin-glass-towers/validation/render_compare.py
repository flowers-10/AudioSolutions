"""Render unchanged GLB PBR materials and opaque silhouettes with identical cameras.

Run through Blender, for example:
  blender --background --python render_compare.py -- --source source.glb
    --candidate candidate.glb --output comparison --views front-oblique,back-oblique,top

No source or candidate files are modified. Camera frames are computed from SOURCE
bounds only. For the supplied Meshy source, auto transform is scale 100 followed
by Z translation 63.785398; meter-sized candidates receive the identity transform.
Masks ignore materials/transparency so they measure geometry rather than glazing.
"""
import argparse
import json
import math
import sys
from pathlib import Path

import bpy
import numpy as np
from mathutils import Matrix, Vector


VIEW_DIRECTIONS = {
    'front-oblique': (2, -3, 1.7),
    'back-oblique': (-2, 3, 1.7),
    'top': (0, -0.001, 4),
    'front': (0, -4, 0),
    'back': (0, 4, 0),
    'left': (-4, 0, 0),
    'right': (4, 0, 0),
    'left-oblique': (-3, -2, 1.7),
    'right-oblique': (3, 2, 1.7),
}


def arguments():
    argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', required=True)
    parser.add_argument('--candidate', required=True)
    parser.add_argument('--output', required=True)
    parser.add_argument('--views', default=','.join(VIEW_DIRECTIONS))
    parser.add_argument('--width', type=int, default=1200)
    parser.add_argument('--height', type=int, default=1000)
    parser.add_argument('--samples', type=int, default=32)
    parser.add_argument('--source-scale', default='auto')
    parser.add_argument('--candidate-scale', default='auto')
    parser.add_argument('--source-offset', default='auto', help='X,Y,Z or auto')
    parser.add_argument('--candidate-offset', default='auto', help='X,Y,Z or auto')
    parser.add_argument('--mask-only', action='store_true')
    parser.add_argument('--resume', action='store_true', help='Reuse existing render PNGs')
    return parser.parse_args(argv)


def bounds(objects):
    points = [o.matrix_world @ Vector(corner) for o in objects
              if o.type == 'MESH' for corner in o.bound_box]
    low = Vector([min(p[i] for p in points) for i in range(3)])
    high = Vector([max(p[i] for p in points) for i in range(3)])
    return low, high, points


def import_asset(path, label, scale_arg, offset_arg):
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=str(Path(path).resolve()))
    objects = list(set(bpy.data.objects) - before)
    bpy.context.view_layer.update()
    raw_low, raw_high, _ = bounds(objects)
    scale = (100.0 if (raw_high.z - raw_low.z) < 3 else 1.0) if scale_arg == 'auto' else float(scale_arg)
    offset = ((0, 0, 63.785398) if scale == 100 else (0, 0, 0)) if offset_arg == 'auto' else tuple(map(float, offset_arg.split(',')))
    if len(offset) != 3:
        raise ValueError('Offset must contain exactly three comma-separated numbers')
    transform = Matrix.Translation(Vector(offset)) @ Matrix.Scale(scale, 4)
    imported = set(objects)
    for obj in objects:
        if obj.parent not in imported:
            obj.matrix_world = transform @ obj.matrix_world
    bpy.context.view_layer.update()
    low, high, points = bounds(objects)
    report = {
        'path': str(Path(path).resolve()), 'scale': scale, 'offset': list(offset),
        'raw_bounds': [list(raw_low), list(raw_high)],
        'bounds': [list(low), list(high)],
        'mesh_count': sum(obj.type == 'MESH' for obj in objects),
        'vertices': sum(len(obj.data.vertices) for obj in objects if obj.type == 'MESH'),
        'triangles': sum(sum(len(poly.vertices) - 2 for poly in obj.data.polygons)
                         for obj in objects if obj.type == 'MESH'),
    }
    print('ASSET', label, json.dumps(report), flush=True)
    return objects, report, points


def configure_scene(width, height, samples):
    scene = bpy.context.scene
    scene.render.engine = 'BLENDER_EEVEE_NEXT'
    scene.eevee.taa_render_samples = samples
    scene.render.resolution_x = width
    scene.render.resolution_y = height
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGBA'
    scene.render.image_settings.color_depth = '8'
    scene.render.film_transparent = True
    scene.view_settings.view_transform = 'AgX'
    scene.view_settings.look = 'AgX - Medium High Contrast'
    scene.view_settings.exposure = 0
    scene.view_settings.gamma = 1
    world = bpy.data.worlds.new('Identical neutral studio world')
    scene.world = world
    world.use_nodes = True
    world.node_tree.nodes['Background'].inputs['Color'].default_value = (0.65, 0.65, 0.65, 1)
    world.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.8
    for name, energy, rotation in [
        ('Key sun', 3, (math.radians(25), math.radians(-35), math.radians(-30))),
        ('Fill sun', 1.2, (math.radians(50), math.radians(30), math.radians(140))),
    ]:
        data = bpy.data.lights.new(name, 'SUN')
        data.energy = energy
        data.angle = math.radians(20)
        obj = bpy.data.objects.new(name, data)
        scene.collection.objects.link(obj)
        obj.rotation_euler = rotation
    camera_data = bpy.data.cameras.new('Fixed source-anchored camera')
    camera_data.type = 'ORTHO'
    camera = bpy.data.objects.new('Fixed source-anchored camera', camera_data)
    scene.collection.objects.link(camera)
    scene.camera = camera
    return scene, camera


def place_camera(camera, direction, points, width, height):
    low = Vector([min(p[i] for p in points) for i in range(3)])
    high = Vector([max(p[i] for p in points) for i in range(3)])
    center = (low + high) / 2
    extent = (high - low).length
    camera.location = center + Vector(direction).normalized() * extent * 3
    camera.rotation_euler = (center - camera.location).to_track_quat('-Z', 'Y').to_euler()
    camera.data.clip_start = extent * 0.0001
    camera.data.clip_end = extent * 10
    bpy.context.view_layer.update()
    inverse = camera.matrix_world.inverted()
    projected = [inverse @ p for p in points]
    span_x = max(p.x for p in projected) - min(p.x for p in projected)
    span_y = max(p.y for p in projected) - min(p.y for p in projected)
    # Blender's ortho_scale is horizontal for this landscape aspect ratio.
    camera.data.ortho_scale = max(span_x, span_y * width / height) * 1.10
    return {'location': list(camera.location), 'rotation_euler': list(camera.rotation_euler),
            'ortho_scale': camera.data.ortho_scale}


def set_visible(selected, other):
    for obj in selected:
        obj.hide_render = False
    for obj in other:
        obj.hide_render = True


def opaque_mask_material():
    material = bpy.data.materials.new('QA opaque silhouette only')
    material.use_nodes = True
    nodes = material.node_tree.nodes
    nodes.clear()
    emission = nodes.new('ShaderNodeEmission')
    emission.inputs['Color'].default_value = (1, 1, 1, 1)
    emission.inputs['Strength'].default_value = 1
    output = nodes.new('ShaderNodeOutputMaterial')
    material.node_tree.links.new(emission.outputs[0], output.inputs['Surface'])
    return material


def pixels(path):
    image = bpy.data.images.load(str(path), check_existing=False)
    values = np.empty(len(image.pixels), dtype=np.float32)
    image.pixels.foreach_get(values)
    result = values.reshape(image.size[1], image.size[0], 4).copy()
    bpy.data.images.remove(image)
    return result


def write_rgba(path, rgba):
    image = bpy.data.images.new('QA diagnostic', width=rgba.shape[1], height=rgba.shape[0], alpha=True)
    image.pixels.foreach_set(np.asarray(rgba, dtype=np.float32).ravel())
    image.file_format = 'PNG'
    image.filepath_raw = str(path)
    image.save()
    bpy.data.images.remove(image)


def boundary(mask):
    inner = mask.copy()
    inner[1:-1, 1:-1] &= (mask[:-2, 1:-1] & mask[2:, 1:-1] & mask[1:-1, :-2] & mask[1:-1, 2:])
    return mask & ~inner


def dilate(mask, radius):
    h, w = mask.shape
    padded = np.pad(mask, radius)
    result = np.zeros_like(mask)
    for dy in range(-radius, radius + 1):
        for dx in range(-radius, radius + 1):
            if dx * dx + dy * dy <= radius * radius:
                result |= padded[radius + dy:radius + dy + h, radius + dx:radius + dx + w]
    return result


def compare_masks(source_path, candidate_path, diagnostic_path):
    source = pixels(source_path)[:, :, 3] > 0.5
    candidate = pixels(candidate_path)[:, :, 3] > 0.5
    union = source | candidate
    overlap = source & candidate
    source_outline, candidate_outline = boundary(source), boundary(candidate)
    near_source, near_candidate = dilate(source_outline, 2), dilate(candidate_outline, 2)
    matched_source = int((source_outline & near_candidate).sum())
    matched_candidate = int((candidate_outline & near_source).sum())
    diagnostic = np.ones((*source.shape, 4), dtype=np.float32)
    diagnostic[:, :, :3] = 0.075
    diagnostic[overlap, :3] = (0.65, 0.65, 0.65)
    diagnostic[source & ~candidate, :3] = (1, 0.12, 0.12)
    diagnostic[candidate & ~source, :3] = (0.1, 0.55, 1)
    write_rgba(diagnostic_path, diagnostic)
    return {
        'silhouette_iou': float(overlap.sum() / max(1, union.sum())),
        'silhouette_xor_pixels': int((source ^ candidate).sum()),
        'source_area_pixels': int(source.sum()), 'candidate_area_pixels': int(candidate.sum()),
        'source_missing_fraction': float((source & ~candidate).sum() / max(1, source.sum())),
        'candidate_extra_fraction': float((candidate & ~source).sum() / max(1, candidate.sum())),
        'outline_source_coverage_within_2px': matched_source / max(1, int(source_outline.sum())),
        'outline_candidate_coverage_within_2px': matched_candidate / max(1, int(candidate_outline.sum())),
        'outline_unmatched_pixels': int(source_outline.sum() + candidate_outline.sum()) - matched_source - matched_candidate,
    }


def main():
    args = arguments()
    output = Path(args.output).resolve()
    output.mkdir(parents=True, exist_ok=True)
    views = args.views.split(',')
    if set(views) - set(VIEW_DIRECTIONS):
        raise ValueError('Unknown view: ' + ','.join(set(views) - set(VIEW_DIRECTIONS)))
    bpy.ops.wm.read_factory_settings(use_empty=True)
    source, source_info, source_points = import_asset(args.source, 'source', args.source_scale, args.source_offset)
    candidate, candidate_info, _ = import_asset(args.candidate, 'candidate', args.candidate_scale, args.candidate_offset)
    scene, camera = configure_scene(args.width, args.height, args.samples)
    mask_material = opaque_mask_material()
    report = {
        'source': source_info, 'candidate': candidate_info,
        'render': {'engine': scene.render.engine, 'width': args.width, 'height': args.height,
                   'samples': args.samples, 'view_transform': scene.view_settings.view_transform,
                   'look': scene.view_settings.look, 'materials': 'unaltered GLB import for PBR; opaque emission only for masks',
                   'mask_threshold_alpha': 0.5, 'outline_tolerance_pixels': 2,
                   'diagnostic_legend': {'gray': 'overlap', 'red': 'source only / missing', 'blue': 'candidate only / extra'}},
        'views': {},
    }
    for name in views:
        camera_info = place_camera(camera, VIEW_DIRECTIONS[name], source_points, args.width, args.height)
        for label, selected, other in [('source', source, candidate), ('candidate', candidate, source)]:
            set_visible(selected, other)
            pbr_path = output / f'{name}__{label}__pbr.png'
            scene.eevee.taa_render_samples = args.samples
            if not args.mask_only and not (args.resume and pbr_path.exists()):
                scene.render.filepath = str(pbr_path)
                bpy.ops.render.render(write_still=True)
                print('RENDERED', name, label, 'pbr', flush=True)
            mask_path = output / f'{name}__{label}__mask.png'
            if not (args.resume and mask_path.exists()):
                original_materials = []
                for obj in selected:
                    if obj.type != 'MESH':
                        continue
                    original_materials.append((obj, list(obj.data.materials)))
                    # Replace every slot; avoid touching polygon material indices.
                    if len(obj.data.materials) == 0:
                        obj.data.materials.append(mask_material)
                    else:
                        for index in range(len(obj.data.materials)):
                            obj.data.materials[index] = mask_material
                scene.eevee.taa_render_samples = 1
                scene.render.filepath = str(mask_path)
                bpy.ops.render.render(write_still=True)
                for obj, materials in original_materials:
                    obj.data.materials.clear()
                    for material in materials:
                        obj.data.materials.append(material)
                print('RENDERED', name, label, 'mask', flush=True)
        metrics = compare_masks(output / f'{name}__source__mask.png', output / f'{name}__candidate__mask.png', output / f'{name}__difference.png')
        report['views'][name] = {'camera': camera_info, **metrics}
        (output / 'metrics.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
        print('VIEW_METRICS', name, json.dumps(metrics), flush=True)
    report['mean_silhouette_iou'] = float(np.mean([view['silhouette_iou'] for view in report['views'].values()]))
    (output / 'metrics.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    print('COMPARISON_COMPLETE', str(output), 'mean_iou', report['mean_silhouette_iou'], flush=True)


if __name__ == '__main__':
    main()
