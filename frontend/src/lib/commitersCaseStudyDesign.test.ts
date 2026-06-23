import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { COMMITERS_CASE_STUDY_DESIGN, COMMITERS_CASE_STUDY_STITCH_PREVIEW_NODE_ID } from "./commitersCaseStudyDesign";
import { PRECISION_MINIMALIST_DESIGN } from "./precisionMinimalistDesign";
import { ROUTES } from "./routes";
import {
  COMMITERS_CASE_STUDY_ARCHITECTURE_GRID_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_HEADING_CLASS,
  COMMITERS_CASE_STUDY_CORE_STACK_ICON_CLASS,
  COMMITERS_CASE_STUDY_FEATURE_CARD_CLASS,
  COMMITERS_CASE_STUDY_FEATURE_GRID_CLASS,
  COMMITERS_CASE_STUDY_FEATURE_ICON_CLASS,
  COMMITERS_CASE_STUDY_FEATURE_TITLE_CLASS,
  COMMITERS_CASE_STUDY_INTRO_SECTION_CLASS,
  COMMITERS_CASE_STUDY_KICKER_CLASS,
  COMMITERS_CASE_STUDY_OVERVIEW_GRID_CLASS,
  COMMITERS_CASE_STUDY_SUBTITLE_CLASS,
  COMMITERS_CASE_STUDY_TITLE_CLASS,
} from "./commitersCaseStudyLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("commitersCaseStudyDesign", () => {
  it("documents the Stitch preview node and full-page layout tokens", () => {
    expect(COMMITERS_CASE_STUDY_STITCH_PREVIEW_NODE_ID).toBe("9c5a098357224deba640da56a7622e8f");
    expect(COMMITERS_CASE_STUDY_DESIGN.layout.mainColumnRatio).toBe("minmax(0, 7fr) minmax(0, 3fr)");
    expect(COMMITERS_CASE_STUDY_DESIGN.layout.architectureColumnRatio).toBe("minmax(0, 1fr) minmax(0, 2fr)");
    expect(COMMITERS_CASE_STUDY_DESIGN.layout.featureColumns).toBe("repeat(3, minmax(0, 1fr))");
    expect(COMMITERS_CASE_STUDY_DESIGN.colors.pageBackground).toBe(
      PRECISION_MINIMALIST_DESIGN.colors.surfaceContainerLow,
    );
    expect(COMMITERS_CASE_STUDY_DESIGN.colors.goldLabel).toBe("#9a7b4f");
    expect(COMMITERS_CASE_STUDY_DESIGN.colors.cardLabel).toBe(PRECISION_MINIMALIST_DESIGN.colors.primary);
    expect(COMMITERS_CASE_STUDY_DESIGN.colors.featureIconSurface).toBe("rgba(0, 102, 255, 0.08)");
  });

  it("extends the void-first canvas through the route shell on the detail page", () => {
    const routeShell = css.slice(
      css.indexOf(`.route-shell[data-route="${ROUTES.commitersCaseStudy}"] {`),
      css.indexOf(".route-transition {"),
    );
    expect(routeShell).toContain("background: var(--surface-container-low)");
    expect(routeShell).toContain("box-shadow: 0 0 0 100vmax var(--surface-container-low)");
    expect(routeShell).toContain("clip-path: inset(0 -100vmax)");
  });

  it("paints the full case study page with the soft off-white canvas tone", () => {
    const pageStart = css.indexOf(".commiters-case-study-page {");
    expect(pageStart).toBeGreaterThan(-1);
    const pageBlock = css.slice(pageStart, css.indexOf(".commiters-case-study-intro {", pageStart));
    expect(pageBlock).toContain("background: var(--surface-container-low)");
  });

  it("applies mockup typography and colors to the intro header band", () => {
    const intro = ruleBlock(
      `.${COMMITERS_CASE_STUDY_INTRO_SECTION_CLASS} {`,
      `.${COMMITERS_CASE_STUDY_KICKER_CLASS} {`,
    );
    expect(intro).toContain("text-align: left");
    expect(intro).toContain(`border-bottom: 1px solid ${COMMITERS_CASE_STUDY_DESIGN.colors.divider}`);

    const kicker = ruleBlock(`.${COMMITERS_CASE_STUDY_KICKER_CLASS} {`, `.${COMMITERS_CASE_STUDY_TITLE_CLASS} {`);
    expect(kicker).toContain(`font-weight: ${COMMITERS_CASE_STUDY_DESIGN.typography.kickerWeight}`);
    expect(kicker).toContain(`color: var(--brand-gold`);

    const title = ruleBlock(`.${COMMITERS_CASE_STUDY_TITLE_CLASS} {`, `.${COMMITERS_CASE_STUDY_SUBTITLE_CLASS} {`);
    expect(title).toContain(`font-weight: ${COMMITERS_CASE_STUDY_DESIGN.typography.titleWeight}`);
    expect(title).toContain(`color: ${COMMITERS_CASE_STUDY_DESIGN.colors.title}`);
    expect(title).toContain(`letter-spacing: ${COMMITERS_CASE_STUDY_DESIGN.typography.titleLetterSpacing}`);

    const subtitle = ruleBlock(
      `.${COMMITERS_CASE_STUDY_SUBTITLE_CLASS} {`,
      `.commiters-case-study-overview-section {`,
    );
    expect(subtitle).toContain(`color: ${COMMITERS_CASE_STUDY_DESIGN.colors.subtitle}`);
  });

  it("uses a 70/30 overview grid and elevated core-stack icon tiles", () => {
    const grid = ruleBlock(
      `.${COMMITERS_CASE_STUDY_OVERVIEW_GRID_CLASS} {`,
      `.commiters-case-study-overview-heading {`,
    );
    expect(grid).toContain(`grid-template-columns: ${COMMITERS_CASE_STUDY_DESIGN.layout.mainColumnRatio}`);

    const icon = ruleBlock(
      `.${COMMITERS_CASE_STUDY_CORE_STACK_ICON_CLASS} {`,
      `.commiters-case-study-architecture-section {`,
    );
    expect(icon).toContain("box-shadow:");
    expect(icon).toContain("background: #ffffff");
  });

  it("styles the technical architecture band like the Stitch mockup", () => {
    const architectureGrid = ruleBlock(
      `.${COMMITERS_CASE_STUDY_ARCHITECTURE_GRID_CLASS} {`,
      `.commiters-case-study-architecture-list {`,
    );
    expect(architectureGrid).toContain(
      `grid-template-columns: ${COMMITERS_CASE_STUDY_DESIGN.layout.architectureColumnRatio}`,
    );

    const architectureHeading = ruleBlock(
      `.${COMMITERS_CASE_STUDY_ARCHITECTURE_HEADING_CLASS} {`,
      `.commiters-case-study-architecture-list {`,
    );
    expect(architectureHeading).toContain("font-family: var(--font-display)");
  });

  it("styles the feature highlights like the Stitch mockup", () => {
    const featureGrid = ruleBlock(
      `.${COMMITERS_CASE_STUDY_FEATURE_GRID_CLASS} {`,
      `.${COMMITERS_CASE_STUDY_FEATURE_CARD_CLASS} {`,
    );
    expect(featureGrid).toContain(`grid-template-columns: ${COMMITERS_CASE_STUDY_DESIGN.layout.featureColumns}`);

    const featureCard = ruleBlock(
      `.${COMMITERS_CASE_STUDY_FEATURE_CARD_CLASS} {`,
      `.${COMMITERS_CASE_STUDY_FEATURE_ICON_CLASS} {`,
    );
    expect(featureCard).toContain(`border-right: 1px solid ${COMMITERS_CASE_STUDY_DESIGN.colors.divider}`);
    expect(featureCard).toContain(":not(:last-child)");

    const featureIcon = ruleBlock(
      `.${COMMITERS_CASE_STUDY_FEATURE_ICON_CLASS} {`,
      `.${COMMITERS_CASE_STUDY_FEATURE_TITLE_CLASS} {`,
    );
    expect(featureIcon).toContain(`background: ${COMMITERS_CASE_STUDY_DESIGN.colors.featureIconSurface}`);
    expect(featureIcon).toContain("color: var(--stitch-blue");
  });
});
