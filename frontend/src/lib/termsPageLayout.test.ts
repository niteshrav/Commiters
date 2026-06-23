import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  TERMS_BLUE_ACCENT_COLOR,
  TERMS_CHECKLIST_ICON_CLASS,
  TERMS_CONTENT_COLUMN_CLASS,
  TERMS_CONTENT_RULE_SELECTOR,
  TERMS_DIVIDER_BORDER_CSS,
  TERMS_DIVIDER_CLASS,
  TERMS_ENTERPRISE_INNER_CLASS,
  TERMS_GOLD_ACCENT_COLOR,
  TERMS_HIGHLIGHT_BACKGROUND,
  TERMS_HIGHLIGHT_CLASS,
  TERMS_INTRO_SECTION_CLASS,
  TERMS_LAST_UPDATED_CLASS,
  TERMS_LAST_UPDATED_SIZE,
  TERMS_PROSE_MAX_WIDTH,
  TERMS_RULE_SPACING_BLOCK,
  TERMS_RULE_SPACING_VAR,
  TERMS_SECTION_ACCENT_CLASS,
  TERMS_SECTION_ACCENT_WIDTH,
  TERMS_SECTION_CLASS,
  TERMS_SECTION_HEADING_CLASS,
  TERMS_SECTION_INDEX_CLASS,
  TERMS_SECTION_TITLE_CLASS,
  TERMS_TITLE_CLASS,
  TERMS_TITLE_SIZE,
} from "./termsPageLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("termsPageLayout", () => {
  it("matches the terms hero typography from the Stitch screenshot", () => {
    const title = ruleBlock(`.${TERMS_TITLE_CLASS} {`, `.${TERMS_LAST_UPDATED_CLASS} {`);
    expect(title).toContain(`font-size: ${TERMS_TITLE_SIZE}`);

    const updated = ruleBlock(`.${TERMS_LAST_UPDATED_CLASS} {`, `.${TERMS_DIVIDER_CLASS} {`);
    expect(updated).toContain(`font-size: ${TERMS_LAST_UPDATED_SIZE}`);
    expect(updated).toContain("color: var(--muted)");
  });

  it("uses alternating blue and gold section accents with a liability highlight box", () => {
    const section = ruleBlock(`.${TERMS_SECTION_CLASS} {`, `.${TERMS_SECTION_HEADING_CLASS} {`);
    expect(section).toContain("grid-template-columns");

    const accent = ruleBlock(`.${TERMS_SECTION_ACCENT_CLASS} {`, `.${TERMS_SECTION_INDEX_CLASS} {`);
    expect(accent).toContain(`width: ${TERMS_SECTION_ACCENT_WIDTH}`);

    const blueIndex = ruleBlock(".terms-section-index--blue {", ".terms-section-index--gold {");
    expect(blueIndex).toContain(`color: ${TERMS_BLUE_ACCENT_COLOR}`);

    const goldIndex = ruleBlock(".terms-section-index--gold {", `.${TERMS_SECTION_TITLE_CLASS} {`);
    expect(goldIndex).toContain(`color: ${TERMS_GOLD_ACCENT_COLOR}`);

    const highlight = ruleBlock(`.${TERMS_HIGHLIGHT_CLASS} {`, `.terms-enterprise-cta {`);
    expect(highlight).toContain(`background: ${TERMS_HIGHLIGHT_BACKGROUND}`);

    const icon = ruleBlock(`.${TERMS_CHECKLIST_ICON_CLASS} {`, ".terms-section-accent--blue {");
    expect(icon).toContain(`color: ${TERMS_BLUE_ACCENT_COLOR}`);
  });

  it("keeps prose width, shared divider spacing, and enterprise CTA shell", () => {
    expect(css).toContain(`${TERMS_RULE_SPACING_VAR}: ${TERMS_RULE_SPACING_BLOCK}`);
    expect(css).toContain(`${TERMS_CONTENT_RULE_SELECTOR} {`);
    expect(css).toContain(`border-top: ${TERMS_DIVIDER_BORDER_CSS}`);

    const inner = ruleBlock(`.${TERMS_CONTENT_COLUMN_CLASS} {`, `.${TERMS_INTRO_SECTION_CLASS} {`);
    expect(inner).toContain(`max-width: ${TERMS_PROSE_MAX_WIDTH}`);

    const enterprise = ruleBlock(`.${TERMS_ENTERPRISE_INNER_CLASS} {`, "@media");
    expect(enterprise).toContain("background: #111827");
  });
});
