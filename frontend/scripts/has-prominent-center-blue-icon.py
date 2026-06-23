#!/usr/bin/env python3
"""Exit 0 when the image center pixel reads as a prominent blue icon."""

from __future__ import annotations

import sys

from PIL import Image


def main() -> None:
    image_path = sys.argv[1]
    image = Image.open(image_path).convert("RGB")
    width, height = image.size
    red, green, blue = image.getpixel((width // 2, height // 2))
    if blue > red + 30 and blue > green + 20 and blue > 80:
        raise SystemExit(0)
    raise SystemExit(1)


if __name__ == "__main__":
    main()
