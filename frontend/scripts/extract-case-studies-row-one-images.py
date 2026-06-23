#!/usr/bin/env python3
"""Crop Commiters and AI Summarizer card images from the row-one Stitch mockup."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "assets" / "case-studies"
MOCKUP_CANDIDATES = [
    OUT_DIR / "case-studies-row-one-mockup.png",
    Path(
        "/Users/niteshrav/.cursor/projects/Users-niteshrav-Documents-Projects-Committers/assets/image-05b2ab2b-605a-4ba8-be23-23b1fca2b747.png",
    ),
]

CROPS: dict[str, tuple[int, int, int, int]] = {
    "commiters": (368, 28, 648, 338),
    "ai-summarizer": (688, 26, 998, 188),
}


def resolve_mockup() -> Path:
    for path in MOCKUP_CANDIDATES:
        if path.is_file():
            return path
    raise FileNotFoundError("Case studies row-one mockup PNG not found")


def save_png(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, format="PNG", optimize=True)


def _trim_trailing_columns(img: Image.Image, predicate) -> Image.Image:
    rgb = img.convert("RGB")
    width, height = rgb.size
    right = width
    for x in range(width - 1, -1, -1):
        column = [rgb.getpixel((x, y)) for y in range(height)]
        if predicate(column):
            right = x
        else:
            break
    if right == 0:
        return rgb
    return rgb.crop((0, 0, right, height))


def trim_trailing_gutter_columns(img: Image.Image) -> Image.Image:
    """Remove Stitch mockup margin (#f9f9f9) then the #f2f2f2 gutter seam on the right edge."""
    trimmed = _trim_trailing_columns(
        img,
        lambda column: all(r >= 245 and g >= 245 and b >= 245 for r, g, b in column),
    )
    return _trim_trailing_columns(
        trimmed,
        lambda column: all(
            240 <= r <= 246 and 240 <= g <= 246 and 240 <= b <= 246 for r, g, b in column
        ),
    )


def trim_trailing_ai_summarizer_columns(img: Image.Image) -> Image.Image:
    """Remove darker #ebebeb gutter and uniform near-white padding from the AI Summarizer crop."""
    trimmed = _trim_trailing_columns(
        img,
        lambda column: all(
            230 <= r <= 239 and 230 <= g <= 239 and 230 <= b <= 239 for r, g, b in column
        ),
    )
    return _trim_trailing_columns(
        trimmed,
        lambda column: all(r >= 244 and g >= 244 and b >= 244 for r, g, b in column),
    )


def main() -> None:
    mockup_path = resolve_mockup()
    mockup = Image.open(mockup_path)
    for project_id, box in CROPS.items():
        crop = mockup.crop(box)
        crop = trim_trailing_gutter_columns(crop)
        if project_id == "ai-summarizer":
            crop = trim_trailing_ai_summarizer_columns(crop)
        base = OUT_DIR / project_id
        save_png(crop, base.with_suffix(".png"))
        save_png(
            crop.resize((crop.width * 2, crop.height * 2), Image.Resampling.LANCZOS),
            Path(f"{base}@2x.png"),
        )
    print(f"Wrote {len(CROPS)} row-one case study images from {mockup_path.name}")


if __name__ == "__main__":
    main()
