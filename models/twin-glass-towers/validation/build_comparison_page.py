"""Package local comparison renders into a self-contained HTML evidence viewer.

--target-dir receives comparison.html and fidelity/{images,details,*.json}.
Only QA images and reports are copied; input GLBs are never copied by this tool.
Do not point --target-dir at a published/public directory without authorization.
"""
import argparse
import hashlib
import json
import shutil
from pathlib import Path

from PIL import Image


TEMPLATE = r'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Twin Glass Towers · Fidelity comparison</title>
<style>
:root{font:15px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif;color:#202d3b;background:#f3f5f7;color-scheme:light;--accent:#086977;--line:#dbe2e7;--muted:#657582}
*{box-sizing:border-box}body{margin:0}main{max-width:1320px;margin:auto;padding:42px 30px 70px}a{color:var(--accent)}h1,h2,h3,p{margin:0}h1{font-size:clamp(28px,3.5vw,46px);line-height:1.15;letter-spacing:-.035em;margin:15px 0}h2{font-size:23px;letter-spacing:-.02em;margin:36px 0 12px}h3{font-size:16px}.eyebrow{color:var(--accent);font-size:12px;font-weight:750;letter-spacing:.13em;text-transform:uppercase}.intro{max-width:850px;color:#536572}.note{font-size:13px;color:var(--muted)}.chips{display:flex;gap:8px;flex-wrap:wrap;margin:20px 0 26px}.chip{font-size:12px;border:1px solid #cfdde0;background:#edf5f4;border-radius:100px;padding:5px 11px;color:#285e62}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:24px 0}.stat{background:#fff;border:1px solid var(--line);border-radius:12px;padding:19px 21px}.stat strong{display:block;font-size:28px;font-weight:650;line-height:1.3;margin:4px 0}.stat span{font-size:12px;color:var(--muted)}.toolbar{display:flex;gap:20px;align-items:flex-end;flex-wrap:wrap;background:#fff;border:1px solid var(--line);border-radius:12px 12px 0 0;padding:16px 20px}.control{display:flex;flex-direction:column;gap:5px;min-width:165px}label{font-size:12px;font-weight:650;color:#536572}select{font:inherit;background:#f8fafb;color:#202d3b;border:1px solid #cbd5dd;border-radius:6px;padding:9px 32px 9px 10px;min-height:42px}.raw-link{margin-left:auto;font-size:13px;align-self:center}.viewer{background:#ebedf0;border:1px solid var(--line);border-top:0;padding:12px;border-radius:0 0 12px 12px}.pair{display:grid;grid-template-columns:1fr 1fr;gap:12px}.image-panel{min-width:0;position:relative}.image-title{background:#fff;padding:11px 14px;border-radius:7px 7px 0 0;font-size:13px;font-weight:650;display:flex;justify-content:space-between;gap:10px}.image-title a{font-size:12px;font-weight:450}.model-image{display:block;width:100%;height:auto;aspect-ratio:1.2;object-fit:contain;background:#ebedf0}.overlay-stage{position:relative;max-width:1100px;margin:auto;aspect-ratio:1.2;overflow:hidden}.overlay-stage img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}.overlay-new{clip-path:inset(0 0 0 50%)}.split{position:absolute;top:0;bottom:0;left:50%;width:2px;background:#086977;pointer-events:none}.split:after{content:'↔';position:absolute;top:48%;left:-18px;width:38px;height:38px;border:2px solid #fff;border-radius:50%;background:#086977;color:#fff;display:grid;place-items:center;font-size:22px}.overlay-labels{display:flex;justify-content:space-between;position:absolute;left:14px;right:14px;top:10px;z-index:2;pointer-events:none}.overlay-labels span{padding:5px 10px;background:#ffffffdb;border-radius:5px;font-size:12px;font-weight:650}.slider-row{max-width:880px;margin:13px auto 4px;display:flex;align-items:center;gap:14px}.slider-row label{white-space:nowrap}.slider-row input{width:100%;accent-color:var(--accent)}[hidden]{display:none!important}.view-metrics{display:flex;gap:22px;flex-wrap:wrap;padding:14px 3px;font-size:13px}.legend{font-size:13px;padding:10px 2px}.dot{display:inline-block;width:10px;height:10px;border-radius:50%;margin:0 5px 0 14px}.red{background:#ff3030}.blue{background:#168bff}.gray{background:#aaa}.details{display:grid;grid-template-columns:1fr 1fr;gap:16px}.detail{border:1px solid var(--line);border-radius:10px;background:#fff;overflow:hidden}.detail figcaption{padding:14px 16px;font-size:13px;font-weight:650}.detail figure{margin:0}.detail img{display:block;width:100%;height:auto;background:#ebedf0}.detail .note{padding:0 16px 12px}.table-wrap{overflow:auto;background:#fff;border:1px solid var(--line);border-radius:10px}table{width:100%;border-collapse:collapse;text-align:left;font-variant-numeric:tabular-nums}th,td{padding:11px 16px;border-bottom:1px solid #e6ebef;white-space:nowrap}th{font-size:12px;color:#5f717c;background:#f8fafb}td{font-size:13px}tr:last-child td{border-bottom:0}.method{display:grid;grid-template-columns:1.2fr 1fr;gap:30px;margin-top:8px}.method p{margin-bottom:12px;color:#536572}.links{display:flex;gap:18px;flex-wrap:wrap;margin:18px 0;font-size:13px}footer{border-top:1px solid var(--line);margin-top:30px;padding-top:18px;color:var(--muted);font-size:12px}button:focus-visible,select:focus-visible,input:focus-visible,a:focus-visible{outline:3px solid #33a3b6;outline-offset:3px}@media(max-width:760px){main{padding:25px 14px 45px}.stats{gap:8px}.stat{padding:12px}.stat strong{font-size:23px}.pair,.details,.method{grid-template-columns:1fr}.toolbar{gap:12px;padding:12px}.control{min-width:135px;flex:1}.raw-link{margin-left:0}.view-metrics{gap:9px 20px}.detail figcaption{padding:11px}.overlay-stage{width:100%}}
</style>
</head>
<body><main>
<div class="eyebrow">Twin Glass Towers · comparison evidence</div>
<h1>Original and retopologized model</h1>
<p class="intro">Compare the original textured Meshy asset with the new source-derived retopology. Every image pair uses the same camera, world, lighting and color settings. Original imported PBR materials are kept for the appearance renders.</p>
<div class="chips"><span class="chip">Nine fixed views</span><span class="chip">Original PBR texture maps</span><span class="chip">Source-derived retopology</span><span class="chip" id="resolution-chip"></span></div>
<div class="stats">
<div class="stat"><span>Mean silhouette overlap · geometry only</span><strong id="mean-iou"></strong><span>IoU across nine projected silhouettes</span></div>
<div class="stat"><span>Mean RGB appearance error</span><strong id="mean-mae"></strong><span>0–255 sRGB scale · lower is closer</span></div>
<div class="stat"><span>Local luminance structure</span><strong id="mean-ssim"></strong><span>8 × 8 block SSIM · diagnostic only</span></div>
</div>
<p class="note">Silhouette overlap measures projected shape. It does not mean the same percentage of all details is preserved. Inspect the appearance pairs and closeups for texture, fine geometry and shading differences.</p>
<h2>View comparison</h2>
<div class="toolbar">
<div class="control"><label for="view-select">Camera view</label><select id="view-select"></select></div>
<div class="control"><label for="pass-select">Render pass</label><select id="pass-select"><option value="pbr">PBR appearance</option><option value="mask">Opaque geometry masks</option><option value="difference">Silhouette differences</option></select></div>
<div class="control"><label for="layout-select">Compare with</label><select id="layout-select"><option value="pair">Side by side</option><option value="overlay">Adjustable overlay</option></select></div>
<a id="raw-difference" class="raw-link" href="#" target="_blank" rel="noopener">Open 4× RGB error image ↗</a>
</div>
<div class="viewer">
<div id="pair" class="pair">
<div class="image-panel"><div class="image-title">Original source<a id="source-link" target="_blank" rel="noopener">Full size ↗</a></div><img class="model-image" id="source-image" alt="Original Meshy source render"></div>
<div class="image-panel"><div class="image-title">Retopologized candidate<a id="candidate-link" target="_blank" rel="noopener">Full size ↗</a></div><img class="model-image" id="candidate-image" alt="Retopologized candidate render"></div>
</div>
<div id="overlay" hidden><div class="overlay-stage"><img id="overlay-source" alt="Original source under comparison overlay"><img id="overlay-new" class="overlay-new" alt="Retopologized candidate on the right of divider"><div class="overlay-labels"><span>Original source</span><span>Retopologized candidate</span></div><div id="split" class="split"></div></div><div class="slider-row"><label for="wipe">Move divider</label><input id="wipe" type="range" min="0" max="100" value="50" aria-label="Position of source/candidate comparison divider"></div></div>
<div id="difference" hidden><img id="difference-image" class="model-image" alt="Silhouette overlap, missing and extra pixels"><div class="legend"><span class="dot gray"></span>Overlap <span class="dot red"></span>Source only / missing <span class="dot blue"></span>Candidate only / extra</div></div>
</div>
<div class="view-metrics" id="view-metrics" aria-live="polite"></div>
<h2>Native-resolution details</h2><p class="note" style="margin-bottom:15px">Each pair is cropped from identical high-resolution cameras. Open an image to inspect native render pixels: source on the left, candidate on the right.</p><div class="details" id="details"></div>
<h2>Measured views</h2><div class="table-wrap"><table><thead><tr><th>View</th><th>Silhouette IoU</th><th>Missing source area</th><th>Extra candidate area</th><th>RGB MAE / 255</th><th>Local SSIM</th></tr></thead><tbody id="metrics-body"></tbody></table></div>
<div id="baseline-section" hidden><h2>Previous reconstruction baseline</h2><p class="note" style="margin-bottom:12px">The earlier procedural reconstruction is retained here as a measured baseline. Its GLB is not bundled with this evidence page.</p><div class="table-wrap"><table><thead><tr><th>Compared with the original</th><th>Mean silhouette IoU</th><th>Mean RGB MAE / 255</th><th>Mean local SSIM</th></tr></thead><tbody id="baseline-body"></tbody></table></div></div>
<h2>Method and practical limits</h2><div class="method"><div><h3>Source-derived retopology</h3><p id="method-text"></p><p id="geometry-text"></p><p>The source is aligned with a uniform ×100 scale and a +63.785398 Z translation. Candidate coordinates are already in meters. No per-view alignment is fitted to improve scores.</p></div><div><h3>What the measurements cover</h3><p>The silhouette pass temporarily uses opaque emission materials to isolate geometry. Red and blue regions reveal missing and extra projected coverage. Outline matching uses a two-pixel tolerance at the stated image resolution.</p><p>RGB error includes texture, normal, shading and geometric differences under this studio lighting. Local luminance SSIM uses nonoverlapping 8 × 8 blocks within the overlapping masks. Neither metric guarantees that every surface or detail is preserved.</p></div></div>
<div class="links"><a href="fidelity/metrics.json">Geometry and camera report</a><a href="fidelity/appearance-metrics.json">Appearance report and methodology</a><a id="hires-report-link" href="fidelity/hires-metrics.json">High-resolution report</a><a href="fidelity/report.json">Combined evidence data</a></div>
<details style="margin-top:25px"><summary style="cursor:pointer;font-size:13px">Matched source and final artifact hashes</summary><pre id="artifact-hashes" style="font-size:12px;white-space:pre-wrap;overflow-wrap:anywhere;padding:15px;background:#fff;border:1px solid var(--line);border-radius:7px"></pre></details>
<footer id="footer"></footer>
</main><script id="comparison-data" type="application/json">__DATA__</script>
<script>
'use strict';
const data=JSON.parse(document.getElementById('comparison-data').textContent);
const geometry=data.geometry,appearance=data.appearance;
const $=id=>document.getElementById(id);
const labels={'front-oblique':'Front oblique','back-oblique':'Back oblique','left-oblique':'Left oblique','right-oblique':'Right oblique','front':'Front','back':'Back','left':'Left','right':'Right','top':'Top'};
const imagePath=(view,label,pass)=>`fidelity/images/${view}__${label}__${pass}.${pass==='pbr'?'jpg':'png'}`;
const percent=n=>`${(n*100).toFixed(3)}%`;
$('mean-iou').textContent=geometry.mean_silhouette_iou.toFixed(6);
$('mean-mae').textContent=appearance.mean_mae_0_255.toFixed(2);
$('mean-ssim').textContent=appearance.mean_ssim.toFixed(4);
$('resolution-chip').textContent=`${geometry.render.width} × ${geometry.render.height} · ${geometry.render.samples} samples`;
for(const name of Object.keys(geometry.views)){const option=document.createElement('option');option.value=name;option.textContent=labels[name]||name;$('view-select').append(option);}
if(geometry.views['front-oblique'])$('view-select').value='front-oblique';
function update(){
 const name=$('view-select').value,pass=$('pass-select').value,layout=$('layout-select').value;
 const isDifference=pass==='difference';
 $('pair').hidden=isDifference||layout!=='pair';$('overlay').hidden=isDifference||layout!=='overlay';$('difference').hidden=!isDifference;$('layout-select').disabled=isDifference;
 if(pass==='pbr'||pass==='mask'){
  const source=imagePath(name,'source',pass),candidate=imagePath(name,'candidate',pass);
  for(const id of ['source-image','overlay-source'])$(id).src=source;
  for(const id of ['candidate-image','overlay-new'])$(id).src=candidate;
  $('source-link').href=source;$('candidate-link').href=candidate;
 }
 $('difference-image').src=`fidelity/images/${name}__difference.png`;
 $('raw-difference').href=`fidelity/images/${name}__pbr-absolute-difference-4x.jpg`;
 const g=geometry.views[name],a=appearance.views[name];
 $('view-metrics').textContent=`${labels[name]||name} · silhouette IoU ${g.silhouette_iou.toFixed(6)} · RGB MAE ${a.mean_absolute_srgb_error_0_255.toFixed(2)}/255 · local SSIM ${a.windowed_luminance_ssim_8x8.toFixed(4)}`;
}
for(const id of ['view-select','pass-select','layout-select'])$(id).addEventListener('change',update);
$('wipe').addEventListener('input',e=>{const n=e.target.value;$('overlay-new').style.clipPath=`inset(0 0 0 ${n}%)`;$('split').style.left=n+'%';});
for(const [name,g]of Object.entries(geometry.views)){const a=appearance.views[name],row=document.createElement('tr');for(const value of [labels[name]||name,g.silhouette_iou.toFixed(6),percent(g.source_missing_fraction),percent(g.candidate_extra_fraction),a.mean_absolute_srgb_error_0_255.toFixed(3),a.windowed_luminance_ssim_8x8.toFixed(4)]){const cell=document.createElement('td');cell.textContent=value;row.append(cell);}$('metrics-body').append(row);}
for(const item of data.details){const card=document.createElement('article');card.className='detail';const figure=document.createElement('figure'),caption=document.createElement('figcaption'),link=document.createElement('a'),img=document.createElement('img'),note=document.createElement('p');caption.textContent=item.label;link.href='fidelity/details/'+item.file;link.target='_blank';link.rel='noopener';img.src=link.href;img.alt=`Source left, candidate right: ${item.label}`;img.loading='lazy';link.append(img);figure.append(caption,link);note.className='note';note.textContent='Original source left · retopologized candidate right · open full size ↗';card.append(figure,note);$('details').append(card);}
if(data.baseline){$('baseline-section').hidden=false;for(const [label,g,a]of [['Previous procedural model',data.baseline.geometry,data.baseline.appearance],['Current source-derived retopology',geometry,appearance]]){const row=document.createElement('tr');for(const value of [label,g.mean_silhouette_iou.toFixed(6),a.mean_mae_0_255.toFixed(3),a.mean_ssim.toFixed(4)]){const cell=document.createElement('td');cell.textContent=value;row.append(cell);}$('baseline-body').append(row);}}
$('method-text').textContent=data.method;
$('geometry-text').textContent=`Source: ${geometry.source.triangles.toLocaleString()} triangles. Candidate: ${geometry.candidate.triangles.toLocaleString()} triangles across ${geometry.candidate.mesh_count} mesh objects. Geometry is reduced from the original surface; it is not a hand-modeled replacement.`;
$('hires-report-link').hidden=!data.hires;
$('artifact-hashes').textContent=data.artifact?`Source: ${data.artifact.source_name}\nSHA-256: ${data.artifact.source_sha256}\n\nFinal model: ${data.artifact.candidate_name}\nSHA-256: ${data.artifact.candidate_sha256}\nBytes: ${data.artifact.candidate_bytes.toLocaleString()}\n\nImage downloads are presentation JPEGs. Metrics were calculated from the original lossless render PNGs.`:'No artifact manifest supplied.';
$('footer').textContent=`Evidence generated ${data.generated}. Blender ${data.blender_version}. All original/candidate image pairs use identical render settings. Input GLBs are not embedded in this page.`;
update();
</script></body></html>'''


def load(path):
    return json.loads(path.read_text(encoding='utf-8'))


def sanitized_geometry(report):
    # Public evidence should name inputs without exposing machine-specific paths.
    result = json.loads(json.dumps(report))
    for key in ['source', 'candidate']:
        result[key]['path'] = Path(result[key]['path']).name
    return result


def copy_jpeg(source, target):
    rgba = Image.open(source).convert('RGBA')
    background = Image.new('RGBA', rgba.size, (235, 237, 240, 255))
    background.alpha_composite(rgba)
    background.convert('RGB').save(target, quality=95, subsampling=0, optimize=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--qa-dir', required=True, type=Path)
    parser.add_argument('--detail-dir', type=Path)
    parser.add_argument('--baseline-dir', type=Path)
    parser.add_argument('--target-dir', required=True, type=Path)
    parser.add_argument('--model-info', type=Path, help='Final model-info.json; validates both input SHA-256 values')
    parser.add_argument('--method', default='The original mesh surface is simplified by controlled edge-collapse retopology. Geometry is partitioned into spatial zones for practical loading and inspection. Original PBR texture maps and UV coordinates are retained; position and normal quantization reduce storage while UV coordinates remain floating point. No custom-normal transfer is used.')
    parser.add_argument('--blender-version', default='4.5.15 LTS')
    args = parser.parse_args()
    target = args.target_dir.resolve()
    images, details = target / 'fidelity/images', target / 'fidelity/details'
    images.mkdir(parents=True, exist_ok=True)
    details.mkdir(parents=True, exist_ok=True)
    raw_geometry = load(args.qa_dir / 'metrics.json')
    geometry, appearance = sanitized_geometry(raw_geometry), load(args.qa_dir / 'appearance-metrics.json')
    if len(geometry['views']) != 9:
        raise ValueError('The final comparison page requires exactly nine camera views')
    if set(appearance['views']) != set(geometry['views']):
        raise ValueError('Geometry/appearance report views do not match')
    report = {'geometry': geometry, 'appearance': appearance, 'method': args.method,
              'blender_version': args.blender_version, 'details': [], 'hires': None}
    from datetime import datetime, timezone
    report['generated'] = datetime.now(timezone.utc).isoformat(timespec='seconds')
    if args.model_info:
        info = load(args.model_info)
        source_path, candidate_path = Path(raw_geometry['source']['path']), Path(raw_geometry['candidate']['path'])
        source_hash = hashlib.sha256(source_path.read_bytes()).hexdigest()
        candidate_hash = hashlib.sha256(candidate_path.read_bytes()).hexdigest()
        if source_hash != info['sourceSHA256'] or candidate_hash != info['glbSHA256']:
            raise ValueError('Source or candidate SHA-256 does not match final model-info.json')
        if geometry['candidate']['triangles'] != info['triangles']:
            raise ValueError('Rendered triangle count does not match final model-info.json')
        report['artifact'] = {
            'source_name': source_path.name, 'source_sha256': source_hash,
            'candidate_name': candidate_path.name, 'candidate_sha256': candidate_hash,
            'candidate_bytes': candidate_path.stat().st_size,
            'textures': info.get('textures', []), 'reconstruction': info.get('reconstruction', {}),
        }
        geometry['artifact'] = report['artifact']
    (target / 'fidelity/metrics.json').write_text(json.dumps(geometry, indent=2), encoding='utf-8')
    shutil.copy2(args.qa_dir / 'appearance-metrics.json', target / 'fidelity/appearance-metrics.json')
    for view in geometry['views']:
        for suffix in ['source__pbr', 'candidate__pbr', 'source__mask', 'candidate__mask', 'difference', 'pbr-absolute-difference-4x']:
            filename = f'{view}__{suffix}.png'
            if suffix.endswith('__pbr') or suffix == 'pbr-absolute-difference-4x':
                copy_jpeg(args.qa_dir / filename, images / filename.replace('.png', '.jpg'))
            else:
                shutil.copy2(args.qa_dir / filename, images / filename)
    if args.detail_dir:
        report['hires'] = sanitized_geometry(load(args.detail_dir / 'metrics.json'))
        (target / 'fidelity/hires-metrics.json').write_text(json.dumps(report['hires'], indent=2), encoding='utf-8')
        if (args.detail_dir / 'appearance-metrics.json').exists():
            shutil.copy2(args.detail_dir / 'appearance-metrics.json', target / 'fidelity/hires-appearance-metrics.json')
        for path in sorted(args.detail_dir.glob('closeup__*.jpg')):
            shutil.copy2(path, details / path.name)
            report['details'].append({'label': path.stem.removeprefix('closeup__').replace('-', ' ').capitalize(), 'file': path.name})
    if args.baseline_dir:
        report['baseline'] = {'geometry': sanitized_geometry(load(args.baseline_dir / 'metrics.json')),
                              'appearance': load(args.baseline_dir / 'appearance-metrics.json')}
    # Keep embedded JSON safe in a script element and preserve direct-file use.
    serialized = json.dumps(report, ensure_ascii=False).replace('<', '\\u003c')
    (target / 'fidelity/report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    (target / 'comparison.html').write_text(TEMPLATE.replace('__DATA__', serialized), encoding='utf-8')
    print(target / 'comparison.html')
    print('Evidence images:', len(list(images.glob('*.*'))), 'detail pairs:', len(report['details']))


if __name__ == '__main__':
    main()
