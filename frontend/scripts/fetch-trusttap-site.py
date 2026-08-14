#!/usr/bin/env python3
"""Fetch TrustTap homepage metadata and image URLs."""
from __future__ import annotations

import json
import re
import ssl
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / "scripts" / "_trusttap-cache"
URL = "https://trusttap.commiters.com/"


def main() -> None:
    CACHE.mkdir(parents=True, exist_ok=True)
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    req = urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0 (Commiters asset sync)"})
    html = urllib.request.urlopen(req, context=ctx, timeout=90).read().decode("utf-8", "replace")
    (CACHE / "home.html").write_text(html, encoding="utf-8")
    print("html_bytes", len(html.encode("utf-8")))

    meta: dict[str, str] = {}
    for key in ("og:title", "og:description", "description", "og:image"):
        match = re.search(rf'(?:name|property)="{re.escape(key)}"\s+content="([^"]+)"', html, re.I)
        if match:
            meta[key] = match.group(1)
    title = re.search(r"<title>([^<]+)</title>", html, re.I)
    if title:
        meta["title"] = title.group(1).strip()

    imgs = re.findall(
        r'(?:src|href|content)="([^"]+\.(?:png|jpg|jpeg|webp|svg)(?:\?[^"]*)?)"',
        html,
        re.I,
    )
    snippets = [
        "Built for real counters",
        "Why businesses choose it",
        "Three steps to go live",
        "Ready to launch your pilot",
        "Do customers need to create an account",
        "Can I download QR codes",
        "Who is this for",
    ]
    found = [s for s in snippets if s.lower() in html.lower()]
    payload = {"meta": meta, "image_refs": imgs[:40], "snippets": found}
    (CACHE / "manifest.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(json.dumps(payload, indent=2))


if __name__ == "__main__":
    main()
