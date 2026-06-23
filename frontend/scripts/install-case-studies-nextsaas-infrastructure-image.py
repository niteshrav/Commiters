#!/usr/bin/env python3
"""Install NextSaas precision infrastructure chip art from the approved features mockup."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "assets" / "case-studies"
SOURCE_CANDIDATES = [
    OUT_DIR / "nextsaas-features-source.png",
    Path(
        "/Users/niteshrav/.cursor/projects/Users-niteshrav-Documents-Projects-Committers/assets/image-500966a6-4729-4802-8100-4f637ccada9b.png",
    ),
]

# White-framed microchip visual from the infrastructure column of the features mockup.
CROP_BOX = (531, 248, 972, 632)
SOURCE_WIDTH = 442
SOURCE_HEIGHT = 384
ONE_X_WIDTH = SOURCE_WIDTH // 2
ONE_X_HEIGHT = SOURCE_HEIGHT // 2


def resolve_source() -> Path:
    for path in SOURCE_CANDIDATES:
        if path.is_file():
            return path
    raise FileNotFoundError("NextSaas features mockup PNG not found")


def save_png(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    rgb = image.convert("RGB")
    rgb.save(path, format="PNG", optimize=True)


def main() -> None:
    source_path = resolve_source()
    cropped = Image.open(source_path).convert("RGBA").crop(CROP_BOX)
    one_x = cropped.resize((ONE_X_WIDTH, ONE_X_HEIGHT), Image.Resampling.LANCZOS)
    two_x = cropped.resize((SOURCE_WIDTH, SOURCE_HEIGHT), Image.Resampling.LANCZOS)

    save_png(one_x, OUT_DIR / "nextsaas-infrastructure.png")
    save_png(two_x, OUT_DIR / "nextsaas-infrastructure@2x.png")
    print(
        f"Wrote NextSaas infrastructure art from {source_path.name} "
        f"({one_x.width}x{one_x.height} 1x, {two_x.width}x{two_x.height} 2x)",
    )


if __name__ == "__main__":
    main()
