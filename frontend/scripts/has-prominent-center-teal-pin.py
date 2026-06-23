#!/usr/bin/env python3
"""Exit 0 when the image center region contains a prominent teal map pin."""

from __future__ import annotations

import sys

from PIL import Image


def is_teal_pin_pixel(red: int, green: int, blue: int) -> bool:
    return green > red + 20 and blue > red + 20 and green > 60 and blue > 60


def main() -> None:
    image_path = sys.argv[1]
    image = Image.open(image_path).convert("RGB")
    width, height = image.size
    center_x = width // 2
    center_y = height // 2
    radius = max(12, min(width, height) // 8)

    for offset_y in range(-radius, radius + 1):
        for offset_x in range(-radius, radius + 1):
            red, green, blue = image.getpixel((center_x + offset_x, center_y + offset_y))
            if is_teal_pin_pixel(red, green, blue):
                raise SystemExit(0)

    raise SystemExit(1)


if __name__ == "__main__":
    main()
