import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { HOME_IMAGE_FULL_COLOR_CLASS, HOME_PAGE_PHOTO_SELECTORS } from "./homeImagePresentation";
import { HOME_PAGE_ASSETS } from "./homePageContent";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("homeImagePresentation", () => {
  it("keeps home page photos full color without grayscale hover effects", () => {
    expect(HOME_IMAGE_FULL_COLOR_CLASS).toBe("site-image-full-color");
    expect(css).not.toMatch(/\.home-image-tone\s*\{[\s\S]*?grayscale/);
    expect(css).not.toContain(".stitch-home-hero-visual--tone:hover");
    expect(css).toMatch(
      new RegExp(
        `\\.${HOME_IMAGE_FULL_COLOR_CLASS.replace(/-/g, "\\-")}[\\s\\S]*\\.stitch-home-hero-photo,[\\s\\S]*\\.home-built-for-scale-image[\\s\\S]*\\{[\\s\\S]*?filter:\\s*none`,
      ),
    );
    for (const selector of HOME_PAGE_PHOTO_SELECTORS) {
      expect(css).toContain(selector);
    }
  });

  it("serves high-resolution PNG home photography with optional 2x src", () => {
    expect(HOME_PAGE_ASSETS.heroMonitor).toMatch(/home-hero-monitor\.png$/);
    expect(HOME_PAGE_ASSETS.heroMonitor2x).toMatch(/home-hero-monitor@2x\.png$/);
    expect(HOME_PAGE_ASSETS.serverRacks).toMatch(/server-racks\.png$/);
    expect(HOME_PAGE_ASSETS.serverRacks2x).toMatch(/server-racks@2x\.png$/);
  });
});
