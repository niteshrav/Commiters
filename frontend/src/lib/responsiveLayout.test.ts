import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  BREAKPOINT_COMPACT_PX,
  BREAKPOINT_DESKTOP_MIN_MQ,
  BREAKPOINT_NAV_PX,
  BREAKPOINT_MOBILE_PX,
  BREAKPOINT_STACK_PX,
  BREAKPOINT_TABLET_MIN_MQ,
  BREAKPOINT_TABLET_PX,
  COMPACT_FULL_WIDTH_CTA_SELECTORS,
  FULL_BLEED_PAGE_SELECTORS,
  LEGACY_LAYOUT_MEDIA_QUERIES,
  PAGE_STYLE_FILES,
  RESPONSIVE_LANDING_FOUR_COL_SELECTORS,
  RESPONSIVE_LANDING_THREE_COL_SELECTORS,
  RESPONSIVE_LANDING_TWO_COL_SELECTORS,
  RESPONSIVE_STACK_GRID_SELECTORS,
  RESPONSIVE_TABLET_GRID_SELECTORS,
} from "./responsiveLayout";

const stylesDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(join(stylesDir, "styles.css"), "utf8");
const pageSheets = PAGE_STYLE_FILES.map((file) => ({
  file,
  css: readFileSync(join(stylesDir, file), "utf8"),
}));
const pageCss = pageSheets.map((sheet) => sheet.css).join("\n");

function sheetContaining(selector: string): string {
  const sheet = pageSheets.find((entry) => entry.css.includes(selector));
  expect(sheet).toBeTruthy();
  return sheet!.css;
}

function mediaBlocks(maxWidthPx: number): string {
  const marker = `@media (max-width: ${maxWidthPx}px)`;
  let searchFrom = 0;
  let combined = "";

  while (searchFrom < css.length) {
    const start = css.indexOf(marker, searchFrom);
    if (start === -1) break;

    const braceStart = css.indexOf("{", start);
    let depth = 0;
    for (let i = braceStart; i < css.length; i += 1) {
      if (css[i] === "{") depth += 1;
      if (css[i] === "}") {
        depth -= 1;
        if (depth === 0) {
          combined += css.slice(start, i + 1);
          searchFrom = i + 1;
          break;
        }
      }
    }
  }

  expect(combined.length).toBeGreaterThan(0);
  return combined;
}

describe("responsiveLayout", () => {
  it("pins shared mobile, stack, tablet, and compact breakpoints", () => {
    expect(BREAKPOINT_MOBILE_PX).toBe(768);
    expect(BREAKPOINT_STACK_PX).toBe(960);
    expect(BREAKPOINT_TABLET_PX).toBe(1090);
    expect(BREAKPOINT_COMPACT_PX).toBe(620);
  });

  it("prevents horizontal scroll from full-bleed sections", () => {
    expect(css).toMatch(/\.site-shell\s*\{[\s\S]*overflow-x:\s*clip/);
    expect(css).toMatch(/\.route-shell\s*\{[\s\S]*min-width:\s*0/);
  });

  it("switches to mobile navigation at the nav breakpoint", () => {
    const navStack = mediaBlocks(BREAKPOINT_NAV_PX);
    expect(navStack).toMatch(/\.nav\s*\{[\s\S]*display:\s*none/);
    expect(navStack).toMatch(/\.header-menu-btn\s*\{[\s\S]*display:\s*inline-flex/);
    expect(navStack).toMatch(/\.nav-cta-desktop\s*\{[\s\S]*display:\s*none/);
  });

  it("keeps the desktop header CTA hidden at the stack breakpoint", () => {
    const stack = mediaBlocks(BREAKPOINT_STACK_PX);
    expect(stack).toMatch(/\.nav-cta-desktop\s*\{[\s\S]*display:\s*none/);
  });

  it("stacks primary page grids at the stack breakpoint", () => {
    const stack = mediaBlocks(BREAKPOINT_STACK_PX);
    for (const selector of RESPONSIVE_STACK_GRID_SELECTORS) {
      expect(stack).toContain(selector);
      expect(stack).toMatch(new RegExp(`${selector.replace(/\./g, "\\.")}[\\s\\S]*grid-template-columns:\\s*1fr`));
    }
    expect(stack).toMatch(/\.stitch-contact-form-row[\s\S]*grid-template-columns:\s*1fr/);
    expect(stack).toMatch(/\.join-us-form-row[\s\S]*grid-template-columns:\s*1fr/);
  });

  it("uses a two-column tablet layout before stacking mosaic grids", () => {
    const tablet = mediaBlocks(BREAKPOINT_TABLET_PX);
    for (const selector of RESPONSIVE_TABLET_GRID_SELECTORS) {
      expect(tablet).toContain(`${selector} {`);
      expect(tablet).toMatch(
        new RegExp(`${selector.replace(/\./g, "\\.")}\\s*\\{[\\s\\S]*grid-template-columns:\\s*repeat\\(2,\\s*minmax\\(0,\\s*1fr\\)\\)`),
      );
    }
  });

  it("relaxes fixed-width controls on compact phones", () => {
    const compact = mediaBlocks(BREAKPOINT_COMPACT_PX);
    expect(compact).toMatch(/\.stitch-contact-submit\s*\{[\s\S]*width:\s*100%/);
  });

  it("shows the full hero image and stacks case study showcase content on mobile", () => {
    const mobile = mediaBlocks(BREAKPOINT_MOBILE_PX);
    expect(mobile).toMatch(/\.stitch-home-hero-photo\s*\{[\s\S]*object-fit:\s*contain/);
    expect(mobile).toMatch(/\.stitch-home-hero-photo\s*\{[\s\S]*height:\s*auto/);
    expect(mobile).toMatch(/\.case-study-card--showcase\.case-study-card--horizontal\s*\{[\s\S]*grid-template-rows:\s*auto auto auto/);
    expect(mobile).toMatch(/\.case-study-card--showcase \.case-study-card-cta-row\s*\{[\s\S]*grid-row:\s*3/);
    expect(mobile).toMatch(/\.nextsaas-case-study-pipelines-layout\s*\{[\s\S]*grid-template-columns:\s*1fr/);
    expect(mobile).toMatch(/\.multi-role-crm-case-study-tech-stack-item--wide\s*\{[\s\S]*flex-direction:\s*column/);
  });

  it("does not keep a legacy 840px navigation breakpoint", () => {
    expect(css).not.toContain("@media (max-width: 840px)");
  });

  it("shrinks the brand watermark on mobile so headings stay readable", () => {
    const mobile = mediaBlocks(BREAKPOINT_MOBILE_PX);
    expect(mobile).toMatch(/\.brand-watermark\s*\{[\s\S]*max-height:\s*140px/);
    expect(mobile).toMatch(/\.brand-watermark\s*\{[\s\S]*opacity:\s*0\.07/);
  });

  it("keeps landing-page stylesheets on the shared breakpoint scale", () => {
    for (const query of LEGACY_LAYOUT_MEDIA_QUERIES) {
      expect(pageCss).not.toContain(query);
    }
  });

  it("prevents full-bleed page wrappers from using 100vw overflow", () => {
    for (const selector of FULL_BLEED_PAGE_SELECTORS) {
      const sheet = sheetContaining(selector);
      const escaped = selector.replace(/\./g, "\\.");
      expect(sheet).toMatch(new RegExp(`${escaped}\\s*\\{[\\s\\S]*?overflow-x:\\s*clip`));
      expect(sheet).toMatch(new RegExp(`${escaped}\\s*\\{[\\s\\S]*?max-width:\\s*none`));
    }
    expect(sheetContaining(".opsflow-page")).not.toMatch(/\.opsflow-page\s*\{[^}]*width:\s*100vw/s);
  });

  it("uses a two-column tablet layout for landing grids", () => {
    const query = BREAKPOINT_TABLET_MIN_MQ.replace(/[()]/g, "\\$&");
    for (const selector of RESPONSIVE_LANDING_TWO_COL_SELECTORS) {
      expect(sheetContaining(selector)).toMatch(
        new RegExp(`@media ${query}[\\s\\S]*${selector.replace(/\./g, "\\.")}[\\s\\S]*repeat\\(2`),
      );
    }
  });

  it("uses a three-or-four-column desktop layout for landing grids", () => {
    const query = BREAKPOINT_DESKTOP_MIN_MQ.replace(/[()]/g, "\\$&");
    for (const selector of RESPONSIVE_LANDING_THREE_COL_SELECTORS) {
      expect(sheetContaining(selector)).toMatch(
        new RegExp(`@media ${query}[\\s\\S]*${selector.replace(/\./g, "\\.")}[\\s\\S]*repeat\\(3`),
      );
    }
    for (const selector of RESPONSIVE_LANDING_FOUR_COL_SELECTORS) {
      expect(sheetContaining(selector)).toMatch(
        new RegExp(`@media ${query}[\\s\\S]*${selector.replace(/\./g, "\\.")}[\\s\\S]*repeat\\(4`),
      );
    }
  });

  it("stretches landing CTAs across compact phones", () => {
    for (const selector of COMPACT_FULL_WIDTH_CTA_SELECTORS) {
      expect(sheetContaining(selector)).toMatch(
        new RegExp(
          `@media \\(max-width: ${BREAKPOINT_COMPACT_PX}px\\)[\\s\\S]*${selector.replace(/\./g, "\\.")}[\\s\\S]*width:\\s*100%`,
        ),
      );
    }
  });
});
