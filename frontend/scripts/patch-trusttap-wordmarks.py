#!/usr/bin/env python3
"""Redraw in-image product wordmarks as Prooflyn (navy + azure)."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "assets"
NAVY = (11, 27, 51, 255)
AZURE = (0, 102, 255, 255)
GREEN = (15, 118, 110, 255)
WHITE = (255, 255, 255, 255)
WORD = "Prooflyn"
WORD_LEFT = "Proof"
WORD_RIGHT = "lyn"

# Pixel boxes on the 1024×682 marketing layout: (left, top, right, bottom, font_px)
MARKETING_BASE = (1024, 682)
MARKETING_MARKS = [
    (168, 48, 430, 102, 34),  # left hero wordmark
    (470, 262, 612, 310, 15),  # QR stand
    (628, 362, 742, 404, 12),  # phone
    (688, 148, 830, 192, 12),  # laptop chrome
]

# Pixel boxes on the 560×373 showcase / hero / case-study layout
SHOWCASE_BASE = (560, 373)
SHOWCASE_MARKS = [
    (68, 16, 248, 54, 22),  # top-left wordmark
    (348, 74, 452, 100, 9),  # laptop chrome
    (286, 146, 362, 172, 8),  # phone header
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


def fit_font(draw: ImageDraw.ImageDraw, max_width: int, start_size: int) -> ImageFont.ImageFont:
    size = max(8, int(start_size))
    while size >= 8:
        font = load_font(size)
        width = draw.textlength(WORD, font=font)
        if width <= max_width:
            return font
        size -= 1
    return load_font(8)


def draw_wordmark(
    draw: ImageDraw.ImageDraw,
    origin: tuple[int, int],
    font: ImageFont.ImageFont,
    left_fill: tuple[int, int, int, int],
    right_fill: tuple[int, int, int, int],
) -> None:
    x, y = origin
    draw.text((x, y), WORD_LEFT, fill=left_fill, font=font)
    left_w = draw.textlength(WORD_LEFT, font=font)
    draw.text((x + left_w, y), WORD_RIGHT, fill=right_fill, font=font)


def patch_scaled(
    path: Path,
    base: tuple[int, int],
    marks: list[tuple[int, int, int, int, int]],
    left_fill: tuple[int, int, int, int],
    right_fill: tuple[int, int, int, int],
    fill: tuple[int, int, int, int] = WHITE,
) -> None:
    image = Image.open(path).convert("RGBA")
    w, h = image.size
    sx = w / base[0]
    sy = h / base[1]
    draw = ImageDraw.Draw(image)

    for left, top, right, bottom, font_px in marks:
        box = (
            round(left * sx),
            round(top * sy),
            round(right * sx),
            round(bottom * sy),
        )
        draw.rectangle(box, fill=fill)
        max_width = max(8, box[2] - box[0] - max(2, round(4 * sx)))
        font = fit_font(draw, max_width, round(font_px * sx))
        bbox = font.getbbox(WORD)
        text_h = bbox[3] - bbox[1]
        text_x = box[0] + max(1, round(2 * sx))
        text_y = box[1] + max(0, (box[3] - box[1] - text_h) // 2 - bbox[1])
        draw_wordmark(draw, (text_x, text_y), font, left_fill, right_fill)

    image.convert("RGB").save(path, optimize=True)
    print("patched", path.relative_to(ASSETS), image.size)


def main() -> None:
    marketing = ASSETS / "trusttap"
    for name in ("trusttap-hero-marketing.png", "trusttap-hero-marketing@2x.png"):
        target = marketing / name
        if target.exists():
            patch_scaled(target, MARKETING_BASE, MARKETING_MARKS, NAVY, AZURE)

    showcase_files = [
        marketing / "trusttap-hero-showcase.png",
        marketing / "trusttap-hero-showcase@2x.png",
        marketing / "trusttap-hero.png",
        ASSETS / "case-studies" / "trusttap.png",
        ASSETS / "case-studies" / "trusttap@2x.png",
    ]
    for target in showcase_files:
        if target.exists():
            patch_scaled(target, SHOWCASE_BASE, SHOWCASE_MARKS, GREEN, GREEN)


if __name__ == "__main__":
    main()
