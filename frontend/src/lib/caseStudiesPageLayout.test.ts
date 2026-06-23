import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  CASE_STUDY_AI_COPY_GAP,
  CASE_STUDY_AI_IMAGE_ASPECT_RATIO,
  CASE_STUDY_AI_IMAGE_BORDER_RADIUS,
  CASE_STUDY_AI_IMAGE_HEIGHT,
  CASE_STUDY_AI_IMAGE_MAX_HEIGHT,
  CASE_STUDY_AI_INNER_PADDING,
  CASE_STUDY_AI_MEDIA_OVERFLOW,
  CASE_STUDY_AI_MEDIA_PADDING_BLOCK_END,
  CASE_STUDY_AI_MEDIA_PADDING_BLOCK_START,
  CASE_STUDY_AI_MEDIA_PADDING_INLINE,
  CASE_STUDIES_PAGE_CLASS,
  CASE_STUDIES_BOTTOM_CTA_PRIMARY_CLASS,
  CASE_STUDIES_BOTTOM_CTA_SECONDARY_CLASS,
  CASE_STUDIES_GRID_CLASS,
  CASE_STUDIES_GRID_COLUMNS,
  CASE_STUDIES_GRID_GAP,
  CASE_STUDIES_INTRO_KICKER_CLASS,
  CASE_STUDY_CARD_BORDER_VAR,
  CASE_STUDY_CARD_CTA_ROW_CLASS,
  CASE_STUDY_CARD_SHOWCASE_CLASS,
  CASE_STUDY_CARD_GRID_NARROW_CLASS,
  CASE_STUDY_CARD_GRID_WIDE_CLASS,
  CASE_STUDY_CARD_HORIZONTAL_CLASS,
  CASE_STUDY_CARD_INNER_PADDING,
  CASE_STUDY_CARD_STACKED_CLASS,
  CASE_STUDY_COMMITERS_CARD_GRID_ROWS,
  CASE_STUDY_COMMITERS_COLUMN_GAP,
  CASE_STUDY_COMMITERS_COPY_PADDING,
  CASE_STUDY_COMMITERS_COPY_PADDING_BLOCK_END,
  CASE_STUDY_COMMITERS_COPY_PADDING_INLINE_END,
  CASE_STUDY_COMMITERS_COPY_GAP,
  CASE_STUDY_COMMITERS_CTA_PADDING_BLOCK_END,
  CASE_STUDY_COMMITERS_CTA_PADDING_INLINE_START,
  CASE_STUDY_COMMITERS_EDGE_INSET,
  CASE_STUDY_COMMITERS_GUTTER,
  CASE_STUDY_COMMITERS_IMAGE_BORDER_RADIUS,
  CASE_STUDY_COMMITERS_IMAGE_INSET,
  CASE_STUDY_COMMITERS_MEDIA_PADDING,
  CASE_STUDY_COMMITERS_MEDIA_PADDING_BLOCK_END,
  CASE_STUDY_COMMITERS_MEDIA_PADDING_INLINE_END,
  CASE_STUDY_COMMITERS_MEDIA_PADDING_INLINE_START,
  CASE_STUDY_COMMITERS_PROBLEM_SOLUTION_FLEX,
  CASE_STUDY_COMMITERS_PROBLEM_SOLUTION_GAP,
  CASE_STUDY_CARD_SQUARE_IMAGE_ASPECT_RATIO,
  CASE_STUDY_NEARDROP_IMAGE_ASPECT_RATIO,
  CASE_STUDY_NEARDROP_IMAGE_BORDER_RADIUS,
  CASE_STUDY_NEARDROP_MEDIA_OVERFLOW,
  CASE_STUDY_NEARDROP_PROBLEM_SOLUTION_FLEX,
  CASE_STUDY_DETAILS_LINK_CLASS,
  CASE_STUDY_PROBLEM_SOLUTION_ALIGN_CONTENT,
  CASE_STUDY_PROBLEM_SOLUTION_CLASS,
  CASE_STUDY_PROBLEM_SOLUTION_FLEX,
  CASE_STUDY_PROBLEM_SOLUTION_GAP,
  CASE_STUDY_STACKED_IMAGE_MAX_HEIGHT,
} from "./caseStudiesPageLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("caseStudiesPageLayout", () => {
  it("keeps the case studies route canvas on the void-first surface tone", () => {
    const page = ruleBlock(`.${CASE_STUDIES_PAGE_CLASS} {`, ".case-studies-intro-section {");
    expect(page).toContain("background: var(--surface-container-low)");
    const routeShell = ruleBlock('.route-shell[data-route="/case-studies"] {', ".route-transition {");
    expect(routeShell).toContain("background: var(--surface-container-low)");
    expect(routeShell).toContain("box-shadow: 0 0 0 100vmax var(--surface-container-low)");
    expect(routeShell).toContain("clip-path: inset(0 -100vmax)");
  });

  it("styles the three-column mosaic grid and blue OUR WORK kicker", () => {
    const kicker = ruleBlock(`.${CASE_STUDIES_INTRO_KICKER_CLASS} {`, `.${CASE_STUDIES_GRID_CLASS} {`);
    expect(kicker).toContain("color: var(--stitch-blue");

    const grid = ruleBlock(`.${CASE_STUDIES_GRID_CLASS} {`, `.${CASE_STUDY_CARD_GRID_WIDE_CLASS} {`);
    expect(grid).toContain(`grid-template-columns: ${CASE_STUDIES_GRID_COLUMNS}`);
    expect(grid).toContain(`gap: ${CASE_STUDIES_GRID_GAP}`);
  });

  it("styles wide/narrow spans, horizontal cards, links, and mockup CTA buttons", () => {
    const wide = ruleBlock(`.${CASE_STUDY_CARD_GRID_WIDE_CLASS} {`, `.${CASE_STUDY_CARD_GRID_NARROW_CLASS} {`);
    expect(wide).toContain("grid-column: span 2");

    const horizontal = ruleBlock(`.${CASE_STUDY_CARD_HORIZONTAL_CLASS} {`, `.${CASE_STUDY_CARD_STACKED_CLASS} {`);
    expect(horizontal).toContain("grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr)");

    const link = ruleBlock(`.${CASE_STUDY_DETAILS_LINK_CLASS} {`, ".case-studies-bottom-cta-btn {");
    expect(link).toContain("color: var(--stitch-blue");

    const primary = ruleBlock(`.${CASE_STUDIES_BOTTOM_CTA_PRIMARY_CLASS} {`, `.${CASE_STUDIES_BOTTOM_CTA_SECONDARY_CLASS} {`);
    expect(primary).toContain("background: var(--site-btn-band-primary-bg)");
    expect(primary).toContain("color: var(--site-btn-band-primary-text)");

    const secondary = ruleBlock(`.${CASE_STUDIES_BOTTOM_CTA_SECONDARY_CLASS} {`, ".stitch-services-grid-section {");
    expect(secondary).toContain("background: var(--site-btn-band-secondary-bg)");
    expect(secondary).toContain("border: 1px solid var(--site-btn-band-secondary-border)");
  });

  it("styles unified card padding, problem-solution copy, and portfolio image presentation", () => {
    const card = ruleBlock(".case-study-card {", ".case-study-card:hover {");
    expect(card).toContain(`border: 1px solid ${CASE_STUDY_CARD_BORDER_VAR}`);

    const cardCopy = ruleBlock(".case-study-card-copy {", ".case-study-card--stacked .case-study-card-copy {");
    expect(cardCopy).toContain(`padding: ${CASE_STUDY_CARD_INNER_PADDING}`);

    const cardMedia = ruleBlock(".case-study-card-media {", ".case-study-card--stacked .case-study-card-media {");
    expect(cardMedia).toContain(`padding: ${CASE_STUDY_CARD_INNER_PADDING}`);

    const stackedMedia = ruleBlock(
      ".case-study-card--stacked .case-study-card-media {",
      ".case-study-card--horizontal .case-study-card-media {",
    );
    expect(stackedMedia).toContain("border-bottom: none");

    const stackedImage = ruleBlock(
      ".case-study-card--stacked .case-study-card-image {",
      '.case-study-card[data-case-study-id="commiters"] .case-study-card-image {',
    );
    expect(stackedImage).toContain(`max-height: ${CASE_STUDY_STACKED_IMAGE_MAX_HEIGHT}`);

    const commitersImage = ruleBlock(
      '.case-study-card[data-case-study-id="commiters"] .case-study-card-image {',
      '.case-study-card[data-case-study-id="ai-summarizer"] .case-study-card-image {',
    );
    expect(commitersImage).toContain("aspect-ratio: 1 / 1");
    expect(commitersImage).toContain("border: none");

    const aiImage = ruleBlock(
      '.case-study-card[data-case-study-id="ai-summarizer"] .case-study-card-image {',
      ".case-study-tag-row {",
    );
    expect(aiImage).toContain(`height: ${CASE_STUDY_AI_IMAGE_HEIGHT}`);
    expect(aiImage).toContain(`max-height: ${CASE_STUDY_AI_IMAGE_MAX_HEIGHT}`);
    expect(aiImage).toContain("width: 100%");
    expect(aiImage).toContain("display: block");
    expect(aiImage).toContain(`aspect-ratio: ${CASE_STUDY_AI_IMAGE_ASPECT_RATIO}`);
    expect(aiImage).toContain("object-fit: cover");
    expect(aiImage).toContain(`border-radius: ${CASE_STUDY_AI_IMAGE_BORDER_RADIUS}`);

    const aiMedia = ruleBlock(
      '.case-study-card[data-case-study-id="ai-summarizer"] .case-study-card-media {',
      '.case-study-card[data-case-study-id="ai-summarizer"] .case-study-card-image {',
    );
    expect(aiMedia).toContain(`overflow: ${CASE_STUDY_AI_MEDIA_OVERFLOW}`);
    expect(aiMedia).toContain("align-items: stretch");
    expect(aiMedia).toContain(`padding-block-start: ${CASE_STUDY_AI_MEDIA_PADDING_BLOCK_START}`);
    expect(aiMedia).toContain(`padding-block-end: ${CASE_STUDY_AI_MEDIA_PADDING_BLOCK_END}`);
    expect(aiMedia).toContain(`padding-inline: ${CASE_STUDY_AI_MEDIA_PADDING_INLINE}`);
    expect(aiMedia).toContain("border-bottom: none");
    expect(aiMedia).not.toContain("padding: 0");

    const problemSolution = ruleBlock(
      ".case-study-problem-solution {\n  display: grid;",
      ".case-study-problem-solution p {",
    );
    expect(problemSolution).toContain("display: grid");
    expect(problemSolution).toContain(`gap: ${CASE_STUDY_PROBLEM_SOLUTION_GAP}`);
    expect(problemSolution).toContain(`flex: ${CASE_STUDY_PROBLEM_SOLUTION_FLEX}`);
    expect(problemSolution).toContain(`align-content: ${CASE_STUDY_PROBLEM_SOLUTION_ALIGN_CONTENT}`);
    expect(problemSolution).not.toContain("gap: 10px");

    expect(card).toContain("transition: transform 200ms ease");

    const cardHover = ruleBlock(".case-study-card:hover {", ".case-study-card--grid-wide {");
    expect(cardHover).toContain("transform: scale(1.01)");

    expect(CASE_STUDY_AI_MEDIA_PADDING_BLOCK_START).toBe(CASE_STUDY_CARD_INNER_PADDING);
    expect(CASE_STUDY_AI_MEDIA_PADDING_INLINE).toBe(CASE_STUDY_CARD_INNER_PADDING);
    expect(CASE_STUDY_AI_MEDIA_PADDING_BLOCK_END).toBe("0");
  });

  it("balances Commiters gutters and pins the CTA to the image baseline", () => {
    expect(CASE_STUDY_COMMITERS_GUTTER).toBe(CASE_STUDY_COMMITERS_COLUMN_GAP);
    expect(CASE_STUDY_COMMITERS_GUTTER).toBe(CASE_STUDY_COMMITERS_MEDIA_PADDING_INLINE_END);
    expect(CASE_STUDY_COMMITERS_COPY_PADDING).toBe(CASE_STUDY_COMMITERS_EDGE_INSET);
    expect(CASE_STUDY_COMMITERS_CTA_PADDING_BLOCK_END).toBe(CASE_STUDY_COMMITERS_EDGE_INSET);
    expect(CASE_STUDY_COMMITERS_MEDIA_PADDING_BLOCK_END).toBe(CASE_STUDY_COMMITERS_IMAGE_INSET);
    expect(CASE_STUDY_COMMITERS_MEDIA_PADDING_INLINE_START).toBe("0");

    const showcaseCard = ruleBlock(
      `.${CASE_STUDY_CARD_SHOWCASE_CLASS}.${CASE_STUDY_CARD_HORIZONTAL_CLASS} {`,
      `.${CASE_STUDY_CARD_SHOWCASE_CLASS} .case-study-card-copy--showcase {`,
    );
    expect(showcaseCard).toContain(`column-gap: ${CASE_STUDY_COMMITERS_COLUMN_GAP}`);
    expect(showcaseCard).toContain(`grid-template-rows: ${CASE_STUDY_COMMITERS_CARD_GRID_ROWS}`);
    expect(showcaseCard).toContain("align-items: stretch");

    const showcaseCopy = ruleBlock(
      `.${CASE_STUDY_CARD_SHOWCASE_CLASS} .case-study-card-copy--showcase {`,
      `.${CASE_STUDY_CARD_SHOWCASE_CLASS} .case-study-problem-solution {`,
    );
    expect(showcaseCopy).toContain("grid-column: 1");
    expect(showcaseCopy).toContain("grid-row: 1");
    expect(showcaseCopy).toContain("align-self: start");
    expect(showcaseCopy).toContain(`padding-block-start: ${CASE_STUDY_COMMITERS_COPY_PADDING}`);
    expect(showcaseCopy).toContain(`padding-block-end: ${CASE_STUDY_COMMITERS_COPY_PADDING_BLOCK_END}`);
    expect(showcaseCopy).toContain(`padding-inline-start: ${CASE_STUDY_COMMITERS_COPY_PADDING}`);
    expect(showcaseCopy).toContain(`padding-inline-end: ${CASE_STUDY_COMMITERS_COPY_PADDING_INLINE_END}`);
    expect(showcaseCopy).toContain("border: none");
    expect(showcaseCopy).not.toContain("border-right:");

    const showcaseCta = ruleBlock(
      `.${CASE_STUDY_CARD_SHOWCASE_CLASS} .${CASE_STUDY_CARD_CTA_ROW_CLASS} {`,
      '.case-study-card[data-case-study-id="neardrop-mvp"] .case-study-card-copy {',
    );
    expect(showcaseCta).toContain("grid-column: 1");
    expect(showcaseCta).toContain("grid-row: 1");
    expect(showcaseCta).toContain("align-self: end");
    expect(showcaseCta).toContain(`padding-inline-start: ${CASE_STUDY_COMMITERS_CTA_PADDING_INLINE_START}`);
    expect(showcaseCta).toContain(`padding-block-end: ${CASE_STUDY_COMMITERS_CTA_PADDING_BLOCK_END}`);
    expect(showcaseCta).toContain("border: none");
    expect(CASE_STUDY_COMMITERS_COPY_PADDING).toBe(CASE_STUDY_COMMITERS_CTA_PADDING_BLOCK_END);

    const showcaseProblemSolution = ruleBlock(
      `.${CASE_STUDY_CARD_SHOWCASE_CLASS} .case-study-problem-solution {`,
      `.${CASE_STUDY_CARD_SHOWCASE_CLASS} .case-study-card-cta-row {`,
    );
    expect(showcaseProblemSolution).not.toContain("gap:");
    expect(showcaseProblemSolution).toContain(`flex: ${CASE_STUDY_COMMITERS_PROBLEM_SOLUTION_FLEX}`);

    const showcaseMedia = ruleBlock(
      `.${CASE_STUDY_CARD_SHOWCASE_CLASS} .case-study-card-media--showcase {`,
      ".case-study-card-image {",
    );
    expect(showcaseMedia).toContain("grid-column: 2");
    expect(showcaseMedia).toContain("grid-row: 1");
    expect(showcaseMedia).toContain("align-self: start");
    expect(showcaseMedia).toContain(`padding-block-start: ${CASE_STUDY_COMMITERS_MEDIA_PADDING}`);
    expect(showcaseMedia).toContain(`padding-block-end: ${CASE_STUDY_COMMITERS_MEDIA_PADDING_BLOCK_END}`);
    expect(showcaseMedia).toContain(`padding-inline-start: ${CASE_STUDY_COMMITERS_MEDIA_PADDING_INLINE_START}`);
    expect(showcaseMedia).toContain(`padding-inline-end: ${CASE_STUDY_COMMITERS_MEDIA_PADDING_INLINE_END}`);
    expect(showcaseMedia).toContain("border: none");
    expect(showcaseMedia).not.toContain("border-left:");
    expect(showcaseMedia).not.toContain("padding: clamp");

    const commitersImage = ruleBlock(
      '.case-study-card[data-case-study-id="commiters"] .case-study-card-image {',
      '.case-study-card[data-case-study-id="ai-summarizer"] .case-study-card-image {',
    );
    expect(commitersImage).toContain("height: auto");
    expect(commitersImage).toContain("aspect-ratio: 1 / 1");
    expect(commitersImage).toContain(`border-radius: ${CASE_STUDY_COMMITERS_IMAGE_BORDER_RADIUS}`);
    expect(commitersImage).not.toContain("height: 100%");
    expect(commitersImage).not.toContain("min-height: 220px");
  });

  it("styles the NearDrop card with Commiters-sized square media", () => {
    expect(CASE_STUDY_NEARDROP_IMAGE_ASPECT_RATIO).toBe(CASE_STUDY_CARD_SQUARE_IMAGE_ASPECT_RATIO);

    const neardropProblemSolution = ruleBlock(
      '.case-study-card[data-case-study-id="neardrop-mvp"] .case-study-problem-solution {',
      '.case-study-card[data-case-study-id="neardrop-mvp"] .case-study-details-link {',
    );
    expect(neardropProblemSolution).not.toContain("gap:");
    expect(neardropProblemSolution).not.toContain("align-content:");
    expect(neardropProblemSolution).toContain(`flex: ${CASE_STUDY_NEARDROP_PROBLEM_SOLUTION_FLEX}`);

    const neardropMedia = ruleBlock(
      '.case-study-card[data-case-study-id="neardrop-mvp"] .case-study-card-media {',
      '.case-study-card[data-case-study-id="neardrop-mvp"] .case-study-card-image {',
    );
    expect(neardropMedia).toContain(`overflow: ${CASE_STUDY_NEARDROP_MEDIA_OVERFLOW}`);

    const neardropImage = ruleBlock(
      '.case-study-card[data-case-study-id="neardrop-mvp"] .case-study-card-image {',
      ".case-study-card-media {",
    );
    expect(neardropImage).toContain("height: auto");
    expect(neardropImage).toContain(`aspect-ratio: ${CASE_STUDY_NEARDROP_IMAGE_ASPECT_RATIO}`);
    expect(neardropImage).toContain(`border-radius: ${CASE_STUDY_NEARDROP_IMAGE_BORDER_RADIUS}`);
    expect(neardropImage).toContain("border: none");
    expect(neardropImage).not.toContain("height: 100%");
    expect(neardropImage).not.toContain("min-height: 220px");
  });

  it("uses one shared one-line gap between problem and solution on every project card", () => {
    expect(CASE_STUDY_PROBLEM_SOLUTION_GAP).toBe("1lh");
    expect(CASE_STUDY_COMMITERS_PROBLEM_SOLUTION_GAP).toBe(CASE_STUDY_PROBLEM_SOLUTION_GAP);
    expect(CASE_STUDY_COMMITERS_PROBLEM_SOLUTION_FLEX).toBe(CASE_STUDY_PROBLEM_SOLUTION_FLEX);

    const perProjectGapOverrides = css.match(
      /\.case-study-card(?:\[data-case-study-id="[^"]+"\]|--showcase)[^{]*\.case-study-problem-solution[^{]*\{[^}]*gap:/g,
    );
    expect(perProjectGapOverrides).toBeNull();
  });

  it("matches Commiters problem-solution spacing on stacked portfolio cards", () => {
    const multiRoleCrmProblemSolution = css.match(
      /\.case-study-card\[data-case-study-id="multi-role-crm"\][^{]*\.case-study-problem-solution\s*\{/,
    );
    expect(multiRoleCrmProblemSolution).toBeNull();
  });

  it("keeps the AI Summarizer card on a uniform surface with equal copy spacing", () => {
    const aiCopy = ruleBlock(
      '.case-study-card[data-case-study-id="ai-summarizer"] .case-study-card-copy {',
      '.case-study-card[data-case-study-id="ai-summarizer"] .case-study-card-media {',
    );
    expect(aiCopy).toContain(`padding: ${CASE_STUDY_AI_INNER_PADDING}`);
    expect(aiCopy).toContain(`gap: ${CASE_STUDY_AI_COPY_GAP}`);
    expect(aiCopy).toContain("background: #ffffff");

    const aiMedia = ruleBlock(
      '.case-study-card[data-case-study-id="ai-summarizer"] .case-study-card-media {',
      '.case-study-card[data-case-study-id="ai-summarizer"] .case-study-card-image {',
    );
    expect(aiMedia).toContain("background: #ffffff");
    expect(aiMedia).toContain(`overflow: ${CASE_STUDY_AI_MEDIA_OVERFLOW}`);
    expect(aiMedia).toContain(`padding-block-start: ${CASE_STUDY_AI_MEDIA_PADDING_BLOCK_START}`);
    expect(aiMedia).toContain(`padding-inline: ${CASE_STUDY_AI_MEDIA_PADDING_INLINE}`);
    expect(aiMedia).toContain(`padding-block-end: ${CASE_STUDY_AI_MEDIA_PADDING_BLOCK_END}`);
    expect(aiMedia).toContain("box-sizing: border-box");
  });
});
