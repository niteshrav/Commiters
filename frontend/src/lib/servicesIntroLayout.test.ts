import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  SERVICES_EXPERTISE_BODY_CLASS,
  SERVICES_EXPERTISE_BODY_LINE_HEIGHT,
  SERVICES_EXPERTISE_BODY_MAX_WIDTH,
  SERVICES_EXPERTISE_BODY_SIZE,
  SERVICES_EXPERTISE_INNER_CLASS,
  SERVICES_EXPERTISE_INNER_PADDING_INLINE,
  SERVICES_EXPERTISE_KICKER_CLASS,
  SERVICES_EXPERTISE_KICKER_LETTER_SPACING,
  SERVICES_EXPERTISE_KICKER_MARGIN_BOTTOM,
  SERVICES_EXPERTISE_KICKER_SIZE,
  SERVICES_EXPERTISE_SECTION_CLASS,
  SERVICES_EXPERTISE_SECTION_PADDING_TOP,
  SERVICES_EXPERTISE_SEPARATOR_CLASS,
  SERVICES_EXPERTISE_SEPARATOR_COLOR,
  SERVICES_EXPERTISE_SEPARATOR_MARGIN_TOP,
  SERVICES_EXPERTISE_TITLE_CLASS,
  SERVICES_EXPERTISE_TITLE_LETTER_SPACING,
  SERVICES_EXPERTISE_TITLE_LINE_HEIGHT,
  SERVICES_EXPERTISE_TITLE_MARGIN_BOTTOM,
  SERVICES_EXPERTISE_TITLE_SIZE,
  SERVICES_EXPERTISE_TITLE_WEIGHT,
} from "./servicesIntroLayout";
import { STITCH_COPY } from "./stitchDesign";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("servicesIntroLayout", () => {
  it("exposes Stitch services hero copy from the screenshot", () => {
    expect(STITCH_COPY.services.kicker).toBe("OUR EXPERTISE");
    expect(STITCH_COPY.services.title).toBe("Engineering solutions for the modern web.");
    expect(STITCH_COPY.services.subtext).toBe(
      "We build high-performance digital products with surgical precision. From architectural design to deployment, we are your engineering partner.",
    );
  });

  it("aligns services intro copy with the header logo inset", () => {
    const inner = ruleBlock(`.${SERVICES_EXPERTISE_INNER_CLASS} {`, `.${SERVICES_EXPERTISE_KICKER_CLASS} {`);
    expect(inner).toContain(`padding-inline: ${SERVICES_EXPERTISE_INNER_PADDING_INLINE}`);
    expect(inner).toContain("text-align: left");
  });

  it("matches Stitch services intro typography and a contained separator", () => {
    expect(css).toContain(`.${SERVICES_EXPERTISE_SECTION_CLASS}`);

    const section = ruleBlock(`.${SERVICES_EXPERTISE_SECTION_CLASS} {`, `.${SERVICES_EXPERTISE_INNER_CLASS} {`);
    expect(section).toContain(`padding: ${SERVICES_EXPERTISE_SECTION_PADDING_TOP} 0 0`);
    expect(section).toContain("background: var(--surface)");

    const kicker = ruleBlock(`.${SERVICES_EXPERTISE_KICKER_CLASS} {`, `.${SERVICES_EXPERTISE_TITLE_CLASS} {`);
    expect(kicker).toContain(`font-size: ${SERVICES_EXPERTISE_KICKER_SIZE}`);
    expect(kicker).toContain(`letter-spacing: ${SERVICES_EXPERTISE_KICKER_LETTER_SPACING}`);
    expect(kicker).toContain(`margin: 0 0 ${SERVICES_EXPERTISE_KICKER_MARGIN_BOTTOM}`);
    expect(kicker).toContain("color: var(--stitch-blue");
    expect(kicker).toContain("text-transform: uppercase");

    const title = ruleBlock(`.${SERVICES_EXPERTISE_TITLE_CLASS} {`, `.${SERVICES_EXPERTISE_BODY_CLASS} {`);
    expect(title).toContain(`font-size: ${SERVICES_EXPERTISE_TITLE_SIZE}`);
    expect(title).toContain(`font-weight: ${SERVICES_EXPERTISE_TITLE_WEIGHT}`);
    expect(title).toContain(`line-height: ${SERVICES_EXPERTISE_TITLE_LINE_HEIGHT}`);
    expect(title).toContain(`letter-spacing: ${SERVICES_EXPERTISE_TITLE_LETTER_SPACING}`);
    expect(title).toContain(`margin: 0 0 ${SERVICES_EXPERTISE_TITLE_MARGIN_BOTTOM}`);
    expect(title).toContain(`max-width: ${SERVICES_EXPERTISE_BODY_MAX_WIDTH}`);

    const body = ruleBlock(`.${SERVICES_EXPERTISE_BODY_CLASS} {`, `.${SERVICES_EXPERTISE_SEPARATOR_CLASS} {`);
    expect(body).toContain(`font-size: ${SERVICES_EXPERTISE_BODY_SIZE}`);
    expect(body).toContain(`line-height: ${SERVICES_EXPERTISE_BODY_LINE_HEIGHT}`);
    expect(body).toContain(`max-width: ${SERVICES_EXPERTISE_BODY_MAX_WIDTH}`);
    expect(body).toContain("color: var(--muted)");

    const separator = ruleBlock(
      `.${SERVICES_EXPERTISE_SEPARATOR_CLASS} {`,
      ".services-how-we-work-section {",
    );
    expect(separator).toContain(`margin: ${SERVICES_EXPERTISE_SEPARATOR_MARGIN_TOP} 0 0`);
    expect(separator).toContain(`border-top: 1px solid ${SERVICES_EXPERTISE_SEPARATOR_COLOR}`);
    expect(separator).toContain("width: 100%");
    expect(separator).not.toContain("100vw");
  });
});
