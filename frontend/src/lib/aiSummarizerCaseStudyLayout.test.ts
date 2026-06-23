import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { AI_SUMMARIZER_CASE_STUDY_DESIGN } from "./aiSummarizerCaseStudyDesign";
import {
  AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_BADGE_DARK_CLASS,
  AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_CARD_CLASS,
  AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_GRID_CLASS,
  AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_HEADING_CLASS,
  AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_ICON_CLASS,
  AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_SECTION_CLASS,
  AI_SUMMARIZER_CASE_STUDY_EXECUTION_HEADING_CLASS,
  AI_SUMMARIZER_CASE_STUDY_EXECUTION_ICON_CLASS,
  AI_SUMMARIZER_CASE_STUDY_EXECUTION_ITEM_CLASS,
  AI_SUMMARIZER_CASE_STUDY_EXECUTION_LIST_CLASS,
  AI_SUMMARIZER_CASE_STUDY_EXECUTION_SECTION_CLASS,
  AI_SUMMARIZER_CASE_STUDY_HERO_IMAGE_CLASS,
  AI_SUMMARIZER_CASE_STUDY_INTRO_COPY_CLASS,
  AI_SUMMARIZER_CASE_STUDY_INTRO_SECTION_CLASS,
  AI_SUMMARIZER_CASE_STUDY_INTRO_SPLIT_CLASS,
  AI_SUMMARIZER_CASE_STUDY_KICKER_CLASS,
  AI_SUMMARIZER_CASE_STUDY_METADATA_ITEM_CLASS,
  AI_SUMMARIZER_CASE_STUDY_METADATA_LABEL_CLASS,
  AI_SUMMARIZER_CASE_STUDY_METADATA_LIST_CLASS,
  AI_SUMMARIZER_CASE_STUDY_METADATA_PANEL_CLASS,
  AI_SUMMARIZER_CASE_STUDY_PAGE_CLASS,
  AI_SUMMARIZER_CASE_STUDY_TECH_STACK_CELL_CLASS,
  AI_SUMMARIZER_CASE_STUDY_TECH_STACK_CELL_LABEL_CLASS,
  AI_SUMMARIZER_CASE_STUDY_TECH_STACK_GRID_CLASS,
  AI_SUMMARIZER_CASE_STUDY_TECH_STACK_LAYOUT_CLASS,
  AI_SUMMARIZER_CASE_STUDY_TITLE_CLASS,
} from "./aiSummarizerCaseStudyLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("aiSummarizerCaseStudyLayout", () => {
  it("styles the structured introduction hero", () => {
    const page = ruleBlock(`.${AI_SUMMARIZER_CASE_STUDY_PAGE_CLASS} {`, `.${AI_SUMMARIZER_CASE_STUDY_INTRO_SECTION_CLASS} {`);
    expect(page).toContain(`background: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.pageBackground}`);

    const introSplit = ruleBlock(
      `.${AI_SUMMARIZER_CASE_STUDY_INTRO_SPLIT_CLASS} {`,
      `.${AI_SUMMARIZER_CASE_STUDY_INTRO_COPY_CLASS} {`,
    );
    expect(introSplit).toContain(`grid-template-columns: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.layout.heroSplit}`);

    const kicker = ruleBlock(`.${AI_SUMMARIZER_CASE_STUDY_KICKER_CLASS} {`, `.${AI_SUMMARIZER_CASE_STUDY_TITLE_CLASS} {`);
    expect(kicker).toContain(`color: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.primary}`);

    const metadataPanel = ruleBlock(
      `.${AI_SUMMARIZER_CASE_STUDY_METADATA_PANEL_CLASS} {`,
      `.${AI_SUMMARIZER_CASE_STUDY_METADATA_LIST_CLASS} {`,
    );
    expect(metadataPanel).not.toContain("background:");

    const metadataDivider = ruleBlock(
      `.${AI_SUMMARIZER_CASE_STUDY_METADATA_ITEM_CLASS}:not(:last-child) {`,
      `.${AI_SUMMARIZER_CASE_STUDY_METADATA_LABEL_CLASS} {`,
    );
    expect(metadataDivider).toContain(`border-bottom: 1px solid ${AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.divider}`);

    const heroImage = ruleBlock(
      `.${AI_SUMMARIZER_CASE_STUDY_HERO_IMAGE_CLASS} {`,
      `.${AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_SECTION_CLASS} {`,
    );
    expect(heroImage).toContain("width: 100%");
    expect(heroImage).toContain(`aspect-ratio: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.layout.heroAspectRatio}`);
    expect(heroImage).toContain("object-fit: cover");
  });

  it("styles the bordered core architecture and tech stack grids", () => {
    const architectureHeading = ruleBlock(
      `.${AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_HEADING_CLASS} {`,
      `.${AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_GRID_CLASS} {`,
    );
    expect(architectureHeading).toContain(`color: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.sectionHeading}`);

    const architectureGrid = ruleBlock(
      `.${AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_GRID_CLASS} {`,
      `.${AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_CARD_CLASS} {`,
    );
    expect(architectureGrid).toContain(`grid-template-columns: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.layout.architectureColumns}`);
    expect(architectureGrid).toContain(`border-top: 1px solid ${AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.divider}`);

    const architectureCard = ruleBlock(
      `.${AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_CARD_CLASS} {`,
      `.${AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_ICON_CLASS} {`,
    );
    expect(architectureCard).toContain(`padding: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.layout.cardPadding}`);
    expect(architectureCard).not.toContain("box-shadow:");

    const architectureIcon = ruleBlock(
      `.${AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_ICON_CLASS} {`,
      `.ai-summarizer-case-study-architecture-card-title {`,
    );
    expect(architectureIcon).toContain(`color: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.accentBlue}`);

    const badge = ruleBlock(
      `.ai-summarizer-case-study-architecture-badge {`,
      `.ai-summarizer-case-study-architecture-badge--dark {`,
    );
    expect(badge).toContain(`font-size: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.typography.badgeFontSize}`);

    const badgeDark = ruleBlock(
      `.${AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_BADGE_DARK_CLASS} {`,
      `.ai-summarizer-case-study-architecture-badge--light {`,
    );
    expect(badgeDark).toContain(`background: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.badgeDarkBackground}`);

    const techStackLayout = ruleBlock(
      `.${AI_SUMMARIZER_CASE_STUDY_TECH_STACK_LAYOUT_CLASS} {`,
      `.ai-summarizer-case-study-tech-stack-copy {`,
    );
    expect(techStackLayout).toContain(`grid-template-columns: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.layout.techStackSplit}`);

    const techStackGrid = ruleBlock(
      `.${AI_SUMMARIZER_CASE_STUDY_TECH_STACK_GRID_CLASS} {`,
      `.${AI_SUMMARIZER_CASE_STUDY_TECH_STACK_CELL_CLASS} {`,
    );
    expect(techStackGrid).toContain(`grid-template-columns: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.layout.techStackGridColumns}`);

    const techStackCellLabel = ruleBlock(
      `.${AI_SUMMARIZER_CASE_STUDY_TECH_STACK_CELL_LABEL_CLASS} {`,
      `.ai-summarizer-case-study-tech-stack-cell-title {`,
    );
    expect(techStackCellLabel).toContain(`color: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.accentBlue}`);
    expect(css).not.toContain(".ai-summarizer-case-study-tech-stack-cta");
  });

  it("styles the execution strategy checklist", () => {
    const executionSection = ruleBlock(
      `.${AI_SUMMARIZER_CASE_STUDY_EXECUTION_SECTION_CLASS} {`,
      `.${AI_SUMMARIZER_CASE_STUDY_EXECUTION_HEADING_CLASS} {`,
    );
    expect(executionSection).toContain(`background: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.pageBackground}`);
    expect(executionSection).not.toContain("band-breakout");

    const executionHeading = ruleBlock(
      `.${AI_SUMMARIZER_CASE_STUDY_EXECUTION_HEADING_CLASS} {`,
      `.${AI_SUMMARIZER_CASE_STUDY_EXECUTION_LIST_CLASS} {`,
    );
    expect(executionHeading).toContain(`color: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.sectionHeading}`);
    expect(executionHeading).toContain(`font-weight: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.typography.sectionHeadingWeight}`);

    const executionList = ruleBlock(
      `.${AI_SUMMARIZER_CASE_STUDY_EXECUTION_LIST_CLASS} {`,
      `.${AI_SUMMARIZER_CASE_STUDY_EXECUTION_ITEM_CLASS} {`,
    );
    expect(executionList).toContain(`gap: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.layout.executionItemGap}`);

    const executionIcon = ruleBlock(
      `.${AI_SUMMARIZER_CASE_STUDY_EXECUTION_ICON_CLASS} {`,
      `.ai-summarizer-case-study-execution-item-copy {`,
    );
    expect(executionIcon).toContain(`color: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.accentBlue}`);
  });
});
