#!/usr/bin/env python3
"""Capture BrowseMyVacations homepage screenshots for case study assets."""
from __future__ import annotations

import ssl
import urllib.request
from io import BytesIO
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "case-studies"
CACHE = ROOT / "scripts" / "_bmv-cache"
URL = "https://browsemyvacations.com/"
VIEWPORT = {"width": 1440, "height": 900}


def download_hero_jpg() -> None:
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    hero_url = "https://browsemyvacations.com/hero/udaipur-lake-palace.jpg"
    data = urllib.request.urlopen(
        urllib.request.Request(hero_url, headers={"User-Agent": "Mozilla/5.0"}),
        context=ctx,
        timeout=60,
    ).read()
    (CACHE / "udaipur-lake-palace.jpg").write_bytes(data)
    print("downloaded hero jpg", len(data))


def capture_screenshots() -> None:
    from playwright.sync_api import sync_playwright

    OUT.mkdir(parents=True, exist_ok=True)
    CACHE.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport=VIEWPORT, device_scale_factor=2)
        page.goto(URL, wait_until="networkidle", timeout=120_000)
        page.wait_for_timeout(1500)
        intro_path = OUT / "browse-my-vacation-intro-hero.png"
        page.screenshot(path=str(intro_path), full_page=False)
        print("saved intro", intro_path)
        # Full page for visual break / work grid
        visual_path = OUT / "browse-my-vacation-visual-capture.png"
        page.screenshot(path=str(visual_path), full_page=True)
        print("saved full", visual_path)
        browser.close()

    from PIL import Image

    intro = Image.open(OUT / "browse-my-vacation-intro-hero.png")
    intro.save(OUT / "browse-my-vacation-intro-hero@2x.png")
    intro.resize((intro.width // 2, intro.height // 2), Image.Resampling.LANCZOS).save(
        OUT / "browse-my-vacation-intro-hero-1x.png"
    )
    # Keep canonical 1x at half of 2x capture
    intro.resize((intro.width // 2, intro.height // 2), Image.Resampling.LANCZOS).save(
        OUT / "browse-my-vacation-intro-hero.png"
    )

    full = Image.open(OUT / "browse-my-vacation-visual-capture.png")
    # Crop top hero area for card thumbnail
    card = full.crop((0, 0, full.width, min(full.height, int(full.width * 0.62))))
    card.save(OUT / "browse-my-vacation@2x.png")
    card.resize((card.width // 2, card.height // 2), Image.Resampling.LANCZOS).save(
        OUT / "browse-my-vacation.png"
    )
    full.resize((full.width // 2, full.height // 2), Image.Resampling.LANCZOS).save(
        OUT / "browse-my-vacation-visual-break.png"
    )
    full.save(OUT / "browse-my-vacation-visual-break@2x.png")
    print("processed derivatives")


if __name__ == "__main__":
    download_hero_jpg()
    capture_screenshots()
