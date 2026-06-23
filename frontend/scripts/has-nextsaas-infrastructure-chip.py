#!/usr/bin/env python3
"""Exit 0 when the image shows a high-contrast microchip macro in the framed visual."""

from __future__ import annotations

import sys

from PIL import Image


def luminance(red: int, green: int, blue: int) -> float:
    return 0.299 * red + 0.587 * green + 0.114 * blue


def main() -> None:
    image_path = sys.argv[1]
    image = Image.open(image_path).convert("RGB")
    width, height = image.size

    center_left = int(width * 0.2)
    center_right = int(width * 0.8)
    center_top = int(height * 0.2)
    center_bottom = int(height * 0.8)

    dark_pixels = 0
    bright_pixels = 0
    for y in range(center_top, center_bottom):
        for x in range(center_left, center_right):
            red, green, blue = image.getpixel((x, y))[:3]
            luma = luminance(red, green, blue)
            if luma < 55:
                dark_pixels += 1
            if luma > 210:
                bright_pixels += 1

    if dark_pixels < 500:
        raise SystemExit(1)
    if bright_pixels < 100:
        raise SystemExit(1)

    raise SystemExit(0)


if __name__ == "__main__":
    main()
