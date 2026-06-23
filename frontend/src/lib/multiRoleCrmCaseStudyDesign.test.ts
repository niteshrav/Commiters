import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { MULTI_ROLE_CRM_CASE_STUDY_DESIGN } from "./multiRoleCrmCaseStudyDesign";
import {
  MULTI_ROLE_CRM_CASE_STUDY_CHALLENGE_GRID_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_INTRO_INNER_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_INTRO_MEDIA_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_INTRO_SECTION_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_INTRO_STAGE_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_KICKER_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_SUBHEADLINE_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TITLE_ACCENT_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TITLE_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TITLE_LEAD_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_VISION_BODY_CLASS,
} from "./multiRoleCrmCaseStudyLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("multiRoleCrmCaseStudyDesign", () => {
  it("documents the precision minimalist palette and grid layout", () => {
    expect(MULTI_ROLE_CRM_CASE_STUDY_DESIGN.colors.pageBackground).toBe("#ffffff");
    expect(MULTI_ROLE_CRM_CASE_STUDY_DESIGN.colors.introSurface).toBe("#f8f9fb");
    expect(MULTI_ROLE_CRM_CASE_STUDY_DESIGN.colors.primary).toBe("#0066ff");
    expect(MULTI_ROLE_CRM_CASE_STUDY_DESIGN.colors.titleLead).toBe("#111827");
    expect(MULTI_ROLE_CRM_CASE_STUDY_DESIGN.colors.body).toBe("#4b5563");
    expect(MULTI_ROLE_CRM_CASE_STUDY_DESIGN.colors.goldLabel).toBe("#9a7b4f");
    expect(MULTI_ROLE_CRM_CASE_STUDY_DESIGN.colors.introHeroGlow).toBe("rgba(15, 23, 42, 0.22)");
    expect(MULTI_ROLE_CRM_CASE_STUDY_DESIGN.layout.techStackColumns).toBe("repeat(2, minmax(0, 1fr))");
    expect(MULTI_ROLE_CRM_CASE_STUDY_DESIGN.layout.introMediaMaxWidth).toBe("460px");
    expect(MULTI_ROLE_CRM_CASE_STUDY_DESIGN.layout.introHeroAspectRatio).toBe("512 / 503");
    expect("introFrameRotate" in MULTI_ROLE_CRM_CASE_STUDY_DESIGN.layout).toBe(false);
  });

  it("paints the full case study page with the pure white canvas tone", () => {
    const pageStart = css.indexOf(".multi-role-crm-case-study-page {");
    expect(pageStart).toBeGreaterThan(-1);
    const pageBlock = css.slice(pageStart, css.indexOf(".multi-role-crm-case-study-intro {", pageStart));
    expect(pageBlock).toContain(`background: ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.colors.pageBackground}`);
  });

  it("applies mockup typography and colors to the centered grid intro", () => {
    const intro = ruleBlock(
      `.${MULTI_ROLE_CRM_CASE_STUDY_INTRO_SECTION_CLASS} {`,
      `.${MULTI_ROLE_CRM_CASE_STUDY_INTRO_INNER_CLASS} {`,
    );
    expect(intro).toContain(`background-color: ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.colors.introSurface}`);
    expect(intro).toContain(`background-size: ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.layout.introGridSize}`);
    expect(intro).toContain(`padding: clamp(48px, 6vw, 72px) clamp(20px, 5vw, 40px) ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.layout.introSectionPaddingBottom}`);
    expect(intro).toContain("text-align: center");

    const kicker = ruleBlock(`.${MULTI_ROLE_CRM_CASE_STUDY_KICKER_CLASS} {`, `.${MULTI_ROLE_CRM_CASE_STUDY_TITLE_CLASS} {`);
    expect(kicker).toContain(`font-weight: ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.typography.kickerWeight}`);
    expect(kicker).toContain(`color: ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.colors.goldLabel}`);

    const titleLead = ruleBlock(
      `.${MULTI_ROLE_CRM_CASE_STUDY_TITLE_LEAD_CLASS} {`,
      `.${MULTI_ROLE_CRM_CASE_STUDY_TITLE_ACCENT_CLASS} {`,
    );
    expect(titleLead).toContain(`color: ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.colors.titleLead}`);

    const titleAccent = ruleBlock(
      `.${MULTI_ROLE_CRM_CASE_STUDY_TITLE_ACCENT_CLASS} {`,
      `.${MULTI_ROLE_CRM_CASE_STUDY_SUBHEADLINE_CLASS} {`,
    );
    expect(titleAccent).toContain(`color: ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.colors.primary}`);

    const subheadline = ruleBlock(
      `.${MULTI_ROLE_CRM_CASE_STUDY_SUBHEADLINE_CLASS} {`,
      `.${MULTI_ROLE_CRM_CASE_STUDY_INTRO_MEDIA_CLASS} {`,
    );
    expect(subheadline).toContain(`font-weight: ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.typography.subheadlineWeight}`);
    expect(subheadline).toContain(`color: ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.colors.body}`);

    const introMedia = ruleBlock(
      `.${MULTI_ROLE_CRM_CASE_STUDY_INTRO_MEDIA_CLASS} {`,
      `.${MULTI_ROLE_CRM_CASE_STUDY_INTRO_STAGE_CLASS} {`,
    );
    expect(introMedia).toContain(`max-width: min(${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.layout.introMediaMaxWidth}, 100%)`);

    const introCopy = ruleBlock(
      `.multi-role-crm-case-study-intro-copy {`,
      `.${MULTI_ROLE_CRM_CASE_STUDY_KICKER_CLASS} {`,
    );
    expect(introCopy).toContain(`margin: 0 auto ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.layout.introCopySpacing}`);

    const stage = ruleBlock(
      `.${MULTI_ROLE_CRM_CASE_STUDY_INTRO_STAGE_CLASS} {`,
      `.${MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_CLASS} {`,
    );
    expect(stage).toContain(`padding: ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.layout.introStagePaddingTop} 0 0`);
    expect(stage).not.toContain("transform:");
    expect(stage).toContain("radial-gradient");
    expect(stage).toContain(MULTI_ROLE_CRM_CASE_STUDY_DESIGN.colors.introHeroGlow);

    const heroImage = ruleBlock(
      `.${MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_CLASS} {`,
      `.multi-role-crm-case-study-vision {`,
    );
    expect(heroImage).toContain("height: auto");
    expect(heroImage).toContain("object-fit: contain");
    expect(heroImage).toContain("filter: drop-shadow");
    expect(heroImage).toContain("-webkit-mask-image");
    expect(css).not.toContain(".multi-role-crm-case-study-intro-frame");
    expect(css).not.toContain(".multi-role-crm-case-study-hero-actions");
    expect(css).not.toContain(".multi-role-crm-case-study-hero-btn");
    expect(css).not.toContain(".multi-role-crm-case-study-hero-visual");

    const visionBody = ruleBlock(
      `.${MULTI_ROLE_CRM_CASE_STUDY_VISION_BODY_CLASS} {`,
      `.${MULTI_ROLE_CRM_CASE_STUDY_CHALLENGE_GRID_CLASS} {`,
    );
    expect(visionBody).toContain(`color: ${MULTI_ROLE_CRM_CASE_STUDY_DESIGN.colors.body}`);
  });
});
