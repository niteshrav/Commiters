import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { NEXTSAAS_CASE_STUDY_DESIGN } from "./nextsaasCaseStudyDesign";
import {
  NEXTSAAS_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS,
  NEXTSAAS_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS,
  NEXTSAAS_CASE_STUDY_CAPABILITIES_GRID_CLASS,
  NEXTSAAS_CASE_STUDY_CAPABILITIES_SECTION_CLASS,
  NEXTSAAS_CASE_STUDY_DESCRIPTION_CLASS,
  NEXTSAAS_CASE_STUDY_FEATURES_SECTION_CLASS,
  NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_LAYOUT_CLASS,
  NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_NUMBER_CLASS,
  NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_SECTION_CLASS,
  NEXTSAAS_CASE_STUDY_KICKER_CLASS,
  NEXTSAAS_CASE_STUDY_PAGE_CLASS,
  NEXTSAAS_CASE_STUDY_PIPELINES_CARD_CLASS,
  NEXTSAAS_CASE_STUDY_PIPELINES_COPY_CLASS,
  NEXTSAAS_CASE_STUDY_PIPELINES_LAYOUT_CLASS,
  NEXTSAAS_CASE_STUDY_PIPELINES_MEDIA_CLASS,
  NEXTSAAS_CASE_STUDY_INTRO_HERO_IMAGE_CLASS,
  NEXTSAAS_CASE_STUDY_SCOPE_INDICATOR_CLASS,
  NEXTSAAS_CASE_STUDY_SCOPE_LIST_CLASS,
  NEXTSAAS_CASE_STUDY_SCOPE_PIPELINES_GRID_CLASS,
  NEXTSAAS_CASE_STUDY_VISUAL_BREAK_BADGE_CLASS,
  NEXTSAAS_CASE_STUDY_VISUAL_BREAK_BADGE_VALUE_CLASS,
  NEXTSAAS_CASE_STUDY_VISUAL_BREAK_FRAME_CLASS,
  NEXTSAAS_CASE_STUDY_VISUAL_BREAK_IMAGE_CLASS,
} from "./nextsaasCaseStudyLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("nextsaasCaseStudyLayout", () => {
  it("styles the case study detail page shell and key sections", () => {
    const page = ruleBlock(`.${NEXTSAAS_CASE_STUDY_PAGE_CLASS} {`, `.${NEXTSAAS_CASE_STUDY_KICKER_CLASS} {`);
    expect(page).toContain(`background: ${NEXTSAAS_CASE_STUDY_DESIGN.colors.pageBackground}`);

    const kicker = ruleBlock(`.${NEXTSAAS_CASE_STUDY_KICKER_CLASS} {`, `.nextsaas-case-study-title {`);
    expect(kicker).toContain(`color: ${NEXTSAAS_CASE_STUDY_DESIGN.colors.kicker}`);

    const description = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_DESCRIPTION_CLASS} {`,
      `.nextsaas-case-study-intro-scope-pipelines {`,
    );
    expect(description).toContain(`color: ${NEXTSAAS_CASE_STUDY_DESIGN.colors.body}`);

    const scopePipelinesGrid = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_SCOPE_PIPELINES_GRID_CLASS} {`,
      `.nextsaas-case-study-scope-card {`,
    );
    expect(scopePipelinesGrid).toContain(`grid-template-columns: ${NEXTSAAS_CASE_STUDY_DESIGN.layout.scopePipelinesSplit}`);
    expect(scopePipelinesGrid).toContain(
      `max-height: ${NEXTSAAS_CASE_STUDY_DESIGN.layout.scopePipelinesGridMaxHeight}`,
    );

    const scopeList = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_SCOPE_LIST_CLASS} {`,
      `.nextsaas-case-study-scope-item {`,
    );
    expect(scopeList).toContain("margin-top: auto");

    const indicator = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_SCOPE_INDICATOR_CLASS} {`,
      `.nextsaas-case-study-pipelines-card {`,
    );
    expect(indicator).toContain(`background: ${NEXTSAAS_CASE_STUDY_DESIGN.colors.checklistIndicator}`);

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

    const heroImage = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_INTRO_HERO_IMAGE_CLASS} {`,
      `.nextsaas-case-study-pipelines-heading {`,
    );
    expect(heroImage).toContain("height: 100%");
    expect(heroImage).toContain(
      `object-fit: ${NEXTSAAS_CASE_STUDY_DESIGN.layout.pipelinesHeroObjectFit}`,
    );
    expect(css).not.toContain(".nextsaas-case-study-pipelines-caption");
    expect(css).not.toContain(".nextsaas-case-study-pipelines-overlay");

    const features = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_FEATURES_SECTION_CLASS} {`,
      `.${NEXTSAAS_CASE_STUDY_CAPABILITIES_SECTION_CLASS} {`,
    );
    expect(features).toContain("flex-direction: column");

    const capabilitiesGrid = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_CAPABILITIES_GRID_CLASS} {`,
      `.nextsaas-case-study-capability-card {`,
    );
    expect(capabilitiesGrid).toContain(`grid-template-columns: ${NEXTSAAS_CASE_STUDY_DESIGN.layout.capabilityColumns}`);

    const infrastructureSection = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_SECTION_CLASS} {`,
      `.${NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_LAYOUT_CLASS} {`,
    );
    expect(infrastructureSection).toContain(`background: ${NEXTSAAS_CASE_STUDY_DESIGN.colors.infrastructureSurface}`);

    const infrastructureLayout = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_LAYOUT_CLASS} {`,
      `.nextsaas-case-study-infrastructure-copy {`,
    );
    expect(infrastructureLayout).toContain(`grid-template-columns: ${NEXTSAAS_CASE_STUDY_DESIGN.layout.infrastructureSplit}`);
    expect(infrastructureLayout).toContain("align-items: stretch");

    const visualFrame = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_VISUAL_BREAK_FRAME_CLASS} {`,
      `.${NEXTSAAS_CASE_STUDY_VISUAL_BREAK_IMAGE_CLASS} {`,
    );
    expect(visualFrame).toContain(`background: ${NEXTSAAS_CASE_STUDY_DESIGN.colors.visualBreakFrameSurface}`);

    const visualImage = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_VISUAL_BREAK_IMAGE_CLASS} {`,
      `.nextsaas-case-study-visual-break-badge {`,
    );
    expect(visualImage).toContain(`aspect-ratio: ${NEXTSAAS_CASE_STUDY_DESIGN.layout.visualBreakImageAspect}`);

    const infrastructureNumber = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_NUMBER_CLASS} {`,
      `.nextsaas-case-study-infrastructure-title {`,
    );
    expect(infrastructureNumber).toContain(`border: 1px solid ${NEXTSAAS_CASE_STUDY_DESIGN.colors.primary}`);
    expect(infrastructureNumber).toContain(`color: ${NEXTSAAS_CASE_STUDY_DESIGN.colors.primary}`);

    const badgeValue = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_VISUAL_BREAK_BADGE_VALUE_CLASS} {`,
      `.${NEXTSAAS_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS} {`,
    );
    expect(badgeValue).toContain("font-size:");

    const badge = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_VISUAL_BREAK_BADGE_CLASS} {`,
      `.nextsaas-case-study-visual-break-badge-label {`,
    );
    expect(badge).toContain(`background: ${NEXTSAAS_CASE_STUDY_DESIGN.colors.primary}`);

    const bottomCta = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS} {`,
      `.nextsaas-case-study-bottom-cta-inner {`,
    );
    expect(bottomCta).not.toContain("border-top");

    const primaryBtn = ruleBlock(
      `.${NEXTSAAS_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS} {`,
      `.nextsaas-case-study-bottom-cta-btn--secondary {`,
    );
    expect(primaryBtn).toContain(`background: var(--site-btn-primary-bg)`);
  });
});
