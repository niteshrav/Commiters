import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { NEARDROP_CASE_STUDY_DESIGN, NEARDROP_CASE_STUDY_STITCH_PREVIEW_NODE_ID } from "./neardropCaseStudyDesign";
import {
  NEARDROP_CASE_STUDY_ARCHITECTURE_BODY_CLASS,
  NEARDROP_CASE_STUDY_ARCHITECTURE_GRID_CLASS,
  NEARDROP_CASE_STUDY_ARCHITECTURE_HEADING_CLASS,
  NEARDROP_CASE_STUDY_ARCHITECTURE_ITEM_ICON_CLASS,
  NEARDROP_CASE_STUDY_ARCHITECTURE_KICKER_CLASS,
  NEARDROP_CASE_STUDY_ARCHITECTURE_SECTION_CLASS,
  NEARDROP_CASE_STUDY_EXECUTION_DESCRIPTION_CLASS,
  NEARDROP_CASE_STUDY_EXECUTION_HEADING_CLASS,
  NEARDROP_CASE_STUDY_EXECUTION_ITEM_CLASS,
  NEARDROP_CASE_STUDY_EXECUTION_KICKER_CLASS,
  NEARDROP_CASE_STUDY_EXECUTION_LAYOUT_CLASS,
  NEARDROP_CASE_STUDY_EXECUTION_SECTION_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_INNER_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_PANEL_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_TITLE_CLASS,
  NEARDROP_CASE_STUDY_DESCRIPTION_CLASS,
  NEARDROP_CASE_STUDY_FEATURE_GRID_CLASS,
  NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_COUNT_CLASS,
  NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_HEADING_CLASS,
  NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_SECTION_CLASS,
  NEARDROP_CASE_STUDY_INTRO_INNER_CLASS,
  NEARDROP_CASE_STUDY_INTRO_SECTION_CLASS,
  NEARDROP_CASE_STUDY_KICKER_CLASS,
  NEARDROP_CASE_STUDY_TITLE_ACCENT_CLASS,
  NEARDROP_CASE_STUDY_TITLE_CLASS,
} from "./neardropCaseStudyLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("neardropCaseStudyDesign", () => {
  it("documents the precision minimalist palette and grid layout", () => {
    expect(NEARDROP_CASE_STUDY_STITCH_PREVIEW_NODE_ID).toBe("6c35857a6c354ba19a97932548330845");
    expect(NEARDROP_CASE_STUDY_DESIGN.colors.pageBackground).toBe("#ffffff");
    expect(NEARDROP_CASE_STUDY_DESIGN.colors.primary).toBe("#0066ff");
    expect(NEARDROP_CASE_STUDY_DESIGN.colors.body).toBe("#4b5563");
    expect(NEARDROP_CASE_STUDY_DESIGN.layout.architectureColumns).toBe("repeat(4, minmax(0, 1fr))");
    expect(NEARDROP_CASE_STUDY_DESIGN.layout.featureColumns).toBe("repeat(4, minmax(0, 1fr))");
  });

  it("paints the full case study page with the pure white canvas tone", () => {
    const pageStart = css.indexOf(".neardrop-case-study-page {");
    expect(pageStart).toBeGreaterThan(-1);
    const pageBlock = css.slice(pageStart, css.indexOf(".neardrop-case-study-intro {", pageStart));
    expect(pageBlock).toContain(`background: ${NEARDROP_CASE_STUDY_DESIGN.colors.pageBackground}`);
  });

  it("applies mockup typography and colors to the centered brand-architecture intro", () => {
    const intro = ruleBlock(
      `.${NEARDROP_CASE_STUDY_INTRO_SECTION_CLASS} {`,
      `.${NEARDROP_CASE_STUDY_INTRO_INNER_CLASS} {`,
    );
    expect(intro).toContain("text-align: left");

    const inner = ruleBlock(
      `.${NEARDROP_CASE_STUDY_INTRO_INNER_CLASS} {`,
      `.neardrop-case-study-intro-copy {`,
    );
    expect(inner).toContain(`max-width: ${NEARDROP_CASE_STUDY_DESIGN.layout.introInnerMaxWidth}`);

    const kicker = ruleBlock(`.${NEARDROP_CASE_STUDY_KICKER_CLASS} {`, `.${NEARDROP_CASE_STUDY_TITLE_CLASS} {`);
    expect(kicker).toContain(`font-weight: ${NEARDROP_CASE_STUDY_DESIGN.typography.kickerWeight}`);
    expect(kicker).toContain(`color: ${NEARDROP_CASE_STUDY_DESIGN.colors.primary}`);
    expect(kicker).toContain(`background: ${NEARDROP_CASE_STUDY_DESIGN.colors.kickerSurface}`);

    const title = ruleBlock(`.${NEARDROP_CASE_STUDY_TITLE_CLASS} {`, `.neardrop-case-study-title-lead {`);
    expect(title).toContain(`font-weight: ${NEARDROP_CASE_STUDY_DESIGN.typography.titleWeight}`);

    const titleAccent = ruleBlock(
      `.${NEARDROP_CASE_STUDY_TITLE_ACCENT_CLASS} {`,
      `.${NEARDROP_CASE_STUDY_DESCRIPTION_CLASS} {`,
    );
    expect(titleAccent).toContain(`color: ${NEARDROP_CASE_STUDY_DESIGN.colors.primary}`);

    const description = ruleBlock(
      `.${NEARDROP_CASE_STUDY_DESCRIPTION_CLASS} {`,
      `.neardrop-case-study-intro-stack {`,
    );
    expect(description).toContain(`color: ${NEARDROP_CASE_STUDY_DESIGN.colors.body}`);
  });

  it("styles the technical architecture four-pillar grid", () => {
    const kicker = ruleBlock(
      `.${NEARDROP_CASE_STUDY_ARCHITECTURE_KICKER_CLASS} {`,
      `.${NEARDROP_CASE_STUDY_ARCHITECTURE_HEADING_CLASS} {`,
    );
    expect(kicker).toContain(`color: ${NEARDROP_CASE_STUDY_DESIGN.colors.goldLabel}`);

    const heading = ruleBlock(
      `.${NEARDROP_CASE_STUDY_ARCHITECTURE_HEADING_CLASS} {`,
      `.${NEARDROP_CASE_STUDY_ARCHITECTURE_BODY_CLASS} {`,
    );
    expect(heading).toContain(`font-weight: ${NEARDROP_CASE_STUDY_DESIGN.typography.titleWeight}`);

    const body = ruleBlock(
      `.${NEARDROP_CASE_STUDY_ARCHITECTURE_BODY_CLASS} {`,
      `.${NEARDROP_CASE_STUDY_ARCHITECTURE_GRID_CLASS} {`,
    );
    expect(body).toContain(`color: ${NEARDROP_CASE_STUDY_DESIGN.colors.body}`);

    const grid = ruleBlock(
      `.${NEARDROP_CASE_STUDY_ARCHITECTURE_GRID_CLASS} {`,
      `.neardrop-case-study-architecture-item {`,
    );
    expect(grid).toContain(`grid-template-columns: ${NEARDROP_CASE_STUDY_DESIGN.layout.architectureColumns}`);

    const icon = ruleBlock(
      `.${NEARDROP_CASE_STUDY_ARCHITECTURE_ITEM_ICON_CLASS} {`,
      `.neardrop-case-study-architecture-item-title {`,
    );
    expect(icon).toContain("border-radius: 999px");
    expect(icon).toContain(`color: ${NEARDROP_CASE_STUDY_DESIGN.colors.primary}`);
  });

  it("styles the functional excellence feature grid with matching white cards", () => {
    const section = ruleBlock(
      `.${NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_SECTION_CLASS} {`,
      `.neardrop-case-study-functional-excellence-header {`,
    );
    expect(section).toContain("padding:");

    const heading = ruleBlock(
      `.${NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_HEADING_CLASS} {`,
      `.neardrop-case-study-functional-excellence-description {`,
    );
    expect(heading).toContain(`color: ${NEARDROP_CASE_STUDY_DESIGN.colors.primary}`);

    const count = ruleBlock(
      `.${NEARDROP_CASE_STUDY_FUNCTIONAL_EXCELLENCE_COUNT_CLASS} {`,
      `.${NEARDROP_CASE_STUDY_FEATURE_GRID_CLASS} {`,
    );
    expect(count).toContain(`color: ${NEARDROP_CASE_STUDY_DESIGN.colors.featureCount}`);

    const featureGrid = ruleBlock(
      `.${NEARDROP_CASE_STUDY_FEATURE_GRID_CLASS} {`,
      `.neardrop-case-study-feature-card {`,
    );
    expect(featureGrid).toContain(`grid-template-columns: ${NEARDROP_CASE_STUDY_DESIGN.layout.featureColumns}`);

    const featureCard = ruleBlock(
      `.neardrop-case-study-feature-card {`,
      `.neardrop-case-study-feature-icon {`,
    );
    expect(featureCard).toContain("border-radius: 22px");
    expect(css).not.toContain(".neardrop-case-study-feature-card--highlight");
    expect(css).not.toContain(".neardrop-case-study-feature-watermark");
  });

  it("styles the precision execution process band with a split layout and white step cards", () => {
    const section = ruleBlock(
      `.${NEARDROP_CASE_STUDY_EXECUTION_SECTION_CLASS} {`,
      `.${NEARDROP_CASE_STUDY_EXECUTION_LAYOUT_CLASS} {`,
    );
    expect(section).toContain(`background: ${NEARDROP_CASE_STUDY_DESIGN.colors.executionSurface}`);

    const kicker = ruleBlock(
      `.${NEARDROP_CASE_STUDY_EXECUTION_KICKER_CLASS} {`,
      `.${NEARDROP_CASE_STUDY_EXECUTION_HEADING_CLASS} {`,
    );
    expect(kicker).toContain(`color: ${NEARDROP_CASE_STUDY_DESIGN.colors.primary}`);

    const heading = ruleBlock(
      `.${NEARDROP_CASE_STUDY_EXECUTION_HEADING_CLASS} {`,
      `.${NEARDROP_CASE_STUDY_EXECUTION_DESCRIPTION_CLASS} {`,
    );
    expect(heading).toContain(`font-weight: ${NEARDROP_CASE_STUDY_DESIGN.typography.titleWeight}`);

    const layout = ruleBlock(
      `.${NEARDROP_CASE_STUDY_EXECUTION_LAYOUT_CLASS} {`,
      `.neardrop-case-study-execution-copy {`,
    );
    expect(layout).toContain(`grid-template-columns: ${NEARDROP_CASE_STUDY_DESIGN.layout.executionSplit}`);

    const item = ruleBlock(
      `.${NEARDROP_CASE_STUDY_EXECUTION_ITEM_CLASS} {`,
      `.neardrop-case-study-execution-number {`,
    );
    expect(item).toContain("background: transparent");
  });

  it("styles the light bottom CTA banner", () => {
    const section = ruleBlock(
      `.${NEARDROP_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS} {`,
      `.${NEARDROP_CASE_STUDY_BOTTOM_CTA_PANEL_CLASS} {`,
    );
    expect(section).toContain("padding:");

    const panel = ruleBlock(
      `.${NEARDROP_CASE_STUDY_BOTTOM_CTA_PANEL_CLASS} {`,
      `.${NEARDROP_CASE_STUDY_BOTTOM_CTA_INNER_CLASS} {`,
    );
    expect(panel).toContain(`background: ${NEARDROP_CASE_STUDY_DESIGN.layout.bottomCtaGradient}`);
    expect(panel).toContain(`border-radius: ${NEARDROP_CASE_STUDY_DESIGN.layout.bottomCtaRadius}`);

    const title = ruleBlock(
      `.${NEARDROP_CASE_STUDY_BOTTOM_CTA_TITLE_CLASS} {`,
      `.neardrop-case-study-bottom-cta-subtext {`,
    );
    expect(title).toContain(`color: ${NEARDROP_CASE_STUDY_DESIGN.colors.bottomCtaText}`);

    const primaryBtn = ruleBlock(
      `.${NEARDROP_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS} {`,
      `.neardrop-case-study-bottom-cta-btn--secondary {`,
    );
    expect(primaryBtn).toContain(`background: ${NEARDROP_CASE_STUDY_DESIGN.colors.bottomCtaPrimaryBackground}`);
    expect(primaryBtn).toContain(`color: ${NEARDROP_CASE_STUDY_DESIGN.colors.bottomCtaPrimaryText}`);
  });
});
