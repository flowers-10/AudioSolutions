"""Produce a compact source / previous model / current candidate comparison."""
import argparse
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--baseline', required=True, type=Path)
    parser.add_argument('--candidate', required=True, type=Path)
    parser.add_argument('--output', required=True, type=Path)
    args = parser.parse_args()
    w, h, header = 600, 500, 50
    sheet = Image.new('RGB', (w * 3, (h + header) * 3 + 48), (235, 237, 240))
    draw = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.truetype('arial.ttf', 21)
    except OSError:
        font = ImageFont.load_default(size=21)
    draw.text((12, 12), 'Same camera and lighting | original PBR materials | source / previous / source-derived candidate', font=font, fill=(25, 28, 33))
    for row, view in enumerate(['front-oblique', 'back-oblique', 'top']):
        for col, (directory, label, title) in enumerate([
            (args.candidate, 'source', 'SOURCE'),
            (args.baseline, 'candidate', 'PREVIOUS MODEL'),
            (args.candidate, 'candidate', 'CURRENT CANDIDATE'),
        ]):
            rgba = Image.open(directory / f'{view}__{label}__pbr.png').convert('RGBA')
            bg = Image.new('RGBA', rgba.size, (235, 237, 240, 255))
            bg.alpha_composite(rgba)
            x, y = col * w, 48 + row * (h + header)
            draw.text((x + 12, y + 12), f'{view} | {title}', font=font, fill=(25, 28, 33))
            sheet.paste(bg.convert('RGB').resize((w, h), Image.Resampling.LANCZOS), (x, y + header))
    sheet.save(args.output, quality=95)
    print(args.output)


if __name__ == '__main__':
    main()
