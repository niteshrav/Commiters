import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { HOME_SECTION_SEPARATOR_CLASS, HOME_SECTION_SEPARATOR_IDS } from "./homeSectionLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("homeSectionLayout", () => {
  it("declares full-width separators between home sections", () => {
    expect(HOME_SECTION_SEPARATOR_IDS.afterHero).toBe("home-separator-hero-pillars");
    expect(HOME_SECTION_SEPARATOR_IDS.afterPillars).toBe("home-separator-pillars-scale");
    expect(HOME_SECTION_SEPARATOR_IDS.afterBuiltForScale).toBe("home-separator-scale-cta");
    expect(HOME_SECTION_SEPARATOR_CLASS).toBe("home-section-separator--full");
  });

  it("styles section separators as edge-to-edge horizontal rules", () => {
    expect(css).toContain(".home-section-separator--full");
    expect(css).toMatch(/\.home-section-separator--full[\s\S]*width:\s*100vw/);
    expect(css).toMatch(/\.home-section-separator[\s\S]*border-top:\s*1px solid/);
  });
});
