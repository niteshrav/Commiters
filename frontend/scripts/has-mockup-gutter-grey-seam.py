#!/usr/bin/env python3
"""Exit 0 when the image right edge is free of the #f2f2f2 mockup gutter seam; exit 1 otherwise."""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image


def right_edge_has_gutter_grey_seam(path: Path, grey_min: int, grey_max: int) -> bool:
    img = Image.open(path).convert("RGB")
    width, height = img.size
    column = [img.getpixel((width - 1, y)) for y in range(height)]
    return all(
        grey_min <= red <= grey_max and grey_min <= green <= grey_max and grey_min <= blue <= grey_max
        for red, green, blue in column
    )


def main() -> None:
    if len(sys.argv) != 4:
        raise SystemExit("Usage: has-mockup-gutter-grey-seam.py <image.png> <grey-min> <grey-max>")
    path = Path(sys.argv[1])
    grey_min = int(sys.argv[2])
    grey_max = int(sys.argv[3])
    raise SystemExit(1 if right_edge_has_gutter_grey_seam(path, grey_min, grey_max) else 0)


if __name__ == "__main__":
    main()
