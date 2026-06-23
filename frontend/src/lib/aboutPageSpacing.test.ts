import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  ABOUT_CRAFTSMANSHIP_BODY_MARGIN_BOTTOM,
  ABOUT_CRAFTSMANSHIP_COPY_JUSTIFY,
  ABOUT_CRAFTSMANSHIP_GRID_GAP,
  ABOUT_CRAFTSMANSHIP_HEADING_MARGIN_BOTTOM,
  ABOUT_CRAFTSMANSHIP_INNER_PADDING_TOP,
  ABOUT_CRAFTSMANSHIP_SECTION_PADDING_BOTTOM,
  ABOUT_CRAFTSMANSHIP_SECTION_PADDING_TOP,
  ABOUT_INTRO_SECTION_PADDING_BOTTOM,
  ABOUT_INTRO_SECTION_PADDING_TOP,
  ABOUT_PRINCIPLES_SECTION_PADDING_BLOCK,
  ABOUT_SECTION_SEPARATOR_GAP,
} from "./aboutPageSpacing";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("aboutPageSpacing", () => {
  it("frames craftsmanship with contained rules and copy vertically centered against the portrait", () => {
    expect(ABOUT_CRAFTSMANSHIP_COPY_JUSTIFY).toBe("center");
    expect(ABOUT_INTRO_SECTION_PADDING_BOTTOM).toBe(ABOUT_SECTION_SEPARATOR_GAP);
    expect(ABOUT_CRAFTSMANSHIP_SECTION_PADDING_TOP).toBe("0");
    expect(ABOUT_CRAFTSMANSHIP_INNER_PADDING_TOP).toBe(ABOUT_SECTION_SEPARATOR_GAP);

    const craftsmanship = ruleBlock(".about-craftsmanship-section {", ".about-craftsmanship-rule {");
    expect(craftsmanship).toContain(
      `padding: ${ABOUT_CRAFTSMANSHIP_SECTION_PADDING_TOP} 0 ${ABOUT_CRAFTSMANSHIP_SECTION_PADDING_BOTTOM}`,
    );

    const inner = ruleBlock(".about-craftsmanship-inner {", ".about-craftsmanship-grid {");
    expect(inner).toContain(`padding-top: ${ABOUT_CRAFTSMANSHIP_INNER_PADDING_TOP}`);

    const grid = ruleBlock(".about-craftsmanship-grid {", ".about-craftsmanship-copy {");
    expect(grid).toContain(`gap: ${ABOUT_CRAFTSMANSHIP_GRID_GAP}`);
    expect(grid).toContain("align-items: stretch");

    const copy = ruleBlock(".about-craftsmanship-copy {", ".about-craftsmanship-heading {");
    expect(copy).toContain("position: relative");
    expect(copy).toContain("display: flex");
    expect(copy).toContain("flex-direction: column");
    expect(copy).toContain("min-height: 100%");
    expect(copy).toContain(`justify-content: ${ABOUT_CRAFTSMANSHIP_COPY_JUSTIFY}`);
    expect(css).not.toMatch(/\.about-craftsmanship-copy-start\s*\{[^}]*margin-top/);

    const heading = ruleBlock(".about-craftsmanship-heading {", ".about-craftsmanship-body {");
    expect(heading).toContain(`margin: 0 0 ${ABOUT_CRAFTSMANSHIP_HEADING_MARGIN_BOTTOM}`);
    expect(heading).not.toContain("position: absolute");

    const body = ruleBlock(".about-craftsmanship-body {", ".about-craftsmanship-stats {");
    expect(body).toContain(`margin: 0 0 ${ABOUT_CRAFTSMANSHIP_BODY_MARGIN_BOTTOM}`);
  });
});
