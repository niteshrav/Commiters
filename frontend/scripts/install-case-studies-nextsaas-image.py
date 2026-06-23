#!/usr/bin/env python3
"""Install full-frame NextSaas automated pipelines hero art from the approved source PNG."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageEnhance

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "assets" / "case-studies"
SOURCE_CANDIDATES = [
    OUT_DIR / "nextsaas-source.png",
    Path(
        "/Users/niteshrav/.cursor/projects/Users-niteshrav-Documents-Projects-Committers/assets/image-0f1328ce-5a30-4498-80d3-8f9f6c33e3c7.png",
    ),
    Path(
        "/Users/niteshrav/.cursor/projects/Users-niteshrav-Documents-Projects-Committers/assets/image-2354f5b7-9d78-49d6-9a53-a705d13c2c82.png",
    ),
]

COLOR_BOOST = 1.22
SOURCE_WIDTH = 1024
SOURCE_HEIGHT = 1018
ONE_X_WIDTH = SOURCE_WIDTH // 2
ONE_X_HEIGHT = SOURCE_HEIGHT // 2


def resolve_source() -> Path:
    for path in SOURCE_CANDIDATES:
        if path.is_file():
            return path
    raise FileNotFoundError("NextSaas source PNG not found")


def save_png(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    rgb = image.convert("RGB")
    rgb.save(path, format="PNG", optimize=True)


def enhance_color(image: Image.Image) -> Image.Image:
    return ImageEnhance.Color(image).enhance(COLOR_BOOST)


def main() -> None:
    source_path = resolve_source()
    prepared = enhance_color(Image.open(source_path).convert("RGBA"))
    one_x = prepared.resize((ONE_X_WIDTH, ONE_X_HEIGHT), Image.Resampling.LANCZOS)
    two_x = prepared.resize((SOURCE_WIDTH, SOURCE_HEIGHT), Image.Resampling.LANCZOS)

    save_png(one_x, OUT_DIR / "nextsaas.png")
    save_png(two_x, OUT_DIR / "nextsaas@2x.png")
    print(
        f"Wrote NextSaas pipelines hero art from {source_path.name} "
        f"({one_x.width}x{one_x.height} 1x, {two_x.width}x{two_x.height} 2x)",
    )


if __name__ == "__main__":
    main()
