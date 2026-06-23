#!/usr/bin/env python3
"""Exit 0 when the image center band contains a prominent blue QA emblem."""

from __future__ import annotations

import sys

from PIL import Image


def main() -> None:
    image_path = sys.argv[1]
    image = Image.open(image_path).convert("RGB")
    width, height = image.size
    center_x = width // 2
    center_y = int(height * 0.5)
    left = max(0, center_x - width // 10)
    right = min(width, center_x + width // 10)
    top = max(0, center_y - height // 10)
    bottom = min(height, center_y + height // 10)

    for y in range(top, bottom):
        for x in range(left, right):
            red, green, blue = image.getpixel((x, y))
            if blue > red + 30 and blue > green + 20 and blue > 80:
                raise SystemExit(0)

    raise SystemExit(1)


if __name__ == "__main__":
    main()
