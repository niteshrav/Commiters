import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  BREAKPOINT_COMPACT_PX,
  BREAKPOINT_STACK_PX,
  BREAKPOINT_TABLET_PX,
  RESPONSIVE_STACK_GRID_SELECTORS,
  RESPONSIVE_TABLET_GRID_SELECTORS,
} from "./responsiveLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

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
  it("pins shared stack, tablet, and compact breakpoints", () => {
    expect(BREAKPOINT_STACK_PX).toBe(960);
    expect(BREAKPOINT_TABLET_PX).toBe(1090);
    expect(BREAKPOINT_COMPACT_PX).toBe(620);
  });

  it("prevents horizontal scroll from full-bleed sections", () => {
    expect(css).toMatch(/\.site-shell\s*\{[\s\S]*overflow-x:\s*clip/);
    expect(css).toMatch(/\.route-shell\s*\{[\s\S]*min-width:\s*0/);
  });

  it("switches to mobile navigation at the stack breakpoint", () => {
    const stack = mediaBlocks(BREAKPOINT_STACK_PX);
    expect(stack).toMatch(/\.nav\s*\{[\s\S]*display:\s*none/);
    expect(stack).toMatch(/\.menu-btn\s*\{[\s\S]*display:\s*inline-flex/);
    expect(stack).toMatch(/\.nav-cta-desktop\s*\{[\s\S]*display:\s*none/);
    expect(css).toMatch(/\.mobile-nav\.open\s*\{[\s\S]*display:\s*grid/);
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
    expect(compact).toMatch(/\.stitch-home-hero-photo\s*\{[\s\S]*min-height:\s*240px/);
  });

  it("does not keep a legacy 840px navigation breakpoint", () => {
    expect(css).not.toContain("@media (max-width: 840px)");
  });
});
