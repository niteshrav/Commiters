#!/usr/bin/env python3
"""Replace the legacy green-shield TrustTap mark on hero showcase PNGs."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "assets" / "trusttap"

NAVY = (10, 46, 80)
AZURE = (30, 136, 229)
GOLD = (212, 175, 55)
CHALK = (245, 247, 249, 255)


def load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for candidate in (
        "C:/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/segoeuib.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ):
        path = Path(candidate)
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


def draw_monogram(draw: ImageDraw.ImageDraw, origin: tuple[int, int], scale: float) -> None:
    x, y = origin
    s = scale
    # Left T (Prussian blue)
    draw.rectangle((x + 8 * s, y + 8 * s, x + 22 * s, y + 42 * s), fill=NAVY)
    draw.rectangle((x + 4 * s, y + 8 * s, x + 26 * s, y + 14 * s), fill=NAVY)
    # Right T (Azure)
    draw.rectangle((x + 28 * s, y + 8 * s, x + 42 * s, y + 42 * s), fill=AZURE)
    draw.rectangle((x + 24 * s, y + 8 * s, x + 46 * s, y + 14 * s), fill=AZURE)
    draw.rectangle((x + 4 * s, y + 8 * s, x + 46 * s, y + 10 * s), fill=GOLD)


def patch_image(path: Path) -> None:
    image = Image.open(path).convert("RGBA")
    scale = max(1, round(image.width / 560))
    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    patch_w = round(198 * scale)
    patch_h = round(58 * scale)
    draw.rectangle((0, 0, patch_w, patch_h), fill=CHALK)

    draw_monogram(draw, (round(10 * scale), round(8 * scale)), scale)

    font_size = max(14, round(20 * scale))
    font = load_font(font_size)
    text_x = round(58 * scale)
    text_y = round(16 * scale)
    draw.text((text_x, text_y), "Trust", fill=NAVY, font=font)

    trust_w = draw.textlength("Trust", font=font) if hasattr(draw, "textlength") else font_size * 2.4
    draw.text((text_x + int(trust_w), text_y), "Tap", fill=AZURE, font=font)

    merged = Image.alpha_composite(image, overlay).convert("RGB")
    merged.save(path, optimize=True)
    print("patched", path, image.size)


def main() -> None:
    for name in ("trusttap-hero-showcase.png", "trusttap-hero-showcase@2x.png"):
        target = ASSETS / name
        if target.exists():
            patch_image(target)


if __name__ == "__main__":
    main()
