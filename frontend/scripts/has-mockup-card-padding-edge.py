#!/usr/bin/env python3
"""Exit 0 when the image right edge is free of uniform near-white mockup padding; exit 1 otherwise."""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image


def right_edge_has_uniform_card_padding(path: Path, threshold: int) -> bool:
    img = Image.open(path).convert("RGB")
    width, _height = img.size
    column = [img.getpixel((width - 1, y)) for y in range(img.size[1])]
    return all(red >= threshold and green >= threshold and blue >= threshold for red, green, blue in column)


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("Usage: has-mockup-card-padding-edge.py <image.png> <rgb-threshold>")
    path = Path(sys.argv[1])
    threshold = int(sys.argv[2])
    raise SystemExit(1 if right_edge_has_uniform_card_padding(path, threshold) else 0)


if __name__ == "__main__":
    main()
