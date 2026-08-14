#!/usr/bin/env python3
"""Fetch BrowseMyVacations homepage metadata and hero image URLs."""
from __future__ import annotations

import re
import ssl
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / "scripts" / "_bmv-cache"
URL = "https://browsemyvacations.com/"

def main() -> None:
    CACHE.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0 (Commiters asset sync)"})
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    html = urllib.request.urlopen(req, context=ctx, timeout=90).read().decode(
        "utf-8", "replace"
    )
    (CACHE / "home.html").write_text(html, encoding="utf-8")
    print("html_bytes", len(html.encode("utf-8")))
    for key in ("og:image", "twitter:image", "_next/static", "vite", "react-dom"):
        print(key, "found" if key.lower() in html.lower() else "missing")
    og = re.search(r'property="og:image"\s+content="([^"]+)"', html)
    if og:
        print("og:image", og.group(1))
    title = re.search(r"<title>([^<]+)</title>", html, re.I)
    if title:
        print("title", title.group(1).strip())
    imgs = re.findall(r'(?:src|href)="([^"]+\.(?:png|jpg|jpeg|webp|svg)(?:\?[^"]*)?)"', html, re.I)
    print("image_refs", len(imgs))
    for ref in imgs[:30]:
        print(" ", ref[:140])

if __name__ == "__main__":
    main()
