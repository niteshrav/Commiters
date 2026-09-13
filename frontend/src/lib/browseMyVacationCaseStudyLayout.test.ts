import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  BROWSE_MY_VACATION_CARD_CLASS,
  BROWSE_MY_VACATION_GALLERY_GRID_CLASS,
  BROWSE_MY_VACATION_GALLERY_IMAGE_CLASS,
  BROWSE_MY_VACATION_GALLERY_TILE_CLASS,
  BROWSE_MY_VACATION_SCOPE_PIPELINES_GRID_CLASS,
} from "./nextsaasCaseStudyLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("browseMyVacationCaseStudyLayout", () => {
  it("uses equal-height cards and a uniform two-column gallery", () => {
    expect(BROWSE_MY_VACATION_SCOPE_PIPELINES_GRID_CLASS).toBe(
      "grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch",
    );
    expect(BROWSE_MY_VACATION_CARD_CLASS).toBe(
      "bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full",
    );
    expect(BROWSE_MY_VACATION_GALLERY_GRID_CLASS).toBe("grid grid-cols-2 gap-4 mt-4");
    expect(BROWSE_MY_VACATION_GALLERY_TILE_CLASS).toBe("min-w-0 overflow-hidden");
    expect(BROWSE_MY_VACATION_GALLERY_IMAGE_CLASS).toBe(
      "w-full h-48 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow",
    );
  });

  it("defines the card and gallery utilities in styles.css", () => {
    expect(css).toContain(".grid-cols-2");
    expect(css).toContain(".gap-4");
    expect(css).toContain(".mt-4");
    expect(css).toContain(".items-stretch");
    expect(css).toContain(".justify-between");
    expect(css).toContain(".h-48");
    expect(css).toContain(".rounded-lg");
    expect(css).toContain(".rounded-2xl {");
    expect(css).toContain(".bg-white {");
    expect(css).toContain(".border-slate-200\\/80");
    expect(css).toContain(".hover\\:shadow-md");
    expect(css).toContain(".transition-shadow");
    expect(css).toContain(".min-w-0");
    expect(css).toContain(".overflow-hidden");
  });

  it("stretches the BrowseMyVacation scope cards to equal height", () => {
    expect(css).toContain(
      ".browse-my-vacation-case-study-page .nextsaas-case-study-scope-pipelines-grid",
    );
    const start = css.indexOf(
      ".browse-my-vacation-case-study-page .nextsaas-case-study-scope-pipelines-grid {",
    );
    const block = css.slice(start, start + 280);
    expect(block).toContain("align-items: stretch");
    expect(block).not.toContain("align-items: start");
  });
});
