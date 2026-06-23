#!/usr/bin/env python3
"""Install standalone Multi-Role CRM grid card art from the approved source PNG."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "assets" / "case-studies"
SOURCE_CANDIDATES = [
    OUT_DIR / "multi-role-crm-source.png",
    Path(
        "/Users/niteshrav/.cursor/projects/Users-niteshrav-Documents-Projects-Committers/assets/image-d482d087-5769-4086-a108-e586e5499ee5.png",
    ),
]

ONE_X_WIDTH = 345
ONE_X_HEIGHT = 205


def resolve_source() -> Path:
    for path in SOURCE_CANDIDATES:
        if path.is_file():
            return path
    raise FileNotFoundError("Multi-Role CRM source PNG not found")


def save_png(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    rgb = image.convert("RGB")
    rgb.save(path, format="PNG", optimize=True)


def main() -> None:
    source_path = resolve_source()
    source = Image.open(source_path).convert("RGBA")
    one_x = source.resize((ONE_X_WIDTH, ONE_X_HEIGHT), Image.Resampling.LANCZOS)
    two_x = source.resize((ONE_X_WIDTH * 2, ONE_X_HEIGHT * 2), Image.Resampling.LANCZOS)

    save_png(one_x, OUT_DIR / "multi-role-crm.png")
    save_png(two_x, OUT_DIR / "multi-role-crm@2x.png")
    print(f"Wrote Multi-Role CRM grid art from {source_path.name}")


if __name__ == "__main__":
    main()
