#!/usr/bin/env python3
"""Build TrustTap marketing images from live-site screenshots."""
from __future__ import annotations

import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "assets"
CASE = ASSETS / "case-studies"
TRUST = ASSETS / "trusttap"
SCREENSHOT_DIRS = [
    Path(tempfile.gettempdir()) / "cursor" / "screenshots",
    Path.home() / ".cursor" / "screenshots",
]

# Live preview card bounds at ~1905px viewport width on trusttap.commiters.com
SHOWCASE_BOX = (970, 168, 1518, 562)


def latest_screenshot() -> Path:
    matches: list[Path] = []
    for directory in SCREENSHOT_DIRS:
        if directory.exists():
            matches.extend(directory.glob("page-*.png"))
    matches.sort(key=lambda path: path.stat().st_mtime, reverse=True)
    if not matches:
        raise FileNotFoundError("No TrustTap browser screenshot found")
    return matches[0]


def scale_box(box: tuple[int, int, int, int], source: Image.Image) -> tuple[int, int, int, int]:
    ref_width = 1905
    scale = source.width / ref_width
    left, top, right, bottom = box
    return (
        max(0, round(left * scale)),
        max(0, round(top * scale)),
        min(source.width, round(right * scale)),
        min(source.height, round(bottom * scale)),
    )


def crop_center(img: Image.Image, target_w: int, target_h: int) -> Image.Image:
    scale = max(target_w / img.width, target_h / img.height)
    resized = img.resize(
        (max(1, round(img.width * scale)), max(1, round(img.height * scale))),
        Image.Resampling.LANCZOS,
    )
    left = (resized.width - target_w) // 2
    top = max(0, (resized.height - target_h) // 3)
    return resized.crop((left, top, left + target_w, top + target_h))


def save_pair(img: Image.Image, one_x: Path, two_x: Path, width: int) -> None:
    ratio = width / img.width
    one = img.resize((width, max(1, round(img.height * ratio))), Image.Resampling.LANCZOS)
    two = img.resize((width * 2, max(1, round(img.height * ratio * 2))), Image.Resampling.LANCZOS)
    one.save(one_x, optimize=True)
    two.save(two_x, optimize=True)


def main() -> None:
    CASE.mkdir(parents=True, exist_ok=True)
    TRUST.mkdir(parents=True, exist_ok=True)
    source = latest_screenshot()
    print("source", source)
    img = Image.open(source).convert("RGB")

    showcase_box = scale_box(SHOWCASE_BOX, img)
    showcase = img.crop(showcase_box)
    save_pair(
        showcase,
        TRUST / "trusttap-hero-showcase.png",
        TRUST / "trusttap-hero-showcase@2x.png",
        512,
    )
    print("showcase", showcase.size, showcase_box)

    hero_crop = crop_center(img, 1920, 1080)
    save_pair(hero_crop, TRUST / "trusttap-hero.png", CASE / "trusttap@2x.png", 1024)
    grid = crop_center(img, 928, 648)
    save_pair(grid, CASE / "trusttap.png", CASE / "trusttap@2x.png", 464)
    print("done")


if __name__ == "__main__":
    main()
