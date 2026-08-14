#!/usr/bin/env python3
"""Download BrowseMyVacations assets and build case-study images."""
from __future__ import annotations

import json
import re
import ssl
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / "scripts" / "_bmv-cache"
ASSETS = ROOT / "public" / "assets" / "case-studies"
BASE = "https://browsemyvacations.com"
URL = f"{BASE}/"

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Commiters asset sync)"})
    with urllib.request.urlopen(req, context=CTX, timeout=120) as resp:
        return resp.read()


def abs_url(ref: str) -> str:
    return urllib.parse.urljoin(BASE + "/", ref)


def strip_tags(html: str) -> str:
    text = re.sub(r"<script[\s\S]*?</script>", " ", html, flags=re.I)
    text = re.sub(r"<style[\s\S]*?</style>", " ", text, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def extract_meta(html: str) -> dict[str, str]:
    meta: dict[str, str] = {}
    for key in ("og:title", "og:description", "description", "og:image"):
        m = re.search(rf'(?:name|property)="{re.escape(key)}"\s+content="([^"]+)"', html, re.I)
        if m:
            meta[key] = m.group(1)
    title = re.search(r"<title>([^<]+)</title>", html, re.I)
    if title:
        meta["title"] = title.group(1).strip()
    return meta


def extract_image_urls(html: str) -> list[str]:
    refs = re.findall(
        r'(?:src|href|content)="([^"]+\.(?:png|jpg|jpeg|webp|svg)(?:\?[^"]*)?)"',
        html,
        re.I,
    )
    seen: set[str] = set()
    out: list[str] = []
    for ref in refs:
        url = abs_url(ref.replace("&amp;", "&"))
        if url in seen:
            continue
        seen.add(url)
        out.append(url)
    return out


def save_webp_or_image(data: bytes, dest: Path) -> Image.Image:
    dest.write_bytes(data)
    return Image.open(dest).convert("RGB")


def resize_pair(img: Image.Image, width_1x: int) -> tuple[Image.Image, Image.Image]:
    ratio = width_1x / img.width
    one = img.resize((width_1x, max(1, round(img.height * ratio))), Image.Resampling.LANCZOS)
    two = img.resize((width_1x * 2, max(1, round(img.height * ratio * 2))), Image.Resampling.LANCZOS)
    return one, two


def crop_center(img: Image.Image, target_w: int, target_h: int) -> Image.Image:
    scale = max(target_w / img.width, target_h / img.height)
    resized = img.resize(
        (max(1, round(img.width * scale)), max(1, round(img.height * scale))),
        Image.Resampling.LANCZOS,
    )
    left = (resized.width - target_w) // 2
    top = (resized.height - target_h) // 2
    return resized.crop((left, top, left + target_w, top + target_h))


def main() -> None:
    CACHE.mkdir(parents=True, exist_ok=True)
    ASSETS.mkdir(parents=True, exist_ok=True)

    html = fetch(URL).decode("utf-8", "replace")
    (CACHE / "home.html").write_text(html, encoding="utf-8")

    meta = extract_meta(html)
    image_urls = extract_image_urls(html)

    # Prefer on-domain hero / package imagery over generic preload art.
    preferred = [
        u
        for u in image_urls
        if any(
            token in u.lower()
            for token in (
                "browsemyvacations.com",
                "/hero/",
                "/uploads/",
                "udaipur",
                "rajasthan",
                "package",
            )
        )
    ]

    manifest = {
        "meta": meta,
        "image_urls": image_urls[:40],
        "preferred_urls": preferred[:20],
        "text_snippets": [],
    }

    for phrase in (
        "Vacations You'll Love",
        "Curated Rajasthan",
        "Vacation Meter",
        "MICE",
        "Customise",
        "Best Price Guarantee",
        "24/7 Travel Support",
        "No Dates Needed",
        "Udaipur",
    ):
        if phrase.lower() in html.lower():
            manifest["text_snippets"].append(phrase)

    (CACHE / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(json.dumps(manifest, indent=2))

    # Download hero / OG image
    hero_url = meta.get("og:image") or next((u for u in preferred if "/hero/" in u.lower()), None)
    if not hero_url and preferred:
        hero_url = preferred[0]
    if hero_url:
        hero_path = CACHE / "hero.jpg"
        hero = save_webp_or_image(fetch(hero_url), hero_path)
        print("hero", hero_url, hero.size)

        intro_1x, intro_2x = resize_pair(hero, 1024)
        intro_1x.save(ASSETS / "browse-my-vacation-intro-hero.png", optimize=True)
        intro_2x.save(ASSETS / "browse-my-vacation-intro-hero@2x.png", optimize=True)

        grid_src = crop_center(hero, 928, 648)
        grid_1x, grid_2x = resize_pair(grid_src, 464)
        grid_1x.save(ASSETS / "browse-my-vacation.png", optimize=True)
        grid_2x.save(ASSETS / "browse-my-vacation@2x.png", optimize=True)

        visual_1x, visual_2x = resize_pair(crop_center(hero, 2048, 1056), 1024)
        visual_1x.save(ASSETS / "browse-my-vacation-visual.png", optimize=True)
        visual_2x.save(ASSETS / "browse-my-vacation-visual@2x.png", optimize=True)

        hero_card_1x, hero_card_2x = resize_pair(crop_center(hero, 2048, 1150), 1024)
        hero_card_1x.save(ASSETS / "browse-my-vacation-hero.png", optimize=True)
        hero_card_2x.save(ASSETS / "browse-my-vacation-hero@2x.png", optimize=True)

    # Download a few package card images for reference cache
    package_urls = [u for u in preferred if "/uploads/" in u.lower()][:6]
    package_images: list[Image.Image] = []
    for idx, url in enumerate(package_urls, start=1):
        ext = Path(urllib.parse.urlparse(url).path).suffix or ".jpg"
        dest = CACHE / f"package-{idx}{ext}"
        try:
            package_images.append(save_webp_or_image(fetch(url), dest))
            print("package", idx, url, dest.name)
        except Exception as exc:  # noqa: BLE001
            print("package_fail", url, exc)

    if len(package_images) >= 3:
        tile_w, tile_h = 640, 420
        tiles = [crop_center(img, tile_w, tile_h) for img in package_images[:3]]
        collage = Image.new("RGB", (tile_w * 3, tile_h))
        for index, tile in enumerate(tiles):
            collage.paste(tile, (index * tile_w, 0))
        intro_1x, intro_2x = resize_pair(collage, 1024)
        intro_1x.save(ASSETS / "browse-my-vacation-intro-hero.png", optimize=True)
        intro_2x.save(ASSETS / "browse-my-vacation-intro-hero@2x.png", optimize=True)
        print("intro_collage", collage.size)


if __name__ == "__main__":
    main()
