import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { COMMITERS_CASE_STUDY_DESIGN } from "./commitersCaseStudyDesign";
import {
  COMMITERS_CASE_STUDY_ARCHITECTURE_GRID_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_CLASS,
  COMMITERS_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS,
  COMMITERS_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS,
  COMMITERS_CASE_STUDY_BOTTOM_CTA_SECONDARY_CLASS,
  COMMITERS_CASE_STUDY_CORE_STACK_CLASS,
  COMMITERS_CASE_STUDY_CORE_STACK_HEADING_CLASS,
  COMMITERS_CASE_STUDY_FEATURE_GRID_CLASS,
  COMMITERS_CASE_STUDY_HIGHLIGHT_CARD_CLASS,
  COMMITERS_CASE_STUDY_INTRO_SECTION_CLASS,
  COMMITERS_CASE_STUDY_KICKER_CLASS,
  COMMITERS_CASE_STUDY_OVERVIEW_GRID_CLASS,
  COMMITERS_CASE_STUDY_PAGE_CLASS,
} from "./commitersCaseStudyLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("commitersCaseStudyLayout", () => {
  it("styles the case study detail page shell and key sections", () => {
    const page = ruleBlock(`.${COMMITERS_CASE_STUDY_PAGE_CLASS} {`, `.${COMMITERS_CASE_STUDY_KICKER_CLASS} {`);
    expect(page).toContain("background: var(--surface-container-low)");

    const intro = ruleBlock(
      `.${COMMITERS_CASE_STUDY_INTRO_SECTION_CLASS} {`,
      `.${COMMITERS_CASE_STUDY_KICKER_CLASS} {`,
    );
    expect(intro).toContain("text-align: left");

    const kicker = ruleBlock(`.${COMMITERS_CASE_STUDY_KICKER_CLASS} {`, `.commiters-case-study-title {`);
    expect(kicker).toContain("color: var(--brand-gold");
    expect(kicker).toContain("font-weight: 500");

    const overview = ruleBlock(
      `.${COMMITERS_CASE_STUDY_OVERVIEW_GRID_CLASS} {`,
      `.${COMMITERS_CASE_STUDY_HIGHLIGHT_CARD_CLASS} {`,
    );
    expect(overview).toContain("grid-template-columns: minmax(0, 7fr) minmax(0, 3fr)");
    expect(overview).toContain("align-items: stretch");

    const highlightCard = ruleBlock(
      `.${COMMITERS_CASE_STUDY_HIGHLIGHT_CARD_CLASS} {`,
      `.${COMMITERS_CASE_STUDY_CORE_STACK_CLASS} {`,
    );
    expect(highlightCard).toContain("border: 1px solid #e5e7eb");
    expect(highlightCard).toContain("border-radius: 8px");
    expect(highlightCard).toContain("padding: 24px");

    const stack = ruleBlock(`.${COMMITERS_CASE_STUDY_CORE_STACK_CLASS} {`, `.${COMMITERS_CASE_STUDY_CORE_STACK_HEADING_CLASS} {`);
    expect(stack).toContain("background: #f3f4f6");
    expect(stack).toContain("align-self: stretch");
    expect(stack).toContain("height: 100%");

    const stackHeading = ruleBlock(
      `.${COMMITERS_CASE_STUDY_CORE_STACK_HEADING_CLASS} {`,
      `.${COMMITERS_CASE_STUDY_ARCHITECTURE_GRID_CLASS} {`,
    );
    expect(stackHeading).toContain("color: var(--brand-gold");

    const architecture = ruleBlock(
      `.${COMMITERS_CASE_STUDY_ARCHITECTURE_GRID_CLASS} {`,
      `.${COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_CLASS} {`,
    );
    expect(architecture).toContain("grid-template-columns: minmax(0, 1fr) minmax(0, 2fr)");

    const architectureItem = ruleBlock(
      `.${COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_CLASS} {`,
      `.${COMMITERS_CASE_STUDY_FEATURE_GRID_CLASS} {`,
    );
    expect(architectureItem).toContain("border-top: 1px solid #e5e7eb");

    const features = ruleBlock(
      `.${COMMITERS_CASE_STUDY_FEATURE_GRID_CLASS} {`,
      `.${COMMITERS_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS} {`,
    );
    expect(features).toContain("grid-template-columns: repeat(3");
    expect(features).toContain("gap: 0");

    const primary = ruleBlock(
      `.${COMMITERS_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS} {`,
      `.${COMMITERS_CASE_STUDY_BOTTOM_CTA_SECONDARY_CLASS} {`,
    );
    expect(primary).toContain("background: var(--site-btn-primary-bg");
    expect(primary).toContain("color: var(--site-btn-primary-text)");

    const secondary = ruleBlock(
      `.${COMMITERS_CASE_STUDY_BOTTOM_CTA_SECONDARY_CLASS} {`,
      `.${COMMITERS_CASE_STUDY_BOTTOM_CTA_SECONDARY_CLASS}:hover {`,
    );
    expect(secondary).toContain("border: 1px solid var(--site-btn-secondary-border");
  });
});
