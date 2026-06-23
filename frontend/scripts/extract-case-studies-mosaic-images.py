#!/usr/bin/env python3
"""Crop all case study card images from the Stitch Proven Precision mockup."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MOCKUP_CANDIDATES = [
    ROOT / "public" / "assets" / "case-studies" / "case-studies-mosaic-mockup.png",
    Path(
        "/Users/niteshrav/.cursor/projects/Users-niteshrav-Documents-Projects-Committers/assets/image-72c13228-809e-4827-85d9-4fe4aa75da03.png",
    ),
]
OUT_DIR = ROOT / "public" / "assets" / "case-studies"

CROPS: dict[str, tuple[int, int, int, int]] = {}


def resolve_mockup() -> Path:
    for path in MOCKUP_CANDIDATES:
        if path.is_file():
            return path
    raise FileNotFoundError("Case studies mosaic mockup PNG not found")


def save_png(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, format="PNG", optimize=True)


def main() -> None:
    mockup_path = resolve_mockup()
    mockup = Image.open(mockup_path)
    for project_id, box in CROPS.items():
        crop = mockup.crop(box)
        base = OUT_DIR / project_id
        save_png(crop, base.with_suffix(".png"))
        save_png(
            crop.resize((crop.width * 2, crop.height * 2), Image.Resampling.LANCZOS),
            Path(f"{base}@2x.png"),
        )
    print(f"Wrote {len(CROPS)} case study mosaic images from {mockup_path.name}")


if __name__ == "__main__":
    main()
