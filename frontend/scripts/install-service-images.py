"""
Install service card / hero images from generated art in the Cursor assets folder.

The ChatGPT mock PNG used for cropping has black bands in some card columns, so
cropping alone produces broken thumbnails. After updating art in:

  .cursor/projects/.../assets/{slug}.jpg

run:

  python scripts/install-service-images.py
"""

from pathlib import Path
import shutil

SRC = Path(r"C:\Users\SMILE\.cursor\projects\c-Users-SMILE-Documents-Committers\assets")
DST = Path(__file__).resolve().parent.parent / "public" / "assets" / "services"
NAMES = [
    "website-development",
    "web-applications",
    "mobile-applications",
    "e-commerce-development",
    "ai-integration",
    "automation-tools",
    "mvp-development",
]


def main() -> None:
    DST.mkdir(parents=True, exist_ok=True)
    for name in NAMES:
        src = SRC / f"{name}.jpg"
        if not src.is_file():
            raise SystemExit(f"Missing source image: {src}")
        dest = DST / f"{name}.jpg"
        tmp = DST / f"{name}.new.jpg"
        shutil.copy2(src, tmp)
        tmp.replace(dest)
        print(f"wrote {dest.name} ({dest.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
