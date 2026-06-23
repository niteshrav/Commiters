#!/usr/bin/env python3
"""Exit 0 when the image shows a vivid dashboard and full desk scene with props."""

from __future__ import annotations

import sys

from PIL import Image


def luminance(red: int, green: int, blue: int) -> float:
    return 0.299 * red + 0.587 * green + 0.114 * blue


def average_luminance(image: Image.Image, left: int, top: int, right: int, bottom: int) -> float:
    total = 0.0
    count = 0
    for y in range(top, bottom):
        for x in range(left, right):
            red, green, blue = image.getpixel((x, y))[:3]
            total += luminance(red, green, blue)
            count += 1
    return total / count


def has_teal_dashboard_pixels(image: Image.Image, left: int, top: int, right: int, bottom: int) -> bool:
    for y in range(top, bottom):
        for x in range(left, right):
            red, green, blue = image.getpixel((x, y))[:3]
            if blue > red + 18 and green > red + 8 and blue > 70:
                return True
    return False


def has_desk_scene_pixels(image: Image.Image, left: int, top: int, right: int, bottom: int) -> bool:
    for y in range(top, bottom):
        for x in range(left, right):
            red, green, blue = image.getpixel((x, y))[:3]
            if luminance(red, green, blue) > 115:
                return True
    return False


def main() -> None:
    image_path = sys.argv[1]
    image = Image.open(image_path).convert("RGB")
    width, height = image.size

    dashboard_top = int(height * 0.12)
    dashboard_bottom = int(height * 0.58)
    dashboard_left = int(width * 0.12)
    dashboard_right = int(width * 0.88)
    dashboard_luma = average_luminance(
        image,
        dashboard_left,
        dashboard_top,
        dashboard_right,
        dashboard_bottom,
    )

    desk_top = int(height * 0.58)
    desk_bottom = height
    desk_left = int(width * 0.45)
    desk_right = width
    desk_luma = average_luminance(image, desk_left, desk_top, desk_right, desk_bottom)

    if dashboard_luma > 130:
        raise SystemExit(1)
    if not has_teal_dashboard_pixels(image, dashboard_left, dashboard_top, dashboard_right, dashboard_bottom):
        raise SystemExit(1)
    if desk_luma < 62:
        raise SystemExit(1)
    if not has_desk_scene_pixels(image, desk_left, desk_top, desk_right, desk_bottom):
        raise SystemExit(1)

    raise SystemExit(0)


if __name__ == "__main__":
    main()
