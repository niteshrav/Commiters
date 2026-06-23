import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { MULTI_ROLE_CRM_CASE_STUDY_DESIGN } from "./multiRoleCrmCaseStudyDesign";
import {
  MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_COPY_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_HEADER_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_INDICATOR_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_CHALLENGE_GRID_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_CHALLENGE_ITEM_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_FEATURE_GRID_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ITEM_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_INTRO_INNER_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_INTRO_SECTION_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_PAGE_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_GRID_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_ICON_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_ITEM_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_ITEM_HIGHLIGHT_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_ITEM_WIDE_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_VISION_COPY_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_VISION_LAYOUT_CLASS,
} from "./multiRoleCrmCaseStudyLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("multiRoleCrmCaseStudyLayout", () => {
  it("styles the case study detail page shell and key sections", () => {
    const page = ruleBlock(`.${MULTI_ROLE_CRM_CASE_STUDY_PAGE_CLASS} {`, `.${MULTI_ROLE_CRM_CASE_STUDY_INTRO_SECTION_CLASS} {`);
    expect(page).toContain(`background: ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.colors.pageBackground}`);

    const intro = ruleBlock(
      `.${MULTI_ROLE_CRM_CASE_STUDY_INTRO_SECTION_CLASS} {`,
      `.${MULTI_ROLE_CRM_CASE_STUDY_INTRO_INNER_CLASS} {`,
    );
    expect(intro).toContain("text-align: center");

    const visionLayout = ruleBlock(
      `.${MULTI_ROLE_CRM_CASE_STUDY_VISION_LAYOUT_CLASS} {`,
      `.${MULTI_ROLE_CRM_CASE_STUDY_VISION_COPY_CLASS} {`,
    );
    expect(visionLayout).toContain(`grid-template-columns: ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.layout.visionSplit}`);

    const stackGrid = ruleBlock(
      `.${MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_GRID_CLASS} {`,
      `.${MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_ITEM_CLASS} {`,
    );
    expect(stackGrid).toContain(`grid-template-columns: ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.layout.techStackColumns}`);
    expect(stackGrid).toContain(`border: 1px solid ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.colors.cardBorder}`);

    const wideItem = ruleBlock(
      `.${MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_ITEM_WIDE_CLASS} {`,
      `.${MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_ITEM_HIGHLIGHT_CLASS} {`,
    );
    expect(wideItem).toContain("grid-column: 1 / -1");

    const highlightItem = ruleBlock(
      `.${MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_ITEM_HIGHLIGHT_CLASS} {`,
      `.${MULTI_ROLE_CRM_CASE_STUDY_TECH_STACK_ICON_CLASS} {`,
    );
    expect(highlightItem).toContain(`background: ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.colors.primary}`);

    const challengeGrid = ruleBlock(
      `.${MULTI_ROLE_CRM_CASE_STUDY_CHALLENGE_GRID_CLASS} {`,
      `.${MULTI_ROLE_CRM_CASE_STUDY_CHALLENGE_ITEM_CLASS} {`,
    );
    expect(challengeGrid).toContain(`grid-template-columns: ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.layout.challengeGridColumns}`);

    const architectureHeader = ruleBlock(
      `.${MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_HEADER_CLASS} {`,
      `.${MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_COPY_CLASS} {`,
    );
    expect(architectureHeader).toContain("justify-content: space-between");

    const architectureIndicator = ruleBlock(
      `.${MULTI_ROLE_CRM_CASE_STUDY_ARCHITECTURE_INDICATOR_CLASS} {`,
      `.${MULTI_ROLE_CRM_CASE_STUDY_FEATURE_GRID_CLASS} {`,
    );
    expect(architectureIndicator).toContain(`background: ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.colors.accentSurface}`);

    const featureGrid = ruleBlock(
      `.${MULTI_ROLE_CRM_CASE_STUDY_FEATURE_GRID_CLASS} {`,
      `.${MULTI_ROLE_CRM_CASE_STUDY_FEATURE_ITEM_CLASS} {`,
    );
    expect(featureGrid).toContain(
      `grid-template-columns: ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.layout.architectureFeatureColumns}`,
    );

    const primaryCtaBtn = ruleBlock(
      `.${MULTI_ROLE_CRM_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS} {`,
      `.multi-role-crm-case-study-bottom-cta-btn--primary:hover {`,
    );
    expect(primaryCtaBtn).toContain(`background: var(--site-btn-primary-bg)`);

    const bottomCta = ruleBlock(
      `.${MULTI_ROLE_CRM_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS} {`,
      `.multi-role-crm-case-study-bottom-cta-inner {`,
    );
    expect(bottomCta).not.toContain("border-top");
  });
});
