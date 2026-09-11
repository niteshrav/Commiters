#!/usr/bin/env python3
"""Redraw in-image product wordmarks as trustTap (navy + azure)."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "assets"
NAVY = (11, 27, 51, 255)
AZURE = (0, 102, 255, 255)
WHITE = (255, 255, 255, 255)

# Pixel boxes on the 1024×682 marketing layout: (left, top, right, bottom, font_px)
MARKETING_BASE = (1024, 682)
MARKETING_MARKS = [
    (175, 52, 408, 118, 36),   # left hero wordmark
    (480, 270, 590, 306, 16),  # QR stand (keep TT icon)
    (640, 370, 722, 398, 11),  # phone (keep TT icon)
    (705, 158, 798, 188, 11),  # laptop chrome
]


def load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    size = max(8, int(size))
    for candidate in (
        "C:/Windows/Fonts/segoeuib.ttf",
        "C:/Windows/Fonts/arialbd.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ):
        path = Path(candidate)
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


def draw_wordmark(draw: ImageDraw.ImageDraw, origin: tuple[int, int], font: ImageFont.ImageFont) -> None:
    x, y = origin
    draw.text((x, y), "trust", fill=NAVY, font=font)
    trust_w = draw.textlength("trust", font=font)
    draw.text((x + trust_w, y), "Tap", fill=AZURE, font=font)


def patch_marketing(path: Path) -> None:
    image = Image.open(path).convert("RGBA")
    w, h = image.size
    sx = w / MARKETING_BASE[0]
    sy = h / MARKETING_BASE[1]
    draw = ImageDraw.Draw(image)

    for left, top, right, bottom, font_px in MARKETING_MARKS:
        box = (
            round(left * sx),
            round(top * sy),
            round(right * sx),
            round(bottom * sy),
        )
        draw.rectangle(box, fill=WHITE)
        font = load_font(round(font_px * sx))
        bbox = font.getbbox("trustTap")
        text_h = bbox[3] - bbox[1]
        text_x = box[0] + max(1, round(2 * sx))
        text_y = box[1] + max(0, (box[3] - box[1] - text_h) // 2 - bbox[1])
        draw_wordmark(draw, (text_x, text_y), font)

    image.convert("RGB").save(path, optimize=True)
    print("patched", path.name, image.size)


def main() -> None:
    for name in ("trusttap-hero-marketing.png", "trusttap-hero-marketing@2x.png"):
        target = ASSETS / "trusttap" / name
        if target.exists():
            patch_marketing(target)


if __name__ == "__main__":
    main()
