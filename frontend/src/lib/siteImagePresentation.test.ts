import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  SITE_IMAGE_FULL_COLOR_CLASS,
  SITE_IMAGE_SELECTORS,
} from "./siteImagePresentation";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("siteImagePresentation", () => {
  it("keeps site images full color without grayscale filters", () => {
    expect(SITE_IMAGE_FULL_COLOR_CLASS).toBe("site-image-full-color");
    expect(css).not.toMatch(/filter:\s*grayscale/);
    expect(css).toMatch(
      new RegExp(
        `\\.${SITE_IMAGE_FULL_COLOR_CLASS.replace(/-/g, "\\-")}[\\s\\S]*\\{[\\s\\S]*?filter:\\s*none`,
      ),
    );
    for (const selector of SITE_IMAGE_SELECTORS) {
      expect(css).toContain(selector);
    }
  });
});
