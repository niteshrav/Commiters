import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  CONTACT_INTRO_BODY_CLASS,
  CONTACT_INTRO_BODY_COLOR,
  CONTACT_INTRO_BODY_LINE_HEIGHT,
  CONTACT_INTRO_BODY_MAX_WIDTH,
  CONTACT_INTRO_BODY_SIZE,
  CONTACT_INTRO_INNER_CLASS,
  CONTACT_INTRO_INNER_PADDING_INLINE,
  CONTACT_INTRO_SECTION_CLASS,
  CONTACT_INTRO_TITLE_CLASS,
  CONTACT_INTRO_TITLE_LETTER_SPACING,
  CONTACT_INTRO_TITLE_LINE_HEIGHT,
  CONTACT_INTRO_TITLE_MARGIN_BOTTOM,
  CONTACT_INTRO_TITLE_SIZE,
  CONTACT_INTRO_TITLE_WEIGHT,
} from "./contactIntroLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("contactIntroLayout", () => {
  it("aligns contact intro copy with the header logo inset", () => {
    const inner = ruleBlock(`.${CONTACT_INTRO_INNER_CLASS} {`, `.${CONTACT_INTRO_TITLE_CLASS} {`);
    expect(inner).toContain(`padding-inline: ${CONTACT_INTRO_INNER_PADDING_INLINE}`);
    expect(inner).toContain("text-align: left");
  });

  it("matches Stitch contact intro typography without a trailing separator", () => {
    expect(css).toContain(`.${CONTACT_INTRO_SECTION_CLASS}`);

    const title = ruleBlock(`.${CONTACT_INTRO_TITLE_CLASS} {`, `.${CONTACT_INTRO_BODY_CLASS} {`);
    expect(title).toContain(`font-size: ${CONTACT_INTRO_TITLE_SIZE}`);
    expect(title).toContain(`font-weight: ${CONTACT_INTRO_TITLE_WEIGHT}`);
    expect(title).toContain(`line-height: ${CONTACT_INTRO_TITLE_LINE_HEIGHT}`);
    expect(title).toContain(`letter-spacing: ${CONTACT_INTRO_TITLE_LETTER_SPACING}`);
    expect(title).toContain(`margin: 0 0 ${CONTACT_INTRO_TITLE_MARGIN_BOTTOM}`);
    expect(title).toContain(`max-width: ${CONTACT_INTRO_BODY_MAX_WIDTH}`);

    const body = ruleBlock(`.${CONTACT_INTRO_BODY_CLASS} {`, ".privacy-policy-page {");
    expect(body).toContain(`font-size: ${CONTACT_INTRO_BODY_SIZE}`);
    expect(body).toContain(`line-height: ${CONTACT_INTRO_BODY_LINE_HEIGHT}`);
    expect(body).toContain(`max-width: ${CONTACT_INTRO_BODY_MAX_WIDTH}`);
    expect(body).toContain(`color: ${CONTACT_INTRO_BODY_COLOR}`);

    expect(css).not.toContain(".contact-intro-divider");
  });
});
