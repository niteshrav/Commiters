import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  CASE_STUDIES_BOTTOM_CTA_PRIMARY_CLASS,
  CASE_STUDIES_BOTTOM_CTA_SECONDARY_CLASS,
} from "./caseStudiesPageLayout";
import { COMMITERS_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS } from "./commitersCaseStudyLayout";
import { NEARDROP_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS } from "./neardropCaseStudyLayout";
import { SITE_BUTTON_CSS_VARIABLES, SITE_BUTTON_DESIGN } from "./siteButtonDesign";
import {
  SITE_BTN_PRIMARY_CLASS,
  SITE_BTN_SECONDARY_CLASS,
} from "./siteButtonLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("siteButtonLayout", () => {
  it("registers canonical button tokens on :root", () => {
    for (const [name, value] of Object.entries(SITE_BUTTON_CSS_VARIABLES)) {
      expect(css).toContain(`${name}: ${value};`);
    }
  });

  it("styles global primary and secondary buttons with Stitch blue and outline secondary", () => {
    const primary = ruleBlock(`.${SITE_BTN_PRIMARY_CLASS} {`, `.${SITE_BTN_PRIMARY_CLASS}:hover {`);
    expect(primary).toContain(`background: var(--site-btn-primary-bg)`);
    expect(primary).toContain(`color: var(--site-btn-primary-text)`);
    expect(primary).toContain(`border-color: var(--site-btn-primary-border)`);
    expect(SITE_BUTTON_DESIGN.colors.primaryBackground).toBe("var(--stitch-blue)");

    const secondary = ruleBlock(`.${SITE_BTN_SECONDARY_CLASS} {`, `.${SITE_BTN_SECONDARY_CLASS}:hover {`);
    expect(secondary).toContain(`background: var(--site-btn-secondary-bg)`);
    expect(secondary).toContain(`border: 1px solid var(--site-btn-secondary-border)`);
    expect(secondary).toContain(`color: var(--site-btn-secondary-text)`);
  });

  it("uses compact minimalist geometry on the shared button base", () => {
    const btn = ruleBlock(".btn {", ".btn-compact {");
    expect(btn).toContain(`border-radius: var(--site-btn-radius)`);
    expect(btn).toContain(`min-height: var(--site-btn-min-height)`);
    expect(btn).toContain(`padding: var(--site-btn-padding-y) var(--site-btn-padding-x)`);
    expect(btn).toContain(`font-size: var(--site-btn-font-size)`);
    expect(SITE_BUTTON_DESIGN.radius).toBe("8px");
    expect(SITE_BUTTON_DESIGN.minHeight).toBe("40px");
    expect(SITE_BUTTON_DESIGN.paddingInline).toBe("18px");
    expect(SITE_BUTTON_DESIGN.paddingBlock).toBe("10px");
  });

  it("keeps the Our Work band CTAs on the black/gray pairing", () => {
    const caseStudiesPrimary = ruleBlock(
      `.${CASE_STUDIES_BOTTOM_CTA_PRIMARY_CLASS} {`,
      `.${CASE_STUDIES_BOTTOM_CTA_SECONDARY_CLASS} {`,
    );
    expect(caseStudiesPrimary).toContain(`background: var(--site-btn-band-primary-bg)`);
    expect(caseStudiesPrimary).toContain(`color: var(--site-btn-band-primary-text)`);

    const caseStudiesSecondary = ruleBlock(
      `.${CASE_STUDIES_BOTTOM_CTA_SECONDARY_CLASS} {`,
      ".commiters-case-study-page {",
    );
    expect(caseStudiesSecondary).toContain(`background: var(--site-btn-band-secondary-bg)`);
    expect(caseStudiesSecondary).toContain(`border: 1px solid var(--site-btn-band-secondary-border)`);
    expect(SITE_BUTTON_DESIGN.bandCta.primaryBackground).toBe("#0066ff");
  });

  it("applies Stitch blue primary styling to case study detail CTAs", () => {
    const commitersPrimary = ruleBlock(
      `.${COMMITERS_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS} {`,
      ".commiters-case-study-bottom-cta-btn--secondary {",
    );
    expect(commitersPrimary).toContain(`background: var(--site-btn-primary-bg)`);

    const neardropPrimary = ruleBlock(
      `.${NEARDROP_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS} {`,
      ".neardrop-case-study-bottom-cta-btn--secondary {",
    );
    expect(neardropPrimary).toContain("background: #ffffff");
    expect(neardropPrimary).toContain("color: #0066ff");
  });
});
