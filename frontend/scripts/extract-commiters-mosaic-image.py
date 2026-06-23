#!/usr/bin/env python3
"""Crop the Commiters mosaic card image from the Stitch case studies mockup."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MOCKUP = Path(
    "/Users/niteshrav/.cursor/projects/Users-niteshrav-Documents-Projects-Committers/assets/image-20fe4f4c-7d3d-4d73-9b1b-e8cf0ad99be2.png",
)
OUT_DIR = ROOT / "public" / "assets" / "case-studies"
# Right-hand media on the wide Commiters card (627×1024 mockup).
MOSAIC_CROP_BOX = (312, 188, 604, 412)
# Hero band on the technical case study mockup (572×1024).
HERO_CROP_BOX = (0, 418, 572, 598)


def save_png(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, format="PNG", optimize=True)


def main() -> None:
    mockup = Image.open(MOCKUP)
    mosaic = mockup.crop(MOSAIC_CROP_BOX)
    save_png(mosaic, OUT_DIR / "commiters.png")
    save_png(mosaic.resize((mosaic.width * 2, mosaic.height * 2), Image.Resampling.LANCZOS), OUT_DIR / "commiters@2x.png")

    detail = Image.open(
        "/Users/niteshrav/.cursor/projects/Users-niteshrav-Documents-Projects-Committers/assets/image-703eaafb-c7ad-43b3-b503-db0cbc0e417b.png",
    )
    hero = detail.crop(HERO_CROP_BOX)
    save_png(hero, OUT_DIR / "commiters-architecture-hero.png")

    print("Wrote commiters mosaic and architecture hero PNGs from Stitch mockups.")


if __name__ == "__main__":
    main()
