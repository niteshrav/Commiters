import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  CASE_STUDIES_PAGE_CLASS,
  CASE_STUDIES_PAGE_MAX_WIDTH,
  CASE_STUDIES_BOTTOM_CTA_PRIMARY_CLASS,
  CASE_STUDIES_BOTTOM_CTA_SECONDARY_CLASS,
  CASE_STUDIES_FEATURED_CLASS,
  CASE_STUDIES_GRID_CLASS,
  CASE_STUDIES_GRID_COLUMNS,
  CASE_STUDIES_GRID_GAP,
  CASE_STUDIES_INTRO_KICKER_CLASS,
  CASE_STUDY_CARD_BORDER_VAR,
  CASE_STUDY_CARD_INNER_PADDING,
  CASE_STUDY_CARD_RADIUS,
  CASE_STUDY_DETAILS_LINK_CLASS,
  CASE_STUDY_FEATURED_COLUMNS,
  CASE_STUDY_HORIZONTAL_IMAGE_ASPECT_RATIO,
  CASE_STUDY_PROBLEM_SOLUTION_CLASS,
  CASE_STUDY_PROBLEM_SOLUTION_GAP,
  CASE_STUDY_STACKED_IMAGE_MAX_HEIGHT,
} from "./caseStudiesPageLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8").replace(/\r\n/g, "\n");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("caseStudiesPageLayout", () => {
  it("keeps the case studies route canvas on a centered light surface", () => {
    const page = ruleBlock(`.${CASE_STUDIES_PAGE_CLASS} {`, ".technical-ledger-page {");
    expect(page).toContain("background: var(--surface-container-low)");
    expect(page).toContain("width: 100%");
    expect(page).toContain(`max-width: ${CASE_STUDIES_PAGE_MAX_WIDTH}`);
    expect(page).toContain("padding-left: var(--site-gutter)");
    expect(page).toContain("padding-right: var(--site-gutter)");
    const routeShell = ruleBlock('.route-shell[data-route="/work"] {', ".route-transition {");
    expect(routeShell).toContain("background: var(--surface-container-low)");
    expect(routeShell).toContain("box-shadow: 0 0 0 100vmax var(--surface-container-low)");
    expect(routeShell).toContain("clip-path: inset(0 -100vmax)");
  });

  it("styles the featured stack and three-column compact grid", () => {
    const kicker = ruleBlock(`.${CASE_STUDIES_INTRO_KICKER_CLASS} {`, `.${CASE_STUDIES_GRID_CLASS} {`);
    expect(kicker).toContain("color: var(--stitch-blue");

    const featured = ruleBlock(`.${CASE_STUDIES_FEATURED_CLASS} {`, `.${CASE_STUDIES_GRID_CLASS} {`);
    expect(featured).toContain("grid-template-columns: 1fr");
    expect(featured).toContain("gap: 22px");

    const grid = ruleBlock(`.${CASE_STUDIES_GRID_CLASS} {`, ".case-study-card {");
    expect(grid).toContain(`grid-template-columns: ${CASE_STUDIES_GRID_COLUMNS}`);
    expect(grid).toContain(`gap: ${CASE_STUDIES_GRID_GAP}`);
  });

  it("styles featured 45/55 cards, stacked compact cards, links, and CTA buttons", () => {
    const horizontal = ruleBlock(".case-study-card--horizontal {", ".case-study-card--showcase.case-study-card--horizontal {");
    expect(horizontal).toContain(`grid-template-columns: ${CASE_STUDY_FEATURED_COLUMNS}`);
    expect(horizontal).toContain("align-items: stretch");

    const link = ruleBlock(`.${CASE_STUDY_DETAILS_LINK_CLASS} {`, ".case-studies-bottom-cta-btn {");
    expect(link).toContain("color: var(--stitch-blue");

    const primary = ruleBlock(`.${CASE_STUDIES_BOTTOM_CTA_PRIMARY_CLASS} {`, `.${CASE_STUDIES_BOTTOM_CTA_SECONDARY_CLASS} {`);
    expect(primary).toContain("background: var(--site-btn-band-primary-bg)");
    expect(primary).toContain("color: var(--site-btn-band-primary-text)");

    const secondary = ruleBlock(`.${CASE_STUDIES_BOTTOM_CTA_SECONDARY_CLASS} {`, ".commiters-case-study-page {");
    expect(secondary).toContain("background: var(--site-btn-band-secondary-bg)");
    expect(secondary).toContain("border: 1px solid var(--site-btn-band-secondary-border)");
  });

  it("styles unified card padding, problem-solution copy, and portfolio image presentation", () => {
    const card = ruleBlock(".case-study-card {", ".case-study-card:hover {");
    expect(card).toContain(`border: 1px solid ${CASE_STUDY_CARD_BORDER_VAR}`);
    expect(card).toContain(`border-radius: ${CASE_STUDY_CARD_RADIUS}`);

    const cardCopy = ruleBlock(".case-study-card-copy {", ".case-study-card--stacked .case-study-card-copy {");
    expect(cardCopy).toContain(`padding: ${CASE_STUDY_CARD_INNER_PADDING}`);

    const stackedImage = ruleBlock(
      ".case-study-card--stacked .case-study-card-image {",
      '.case-study-card[data-case-study-id="commiters"] .case-study-card-image',
    );
    expect(stackedImage).toContain(`max-height: ${CASE_STUDY_STACKED_IMAGE_MAX_HEIGHT}`);
    expect(stackedImage).toContain("aspect-ratio: 16 / 10");

    const horizontalImage = ruleBlock(
      ".case-study-card--horizontal:not(.case-study-card--showcase) .case-study-card-image {",
      ".case-study-card--showcase .case-study-card-copy--showcase {",
    );
    expect(horizontalImage).toContain("object-fit: cover");
    expect(horizontalImage).not.toContain("height: auto");

    const problemSolution = ruleBlock(
      ".case-study-problem-solution {\n  display: grid;",
      ".case-study-problem-solution p {",
    );
    expect(problemSolution).toContain("display: grid");
    expect(problemSolution).toContain(`gap: ${CASE_STUDY_PROBLEM_SOLUTION_GAP}`);

    const cardHover = ruleBlock(".case-study-card:hover {", ".case-study-card--grid-wide {");
    expect(cardHover).toContain("transform: translateY(-2px)");
  });

  it("uses one shared one-line gap between problem and solution on every project card", () => {
    expect(CASE_STUDY_PROBLEM_SOLUTION_GAP).toBe("1lh");
    expect(CASE_STUDY_HORIZONTAL_IMAGE_ASPECT_RATIO).toBe("16 / 10");
  });
});
