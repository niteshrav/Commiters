import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { NEXTSAAS_CASE_STUDY_DESIGN } from "./nextsaasCaseStudyDesign";
import {
  NEXTSAAS_CASE_STUDY_DESCRIPTION_CLASS,
  NEXTSAAS_CASE_STUDY_INTRO_COPY_CLASS,
  NEXTSAAS_CASE_STUDY_INTRO_SECTION_CLASS,
  NEXTSAAS_CASE_STUDY_INTRO_SHELL_CLASS,
  NEXTSAAS_CASE_STUDY_KICKER_CLASS,
  NEXTSAAS_CASE_STUDY_SCOPE_CARD_CLASS,
  NEXTSAAS_CASE_STUDY_SCOPE_LIST_CLASS,
  NEXTSAAS_CASE_STUDY_SCOPE_PIPELINES_GRID_CLASS,
  NEXTSAAS_CASE_STUDY_TITLE_CLASS,
  NEXTSAAS_CASE_STUDY_INTRO_HERO_IMAGE_CLASS,
  NEXTSAAS_CASE_STUDY_PIPELINES_CARD_CLASS,
  NEXTSAAS_CASE_STUDY_PIPELINES_COPY_CLASS,
  NEXTSAAS_CASE_STUDY_PIPELINES_LAYOUT_CLASS,
  NEXTSAAS_CASE_STUDY_PIPELINES_MEDIA_CLASS,
} from "./nextsaasCaseStudyLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("nextsaasCaseStudyDesign", () => {
  it("documents the precision minimalist palette and grid layout", () => {
    expect(NEXTSAAS_CASE_STUDY_DESIGN.colors.pageBackground).toBe("#ffffff");
    expect(NEXTSAAS_CASE_STUDY_DESIGN.colors.primary).toBe("#0066ff");
    expect(NEXTSAAS_CASE_STUDY_DESIGN.colors.kicker).toBe("#9b8a5d");
    expect(NEXTSAAS_CASE_STUDY_DESIGN.colors.title).toBe("#121317");
    expect(NEXTSAAS_CASE_STUDY_DESIGN.colors.body).toBe("#4b5563");
    expect(NEXTSAAS_CASE_STUDY_DESIGN.colors.infrastructureSurface).toBe("#f3f3f4");
    expect(NEXTSAAS_CASE_STUDY_DESIGN.layout.capabilityColumns).toBe("repeat(3, minmax(0, 1fr))");
    expect(NEXTSAAS_CASE_STUDY_DESIGN.layout.scopePipelinesSplit).toBe("minmax(0, 1fr) minmax(0, 2fr)");
    expect(NEXTSAAS_CASE_STUDY_DESIGN.layout.scopePipelinesMediaHeight).toBe("clamp(315px, 47.25vw, 405px)");
    expect(NEXTSAAS_CASE_STUDY_DESIGN.layout.scopePipelinesGridMaxHeight).toBe("clamp(495px, 72vw, 630px)");
    expect(NEXTSAAS_CASE_STUDY_DESIGN.colors.pipelinesMediaSurface).toBe("#ffffff");
    expect(NEXTSAAS_CASE_STUDY_DESIGN.layout.scopeCardPadding).toBe("clamp(14px, 2vw, 18px)");
    expect(NEXTSAAS_CASE_STUDY_DESIGN.layout.pipelinesHeroObjectFit).toBe("cover");
    expect(NEXTSAAS_CASE_STUDY_DESIGN.colors.visualBreakFrameSurface).toBe("#ffffff");
    expect(NEXTSAAS_CASE_STUDY_DESIGN.layout.visualBreakImageAspect).toBe("1 / 1");
    expect(NEXTSAAS_CASE_STUDY_DESIGN.layout.infrastructureSplit).toBe("minmax(0, 1fr) minmax(0, 1fr)");
    expect("introBrandHeight" in NEXTSAAS_CASE_STUDY_DESIGN.layout).toBe(false);
    expect("pipelinesSplit" in NEXTSAAS_CASE_STUDY_DESIGN.layout).toBe(true);
    expect(NEXTSAAS_CASE_STUDY_DESIGN.layout.pipelinesSplit).toBe("minmax(0, 1fr) minmax(0, 2fr)");
  });

  it("paints the full case study page with the pure white canvas tone", () => {
    const pageStart = css.indexOf(".nextsaas-case-study-page {");
    expect(pageStart).toBeGreaterThan(-1);
    const pageBlock = css.slice(pageStart, css.indexOf(".nextsaas-case-study-intro {", pageStart));
    expect(pageBlock).toContain(`background: ${NEXTSAAS_CASE_STUDY_DESIGN.colors.pageBackground}`);
  });

  it("applies mockup typography and colors to the intro header band", () => {
    const intro = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_INTRO_SECTION_CLASS} {`,
      `.${NEXTSAAS_CASE_STUDY_INTRO_SHELL_CLASS} {`,
    );
    expect(intro).not.toContain("border-bottom");

    const introShell = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_INTRO_SHELL_CLASS} {`,
      `.${NEXTSAAS_CASE_STUDY_INTRO_COPY_CLASS} {`,
    );
    expect(introShell).not.toContain("justify-content: space-between");
    expect(css).not.toContain(".nextsaas-case-study-intro-brand");

    const kicker = ruleBlock(`.${NEXTSAAS_CASE_STUDY_KICKER_CLASS} {`, `.${NEXTSAAS_CASE_STUDY_TITLE_CLASS} {`);
    expect(kicker).toContain(`font-weight: ${NEXTSAAS_CASE_STUDY_DESIGN.typography.kickerWeight}`);
    expect(kicker).toContain(`color: ${NEXTSAAS_CASE_STUDY_DESIGN.colors.kicker}`);

    const title = ruleBlock(`.${NEXTSAAS_CASE_STUDY_TITLE_CLASS} {`, `.${NEXTSAAS_CASE_STUDY_DESCRIPTION_CLASS} {`);
    expect(title).toContain(`font-weight: ${NEXTSAAS_CASE_STUDY_DESIGN.typography.titleWeight}`);
    expect(title).toContain(`color: ${NEXTSAAS_CASE_STUDY_DESIGN.colors.title}`);

    const description = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_DESCRIPTION_CLASS} {`,
      `.nextsaas-case-study-intro-scope-pipelines {`,
    );
    expect(description).toContain(`color: ${NEXTSAAS_CASE_STUDY_DESIGN.colors.body}`);

    const scopeCard = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_SCOPE_CARD_CLASS} {`,
      `.nextsaas-case-study-scope-icon {`,
    );
    expect(scopeCard).toContain(`border-top: 3px solid ${NEXTSAAS_CASE_STUDY_DESIGN.colors.scopeCardTopBorder}`);
    expect(scopeCard).toContain(`padding: ${NEXTSAAS_CASE_STUDY_DESIGN.layout.scopeCardPadding}`);

    const scopeList = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_SCOPE_LIST_CLASS} {`,
      `.nextsaas-case-study-scope-item {`,
    );
    expect(scopeList).toContain("margin-top: auto");

    const pipelinesCard = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_PIPELINES_CARD_CLASS} {`,
      `.${NEXTSAAS_CASE_STUDY_PIPELINES_LAYOUT_CLASS} {`,
    );
    expect(pipelinesCard).not.toContain(`border: 1px solid ${NEXTSAAS_CASE_STUDY_DESIGN.colors.cardBorder}`);
    expect(pipelinesCard).toContain("border: none");

    const pipelinesLayout = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_PIPELINES_LAYOUT_CLASS} {`,
      `.${NEXTSAAS_CASE_STUDY_PIPELINES_COPY_CLASS} {`,
    );
    expect(pipelinesLayout).toContain(
      `height: ${NEXTSAAS_CASE_STUDY_DESIGN.layout.scopePipelinesMediaHeight}`,
    );
    expect(pipelinesLayout).toContain(`grid-template-columns: ${NEXTSAAS_CASE_STUDY_DESIGN.layout.pipelinesSplit}`);

    const pipelinesCopy = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_PIPELINES_COPY_CLASS} {`,
      `.${NEXTSAAS_CASE_STUDY_PIPELINES_MEDIA_CLASS} {`,
    );
    expect(pipelinesCopy).toContain("height: 100%");

    const pipelinesMedia = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_PIPELINES_MEDIA_CLASS} {`,
      `.${NEXTSAAS_CASE_STUDY_INTRO_HERO_IMAGE_CLASS} {`,
    );
    expect(pipelinesMedia).toContain("height: 100%");
    expect(pipelinesMedia).toContain(
      `background: ${NEXTSAAS_CASE_STUDY_DESIGN.colors.pipelinesMediaSurface}`,
    );
    expect(pipelinesMedia).not.toContain("background: #f8f9fb");

    const scopePipelinesGrid = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_SCOPE_PIPELINES_GRID_CLASS} {`,
      `.${NEXTSAAS_CASE_STUDY_SCOPE_CARD_CLASS} {`,
    );
    expect(scopePipelinesGrid).toContain(
      `max-height: ${NEXTSAAS_CASE_STUDY_DESIGN.layout.scopePipelinesGridMaxHeight}`,
    );

    const heroImage = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_INTRO_HERO_IMAGE_CLASS} {`,
      `.nextsaas-case-study-pipelines-heading {`,
    );
    expect(heroImage).toContain(
      `object-fit: ${NEXTSAAS_CASE_STUDY_DESIGN.layout.pipelinesHeroObjectFit}`,
    );
    expect(css).not.toContain(".nextsaas-case-study-pipelines-caption");
    expect(css).not.toContain(".nextsaas-case-study-pipelines-overlay");
  });
});
