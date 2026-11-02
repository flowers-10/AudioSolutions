"""Measure PBR appearance differences and make unresized source/candidate crops.

All statistics use sRGB PNG pixels, on the union of opaque geometry masks.
These are render diagnostics, not a universal perceptual fidelity score.
"""
import argparse
import json
import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont


CROPS = {
    'left-elevation-fins-and-roof': ('left', (0.18, 0.09, 0.82, 0.78)),
    'front-roof-seams': ('front-oblique', (0.21, 0.07, 0.57, 0.35)),
    'front-service-core-and-mullions': ('front-oblique', (0.33, 0.26, 0.63, 0.72)),
    'front-podium-terraces': ('front-oblique', (0.06, 0.64, 0.87, 0.96)),
    'rear-mullions': ('back-oblique', (0.23, 0.24, 0.79, 0.68)),
    'top-roof-and-side-structures': ('top', (0.10, 0.19, 0.46, 0.65)),
}


def masked_ssim(source, candidate, mask):
    weights = np.array([0.2126, 0.7152, 0.0722], dtype=np.float64)
    source = (source @ weights) / 255
    candidate = (candidate @ weights) / 255
    h, w = source.shape
    h, w = h // 8 * 8, w // 8 * 8
    def blocks(array):
        return array[:h, :w].reshape(h // 8, 8, w // 8, 8).transpose(0, 2, 1, 3).reshape(-1, 64)
    x, y, m = blocks(source), blocks(candidate), blocks(mask)
    valid = m.mean(axis=1) > 0.9
    x, y = x[valid], y[valid]
    mu_x, mu_y = x.mean(axis=1), y.mean(axis=1)
    var_x, var_y = x.var(axis=1), y.var(axis=1)
    covariance = ((x - mu_x[:, None]) * (y - mu_y[:, None])).mean(axis=1)
    ssim = ((2 * mu_x * mu_y + 0.01**2) * (2 * covariance + 0.03**2)) / ((mu_x**2 + mu_y**2 + 0.01**2) * (var_x + var_y + 0.03**2))
    return float(ssim.mean())


def image(path):
    return np.asarray(Image.open(path).convert('RGBA'))


def composite_rgba(path):
    rgba = Image.open(path).convert('RGBA')
    bg = Image.new('RGBA', rgba.size, (235, 237, 240, 255))
    bg.alpha_composite(rgba)
    return bg.convert('RGB')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('output', type=Path)
    parser.add_argument('--closeups', action='store_true')
    args = parser.parse_args()
    geometry_report = json.loads((args.output / 'metrics.json').read_text(encoding='utf-8'))
    report = {
        'method': 'Raw 8-bit sRGB PNG RGB errors on union of opaque geometry masks. SSIM: luminance, nonoverlapping 8x8 blocks >90% inside overlapping masks, population variance, C1=.01^2 C2=.03^2.',
        'limitations': 'Measures this lighting and these cameras only; visibility, geometry, normals and textures all contribute. Not a universal perceptual fidelity score. Inspect crops alongside metrics.',
        'views': {},
    }
    for name in geometry_report['views']:
        source = image(args.output / f'{name}__source__pbr.png')[:, :, :3].astype(np.float32)
        candidate = image(args.output / f'{name}__candidate__pbr.png')[:, :, :3].astype(np.float32)
        source_mask = image(args.output / f'{name}__source__mask.png')[:, :, 3] > 127
        candidate_mask = image(args.output / f'{name}__candidate__mask.png')[:, :, 3] > 127
        union, overlap = source_mask | candidate_mask, source_mask & candidate_mask
        error = np.abs(source - candidate)
        values = error[union]
        rmse = float(np.sqrt((values ** 2).mean()))
        report['views'][name] = {
            'mean_absolute_srgb_error_0_255': float(values.mean()),
            'rmse_srgb_0_255': rmse,
            'psnr_db': 20 * math.log10(255 / rmse) if rmse > 0 else None,
            'p95_per_pixel_max_channel_error_0_255': float(np.percentile(error.max(axis=2)[union], 95)),
            'fraction_pixels_with_max_channel_error_over_16': float((error.max(axis=2)[union] > 16).mean()),
            'windowed_luminance_ssim_8x8': masked_ssim(source, candidate, overlap),
        }
        heatmap = np.uint8(np.clip(error * 4, 0, 255))
        heatmap[~union] = (235, 237, 240)
        Image.fromarray(heatmap).save(args.output / f'{name}__pbr-absolute-difference-4x.png')
    report['mean_mae_0_255'] = float(np.mean([v['mean_absolute_srgb_error_0_255'] for v in report['views'].values()]))
    report['mean_ssim'] = float(np.mean([v['windowed_luminance_ssim_8x8'] for v in report['views'].values()]))
    (args.output / 'appearance-metrics.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    print(json.dumps(report, indent=2))
    if args.closeups:
        try:
            font = ImageFont.truetype('arial.ttf', 22)
        except OSError:
            font = ImageFont.load_default(size=22)
        for label, (view, rect) in CROPS.items():
            if view not in geometry_report['views']:
                continue
            source = composite_rgba(args.output / f'{view}__source__pbr.png')
            candidate = composite_rgba(args.output / f'{view}__candidate__pbr.png')
            crop = tuple(round(v * (source.width if i % 2 == 0 else source.height)) for i, v in enumerate(rect))
            source, candidate = source.crop(crop), candidate.crop(crop)
            sheet = Image.new('RGB', (source.width * 2, source.height + 50), (235, 237, 240))
            draw = ImageDraw.Draw(sheet)
            draw.text((14, 12), f'SOURCE | {label} | native render pixels', font=font, fill=(25, 28, 33))
            draw.text((source.width + 14, 12), f'CANDIDATE | {label}', font=font, fill=(25, 28, 33))
            sheet.paste(source, (0, 50))
            sheet.paste(candidate, (source.width, 50))
            path = args.output / f'closeup__{label}.jpg'
            sheet.save(path, quality=96)
            print(path)


if __name__ == '__main__':
    main()
