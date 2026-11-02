# Source-versus-retopology validation

These reusable tools compare a supplied source GLB with the exported candidate.
They never modify either input. Run commands from the repository root. Blender
4.5 and system Python with NumPy and Pillow 10 or later are required. `blender`
must be on your PATH, or replace it with your Blender executable.

```powershell
$sourceGlb = $env:TWIN_TOWERS_SOURCE
$candidateGlb = 'public/models/twin-glass-towers/twin-glass-towers.glb'
$qa = '.tmp/twin-glass-towers-qa'
$tools = 'models/twin-glass-towers/validation'

blender --background --python "$tools/render_compare.py" -- `
  --source $sourceGlb --candidate $candidateGlb --output $qa
python "$tools/analyze_appearance.py" $qa
python "$tools/make_contact_sheet.py" $qa
```

Set `TWIN_TOWERS_SOURCE` to the supplied original file before running. The
original GLB is not bundled. The final exported GLB and original input are
identified by SHA-256 in the generated evidence report and `model-info.json`.

For the matching detail evidence, render front oblique, back oblique, top and
left at 2400 × 2000 with 64 samples:

```powershell
$detailQa = '.tmp/twin-glass-towers-detail-qa'
blender --background --python "$tools/render_compare.py" -- `
  --source $sourceGlb --candidate $candidateGlb --output $detailQa `
  --views front-oblique,back-oblique,top,left --width 2400 --height 2000 --samples 64
python "$tools/analyze_appearance.py" $detailQa --closeups
```

The first run renders nine views: front, back, left, right, top, and four
obliques. Orthographic cameras are fitted only to source bounds and then reused
without candidate-specific alignment. Both assets receive the same world,
lighting, color transform, exposure and render resolution. Main appearance
renders keep the imported PBR materials unchanged. The assets are rendered
separately so neither affects the other's lighting.

The silhouette pass temporarily replaces the imported materials with an opaque
emission material, then restores them. This measures geometry independent of
texture and glazing transparency. Gray means overlap, red means missing source
pixels, and blue means extra candidate pixels. Outline coverage uses a two-pixel
radius. These measures do not validate all details, shading or internal surfaces.

Appearance MAE is the RGB error in 8-bit sRGB PNG pixels within the union of the
opaque geometry masks. Local luminance SSIM uses nonoverlapping 8 × 8 windows
with at least 90% overlap-mask coverage, population variance and constants
C1=.01²/C2=.03². This is a documented diagnostic for these cameras and studio
lighting, not a universal perceptual fidelity score. Inspect the native-pixel
source/candidate crops alongside the statistics.

The default auto transform is specific to this original Meshy asset: models
shorter than 3 Blender units are scaled ×100 and translated by Z +63.785398.
Models already in meters receive the identity transform. Override the behavior
with `--source-scale`, `--candidate-scale`, `--source-offset X,Y,Z` and
`--candidate-offset X,Y,Z` for other inputs. Use a new output directory for each
changed candidate or render setting. `--resume` reuses existing PNGs and is only
appropriate with unchanged inputs and settings.

To package a validated report after rendering:

```powershell
python "$tools/build_comparison_page.py" --qa-dir $qa --detail-dir $detailQa `
  --model-info public/models/twin-glass-towers/model-info.json `
  --target-dir public/models/twin-glass-towers
node "$tools/verify_comparison_page.cjs" public/models/twin-glass-towers/comparison.html
```

The builder checks source/candidate SHA-256 and triangle count against
`model-info.json`. It copies only report data and images, creates relative URLs,
and embeds report data so the evidence page also works when opened as a local
file. Downloadable PBR images are presentation JPEGs; metrics are calculated
before JPEG conversion from the original lossless PNG renders. `--baseline-dir`
can include an earlier measured reconstruction in the comparison table without
copying its GLB. No earlier GLB or large temporary render fixtures are included
in this validation source directory.

The verifier checks embedded data, nine camera choices, all image/report paths,
comparison mode changes and the slider event with a small DOM stub. It is a
logic and artifact-integrity check; visual browser review remains separate.

The comparison harness was checked against the original twice as an identity
test: the tested front-oblique view produced silhouette IoU 1, RGB error 0 and
local SSIM 1. Final measured results live with the shipped model in
`public/models/twin-glass-towers/fidelity/` and are tied to its hash.

## Sampled geometry distances

Compare actual triangle surfaces with the same inputs and normalization:

```powershell
blender --background --factory-startup --python-exit-code 1 `
  --python "$tools/measure_geometry.py" -- `
  --source $sourceGlb --candidate $candidateGlb --output "$qa/geometry-report.json" `
  --samples 20000 --boundary-samples 2048 --extremity-grid 8

# Tiny analytic/regression fixtures; no model inputs are required.
blender --background --factory-startup --python-exit-code 1 `
  --python "$tools/measure_geometry.py" -- --self-test
```

The deterministic sampler weights triangles and mesh objects by surface area.
Each direction uses 20,000 samples. Separate probes cover 2,048 points weighted
by topological boundary-edge length, 26 support directions per mesh, and local
coordinate extrema in 8 × 8 projected grids. Boundary/extremity probes do not
alter the area-weighted surface statistics. Full world transforms, including
nested and quantized-node transforms, are baked before BVH construction. The
geometry tool uses the Meshy height-based auto transform described above; it
does not expose the render tool's scale/offset overrides.

Blender's float nearest-triangle calculations can be inaccurate on long, thin
triangles. The tool queries BVH neighbors within the raw nearest distance plus
0.1% of the source bounding-box diagonal, then refines triangle plane/edge
distances using float64 arithmetic. The report preserves raw float statistics
and measures each asset against itself to expose numerical inconsistencies.
Its self-test includes the slender-triangle case found in this final export.

The JSON contains both directions' median, p95, p99 and maximum, bounds deltas,
and worst measured points. These are unsigned sampled distances, not certified
Hausdorff bounds or proof that BVH neighborhood search found every relevant
triangle. All positive-area faces, including internal surfaces, remain in the
sampling population. UV/normal splits may create topological boundaries. Tiny
self-distance residuals describe numerical consistency of imported float32
surfaces, not physical measurement accuracy. Appearance, topology and semantic
correspondence require separate checks.

Raw CLI reports retain local input paths. The shipped
[`geometry-report.json`](../../../public/models/twin-glass-towers/fidelity/geometry-report.json)
uses basenames and SHA-256 input identifiers. Before publishing a new result,
sanitize local paths and bind it to hashes of the exact measured files.
