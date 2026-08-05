import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { HOME_SECTION_SEPARATOR_CLASS, HOME_SECTION_SEPARATOR_IDS } from "./homeSectionLayout";
import { SITE_HORIZONTAL_RULE_CLASS } from "./siteHorizontalRule";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("homeSectionLayout", () => {
  it("uses contained horizontal rules between home sections", () => {
    expect(HOME_SECTION_SEPARATOR_IDS.afterHero).toBe("home-separator-hero-pillars");
    expect(HOME_SECTION_SEPARATOR_IDS.afterPillars).toBe("home-separator-pillars-scale");
    expect(HOME_SECTION_SEPARATOR_IDS.afterBuiltForScale).toBe("home-separator-scale-cta");
    expect(HOME_SECTION_SEPARATOR_CLASS).toBe(SITE_HORIZONTAL_RULE_CLASS);
  });

  it("styles section separators at column width without viewport breakout", () => {
    expect(css).toMatch(/\.home-section-separator[\s\S]*border-top:\s*1px solid var\(--border\)/);
    expect(css).not.toContain(".home-section-separator--full");
  });
});
