import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  ABOUT_CRAFTSMANSHIP_BODY_CLASS,
  ABOUT_CRAFTSMANSHIP_BODY_LINE_HEIGHT,
  ABOUT_CRAFTSMANSHIP_BODY_SIZE,
  ABOUT_CRAFTSMANSHIP_COPY_CLASS,
  ABOUT_CRAFTSMANSHIP_COPY_JUSTIFY,
  ABOUT_CRAFTSMANSHIP_GRID_CLASS,
  ABOUT_CRAFTSMANSHIP_GRID_ALIGN,
  ABOUT_CRAFTSMANSHIP_GRID_COLUMNS,
  ABOUT_CRAFTSMANSHIP_GRID_GAP,
  ABOUT_CRAFTSMANSHIP_HEADING_CLASS,
  ABOUT_CRAFTSMANSHIP_HEADING_MARGIN_BOTTOM,
  ABOUT_CRAFTSMANSHIP_HEADING_SIZE,
  ABOUT_CRAFTSMANSHIP_INNER_CLASS,
  ABOUT_CRAFTSMANSHIP_INNER_PADDING_INLINE,
  ABOUT_CRAFTSMANSHIP_RULE_CLASS,
  ABOUT_CRAFTSMANSHIP_RULE_COLOR,
  ABOUT_CRAFTSMANSHIP_SECTION_CLASS,
  ABOUT_CRAFTSMANSHIP_STAT_COUNT,
  ABOUT_CRAFTSMANSHIP_STAT_LABEL_CLASS,
  ABOUT_CRAFTSMANSHIP_STAT_RADIUS,
  ABOUT_CRAFTSMANSHIP_STAT_VALUE_CLASS,
  ABOUT_CRAFTSMANSHIP_STAT_VALUE_SIZE,
  ABOUT_CRAFTSMANSHIP_VISUAL_CLASS,
  ABOUT_CRAFTSMANSHIP_YEARS_STAT,
  ABOUT_CRAFTSMANSHIP_VISUAL_JUSTIFY,
  ABOUT_FOUNDER_PHOTO_ASPECT_RATIO,
  ABOUT_FOUNDER_PHOTO_FILTER,
  ABOUT_FOUNDER_PHOTO_HEIGHT_PX,
  ABOUT_FOUNDER_PHOTO_MAX_WIDTH,
  ABOUT_FOUNDER_PHOTO_OBJECT_POSITION,
  ABOUT_FOUNDER_PHOTO_SRC,
  ABOUT_FOUNDER_PHOTO_WIDTH_PX,
  ABOUT_FOUNDER_PHOTO_WRAP_CLASS,
  ABOUT_FOUNDER_QUOTE_ATTRIBUTION_CLASS,
  ABOUT_FOUNDER_QUOTE_BOTTOM,
  ABOUT_FOUNDER_QUOTE_CLASS,
  ABOUT_FOUNDER_QUOTE_OVERHANG,
  ABOUT_FOUNDER_QUOTE_RIGHT,
  ABOUT_FOUNDER_QUOTE_TEXT_CLASS,
  ABOUT_FOUNDER_QUOTE_TRANSFORM,
  ABOUT_FOUNDER_QUOTE_Z_INDEX,
} from "./aboutCraftsmanshipContent";

const frontendRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const css = readFileSync(join(frontendRoot, "src", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("aboutCraftsmanshipContent", () => {
  it("exposes a single 13+ Years stat (no ships block)", () => {
    expect(ABOUT_CRAFTSMANSHIP_STAT_COUNT).toBe(1);
    expect(ABOUT_CRAFTSMANSHIP_YEARS_STAT.value).toBe("13+ Years");
    expect(ABOUT_CRAFTSMANSHIP_YEARS_STAT.label).toBe("INDUSTRY EXCELLENCE");
  });

  it("ships the founder portrait asset for the about page photo slot", () => {
    expect(existsSync(join(frontendRoot, "public", ABOUT_FOUNDER_PHOTO_SRC.replace(/^\//, "")))).toBe(true);
  });

  it("uses the Stitch screenshot portrait display dimensions", () => {
    expect(ABOUT_FOUNDER_PHOTO_WIDTH_PX).toBe(420);
    expect(ABOUT_FOUNDER_PHOTO_HEIGHT_PX).toBe(525);
    expect(ABOUT_FOUNDER_PHOTO_ASPECT_RATIO).toBe("4 / 5");
    expect(ABOUT_FOUNDER_PHOTO_OBJECT_POSITION).toBe("center top");
  });

  it("hangs the founder quote 20% below the portrait bottom (80% on photo)", () => {
    expect(ABOUT_FOUNDER_QUOTE_OVERHANG).toBe("20%");
    expect(ABOUT_FOUNDER_QUOTE_TRANSFORM).toBe(`translateY(${ABOUT_FOUNDER_QUOTE_OVERHANG})`);
    expect(ABOUT_FOUNDER_QUOTE_BOTTOM).toBe("0");
  });
});

describe("aboutCraftsmanshipLayout", () => {
  it("uses contained rules, vertically centered copy, compact portrait, and quote overlay", () => {
    expect(css).toContain(`.${ABOUT_CRAFTSMANSHIP_SECTION_CLASS}`);

    const topRule = ruleBlock(`.${ABOUT_CRAFTSMANSHIP_RULE_CLASS} {`, ".about-craftsmanship-inner {");
    expect(topRule).toContain(`border-top: 1px solid ${ABOUT_CRAFTSMANSHIP_RULE_COLOR}`);

    const grid = ruleBlock(`.${ABOUT_CRAFTSMANSHIP_GRID_CLASS} {`, `.${ABOUT_CRAFTSMANSHIP_COPY_CLASS} {`);
    expect(grid).toContain(`grid-template-columns: ${ABOUT_CRAFTSMANSHIP_GRID_COLUMNS}`);
    expect(grid).toContain(`align-items: ${ABOUT_CRAFTSMANSHIP_GRID_ALIGN}`);

    const copy = ruleBlock(`.${ABOUT_CRAFTSMANSHIP_COPY_CLASS} {`, `.${ABOUT_CRAFTSMANSHIP_HEADING_CLASS} {`);
    expect(copy).toContain("display: flex");
    expect(copy).toContain("flex-direction: column");
    expect(copy).toContain(`justify-content: ${ABOUT_CRAFTSMANSHIP_COPY_JUSTIFY}`);
    expect(copy).toContain("min-height: 100%");
    expect(css).not.toMatch(/\.about-craftsmanship-copy-start\s*\{[^}]*margin-top/);

    const heading = ruleBlock(`.${ABOUT_CRAFTSMANSHIP_HEADING_CLASS} {`, `.${ABOUT_CRAFTSMANSHIP_BODY_CLASS} {`);
    expect(heading).toContain(`margin: 0 0 ${ABOUT_CRAFTSMANSHIP_HEADING_MARGIN_BOTTOM}`);

    const visual = ruleBlock(`.${ABOUT_CRAFTSMANSHIP_VISUAL_CLASS} {`, `.${ABOUT_FOUNDER_PHOTO_WRAP_CLASS} {`);
    expect(visual).toContain(`max-width: ${ABOUT_FOUNDER_PHOTO_MAX_WIDTH}`);
    expect(visual).toContain(`justify-self: ${ABOUT_CRAFTSMANSHIP_VISUAL_JUSTIFY}`);

    const photo = ruleBlock(".about-founder-photo {", ".about-founder-photo-placeholder,");
    expect(photo).toContain(`filter: ${ABOUT_FOUNDER_PHOTO_FILTER}`);
    expect(photo).toContain(`aspect-ratio: ${ABOUT_FOUNDER_PHOTO_ASPECT_RATIO}`);
    expect(photo).toContain(`object-position: ${ABOUT_FOUNDER_PHOTO_OBJECT_POSITION}`);

    expect(css).not.toContain(".about-founder-quote-cover");

    const quote = ruleBlock(`.${ABOUT_FOUNDER_QUOTE_CLASS} {`, `.${ABOUT_FOUNDER_QUOTE_TEXT_CLASS} {`);
    expect(quote).toContain(`bottom: ${ABOUT_FOUNDER_QUOTE_BOTTOM}`);
    expect(quote).toContain(`right: ${ABOUT_FOUNDER_QUOTE_RIGHT}`);
    expect(quote).toContain(`transform: ${ABOUT_FOUNDER_QUOTE_TRANSFORM}`);
    expect(quote).toContain(`z-index: ${ABOUT_FOUNDER_QUOTE_Z_INDEX}`);

    const quoteAttribution = ruleBlock(
      `.${ABOUT_FOUNDER_QUOTE_ATTRIBUTION_CLASS} {`,
      ".about-principles-section {",
    );
    expect(quoteAttribution).toContain("text-transform: uppercase");

    expect(css).not.toContain(".about-craftsmanship-stat-value--accent");

    const statValue = ruleBlock(
      `.${ABOUT_CRAFTSMANSHIP_STAT_VALUE_CLASS} {`,
      `.${ABOUT_CRAFTSMANSHIP_STAT_LABEL_CLASS} {`,
    );
    expect(statValue).toContain(`font-size: ${ABOUT_CRAFTSMANSHIP_STAT_VALUE_SIZE}`);

    const stat = ruleBlock(".about-craftsmanship-stat {", `.${ABOUT_CRAFTSMANSHIP_STAT_VALUE_CLASS} {`);
    expect(stat).toContain(`border-radius: ${ABOUT_CRAFTSMANSHIP_STAT_RADIUS}`);

    const body = ruleBlock(`.${ABOUT_CRAFTSMANSHIP_BODY_CLASS} {`, ".about-craftsmanship-stats {");
    expect(body).toContain(`font-size: ${ABOUT_CRAFTSMANSHIP_BODY_SIZE}`);
    expect(body).toContain(`line-height: ${ABOUT_CRAFTSMANSHIP_BODY_LINE_HEIGHT}`);
  });
});
