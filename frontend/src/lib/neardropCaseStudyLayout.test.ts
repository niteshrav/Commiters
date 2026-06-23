import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { NEARDROP_CASE_STUDY_DESIGN } from "./neardropCaseStudyDesign";
import {
  NEARDROP_CASE_STUDY_BOTTOM_CTA_INNER_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_PANEL_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS,
  NEARDROP_CASE_STUDY_DESCRIPTION_CLASS,
  NEARDROP_CASE_STUDY_EXECUTION_LAYOUT_CLASS,
  NEARDROP_CASE_STUDY_EXECUTION_LIST_CLASS,
  NEARDROP_CASE_STUDY_EXECUTION_SECTION_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_GRID_CLASS,
  NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_SECTION_CLASS,
  NEARDROP_CASE_STUDY_INTRO_SECTION_CLASS,
  NEARDROP_CASE_STUDY_INTRO_STACK_CLASS,
  NEARDROP_CASE_STUDY_KICKER_CLASS,
  NEARDROP_CASE_STUDY_PAGE_CLASS,
  NEARDROP_CASE_STUDY_TITLE_CLASS,
} from "./neardropCaseStudyLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("neardropCaseStudyLayout", () => {
  it("styles the case study detail page shell and key sections", () => {
    const page = ruleBlock(`.${NEARDROP_CASE_STUDY_PAGE_CLASS} {`, `.${NEARDROP_CASE_STUDY_KICKER_CLASS} {`);
    expect(page).toContain(`background: ${NEARDROP_CASE_STUDY_DESIGN.colors.pageBackground}`);

    const intro = ruleBlock(
      `.${NEARDROP_CASE_STUDY_INTRO_SECTION_CLASS} {`,
      `.${NEARDROP_CASE_STUDY_KICKER_CLASS} {`,
    );
    expect(intro).toContain("text-align: center");

    const kicker = ruleBlock(`.${NEARDROP_CASE_STUDY_KICKER_CLASS} {`, `.neardrop-case-study-kicker-dot {`);
    expect(kicker).toContain(`color: ${NEARDROP_CASE_STUDY_DESIGN.colors.primary}`);

    const title = ruleBlock(`.${NEARDROP_CASE_STUDY_TITLE_CLASS} {`, `.neardrop-case-study-title-lead {`);
    expect(title).toContain(`letter-spacing: ${NEARDROP_CASE_STUDY_DESIGN.typography.titleLetterSpacing}`);

    const description = ruleBlock(
      `.${NEARDROP_CASE_STUDY_DESCRIPTION_CLASS} {`,
      `.${NEARDROP_CASE_STUDY_INTRO_STACK_CLASS} {`,
    );
    expect(description).toContain(`color: ${NEARDROP_CASE_STUDY_DESIGN.colors.body}`);

    const stackGrid = ruleBlock(
      `.${NEARDROP_CASE_STUDY_INTRO_STACK_CLASS} {`,
      `.neardrop-case-study-intro-stack-item {`,
    );
    expect(stackGrid).toContain(`grid-template-columns: ${NEARDROP_CASE_STUDY_DESIGN.layout.introStackColumns}`);

    const functionalExcellence = ruleBlock(
      `.${NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_SECTION_CLASS} {`,
      `.neardrop-case-study-functional-excellence-header {`,
    );
    expect(functionalExcellence).toContain("padding:");

    const featureGrid = ruleBlock(
      `.${NEARDROP_CASE_STUDY_FEATURE_GRID_CLASS} {`,
      `.neardrop-case-study-feature-card {`,
    );
    expect(featureGrid).toContain(`grid-template-columns: ${NEARDROP_CASE_STUDY_DESIGN.layout.featureColumns}`);

    const executionSection = ruleBlock(
      `.${NEARDROP_CASE_STUDY_EXECUTION_SECTION_CLASS} {`,
      `.${NEARDROP_CASE_STUDY_EXECUTION_LAYOUT_CLASS} {`,
    );
    expect(executionSection).toContain(`background: ${NEARDROP_CASE_STUDY_DESIGN.colors.executionSurface}`);

    const executionLayout = ruleBlock(
      `.${NEARDROP_CASE_STUDY_EXECUTION_LAYOUT_CLASS} {`,
      `.neardrop-case-study-execution-copy {`,
    );
    expect(executionLayout).toContain(`grid-template-columns: ${NEARDROP_CASE_STUDY_DESIGN.layout.executionSplit}`);

    const execution = ruleBlock(
      `.${NEARDROP_CASE_STUDY_EXECUTION_LIST_CLASS} {`,
      `.${NEARDROP_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS} {`,
    );
    expect(execution).toContain("display: grid");

    const bottomCtaPanel = ruleBlock(
      `.${NEARDROP_CASE_STUDY_BOTTOM_CTA_PANEL_CLASS} {`,
      `.${NEARDROP_CASE_STUDY_BOTTOM_CTA_INNER_CLASS} {`,
    );
    expect(bottomCtaPanel).toContain(`border-radius: ${NEARDROP_CASE_STUDY_DESIGN.layout.bottomCtaRadius}`);
    expect(bottomCtaPanel).toContain(`background: ${NEARDROP_CASE_STUDY_DESIGN.layout.bottomCtaGradient}`);

    const primaryBtn = ruleBlock(
      `.${NEARDROP_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS} {`,
      `.neardrop-case-study-bottom-cta-btn--secondary {`,
    );
    expect(primaryBtn).toContain(`background: ${NEARDROP_CASE_STUDY_DESIGN.colors.bottomCtaPrimaryBackground}`);
    expect(primaryBtn).toContain(`color: ${NEARDROP_CASE_STUDY_DESIGN.colors.bottomCtaPrimaryText}`);
    expect(NEARDROP_CASE_STUDY_DESIGN.colors.primary).toBe("#0066ff");
  });
});
