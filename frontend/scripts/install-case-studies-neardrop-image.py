#!/usr/bin/env python3
"""Install standalone NearDrop grid card art from the approved source PNG."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "assets" / "case-studies"
SOURCE_CANDIDATES = [
    OUT_DIR / "neardrop-mvp-source.png",
    Path(
        "/Users/niteshrav/.cursor/projects/Users-niteshrav-Documents-Projects-Committers/assets/image-0528cfea-17e0-4571-b71f-9066b68adc64.png",
    ),
]


def resolve_source() -> Path:
    for path in SOURCE_CANDIDATES:
        if path.is_file():
            return path
    raise FileNotFoundError("NearDrop source PNG not found")


def save_png(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    rgb = image.convert("RGB")
    rgb.save(path, format="PNG", optimize=True)


def _is_mosaic_padding_pixel(red: int, green: int, blue: int, alpha: int = 255) -> bool:
    if alpha < 250:
        return True
    if red >= 245 and green >= 245 and blue >= 245:
        return True
    if red >= 244 and green >= 244 and blue >= 244:
        return True
    if 240 <= red <= 246 and 240 <= green <= 246 and 240 <= blue <= 246:
        return True
    if (
        220 <= red <= 245
        and 220 <= green <= 245
        and 220 <= blue <= 245
        and abs(red - green) <= 5
        and abs(green - blue) <= 5
    ):
        return True
    return False


def trim_mosaic_padding(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    width, height = rgba.size

    left = 0
    for x in range(width):
        column = [rgba.getpixel((x, y)) for y in range(height)]
        if all(_is_mosaic_padding_pixel(*pixel) for pixel in column):
            left = x + 1
        else:
            break

    right = width
    for x in range(width - 1, -1, -1):
        column = [rgba.getpixel((x, y)) for y in range(height)]
        if all(_is_mosaic_padding_pixel(*pixel) for pixel in column):
            right = x
        else:
            break

    top = 0
    for y in range(height):
        row = [rgba.getpixel((x, y)) for x in range(width)]
        if all(_is_mosaic_padding_pixel(*pixel) for pixel in row):
            top = y + 1
        else:
            break

    bottom = height
    for y in range(height - 1, -1, -1):
        row = [rgba.getpixel((x, y)) for x in range(width)]
        if all(_is_mosaic_padding_pixel(*pixel) for pixel in row):
            bottom = y
        else:
            break

    return rgba.crop((left, top, right, bottom))


def main() -> None:
    source_path = resolve_source()
    trimmed = trim_mosaic_padding(Image.open(source_path))
    one_x = trimmed.resize(
        (trimmed.width // 2, trimmed.height // 2),
        Image.Resampling.LANCZOS,
    )
    two_x = one_x.resize((one_x.width * 2, one_x.height * 2), Image.Resampling.LANCZOS)

    save_png(one_x, OUT_DIR / "neardrop-mvp.png")
    save_png(two_x, OUT_DIR / "neardrop-mvp@2x.png")
    print(
        f"Wrote NearDrop grid art from {source_path.name} "
        f"({one_x.width}x{one_x.height} 1x, {two_x.width}x{two_x.height} 2x)",
    )


if __name__ == "__main__":
    main()
