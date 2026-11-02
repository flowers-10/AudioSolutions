"""Bidirectional, sampled point-to-triangle geometry comparison in Blender.

Run with Blender 4.5+ (no source/candidate files are changed):
  blender --background --factory-startup --python-exit-code 1 \
    --python measure_geometry.py -- --source original.glb \
    --candidate candidate.glb --output geometry-report.json

Defaults: 20,000 area-weighted surface samples per asset, 2,048 length-weighted
topological-boundary samples per asset, and directional/local extremity probes.
Distances are to actual target triangles, never to a target point cloud.
Native assets with world-space Z height < 3 receive scale 100, then Z +63.785398,
matching render_compare.py. Other assets retain their existing coordinates.
These are inferred metre coordinates, not independently surveyed dimensions.

The sampled maximum is NOT a certified Hausdorff bound. Internal surfaces,
disconnected components and UV-split mesh boundaries are included. Material,
texture, normal-map and appearance fidelity require the separate render audit.
"""
import argparse
import heapq
import json
import math
import sys
import time
from pathlib import Path

import bpy
import numpy as np
from mathutils import Matrix, Vector
from mathutils.bvhtree import BVHTree


EMPTY_POINTS = np.empty((0, 3), dtype=np.float64)
CHUNK = 65536


def key_extremity_indices(coords, grid_size):
    """26 support directions plus local extrema along X/Y/Z in projected cells."""
    chosen = set()
    for x in (-1, 0, 1):
        for y in (-1, 0, 1):
            for z in (-1, 0, 1):
                if x or y or z:
                    direction = np.array((x, y, z), dtype=np.float32)
                    chosen.add(int(np.argmax(coords @ direction)))
    if grid_size <= 0:
        return np.array(sorted(chosen), dtype=np.int64)
    low, high = coords.min(axis=0), coords.max(axis=0)
    for axis, a, b in ((0, 1, 2), (1, 0, 2), (2, 0, 1)):
        a_bins = np.clip(((coords[:, a] - low[a]) * grid_size /
                          max(float(high[a] - low[a]), 1e-20)).astype(np.int32), 0, grid_size - 1)
        b_bins = np.clip(((coords[:, b] - low[b]) * grid_size /
                          max(float(high[b] - low[b]), 1e-20)).astype(np.int32), 0, grid_size - 1)
        cell = a_bins * grid_size + b_bins
        del a_bins, b_bins
        for use_min in (True, False):
            extreme = np.full(grid_size * grid_size, np.inf if use_min else -np.inf, dtype=np.float32)
            (np.minimum.at if use_min else np.maximum.at)(extreme, cell, coords[:, axis])
            matches = np.flatnonzero(coords[:, axis] == extreme[cell])
            first = np.full(grid_size * grid_size, len(coords), dtype=np.int64)
            np.minimum.at(first, cell[matches], matches)
            chosen.update(int(i) for i in first[first < len(coords)])
    return np.array(sorted(chosen), dtype=np.int64)


def analyze_mesh(obj, samples, boundary_samples, rng, extremity_grid=8):
    """Use compact RNA foreach_get arrays; never copy millions of Python faces."""
    mesh = obj.data
    mesh.calc_loop_triangles()
    coords = np.empty(len(mesh.vertices) * 3, dtype=np.float32)
    mesh.vertices.foreach_get("co", coords)
    coords = coords.reshape(-1, 3)
    if not len(coords) or not np.all(np.isfinite(coords)):
        raise ValueError(f"Empty or non-finite vertex coordinates: {obj.name}")
    triangles = np.empty(len(mesh.loop_triangles) * 3, dtype=np.int32)
    mesh.loop_triangles.foreach_get("vertices", triangles)
    triangles = triangles.reshape(-1, 3)
    areas = np.empty(len(triangles), dtype=np.float64)
    for start in range(0, len(triangles), CHUNK):
        ids = triangles[start:start + CHUNK]
        a = coords[ids[:, 0]].astype(np.float64)
        b = coords[ids[:, 1]].astype(np.float64)
        c = coords[ids[:, 2]].astype(np.float64)
        areas[start:start + len(ids)] = 0.5 * np.linalg.norm(np.cross(b - a, c - a), axis=1)
    zero_area_triangles = int(np.count_nonzero(areas == 0))
    np.cumsum(areas, out=areas)
    area = float(areas[-1]) if len(areas) else 0.0
    if area <= 0 or not math.isfinite(area):
        raise ValueError(f"No finite, positive triangle area: {obj.name}")
    ids = np.searchsorted(areas, rng.random(samples) * area, side="right")
    selected = coords[triangles[ids]].astype(np.float64)
    u = np.sqrt(rng.random(samples))
    v = rng.random(samples)
    points = ((1 - u)[:, None] * selected[:, 0] +
              (u * (1 - v))[:, None] * selected[:, 1] +
              (u * v)[:, None] * selected[:, 2])
    triangle_count = len(triangles)
    del areas, selected

    keys = coords[key_extremity_indices(coords, extremity_grid)].astype(np.float64)
    low, high = coords.min(axis=0), coords.max(axis=0)

    # Count original polygon incidences, so generated triangulation diagonals
    # are not classified as mesh boundaries. UV/normal seams can be boundaries.
    if not len(mesh.edges):
        mesh.update(calc_edges=True)
    loop_edges = np.empty(len(mesh.loops), dtype=np.int32)
    mesh.loops.foreach_get("edge_index", loop_edges)
    incidences = np.bincount(loop_edges, minlength=len(mesh.edges))
    del loop_edges
    boundary_ids = np.flatnonzero(incidences == 1)
    nonmanifold = int(np.count_nonzero(incidences > 2))
    loose_edges = int(np.count_nonzero(incidences == 0))
    del incidences
    boundary_length = 0.0
    boundary_points = EMPTY_POINTS.copy()
    if len(boundary_ids):
        edge_vertices = np.empty(len(mesh.edges) * 2, dtype=np.int32)
        mesh.edges.foreach_get("vertices", edge_vertices)
        ends = edge_vertices.reshape(-1, 2)[boundary_ids]
        del edge_vertices
        lengths = np.empty(len(ends), dtype=np.float64)
        for start in range(0, len(ends), CHUNK):
            pair = ends[start:start + CHUNK]
            delta = coords[pair[:, 1]].astype(np.float64) - coords[pair[:, 0]]
            lengths[start:start + len(pair)] = np.linalg.norm(delta, axis=1)
        np.cumsum(lengths, out=lengths)
        boundary_length = float(lengths[-1])
        if boundary_length > 0 and boundary_samples:
            chosen = np.searchsorted(lengths, rng.random(boundary_samples) * boundary_length, side="right")
            pair = coords[ends[chosen]].astype(np.float64)
            t = rng.random(boundary_samples)[:, None]
            boundary_points = pair[:, 0] * (1 - t) + pair[:, 1] * t
    return {
        "surface_area": area, "surface_points": points,
        "vertices": coords, "triangles": triangles,
        "boundary_points": boundary_points, "boundary_length": boundary_length,
        "key_points": keys, "boundary_edge_count": len(boundary_ids),
        "metadata": {
            "name": obj.name, "vertices": len(mesh.vertices),
            "polygons": len(mesh.polygons), "triangles": triangle_count,
            "zero_area_triangles": zero_area_triangles, "surface_area": area,
            "bounds": [low.tolist(), high.tolist()],
            "boundary_edges": len(boundary_ids), "boundary_length": boundary_length,
            "nonmanifold_edges_more_than_two_faces": nonmanifold,
            "loose_edges_excluded": loose_edges, "key_extremity_probes": len(keys),
        },
    }


def distance_summary(distances, diagonal):
    if not len(distances):
        return {"count": 0, "median": None, "p95": None, "p99": None, "max": None,
                "mean": None, "rms": None, "percent_of_source_diagonal": None}
    values = {
        "median": float(np.median(distances)),
        "p95": float(np.percentile(distances, 95)),
        "p99": float(np.percentile(distances, 99)),
        "max": float(np.max(distances)),
    }
    return {
        "count": len(distances), **values, "mean": float(np.mean(distances)),
        "rms": float(np.sqrt(np.mean(np.square(distances)))),
        "percent_of_source_diagonal": {k: 100 * v / diagonal for k, v in values.items()},
    }


def double_triangle_closest(point, triangles):
    """Closest points using float64 planes/edge projections, stable for slivers."""
    a, b, c = triangles[:, 0], triangles[:, 1], triangles[:, 2]
    normal = np.cross(b - a, c - a)
    normal_sq = np.einsum("ij,ij->i", normal, normal)
    projection = point - normal * np.divide(np.einsum("ij,ij->i", point - a, normal),
        normal_sq, out=np.zeros(len(triangles)), where=normal_sq > 0)[:, None]
    inside = normal_sq > 0
    for start, end in ((a, b), (b, c), (c, a)):
        side = np.einsum("ij,ij->i", np.cross(end - start, projection - start), normal)
        inside &= side >= -normal_sq * 1e-12
    choices = [projection]
    for start, end in ((a, b), (b, c), (c, a)):
        edge = end - start
        edge_sq = np.einsum("ij,ij->i", edge, edge)
        fraction = np.divide(np.einsum("ij,ij->i", point - start, edge), edge_sq,
                             out=np.zeros(len(triangles)), where=edge_sq > 0)
        choices.append(start + edge * np.clip(fraction, 0, 1)[:, None])
    choices = np.stack(choices, axis=1)
    d2 = np.sum(np.square(choices - point), axis=2)
    d2[~inside, 0] = np.inf
    return choices[np.arange(len(triangles)), np.argmin(d2, axis=1)]


def nearest_measure(points, trees, diagonal):
    distances = np.empty(len(points), dtype=np.float64)
    raw_distances = np.empty(len(points), dtype=np.float64)
    worst = []
    refinement_guard = max(1e-5, diagonal * 0.001)
    refined_queries = 0
    for i, xyz in enumerate(points):
        point = Vector(tuple(xyz))
        best = math.inf
        closest = None
        closest_name = None
        for entry in trees:
            if math.isfinite(best) and "bounds" in entry:
                lo, hi = entry["bounds"]
                lower_bound_sq = sum(max(lo[a] - xyz[a], 0.0, xyz[a] - hi[a]) ** 2 for a in range(3))
                if lower_bound_sq >= best * best:
                    continue
            hit = entry["tree"].find_nearest(point) if not math.isfinite(best) else entry["tree"].find_nearest(point, best)
            if hit[0] is not None and hit[3] < best:
                closest, _, _, best = hit
                closest_name = entry["name"]
                if best == 0:
                    break
        if closest is None or not math.isfinite(best):
            raise RuntimeError(f"No nearest target triangle for sample {i}: {xyz.tolist()}")
        raw_distances[i] = best
        if all("vertices" in entry for entry in trees):
            # Blender's float point/triangle math can be inaccurate for long,
            # skinny quantized triangles. Its BVH supplies nearby face IDs;
            # refine that neighborhood against the original float vertices
            # using double arithmetic and the original double sample point.
            radius = best + refinement_guard
            refined_best = math.inf
            for entry in trees:
                if "bounds" in entry:
                    lo, hi = entry["bounds"]
                    lower_sq = sum(max(lo[a] - xyz[a], 0.0, xyz[a] - hi[a]) ** 2 for a in range(3))
                    if lower_sq > radius * radius:
                        continue
                hits = entry["tree"].find_nearest_range(point, radius)
                if not hits:
                    continue
                ids = np.fromiter((hit[2] for hit in hits), dtype=np.int64, count=len(hits))
                triangles = entry["vertices"][entry["triangles"][ids]].astype(np.float64)
                locations = double_triangle_closest(xyz, triangles)
                lengths = np.linalg.norm(locations - xyz, axis=1)
                index = int(np.argmin(lengths))
                if lengths[index] < refined_best:
                    refined_best = float(lengths[index])
                    closest = locations[index]
                    closest_name = entry["name"]
            if not math.isfinite(refined_best):
                raise RuntimeError(f"No refinement neighborhood for query {i}")
            best = refined_best
            refined_queries += 1
        distances[i] = best
        item = (float(best), i, tuple(closest), closest_name)
        if len(worst) < 10:
            heapq.heappush(worst, item)
        elif item[:2] > worst[0][:2]:
            heapq.heapreplace(worst, item)
    report = distance_summary(distances, diagonal)
    report["raw_bvh_float_distance"] = distance_summary(raw_distances, diagonal)
    report["double_refined_queries"] = refined_queries
    report["refinement_search_guard"] = refinement_guard if refined_queries else None
    report["worst_samples"] = [
        {"distance": d, "sample_index": i, "query_point": points[i].tolist(),
         "nearest_target_point": list(position), "nearest_target_object": name}
        for d, i, position, name in sorted(worst, reverse=True)
    ]
    return distances, report


def object_bounds(objects):
    corners = np.array([tuple(obj.matrix_world @ Vector(corner))
                        for obj in objects for corner in obj.bound_box], dtype=np.float64)
    if not len(corners):
        raise ValueError("Asset has no mesh objects")
    return np.array([corners.min(axis=0), corners.max(axis=0)])


def normalize_objects(objects):
    bpy.context.view_layer.update()
    raw = object_bounds(objects)
    scale = 100.0 if raw[1, 2] - raw[0, 2] < 3.0 else 1.0
    offset = (0.0, 0.0, 63.785398) if scale == 100 else (0.0, 0.0, 0.0)
    transform = Matrix.Translation(Vector(offset)) @ Matrix.Scale(scale, 4)
    matrices = [transform @ obj.matrix_world.copy() for obj in objects]
    for obj, matrix in zip(objects, matrices):
        # Bake world coordinates once, making BVH and NumPy coordinates agree
        # even for nested parents, rotation or non-uniform object scale.
        if obj.data.users > 1:
            obj.data = obj.data.copy()
        obj.parent = None
        obj.matrix_world = Matrix.Identity(4)
        obj.data.transform(matrix)
        obj.data.update()
    bpy.context.view_layer.update()
    return {"scale": scale, "offset": list(offset), "raw_bounds": raw.tolist(),
            "bounds": object_bounds(objects).tolist()}


def allocate_samples(pools, weights, count, rng):
    """Global area/length weighting; object count must not bias the metrics."""
    positive = [i for i, w in enumerate(weights) if w > 0]
    if not positive or not count:
        return EMPTY_POINTS.copy(), [0] * len(pools)
    values = np.array([weights[i] for i in positive], dtype=np.float64)
    counts = rng.multinomial(count, values / values.sum())
    allocation = [0] * len(pools)
    chunks = []
    for index, n in zip(positive, counts):
        allocation[index] = int(n)
        if n:
            chunks.append(pools[index][:n])
    return np.concatenate(chunks), allocation


def build_asset(path, label, args, seed):
    # Trees own their geometry independently of Blender datablocks. Clearing
    # imported geometry between assets limits peak memory with a 4M-face source.
    bpy.ops.wm.read_factory_settings(use_empty=True)
    print(f"IMPORT {label}: {path}", flush=True)
    bpy.ops.import_scene.gltf(filepath=str(path))
    objects = sorted((obj for obj in bpy.context.scene.objects
                      if obj.type == "MESH" and len(obj.data.polygons)), key=lambda obj: obj.name)
    normalized = normalize_objects(objects)
    rng = np.random.default_rng(seed)
    records, trees = [], []
    graph = bpy.context.evaluated_depsgraph_get()
    for obj in objects:
        print(f"ANALYZE {label}: {obj.name} ({len(obj.data.polygons)} polygons)", flush=True)
        record = analyze_mesh(obj, args.samples, args.boundary_samples, rng, args.extremity_grid)
        records.append(record)
        print(f"BUILD_BVH {label}: {obj.name}", flush=True)
        tree = BVHTree.FromObject(obj, graph, epsilon=0.0)
        if tree is None:
            raise RuntimeError(f"Could not construct triangle BVH: {obj.name}")
        if len(obj.data.polygons) != len(record["triangles"]):
            raise ValueError("GLB mesh must be triangulated for BVH polygon-index refinement")
        trees.append({"name": obj.name, "tree": tree, "bounds": record["metadata"]["bounds"],
                      "vertices": record["vertices"], "triangles": record["triangles"]})
    surface, allocation = allocate_samples([r["surface_points"] for r in records],
        [r["surface_area"] for r in records], args.samples, rng)
    boundary, boundary_allocation = allocate_samples([r["boundary_points"] for r in records],
        [r["boundary_length"] for r in records], args.boundary_samples, rng)
    keys = np.unique(np.concatenate([r["key_points"] for r in records]), axis=0)
    metadata = {
        "path": str(path), "bytes": path.stat().st_size, **normalized,
        "mesh_count": len(records), "seed": seed,
        "vertices": sum(r["metadata"]["vertices"] for r in records),
        "triangles": sum(r["metadata"]["triangles"] for r in records),
        "surface_area": sum(r["surface_area"] for r in records),
        "boundary_length": sum(r["boundary_length"] for r in records),
        "boundary_edges": sum(r["boundary_edge_count"] for r in records),
        "sample_counts": {"surface": len(surface), "boundary": len(boundary), "key_extremities": len(keys)},
        "objects": [dict(r["metadata"], surface_sample_count=n, boundary_sample_count=bn)
                    for r, n, bn in zip(records, allocation, boundary_allocation)],
    }
    asset = {"trees": trees, "surface": surface, "boundary": boundary,
             "key_extremities": keys, "metadata": metadata}
    # Drop RNA references before factory reset. Keep independent BVHs plus
    # compact typed vertex/index arrays for float64 triangle refinement.
    del objects, records, graph, obj, record
    bpy.ops.wm.read_factory_settings(use_empty=True)
    return asset


def bounds_difference(source, candidate):
    a, b = np.asarray(source), np.asarray(candidate)
    sizes_a, sizes_b = a[1] - a[0], b[1] - b[0]
    delta = b - a
    return {
        "convention": "candidate minus source; axis order X,Y,Z",
        "min_delta": delta[0].tolist(), "max_delta": delta[1].tolist(),
        "size_source": sizes_a.tolist(), "size_candidate": sizes_b.tolist(),
        "size_delta": (sizes_b - sizes_a).tolist(),
        "center_delta": (b.mean(axis=0) - a.mean(axis=0)).tolist(),
        "max_absolute_bound_delta": float(np.max(np.abs(delta))),
    }


def arguments():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--source", type=Path)
    parser.add_argument("--candidate", type=Path)
    parser.add_argument("--output", type=Path, help="JSON report filename (not a directory)")
    parser.add_argument("--samples", type=int, default=20000)
    parser.add_argument("--boundary-samples", type=int, default=2048)
    parser.add_argument("--extremity-grid", type=int, default=8,
                        help="Per-object projected grid side; 0 keeps only 26 support-direction probes")
    parser.add_argument("--seed", type=int, default=20261102)
    parser.add_argument("--self-test", action="store_true", help="Run only tiny analytic fixtures")
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    args = parser.parse_args(argv)
    if not args.self_test:
        for key in ("source", "candidate", "output"):
            if getattr(args, key) is None:
                parser.error(f"--{key} is required unless --self-test is used")
        args.source, args.candidate, args.output = (p.resolve() for p in (args.source, args.candidate, args.output))
        for path in (args.source, args.candidate):
            if not path.is_file():
                parser.error(f"Asset does not exist: {path}")
        if args.output in (args.source, args.candidate):
            parser.error("Output must not overwrite an input asset")
    if args.samples < 1 or args.boundary_samples < 0 or not 0 <= args.extremity_grid <= 128:
        parser.error("Require samples >= 1, boundary-samples >= 0, and extremity-grid in 0..128")
    return args


def main(args):
    if args.self_test:
        self_test()
        return
    started = time.perf_counter()
    source = build_asset(args.source, "source", args, args.seed)
    reused = args.source == args.candidate
    candidate = source if reused else build_asset(args.candidate, "candidate", args, args.seed + 1)
    source_bounds = source["metadata"]["bounds"]
    diagonal = float(np.linalg.norm(np.asarray(source_bounds[1]) - source_bounds[0]))
    if diagonal <= 0:
        raise ValueError("Source bounding-box diagonal must be positive")
    report = {
        "schema": "sampled-bidirectional-triangle-distance-v1",
        "blender": bpy.app.version_string, "units": "inferred metres after documented normalization",
        "method": {
            "surface_sampling": "Uniform triangle area with sqrt-barycentric sampling; global object allocation weighted by area",
            "nearest": "Unsigned point-to-triangle distance: mathutils BVHTree.FromObject (epsilon 0) neighborhood search, then float64 plane/segment closest-point refinement against original triangle vertices",
            "refinement_search_guard": diagonal * 0.001,
            "boundary_sampling": "Topological edges incident to one original polygon, sampled uniformly by total edge length; split UV/normal seams can be included",
            "key_extremities": f"Per mesh: support vertices for 26 directions plus min/max coordinate vertices in each cell of {args.extremity_grid}x{args.extremity_grid} XY/YZ/XZ grids; duplicate positions removed",
            "normalization": "Independently for each asset: if raw world Z height < 3, uniform scale 100 then translate Z +63.785398; otherwise identity",
            "percentile": "NumPy linear percentile; surface statistics do not include deliberately biased boundary/extremity probes",
            "candidate_reuses_source_bvh": reused,
        },
        "source_diagonal": diagonal, "source": source["metadata"], "candidate": candidate["metadata"],
        "bounds_difference": bounds_difference(source_bounds, candidate["metadata"]["bounds"]),
        "distances": {}, "self_checks": {},
        "limitations": [
            "The maximum is the largest measured sample/probe error, not an exhaustive or certified Hausdorff distance.",
            "Area-weighted metrics can underrepresent small but important architectural features; boundary and local extremity probes reduce, but cannot eliminate, this risk.",
            "Unsigned nearest distances do not prove matching topology, semantic correspondence, watertightness, material appearance or texture/normal fidelity.",
            "All positive-area triangles are included, including internal/occluded faces, disconnected fragments and overlapping surfaces; vertices without area are represented only if selected as extremities.",
            "Boundaries are topological, not inferred architectural creases or image silhouettes; unwelded seams may inflate their number.",
            "Imported vertex coordinates have Blender float precision; float64 refinement measures those imported triangles. Tiny self residuals do not imply physical/survey precision or a certified global nearest bound.",
            "Float64 refinement examines BVH nearest-range hits within raw nearest distance plus 0.1% of source diagonal. This empirically repairs slender-triangle precision errors; it is not a proof that the float BVH supplied every globally relevant face. Raw float distance aggregates are retained for every category and self-check.",
            "No registration, best-fit alignment or geometry simplification is performed. Alignment and scale errors remain in the distances.",
        ],
    }
    surface_distances = []
    for origin_name, origin, target_name, target in (("source", source, "candidate", candidate),
                                                    ("candidate", candidate, "source", source)):
        for category in ("surface", "boundary", "key_extremities"):
            name = f"{origin_name}_to_{target_name}_{category}"
            print(f"MEASURE {name}: {len(origin[category])} points", flush=True)
            distances, data = nearest_measure(origin[category], target["trees"], diagonal)
            report["distances"][name] = data
            if category == "surface":
                surface_distances.append(distances)
        print(f"SELF_NEAREST {origin_name}", flush=True)
        _, check = nearest_measure(origin["surface"], origin["trees"], diagonal)
        tolerance = max(1e-6, diagonal * 2e-6)
        check.update(tolerance=tolerance, within_tolerance=check["max"] <= tolerance)
        report["self_checks"][origin_name] = check
    report["distances"]["symmetric_surface_equal_direction_weight"] = distance_summary(np.concatenate(surface_distances), diagonal)
    report["self_checks"]["all_within_tolerance"] = all(report["self_checks"][name]["within_tolerance"] for name in ("source", "candidate"))
    report["elapsed_seconds"] = time.perf_counter() - started
    args.output.parent.mkdir(parents=True, exist_ok=True)
    temporary = args.output.with_name(args.output.name + ".tmp")
    temporary.write_text(json.dumps(report, indent=2, allow_nan=False) + "\n", encoding="utf-8")
    temporary.replace(args.output)
    print("GEOMETRY_REPORT", str(args.output), json.dumps(report["distances"]["symmetric_surface_equal_direction_weight"]), flush=True)
    if not report["self_checks"]["all_within_tolerance"]:
        raise RuntimeError("Self-nearest precision check failed; report was saved, distances require investigation")


def self_test():
    """Small analytic fixtures; does not import or build BVHs for real assets."""
    bpy.ops.wm.read_factory_settings(use_empty=True)

    def mesh_object(name, vertices, faces):
        mesh = bpy.data.meshes.new(name)
        mesh.from_pydata(vertices, [], faces)
        mesh.update()
        obj = bpy.data.objects.new(name, mesh)
        bpy.context.collection.objects.link(obj)
        return obj

    # An unweighted triangle sampler would put half its samples in each island.
    obj = mesh_object("one-and-nine-area", [
        (0, 0, 0), (1, 0, 0), (0, 2, 0),
        (10, 0, 0), (13, 0, 0), (10, 6, 0),
    ], [(0, 1, 2), (3, 4, 5)])
    data = analyze_mesh(obj, 10000, 1000, np.random.default_rng(123), 4)
    assert abs(data["surface_area"] - 10.0) < 1e-10, data
    fraction = float(np.mean(data["surface_points"][:, 0] >= 10))
    assert 0.88 < fraction < 0.92, fraction
    assert np.all(data["surface_points"][:, 2] == 0)
    assert data["boundary_edge_count"] == 6, data["boundary_edge_count"]
    assert abs(data["boundary_length"] - 20.94427190999916) < 1e-5
    repeated = analyze_mesh(obj, 10000, 1000, np.random.default_rng(123), 4)
    assert np.array_equal(data["surface_points"], repeated["surface_points"])
    # A model split into unequal-sized objects must retain the same area bias.
    pooled, allocation = allocate_samples([np.zeros((10000, 3)), np.ones((10000, 3))],
                                         [1, 9], 10000, np.random.default_rng(8))
    assert 0.88 < float(pooled[:, 0].mean()) < 0.92, allocation
    no_points, allocation = allocate_samples([EMPTY_POINTS], [0], 200, np.random.default_rng(8))
    assert no_points.shape == (0, 3) and allocation == [0]

    # The two matching unit squares have analytically constant separation 2.
    near = mesh_object("z-three", [(0, 0, 3), (1, 0, 3), (1, 1, 3), (0, 1, 3)], [(0, 1, 2, 3)])
    far = mesh_object("z-five", [(0, 0, 5), (1, 0, 5), (1, 1, 5), (0, 1, 5)], [(0, 1, 2, 3)])
    bpy.context.view_layer.update()
    graph = bpy.context.evaluated_depsgraph_get()
    near_tree = [{"name": near.name, "tree": BVHTree.FromObject(near, graph)}]
    far_tree = [{"name": far.name, "tree": BVHTree.FromObject(far, graph)}]
    near_data = analyze_mesh(near, 500, 200, np.random.default_rng(4), 4)
    far_data = analyze_mesh(far, 500, 200, np.random.default_rng(5), 4)
    assert near_data["boundary_edge_count"] == 4  # Triangulation diagonal is not a boundary.
    assert abs(near_data["surface_area"] - 1) < 1e-10
    for points, target in [(near_data["surface_points"], far_tree), (far_data["surface_points"], near_tree)]:
        distances, report = nearest_measure(points, target, 3.0)
        assert np.allclose(distances, 2, atol=1e-6), report
        assert abs(report["p95"] - 2) < 1e-6, report
    distances, _ = nearest_measure(near_data["surface_points"], near_tree, 3.0)
    assert float(distances.max()) < 1e-6
    distances, _ = nearest_measure(near_data["surface_points"], far_tree + near_tree, 3.0)
    assert float(distances.max()) < 1e-6  # Search the union, rather than the first mesh.

    # Regression from the final quantized asset: Blender float triangle math
    # reported ~7 mm even though this point lies on the long, narrow triangle.
    thin = mesh_object("thin-triangle-regression", [
        (41.35409927368164, -38.01512908935547, 25.721580505371094),
        (29.059911727905273, -37.9919319152832, 25.680988311767578),
        (16.803415298461914, -37.99773025512695, 25.683887481689453),
        (8.74260425567627, -38.04122543334961, 25.71868133544922),
    ], [(0, 1, 2), (2, 3, 0)])
    bpy.context.view_layer.update()
    thin_data = analyze_mesh(thin, 1, 0, np.random.default_rng(3), 0)
    thin_tree = [{"name": thin.name, "tree": BVHTree.FromObject(thin, bpy.context.evaluated_depsgraph_get()),
                  "vertices": thin_data["vertices"], "triangles": thin_data["triangles"]}]
    thin_point = np.array([[24.01897365694051, -38.0079557916795, 25.699865849726912]])
    distances, _ = nearest_measure(thin_point, thin_tree, 251.0)
    assert float(distances.max()) < 1e-8, distances

    # Explicit object transforms must be included before the auto normalization.
    small = mesh_object("native-sized", [(0, 0, -0.5), (1, 0, 0.5), (0, 1, 0.5)], [(0, 1, 2)])
    small.location.x = 0.25
    bpy.context.view_layer.update()
    transform = normalize_objects([small])
    assert transform["scale"] == 100.0
    assert abs(transform["bounds"][0][0] - 25) < 1e-5, transform
    assert abs(transform["bounds"][0][2] - 13.785398) < 1e-5, transform
    assert abs(transform["bounds"][1][2] - 113.785398) < 1e-5, transform
    assert normalize_objects([small])["scale"] == 1.0  # Already normalized is left in place.
    print("SELF_TEST_PASS: triangle/object area weighting, determinism, boundaries, nearest mesh union, bidirectional plane distances, self distances, normalization", flush=True)


if __name__ == "__main__":
    main(arguments())
