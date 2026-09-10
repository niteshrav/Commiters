import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  CASE_STUDIES_CANVAS_BACKGROUND,
  CASE_STUDY_CARD_BORDER_COLOR,
  CASE_STUDY_CARD_BORDER_VAR,
  CASE_STUDY_CARD_INNER_PADDING,
  CASE_STUDY_CARD_RADIUS,
  CASE_STUDY_CARD_SURFACE,
  CASE_STUDY_SHOWCASE_MEDIA_SURFACE,
} from "./caseStudiesPageSurface";
import { CASE_STUDIES_PAGE_CLASS } from "./caseStudiesPageLayout";
import { PRECISION_MINIMALIST_DESIGN } from "./precisionMinimalistDesign";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("caseStudiesPageSurface", () => {
  it("matches the void-first canvas and rounded card surfaces", () => {
    expect(CASE_STUDIES_CANVAS_BACKGROUND).toBe(PRECISION_MINIMALIST_DESIGN.colors.surfaceContainerLow);
    expect(CASE_STUDY_CARD_SURFACE).toBe(PRECISION_MINIMALIST_DESIGN.colors.background);
    expect(CASE_STUDY_CARD_BORDER_COLOR).toBe(PRECISION_MINIMALIST_DESIGN.colors.borderOutlineVariant);
    expect(CASE_STUDY_SHOWCASE_MEDIA_SURFACE).toBe("#ffffff");
    expect(CASE_STUDY_CARD_RADIUS).toBe("16px");

    expect(css).toContain(`.${CASE_STUDIES_PAGE_CLASS} {`);
    expect(css).toContain("background: var(--surface-container-low)");
    expect(css).toContain(`border: 1px solid ${CASE_STUDY_CARD_BORDER_VAR}`);
    expect(css).toContain(`background: ${CASE_STUDY_CARD_SURFACE}`);
    expect(css).toContain(`border-radius: ${CASE_STUDY_CARD_RADIUS}`);
    expect(css).toContain(`padding: ${CASE_STUDY_CARD_INNER_PADDING}`);
  });
});
