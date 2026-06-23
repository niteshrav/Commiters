import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  ABOUT_INTRO_BODY_CLASS,
  ABOUT_INTRO_BODY_LINE_HEIGHT,
  ABOUT_INTRO_BODY_MAX_WIDTH,
  ABOUT_INTRO_BODY_SIZE,
  ABOUT_INTRO_INNER_CLASS,
  ABOUT_INTRO_INNER_PADDING_INLINE,
  ABOUT_INTRO_KICKER_CLASS,
  ABOUT_INTRO_KICKER_LETTER_SPACING,
  ABOUT_INTRO_KICKER_MARGIN_BOTTOM,
  ABOUT_INTRO_KICKER_SIZE,
  ABOUT_INTRO_SECTION_CLASS,
  ABOUT_INTRO_TITLE_CLASS,
  ABOUT_INTRO_TITLE_LETTER_SPACING,
  ABOUT_INTRO_TITLE_LINE_HEIGHT,
  ABOUT_INTRO_TITLE_MARGIN_BOTTOM,
  ABOUT_INTRO_TITLE_SIZE,
  ABOUT_INTRO_TITLE_WEIGHT,
  SITE_HEADER_INNER_CLASS,
} from "./aboutIntroLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("aboutIntroLayout", () => {
  it("aligns about intro copy with the header logo (single container inset)", () => {
    const inner = ruleBlock(`.${ABOUT_INTRO_INNER_CLASS} {`, `.${ABOUT_INTRO_KICKER_CLASS} {`);
    expect(inner).toContain(`padding-inline: ${ABOUT_INTRO_INNER_PADDING_INLINE}`);
    expect(inner).toContain("text-align: left");

    const headerInner = ruleBlock(`.${SITE_HEADER_INNER_CLASS} {`, ".brand {");
    expect(headerInner).toContain("display: flex");
  });

  it("matches Stitch about intro typography without a trailing separator", () => {
    expect(css).toContain(`.${ABOUT_INTRO_SECTION_CLASS}`);

    const kicker = ruleBlock(`.${ABOUT_INTRO_KICKER_CLASS} {`, `.${ABOUT_INTRO_TITLE_CLASS} {`);
    expect(kicker).toContain(`font-size: ${ABOUT_INTRO_KICKER_SIZE}`);
    expect(kicker).toContain(`letter-spacing: ${ABOUT_INTRO_KICKER_LETTER_SPACING}`);
    expect(kicker).toContain(`margin: 0 0 ${ABOUT_INTRO_KICKER_MARGIN_BOTTOM}`);
    expect(kicker).toContain("color: var(--brand-gold)");

    const title = ruleBlock(`.${ABOUT_INTRO_TITLE_CLASS} {`, `.${ABOUT_INTRO_BODY_CLASS} {`);
    expect(title).toContain(`font-size: ${ABOUT_INTRO_TITLE_SIZE}`);
    expect(title).toContain(`font-weight: ${ABOUT_INTRO_TITLE_WEIGHT}`);
    expect(title).toContain(`line-height: ${ABOUT_INTRO_TITLE_LINE_HEIGHT}`);
    expect(title).toContain(`letter-spacing: ${ABOUT_INTRO_TITLE_LETTER_SPACING}`);
    expect(title).toContain(`margin: 0 0 ${ABOUT_INTRO_TITLE_MARGIN_BOTTOM}`);
    expect(title).toContain(`max-width: ${ABOUT_INTRO_BODY_MAX_WIDTH}`);

    const body = ruleBlock(`.${ABOUT_INTRO_BODY_CLASS} {`, ".about-craftsmanship-section {");
    expect(body).toContain(`font-size: ${ABOUT_INTRO_BODY_SIZE}`);
    expect(body).toContain(`line-height: ${ABOUT_INTRO_BODY_LINE_HEIGHT}`);
    expect(body).toContain(`max-width: ${ABOUT_INTRO_BODY_MAX_WIDTH}`);

    expect(css).not.toContain(".about-intro-rule--top");
    expect(css).not.toContain(".about-intro-rule--bottom");
    expect(css).not.toContain(".about-intro-rule {");
  });
});
