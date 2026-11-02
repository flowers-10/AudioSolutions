# Final V2 fidelity evidence

The final model was compared with the supplied original using nine fixed
orthographic cameras at 1200 × 1000, 32 samples. A second set covers front
oblique, back oblique, top and left at 2400 × 2000, 64 samples; six native-pixel
source/candidate crop pairs are included in `details/`.

| Nine-view diagnostic | Previous procedural reconstruction | Final V2 source-derived retopology |
| --- | ---: | ---: |
| Mean silhouette IoU | 0.924524 | 0.999408 |
| Mean RGB error, 0–255 | 38.2198 | 4.9462 |
| Mean local luminance SSIM | 0.185124 | 0.933305 |

Silhouette overlap measures only projected geometry. It is not a percentage of
all architectural or material detail preserved. The local SSIM is a documented
8 × 8 block luminance diagnostic, not a universal perceptual fidelity score.
The left elevation is the poorest final appearance view: MAE 9.7585/255 and
SSIM 0.877891 at the standard resolution.

The final model retains 1,305,552 of the source's 4,351,840 triangles across eight
spatial zones. It is made by source-constrained edge collapse and preserves the
source UV attributes and three original JPEG texture maps. The original image
bytes are copied without recompression into the GLB. Positions and normals are
stored with 16-bit quantization, while UV coordinates remain floating point.
Thirteen vertices were constrained to source bounds. No transferred custom
normals are used; that experiment introduced brighter triangular roof patches
and was rejected.

Visual inspection of the original and final native-pixel pairs checked the
roof seam/ridge pattern, horizontal facade fins, service-core uprights and
crossbars, podium terrace stepping, back facades, and roof/side structures.
Those features remain recognizable and closely placed. Local roof surface
shading and some small fin/core edges still differ. The final model retains
the original's irregular reconstructed surface rather than replacing it with
an invented regular grid.

All source/candidate pairs use unchanged imported PBR materials, identical
lighting/world/camera/color settings, and separate renders. Geometry masks use
temporary opaque emission materials. Red means missing source coverage, blue
means extra candidate coverage and gray means overlap. Outline comparison uses
a two-pixel tolerance. An original-versus-original front-oblique identity check
produced IoU 1, RGB error 0 and local SSIM 1.

The report is bound to these exact inputs:

- Source SHA-256: `ed5fbf58491a0065b037d49d11c2a7bd26efe6e0149dd669496ea3bb655536aa`
- Final GLB SHA-256: `53c4445e70451b80b4d1743435d7119376e1f91e4a334a43814bffd551e04bed`
- Final GLB size: 59,903,696 bytes.

The builder verified both file hashes and triangle count against
`../model-info.json` before packaging these files. `report.json` includes
artifact hashes, original image hashes, all measured views, baseline statistics
and high-resolution camera metadata. `metrics.json` and
`appearance-metrics.json` contain the detailed geometry and appearance reports.
PBR images in this directory are presentation JPEGs for compact review; the
statistics were computed from the lossless PNG renders before JPEG conversion.
All links in `../comparison.html` are relative and the report data is embedded,
so the comparison page can also be opened directly from disk.

## Sampled surface geometry

[`geometry-report.json`](geometry-report.json) measures unsigned distances to
actual triangle surfaces using 20,000 deterministic, area-weighted samples in
each direction. Separate boundary and local-extremity probes are reported
without changing the surface distribution.

| Equal-direction surface diagnostic, 40,000 samples | Inferred metres |
| --- | ---: |
| Median | 0.008034 |
| p95 | 0.033790 |
| p99 | 0.050327 |
| Largest measured surface distance | 0.106816 |

The largest boundary/extremity probe distance is 0.119458 m. The largest
bounding-coordinate difference is 0.001228 m. These are sampled geometric
deviations, not certified Hausdorff bounds, appearance scores or evidence of
physical measurement accuracy. Internal surfaces and unwelded mesh seams are
included.

Blender float nearest-triangle calculations produced self-distance outliers
of 0.001110 m for the source and 0.007081 m for the candidate on slender
triangles. The tool retains those raw statistics, searches a BVH neighborhood
within the raw nearest distance plus 0.1% of the source diagonal, and refines
triangle distances using float64 arithmetic. Refined self residuals were below
3e-14 m; this establishes numerical consistency of the imported surfaces, not
survey precision or a proof that every globally relevant triangle was found.
No samples were excluded. The raw and refined surface p95 differ by less than
0.000001 m.

Portable commands, regression fixtures and method limits are documented in the
[validation README](../../../../models/twin-glass-towers/validation/README.md).
Verify the geometry report's candidate binding from the repository root:

```powershell
$geometryPath = 'public/models/twin-glass-towers/fidelity/geometry-report.json'
$geometry = Get-Content $geometryPath -Raw | ConvertFrom-Json
$glbPath = 'public/models/twin-glass-towers/twin-glass-towers.glb'
$actualGlbSha = (Get-FileHash $glbPath -Algorithm SHA256).Hash.ToLowerInvariant()
if ($actualGlbSha -ne $geometry.candidate.sha256) { throw 'Geometry report / GLB hash mismatch' }
```
