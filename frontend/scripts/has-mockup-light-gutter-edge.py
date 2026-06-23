#!/usr/bin/env python3
"""Exit 0 when the image left edge is free of a uniform light mockup gutter seam; exit 1 otherwise."""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image


def left_edge_has_uniform_light_gutter(path: Path, gutter_min: int, gutter_max: int) -> bool:
    img = Image.open(path).convert("RGB")
    _width, _height = img.size
    column = [img.getpixel((0, y)) for y in range(img.size[1])]
    unique = set(column)
    if len(unique) > 3:
        return False
    return all(
        gutter_min <= red <= gutter_max
        and gutter_min <= green <= gutter_max
        and gutter_min <= blue <= gutter_max
        and abs(red - green) <= 5
        and abs(green - blue) <= 5
        for red, green, blue in column
    )


def main() -> None:
    if len(sys.argv) != 4:
        raise SystemExit("Usage: has-mockup-light-gutter-edge.py <image.png> <gutter-min> <gutter-max>")
    path = Path(sys.argv[1])
    gutter_min = int(sys.argv[2])
    gutter_max = int(sys.argv[3])
    raise SystemExit(1 if left_edge_has_uniform_light_gutter(path, gutter_min, gutter_max) else 0)


if __name__ == "__main__":
    main()
