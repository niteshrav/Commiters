import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  JOIN_US_INTRO_KICKER_CLASS,
  JOIN_US_INTRO_SECTION_CLASS,
  JOIN_US_FORM_FIELD_SHORT_CLASS,
  JOIN_US_FORM_FIELDS_CLASS,
  JOIN_US_VISUAL_PANEL_CLASS,
  STITCH_JOIN_US_FORM_CLASS,
  STITCH_JOIN_US_GRID_CLASS,
  STITCH_JOIN_US_SECTION_CLASS,
} from "./joinUsPageLayout";

const css = readFileSync(resolve(__dirname, "../styles.css"), "utf8");

describe("joinUsPageLayout", () => {
  it("defines Stitch Join Us page classes in styles.css", () => {
    expect(css).toContain(`.${JOIN_US_INTRO_SECTION_CLASS}`);
    expect(css).toContain(`.${JOIN_US_INTRO_KICKER_CLASS}`);
    expect(css).toContain(`.${STITCH_JOIN_US_SECTION_CLASS}`);
    expect(css).toContain(`.${STITCH_JOIN_US_GRID_CLASS}`);
    expect(css).toContain(`.${JOIN_US_VISUAL_PANEL_CLASS}`);
    expect(css).toContain(`.${STITCH_JOIN_US_FORM_CLASS}`);
    expect(css).toContain(`.${JOIN_US_FORM_FIELDS_CLASS}`);
    expect(css).toContain(`.${JOIN_US_FORM_FIELD_SHORT_CLASS}`);
    expect(css).toContain(".join-us-resume-dropzone");
    expect(css).toMatch(/\.stitch-join-us-form \.form-field label[\s\S]*margin-bottom:\s*8px/);
    expect(css).toMatch(/\.stitch-join-us-grid[\s\S]*grid-template-columns:\s*1\.15fr\s+0\.85fr/);
    expect(css).not.toContain(".join-us-form-row-short");
    expect(css).not.toContain(".join-us-precision-card");
  });
});
