#!/usr/bin/env python3
"""Exit 0 when the shipped pipelines hero art has no baked caption copy in the lower-left."""

from __future__ import annotations

import sys

from PIL import Image


def luminance(red: int, green: int, blue: int) -> float:
    return 0.299 * red + 0.587 * green + 0.114 * blue


def main() -> None:
    image_path = sys.argv[1]
    image = Image.open(image_path).convert("RGB")
    width, height = image.size

    band_top = int(height * 0.9)
    band_left = 0
    band_right = int(width * 0.5)

    for y in range(band_top, height):
        dark_pixels = 0
        for x in range(band_left, band_right):
            red, green, blue = image.getpixel((x, y))[:3]
            if luminance(red, green, blue) < 55:
                dark_pixels += 1
        if dark_pixels > 25:
            raise SystemExit(1)

    raise SystemExit(0)


if __name__ == "__main__":
    main()
