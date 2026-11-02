"""Create readable PBR and geometry QA sheets from render_compare.py outputs."""
import argparse
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('output', type=Path)
    parser.add_argument('--cell-width', type=int, default=600)
    args = parser.parse_args()
    report = json.loads((args.output / 'metrics.json').read_text(encoding='utf-8'))
    cell_w = args.cell_width
    cell_h = round(cell_w * report['render']['height'] / report['render']['width'])
    header = 52
    row_h = cell_h + header
    try:
        font = ImageFont.truetype('arial.ttf', 19)
        small = ImageFont.truetype('arial.ttf', 16)
    except OSError:
        font = ImageFont.load_default(size=19)
        small = ImageFont.load_default(size=16)
    for sheet_name, columns in [
        ('pbr-contact-sheet.jpg', [('source', 'pbr'), ('candidate', 'pbr'), ('difference', None)]),
        ('silhouette-contact-sheet.jpg', [('source', 'mask'), ('candidate', 'mask'), ('difference', None)]),
    ]:
        sheet = Image.new('RGB', (cell_w * len(columns), row_h * len(report['views']) + 64), (235, 237, 240))
        draw = ImageDraw.Draw(sheet)
        draw.text((15, 8), 'Identical source-anchored cameras | unchanged GLB PBR materials | red = missing; blue = extra', font=font, fill=(25, 28, 33))
        draw.text((15, 35), 'Silhouette IoU measures shape only; materials, facade details and vegetation need visual review.', font=small, fill=(40, 45, 50))
        for row, (name, metrics) in enumerate(report['views'].items()):
            for col, (label, kind) in enumerate(columns):
                filename = f'{name}__difference.png' if kind is None else f'{name}__{label}__{kind}.png'
                image_path = args.output / filename
                if not image_path.exists():
                    continue
                original = Image.open(image_path).convert('RGBA')
                background = Image.new('RGBA', original.size, (235, 237, 240, 255))
                background.alpha_composite(original)
                image = background.convert('RGB').resize((cell_w, cell_h), Image.Resampling.LANCZOS)
                x, y = col * cell_w, 64 + row * row_h
                title = f'{name} | {label.upper()}'
                if kind is None:
                    title += f" | IoU {metrics['silhouette_iou']:.4f}"
                draw.text((x + 12, y + 13), title, font=font, fill=(25, 28, 33))
                sheet.paste(image, (x, y + header))
        sheet.save(args.output / sheet_name, quality=94)
        print(args.output / sheet_name)


if __name__ == '__main__':
    main()
