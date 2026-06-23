#!/usr/bin/env python3
"""Exit 0 when the image right edge is free of a uniform #ebebeb mockup gutter seam; exit 1 otherwise."""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image


def right_edge_has_uniform_dark_gutter(path: Path, dark_min: int, dark_max: int) -> bool:
    img = Image.open(path).convert("RGB")
    width, _height = img.size
    column = [img.getpixel((width - 1, y)) for y in range(img.size[1])]
    unique = set(column)
    if len(unique) > 3:
        return False
    return all(
        dark_min <= red <= dark_max and dark_min <= green <= dark_max and dark_min <= blue <= dark_max
        for red, green, blue in column
    )


def main() -> None:
    if len(sys.argv) != 4:
        raise SystemExit("Usage: has-mockup-dark-gutter-edge.py <image.png> <dark-min> <dark-max>")
    path = Path(sys.argv[1])
    dark_min = int(sys.argv[2])
    dark_max = int(sys.argv[3])
    raise SystemExit(1 if right_edge_has_uniform_dark_gutter(path, dark_min, dark_max) else 0)


if __name__ == "__main__":
    main()
