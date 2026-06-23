import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  PRIVACY_ACCENT_COLOR,
  PRIVACY_ACCENT_LINE_CLASS,
  PRIVACY_ACCENT_LINE_HEIGHT,
  PRIVACY_ACCENT_LINE_WIDTH,
  PRIVACY_CALLOUT_CLASS,
  PRIVACY_CHECKLIST_ICON_CLASS,
  PRIVACY_CONTENT_COLUMN_CLASS,
  PRIVACY_DIVIDER_BORDER_CSS,
  PRIVACY_DIVIDER_CLASS,
  PRIVACY_DPO_CTA_CLASS,
  PRIVACY_DPO_INNER_CLASS,
  PRIVACY_RIGHTS_BULLET_CLASS,
  PRIVACY_SECTION_SHELL_CLASS,
  PRIVACY_FEATURE_CARD_CLASS,
  PRIVACY_FEATURE_CARD_ICON_CLASS,
  PRIVACY_FEATURE_GRID_CLASS,
  PRIVACY_DIVIDER_COLOR,
  PRIVACY_INTRO_BODY_CLASS,
  PRIVACY_INTRO_INNER_CLASS,
  PRIVACY_LAST_UPDATED_CLASS,
  PRIVACY_LAST_UPDATED_SIZE,
  PRIVACY_PROSE_MAX_WIDTH,
  PRIVACY_RULE_SPACING_BLOCK,
  PRIVACY_RULE_SPACING_VAR,
  PRIVACY_SECTION_CLASS,
  PRIVACY_SECTION_HEADING_CLASS,
  PRIVACY_SECTION_INDEX_CLASS,
  PRIVACY_SECTION_NUMBER_COLOR,
  PRIVACY_SECTION_TITLE_CLASS,
  PRIVACY_SECTIONS_CLASS,
  PRIVACY_SUBSECTION_BODY_CLASS,
  PRIVACY_SUBSECTION_LABEL_CLASS,
  PRIVACY_TITLE_CLASS,
  PRIVACY_TITLE_SIZE,
} from "./privacyPageLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("privacyPageLayout", () => {
  it("matches the privacy hero typography from the Stitch screenshot", () => {
    const title = ruleBlock(`.${PRIVACY_TITLE_CLASS} {`, `.${PRIVACY_LAST_UPDATED_CLASS} {`);
    expect(title).toContain(`font-size: ${PRIVACY_TITLE_SIZE}`);

    const updated = ruleBlock(`.${PRIVACY_LAST_UPDATED_CLASS} {`, `.${PRIVACY_ACCENT_LINE_CLASS} {`);
    expect(updated).toContain(`font-size: ${PRIVACY_LAST_UPDATED_SIZE}`);
    expect(updated).toContain(`color: ${PRIVACY_ACCENT_COLOR}`);
    expect(updated).toContain("text-transform: uppercase");

    const accent = ruleBlock(`.${PRIVACY_ACCENT_LINE_CLASS} {`, `.${PRIVACY_INTRO_BODY_CLASS} {`);
    expect(accent).toContain(`width: ${PRIVACY_ACCENT_LINE_WIDTH}`);
    expect(accent).toContain(`height: ${PRIVACY_ACCENT_LINE_HEIGHT}`);
    expect(accent).toContain(`background: ${PRIVACY_ACCENT_COLOR}`);
  });

  it("uses a two-column numbered section layout with gold labels and checklist icons", () => {
    const section = ruleBlock(`.${PRIVACY_SECTION_CLASS} {`, `.${PRIVACY_SECTION_INDEX_CLASS} {`);
    expect(section).toContain("grid-template-columns");

    const index = ruleBlock(`.${PRIVACY_SECTION_INDEX_CLASS} {`, `.${PRIVACY_SECTION_TITLE_CLASS} {`);
    expect(index).toContain(`color: ${PRIVACY_SECTION_NUMBER_COLOR}`);

    const label = ruleBlock(`.${PRIVACY_SUBSECTION_LABEL_CLASS} {`, `.${PRIVACY_SUBSECTION_BODY_CLASS} {`);
    expect(label).toContain(`color: ${PRIVACY_ACCENT_COLOR}`);
    expect(label).toContain("text-transform: uppercase");

    const icon = ruleBlock(`.${PRIVACY_CHECKLIST_ICON_CLASS} {`, ".legal-intro-section {");
    expect(icon).toContain(`background: ${PRIVACY_ACCENT_COLOR}`);
  });

  it("centers privacy content with equal side margins and contained dividers", () => {
    const column = ruleBlock(`.${PRIVACY_CONTENT_COLUMN_CLASS} {`, `.privacy-policy-intro {`);
    expect(column).toContain(`max-width: ${PRIVACY_PROSE_MAX_WIDTH}`);
    expect(column).toContain("margin-inline: auto");
    expect(column).toContain("width: 100%");

    const inner = ruleBlock(`.${PRIVACY_INTRO_INNER_CLASS} {`, `.${PRIVACY_TITLE_CLASS} {`);
    expect(inner).not.toContain(`max-width: ${PRIVACY_PROSE_MAX_WIDTH}`);

    const sections = ruleBlock(`.${PRIVACY_SECTIONS_CLASS} {`, `.${PRIVACY_SECTION_SHELL_CLASS} {`);
    expect(sections).not.toContain(`max-width: ${PRIVACY_PROSE_MAX_WIDTH}`);

    expect(PRIVACY_DIVIDER_CLASS).toBe("site-horizontal-rule");
    expect(PRIVACY_DIVIDER_BORDER_CSS).toContain("var(--border)");

    const shell = ruleBlock(`.${PRIVACY_SECTION_SHELL_CLASS} {`, `.${PRIVACY_SECTION_CLASS} {`);
    expect(shell).toContain("width: 100%");
  });

  it("keeps equal block spacing above and below every privacy separator line", () => {
    const column = ruleBlock(`.${PRIVACY_CONTENT_COLUMN_CLASS} {`, `.privacy-policy-intro {`);
    expect(column).toContain(`${PRIVACY_RULE_SPACING_VAR}: ${PRIVACY_RULE_SPACING_BLOCK}`);

    const rule = ruleBlock(".privacy-policy-content .site-horizontal-rule {", ".privacy-policy-sections {");
    expect(rule).toContain(`margin-block: var(${PRIVACY_RULE_SPACING_VAR})`);

    const introBody = ruleBlock(`.${PRIVACY_INTRO_BODY_CLASS} {`, ".privacy-policy-intro-body strong {");
    expect(introBody).toContain("margin-bottom: 0");

    const section = ruleBlock(`.${PRIVACY_SECTION_CLASS} {`, `.${PRIVACY_SECTION_HEADING_CLASS} {`);
    expect(section).toContain("padding: 0");

    const dpo = ruleBlock(`.${PRIVACY_DPO_CTA_CLASS} {`, `.${PRIVACY_DPO_INNER_CLASS} {`);
    expect(dpo).toContain("padding-top: 0");
  });

  it("styles usage cards and cookie callout bands from the screenshot", () => {
    const grid = ruleBlock(`.${PRIVACY_FEATURE_GRID_CLASS} {`, `.${PRIVACY_FEATURE_CARD_CLASS} {`);
    expect(grid).toContain("grid-template-columns: repeat(2");

    const card = ruleBlock(`.${PRIVACY_FEATURE_CARD_CLASS} {`, `.${PRIVACY_FEATURE_CARD_ICON_CLASS} {`);
    expect(card).toContain("border: 1px solid #e0e0e0");

    const callout = ruleBlock(`.${PRIVACY_CALLOUT_CLASS} {`, `.${PRIVACY_CALLOUT_CLASS} p {`);
    expect(callout).toContain("background: #f3f4f6");

    const calloutText = ruleBlock(`.${PRIVACY_CALLOUT_CLASS} p {`, ".privacy-policy-rights-list {");
    expect(calloutText).toContain("font-style: italic");

    const rightsBullet = ruleBlock(`.${PRIVACY_RIGHTS_BULLET_CLASS} {`, ".privacy-policy-rights-title {");
    expect(rightsBullet).toContain(`background: ${PRIVACY_ACCENT_COLOR}`);

    const dpo = ruleBlock(`.${PRIVACY_DPO_CTA_CLASS} {`, `.${PRIVACY_DPO_INNER_CLASS} {`);
    expect(dpo).toContain("background: var(--surface)");
  });
});
