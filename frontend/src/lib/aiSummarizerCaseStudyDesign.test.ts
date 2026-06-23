import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  AI_SUMMARIZER_CASE_STUDY_DESIGN,
  AI_SUMMARIZER_CASE_STUDY_STITCH_PREVIEW_NODE_ID,
  AI_SUMMARIZER_CASE_STUDY_STITCH_PREVIEW_URL,
} from "./aiSummarizerCaseStudyDesign";
import { ROUTES } from "./routes";
import {
  AI_SUMMARIZER_CASE_STUDY_DESCRIPTION_CLASS,
  AI_SUMMARIZER_CASE_STUDY_KICKER_CLASS,
  AI_SUMMARIZER_CASE_STUDY_METADATA_PANEL_CLASS,
  AI_SUMMARIZER_CASE_STUDY_TITLE_CLASS,
} from "./aiSummarizerCaseStudyLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("aiSummarizerCaseStudyDesign", () => {
  it("documents the Stitch preview node and corporate navy palette", () => {
    expect(AI_SUMMARIZER_CASE_STUDY_STITCH_PREVIEW_NODE_ID).toBe("f1fb8914d45146f9aa9d41b5a4712054");
    expect(AI_SUMMARIZER_CASE_STUDY_STITCH_PREVIEW_URL).toBe(
      "https://stitch.withgoogle.com/preview/15498726935719082035?node-id=f1fb8914d45146f9aa9d41b5a4712054&raw=1",
    );
    expect(AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.pageBackground).toBe("#ffffff");
    expect(AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.primary).toBe("#0f3d91");
    expect(AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.sectionHeading).toBe("#111827");
    expect(AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.sectionBody).toBe("#6b7280");
    expect(AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.accentBlue).toBe("#2563eb");
  });

  it("extends the pure white canvas through the route shell on the detail page", () => {
    const routeShell = css.slice(
      css.indexOf(`.route-shell[data-route="${ROUTES.aiSummarizerCaseStudy}"] {`),
      css.indexOf(".route-transition {"),
    );
    expect(routeShell).toContain(`background: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.pageBackground}`);
    expect(routeShell).toContain(`box-shadow: 0 0 0 100vmax ${AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.pageBackground}`);
    expect(routeShell).toContain("clip-path: inset(0 -100vmax)");
  });

  it("paints the full case study page with the pure white canvas tone", () => {
    const pageStart = css.indexOf(".ai-summarizer-case-study-page {");
    expect(pageStart).toBeGreaterThan(-1);
    const pageBlock = css.slice(pageStart, css.indexOf(".ai-summarizer-case-study-intro {", pageStart));
    expect(pageBlock).toContain(`background: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.pageBackground}`);
  });

  it("applies mockup typography and colors to the introduction band", () => {
    const kicker = ruleBlock(`.${AI_SUMMARIZER_CASE_STUDY_KICKER_CLASS} {`, `.${AI_SUMMARIZER_CASE_STUDY_TITLE_CLASS} {`);
    expect(kicker).toContain(`font-weight: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.typography.kickerWeight}`);
    expect(kicker).toContain(`color: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.primary}`);

    const title = ruleBlock(`.${AI_SUMMARIZER_CASE_STUDY_TITLE_CLASS} {`, `.${AI_SUMMARIZER_CASE_STUDY_DESCRIPTION_CLASS} {`);
    expect(title).toContain(`font-weight: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.typography.titleWeight}`);
    expect(title).toContain(`color: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.title}`);

    const description = ruleBlock(
      `.${AI_SUMMARIZER_CASE_STUDY_DESCRIPTION_CLASS} {`,
      `.${AI_SUMMARIZER_CASE_STUDY_METADATA_PANEL_CLASS} {`,
    );
    expect(description).toContain(`color: ${AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.body}`);
  });
});
