"""Source-constrained retopology, preserving the supplied geometry and PBR atlas.

blender --background --factory-startup --python rebuild.py -- --source INPUT.glb
Then: node finalize.mjs; npm run build
No procedural replacement of windows, roofs or podium structures.
"""
import argparse
import hashlib
import json
import math
from pathlib import Path
import sys
import time

import bpy
import numpy as np
from mathutils import Vector

parser=argparse.ArgumentParser()
parser.add_argument('--source',type=Path,required=True)
parser.add_argument('--root',type=Path,default=Path(__file__).resolve().parents[2])
parser.add_argument('--ratio',type=float,default=.30)
parser.add_argument('--render',action='store_true')
args=parser.parse_args(sys.argv[sys.argv.index('--')+1:])
if not .25<=args.ratio<=.35: raise ValueError('Supported fidelity ratios: .25 to .35')
root=args.root.resolve(); source=args.source.resolve()
folder=root/'models/twin-glass-towers'; out=root/'public/models/twin-glass-towers'
folder.mkdir(parents=True,exist_ok=True);out.mkdir(parents=True,exist_ok=True)
started=time.time()
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(source))
meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
if len(meshes)!=1: raise ValueError('This recipe expects the supplied single-mesh Twin Glass Towers reference.')
obj=meshes[0]
bpy.context.view_layer.objects.active=obj
bpy.ops.object.select_all(action='DESELECT');obj.select_set(True)
bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
original_triangles=sum(len(p.vertices)-2 for p in obj.data.polygons)
source_positions=np.empty(len(obj.data.vertices)*3,dtype=np.float32)
obj.data.vertices.foreach_get('co',source_positions)
source_positions=source_positions.reshape(-1,3)
source_low=source_positions.min(axis=0);source_high=source_positions.max(axis=0)
original_min=float(source_low[2])
del source_positions
base_material=obj.data.materials[0]
print('SOURCE',original_triangles,'triangles',flush=True)

# Blender's QEM collapse keeps the imported UV atlas; do not weld UV seams,
# invent facade grids, replace the PBR material, remap normals, or sharpen colors.
modifier=obj.modifiers.new('Source-constrained quadric-error retopology','DECIMATE')
modifier.ratio=args.ratio
modifier.use_collapse_triangulate=True
bpy.ops.object.modifier_apply(modifier=modifier.name)
positions=np.empty(len(obj.data.vertices)*3,dtype=np.float32)
obj.data.vertices.foreach_get('co',positions)
positions=positions.reshape(-1,3)
# QEM may overshoot a boundary by a fraction of a millimetre in source units.
# Keep the original ground, roof and outside extents rather than shifting the whole model.
clipped=np.clip(positions,source_low,source_high)
clipped_vertices=int(np.count_nonzero(np.any(clipped!=positions,axis=1)))
obj.data.vertices.foreach_set('co',clipped.ravel())
del positions,clipped
obj.data.update()
print('RETOPOLOGY',len(obj.data.polygons),'triangles',time.time()-started,'seconds',flush=True)

# Split the retained surface into editable spatial zones AFTER simplification.
# Classification never projects, duplicates or replaces a surface triangle.
labels=['West crown','East crown','West facade and core','East facade and core',
        'Front stepped podium','West podium wing','East podium wing','Central connecting podium']
centres=np.empty(len(obj.data.polygons)*3,dtype=np.float32)
obj.data.polygons.foreach_get('center',centres)
centres=centres.reshape(-1,3)
x,y,z=centres.T
ids=np.full(len(centres),7,dtype=np.int32)
ids[x<-.10]=5;ids[x>.10]=6
ids[y<-.14]=4
ids[(z-original_min>.23)&(x<0)]=2
ids[(z-original_min>.23)&(x>=0)]=3
ids[(z-original_min>1.17)&(x<0)]=0
ids[(z-original_min>1.17)&(x>=0)]=1
obj.data.materials.clear()
temporary=[]
for label in labels:
    mat=base_material.copy();mat.name=label;temporary.append(mat);obj.data.materials.append(mat)
obj.data.polygons.foreach_set('material_index',ids)
bpy.ops.object.mode_set(mode='EDIT');bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.mesh.separate(type='MATERIAL');bpy.ops.object.mode_set(mode='OBJECT')
parts=[o for o in bpy.context.scene.objects if o.type=='MESH']
for part in parts:
    index=part.data.polygons[0].material_index
    part.name=part.data.materials[index].name
    part.data.name=part.name+' / retained source surface'
    part.data.materials.clear();part.data.materials.append(base_material)
    part.data.polygons.foreach_set('material_index',np.zeros(len(part.data.polygons),dtype=np.int32))
    part.scale=(100,100,100)
    part.location.z=-original_min*100
    part['method']='Source-constrained retopology; imported PBR atlas and relief retained'
for mat in temporary:
    if mat.users==0:bpy.data.materials.remove(mat)
bpy.ops.object.select_all(action='DESELECT')
for part in parts:part.select_set(True)
bpy.context.view_layer.objects.active=parts[0]
bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
for image in bpy.data.images:
    if image.source=='FILE' and not image.packed_file:image.pack()
scene=bpy.context.scene
scene.unit_settings.system='METRIC'
scene['source_reference']=source.name
scene['source_sha256']=hashlib.file_digest(source.open('rb'),'sha256').hexdigest() if hasattr(hashlib,'file_digest') else hashlib.sha256(source.read_bytes()).hexdigest()
scene['method']='Source-constrained retopology with original unmodified PBR atlas'
scene['scale_note']='Original model multiplied by 100 and grounded; metres are inferred, not surveyed.'
intermediate=folder/'retopology.intermediate.glb'
bpy.ops.export_scene.gltf(filepath=str(intermediate),export_format='GLB',use_selection=True,
    export_yup=True,export_apply=True,export_cameras=False,export_lights=False,
    export_extras=True,export_materials='EXPORT',export_animations=False)
triangles=sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in parts)
report={'version':2,'generator':'Blender '+bpy.app.version_string,'units':'metres (inferred)',
    'triangles':triangles,'meshObjects':len(parts),'materials':1,
    'sourceTriangles':original_triangles,'sourceBytes':source.stat().st_size,
    'sourceName':source.name,'sourceSHA256':scene['source_sha256'],
    'reconstruction':{'method':'source-constrained-retopology','collapseRatio':args.ratio,
        'verticesClampedToSourceBounds':clipped_vertices,
        'preserved':['source silhouette and architectural relief','original UV coordinates through interpolation',
            'original 2048px base color image','original 2048px metallic/roughness image','original 2048px tangent normal image'],
        'editableZones':[o.name for o in parts]},
    'notes':['Retopology of the supplied mesh; not a newly invented parametric building.',
        'No speculative windows, roof seams, service grilles or podium tiers.',
        'Small geometric/shading changes are measured in the accompanying fidelity report.']}
(folder/'retopology-info.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')

scene.render.engine='BLENDER_EEVEE_NEXT';scene.eevee.taa_render_samples=64
scene.render.resolution_x=1800;scene.render.resolution_y=1400;scene.render.resolution_percentage=100
scene.view_settings.view_transform='AgX';scene.view_settings.look='AgX - Medium High Contrast'
world=bpy.data.worlds.new('Neutral reference studio');world.use_nodes=True;scene.world=world
world.node_tree.nodes['Background'].inputs[0].default_value=(.65,.65,.65,1)
world.node_tree.nodes['Background'].inputs[1].default_value=.8
for name,energy,rotation in [('Key',3,(25,-35,-30)),('Fill',1.2,(50,30,140))]:
    data=bpy.data.lights.new(name,'SUN');data.energy=energy;data.angle=math.radians(20)
    light=bpy.data.objects.new(name,data);scene.collection.objects.link(light)
    light.rotation_euler=tuple(math.radians(v) for v in rotation)
data=bpy.data.cameras.new('Source comparison view');data.type='ORTHO';data.ortho_scale=245
camera=bpy.data.objects.new('Source comparison view',data);scene.collection.objects.link(camera)
camera.location=(210,-300,210);target=Vector((0,0,63))
camera.rotation_euler=(target-camera.location).to_track_quat('-Z','Y').to_euler();scene.camera=camera
for screen in bpy.data.screens:
    for area in screen.areas:
        if area.type=='VIEW_3D':
            area.spaces.active.region_3d.view_distance=260;area.spaces.active.region_3d.view_location=(0,0,63)
            area.spaces.active.region_3d.view_rotation=camera.rotation_euler.to_quaternion()
            area.spaces.active.shading.type='MATERIAL'
bpy.ops.wm.save_as_mainfile(filepath=str(folder/'twin-glass-towers.blend'),compress=True)
if args.render:
    scene.render.filepath=str(folder/'preview.png');bpy.ops.render.render(write_still=True)
print('FINISHED',json.dumps(report),time.time()-started,flush=True)
