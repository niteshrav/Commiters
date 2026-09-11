import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { SITE_TYPOGRAPHY } from "./siteTypography";
import { PRECISION_MINIMALIST_DESIGN } from "./precisionMinimalistDesign";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const indexHtml = readFileSync(join(root, "index.html"), "utf8");
const css = readFileSync(join(root, "src", "styles.css"), "utf8");

describe("siteTypography", () => {
  it("uses Inter as the primary site font from the Brand Book", () => {
    expect(SITE_TYPOGRAPHY.fontFamily).toContain("Inter");
    expect(PRECISION_MINIMALIST_DESIGN.typography.fontFamily).toContain("Inter");
    expect(indexHtml).toContain("family=Inter");
    expect(css).toContain('"Inter"');
  });

  it("defines shared heading and body scale for marketing pages", () => {
    expect(SITE_TYPOGRAPHY.sectionTitleWeight).toBe(700);
    expect(SITE_TYPOGRAPHY.displayWeight).toBe(800);
    expect(SITE_TYPOGRAPHY.bodySize).toBe("1rem");
    expect(css).toContain(".typography-section-title");
    expect(css).toContain(".typography-body");
    expect(css).toContain(".typography-kicker");
  });
});
