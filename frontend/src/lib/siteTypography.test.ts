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
  it("uses Plus Jakarta Sans as the primary site font per Precision Minimalist design", () => {
    expect(SITE_TYPOGRAPHY.fontFamily).toContain("Plus Jakarta Sans");
    expect(PRECISION_MINIMALIST_DESIGN.typography.fontFamily).toContain("Plus Jakarta Sans");
    expect(indexHtml).toContain("Plus+Jakarta+Sans");
    expect(css).toContain("Plus Jakarta Sans");
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
