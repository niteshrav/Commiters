import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { BREAKPOINT_MOBILE_PX, BREAKPOINT_NAV_PX } from "./responsiveLayout";
import {
  HEADER_DRAWER_OPEN_CLASS,
  MOBILE_NAV_DRAWER_CLASS,
  MOBILE_NAV_DRAWER_WIDTH,
  MOBILE_NAV_OVERLAY_CLASS,
  MOBILE_NAV_SHEET_TOP,
  SITE_HEADER_HEIGHT,
  SITE_HEADER_HEIGHT_MOBILE,
} from "./mobileNavDrawer";

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

describe("mobileNavDrawerLayout", () => {
  it("styles a header-locked full-width sheet so the sticky bar stays visible", () => {
    expect(css).toMatch(/:root\s*\{[^}]*--site-header-height:\s*84px/s);
    expect(css).toMatch(new RegExp(`\\.${MOBILE_NAV_OVERLAY_CLASS}\\s*\\{[^}]*position:\\s*fixed`));
    expect(css).toMatch(
      new RegExp(`\\.${MOBILE_NAV_OVERLAY_CLASS}\\s*\\{[^}]*top:\\s*${MOBILE_NAV_SHEET_TOP.replace(/[()]/g, "\\$&")}`),
    );
    expect(css).toMatch(new RegExp(`\\.${MOBILE_NAV_OVERLAY_CLASS}\\s*\\{[^}]*right:\\s*0`));
    expect(css).toMatch(new RegExp(`\\.${MOBILE_NAV_OVERLAY_CLASS}\\s*\\{[^}]*bottom:\\s*0`));
    expect(css).toMatch(new RegExp(`\\.${MOBILE_NAV_OVERLAY_CLASS}\\s*\\{[^}]*left:\\s*0`));
    expect(css).toMatch(new RegExp(`\\.${MOBILE_NAV_OVERLAY_CLASS}\\s*\\{[^}]*z-index:\\s*999`));
    expect(css).toMatch(new RegExp(`\\.${MOBILE_NAV_OVERLAY_CLASS}\\s*\\{[^}]*display:\\s*flex`));
    expect(css).toMatch(new RegExp(`\\.${MOBILE_NAV_OVERLAY_CLASS}\\s*\\{[^}]*flex-direction:\\s*column`));
    expect(css).toMatch(new RegExp(`\\.${MOBILE_NAV_OVERLAY_CLASS}\\s*\\{[^}]*isolation:\\s*isolate`));
    expect(css).toMatch(new RegExp(`\\.${MOBILE_NAV_OVERLAY_CLASS}\\s*\\{[^}]*background-color:\\s*#ffffff`));
    expect(css).not.toMatch(new RegExp(`\\.${MOBILE_NAV_OVERLAY_CLASS}\\s*\\{[^}]*inset:\\s*0`));
    expect(css).not.toMatch(new RegExp(`\\.${MOBILE_NAV_OVERLAY_CLASS}\\s*\\{[^}]*justify-content:\\s*flex-end`));
    expect(css).not.toMatch(new RegExp(`\\.${MOBILE_NAV_OVERLAY_CLASS}\\s*\\{[^}]*width:\\s*100vw`));
    expect(css).not.toMatch(/\.nav-mobile-scrim\s*\{/);

    expect(css).toMatch(
      new RegExp(`\\.${MOBILE_NAV_DRAWER_CLASS}\\s*\\{[^}]*width:\\s*${MOBILE_NAV_DRAWER_WIDTH.replace(/%/g, "\\%")}`),
    );
    expect(css).not.toMatch(new RegExp(`\\.${MOBILE_NAV_DRAWER_CLASS}\\s*\\{[^}]*max-width:\\s*85vw`));
    expect(css).toMatch(new RegExp(`\\.${MOBILE_NAV_DRAWER_CLASS}\\s*\\{[^}]*height:\\s*100%`));
    expect(css).toMatch(new RegExp(`\\.${MOBILE_NAV_DRAWER_CLASS}\\s*\\{[^}]*background-color:\\s*#ffffff`));
    expect(css).toMatch(new RegExp(`\\.${MOBILE_NAV_DRAWER_CLASS}\\s*\\{[^}]*padding:\\s*8px 24px 28px`));
    expect(css).toMatch(new RegExp(`\\.${MOBILE_NAV_DRAWER_CLASS}\\s*\\{[^}]*justify-content:\\s*flex-start`));
    expect(css).not.toMatch(new RegExp(`\\.${MOBILE_NAV_DRAWER_CLASS}\\s*\\{[^}]*justify-content:\\s*space-between`));
    expect(css).not.toMatch(new RegExp(`\\.${MOBILE_NAV_DRAWER_CLASS}\\s*\\{[^}]*box-shadow:`));
    expect(css).toMatch(/@keyframes nav-mobile-drawer-enter[\s\S]*translateY\(-8px\)/);
    const enterFrames = css.match(/@keyframes nav-mobile-drawer-enter\s*\{[\s\S]*?\n\}/)?.[0] ?? "";
    expect(enterFrames).toContain("translateY(-8px)");
    expect(enterFrames).not.toContain("translateX(100%)");
    expect(css).toMatch(
      new RegExp(`\\.${MOBILE_NAV_DRAWER_CLASS}\\s*\\{[^}]*animation:\\s*nav-mobile-drawer-enter 200ms ease-in-out`),
    );
    expect(css).toMatch(
      new RegExp(`\\.header\\.${HEADER_DRAWER_OPEN_CLASS}\\s*\\{[^}]*z-index:\\s*1000`),
    );
    expect(css).toMatch(
      new RegExp(`\\.header\\.${HEADER_DRAWER_OPEN_CLASS}\\s*\\{[^}]*background:\\s*#ffffff`),
    );
    expect(css).toMatch(/body\.nav-mobile-drawer-open\s*\{[\s\S]*overflow:\s*hidden/);
    expect(css).toMatch(
      /body\.nav-mobile-drawer-open \.whatsapp-floating-action[\s\S]*visibility:\s*hidden/,
    );
    expect(css).toMatch(/body\.nav-mobile-drawer-open \.site-chat-widget[\s\S]*visibility:\s*hidden/);
    expect(css).toMatch(/body\.nav-mobile-drawer-open \.accessibility-widget[\s\S]*visibility:\s*hidden/);
  });

  it("uses a 64px white mobile header bar with hamburger chrome below 768px", () => {
    const mobile = mediaBlocks(BREAKPOINT_MOBILE_PX);
    expect(mobile).toMatch(/:root\s*\{[\s\S]*--site-header-height:\s*64px/);
    expect(mobile).toMatch(/\.header-inner\s*\{[\s\S]*min-height:\s*64px/);
    expect(mobile).toMatch(/\.header-inner\s*\{[\s\S]*height:\s*64px/);
    expect(mobile).toMatch(/\.header(?:\.header-light)?\s*\{[\s\S]*background:\s*#ffffff/);
    expect(mobile).toMatch(/\.header(?:\.header-light)?\s*\{[\s\S]*border-bottom:\s*1px solid #e2e8f0/);
    expect(SITE_HEADER_HEIGHT).toBe("84px");
    expect(SITE_HEADER_HEIGHT_MOBILE).toBe("64px");
  });

  it("reveals the hamburger and hides inline nav at the nav breakpoint", () => {
    const nav = mediaBlocks(BREAKPOINT_NAV_PX);
    expect(nav).toMatch(/\.nav\s*\{[\s\S]*display:\s*none/);
    expect(nav).toMatch(/\.nav-cta-desktop\s*\{[\s\S]*display:\s*none/);
    expect(nav).toMatch(/\.header-menu-btn\s*\{[\s\S]*display:\s*inline-flex/);
    expect(nav).not.toMatch(/\.nav-mobile-accordion\s*\{[\s\S]*display:\s*block/);
  });

  it("stacks compact links under the header without a duplicate logo or empty gap", () => {
    expect(css).not.toMatch(/\.nav-mobile-drawer-header\s*\{/);
    expect(css).not.toMatch(/\.nav-mobile-close-btn\s*\{/);
    expect(css).toMatch(/\.nav-mobile-drawer-nav\s*\{[\s\S]*flex-grow:\s*0/);
    expect(css).toMatch(/\.nav-mobile-drawer-nav\s*\{[\s\S]*margin-top:\s*8px/);
    expect(css).toMatch(/\.nav-mobile-drawer-nav\s*\{[\s\S]*gap:\s*0/);
    expect(css).toMatch(/\.nav-mobile-drawer-link\s*\{[\s\S]*font-size:\s*18px/);
    expect(css).toMatch(/\.nav-mobile-drawer-link\s*\{[\s\S]*font-weight:\s*700/);
    expect(css).toMatch(/\.nav-mobile-drawer-link\s*\{[\s\S]*color:\s*#0f172a/);
    expect(css).toMatch(/\.nav-mobile-drawer-link\s*\{[\s\S]*min-height:\s*48px/);
    expect(css).toMatch(/\.nav-mobile-drawer-link\s*\{[\s\S]*width:\s*100%/);
    expect(css).toMatch(/\.nav-mobile-drawer-footer\s*\{[^}]*margin-top:\s*24px/);
    expect(css).not.toMatch(/\.nav-mobile-drawer-footer\s*\{[^}]*margin-top:\s*auto/);
    expect(css).toMatch(/\.nav-mobile-drawer-footer\s*\{[\s\S]*padding-top:\s*16px/);
    expect(css).toMatch(/\.nav-mobile-drawer-footer\s*\{[\s\S]*border-top:\s*1px solid #e2e8f0/);
    expect(css).toMatch(/\.btn\.nav-mobile-cta\s*\{[\s\S]*height:\s*48px/);
    expect(css).toMatch(/\.btn\.nav-mobile-cta\s*\{[\s\S]*border-radius:\s*8px/);
    expect(css).toMatch(/\.btn\.nav-mobile-cta\s*\{[\s\S]*margin-bottom:\s*4px/);
    expect(css).toMatch(/\.btn\.nav-mobile-cta\s*\{[\s\S]*width:\s*100%/);
    expect(css).toMatch(/\.nav-mobile-socials\s*\{[\s\S]*gap:\s*12px/);
    expect(css).toMatch(/\.nav-mobile-socials\s*\{[\s\S]*margin-top:\s*4px/);
    expect(css).toMatch(/\.nav-mobile-copyright\s*\{[\s\S]*font-size:\s*11px/);
    expect(css).toMatch(/\.nav-mobile-copyright\s*\{[\s\S]*color:\s*#94a3b8/);
  });
});
