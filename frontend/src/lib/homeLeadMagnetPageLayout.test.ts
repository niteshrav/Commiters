import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { HOME_LEAD_MAGNET_LAYOUT } from "./homeLeadMagnetContent";
import { BREAKPOINT_MOBILE_PX, BREAKPOINT_STACK_PX } from "./responsiveLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles", "homeLeadMagnet.css"), "utf8");

describe("homeLeadMagnet layout", () => {
  it("breaks out full-width with an aligned two-column inner grid and white capture card", () => {
    expect(css).toMatch(/\.home-lead-magnet\s*\{[^}]*background:\s*#ffffff/i);
    expect(css).toMatch(/\.home-lead-magnet\s*\{[^}]*padding:\s*clamp\(48px, 5vw, 64px\)/i);
    expect(css).toMatch(/\.home-lead-magnet\.band-breakout\s*\{[^}]*width:\s*100cqw/i);
    expect(css).toMatch(/\.home-lead-magnet-inner\s*\{[^}]*max-width:\s*var\(--max-width,\s*1360px\)/i);
    expect(css).toMatch(/\.home-lead-magnet-inner\s*\{[^}]*margin-inline:\s*auto/i);
    expect(css).toMatch(/\.home-lead-magnet-inner\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s*minmax\(0,\s*1fr\)/i);
    expect(css).toMatch(/\.home-lead-magnet-card\s*\{[^}]*background:\s*#fff/i);
    expect(css).toMatch(/\.home-lead-magnet-card\s*\{[^}]*border:\s*1px solid #e2e8f0/i);
    expect(css).toMatch(new RegExp(`@media \\(max-width: ${BREAKPOINT_STACK_PX}px\\)[\\s\\S]*\\.home-lead-magnet-inner[\\s\\S]*grid-template-columns:\\s*1fr`));
    expect(css).toMatch(new RegExp(`@media \\(min-width: ${BREAKPOINT_MOBILE_PX}px\\)[\\s\\S]*\\.home-lead-magnet-form-row[\\s\\S]*flex-direction:\\s*row`));
    expect(HOME_LEAD_MAGNET_LAYOUT.innerClass).toBe("home-lead-magnet-inner");
    expect(HOME_LEAD_MAGNET_LAYOUT.formCardClass).toBe("home-lead-magnet-card");
    expect(HOME_LEAD_MAGNET_LAYOUT.formTitleClass).toBe("home-lead-magnet-form-title");
    expect(HOME_LEAD_MAGNET_LAYOUT.sectionClass).toContain("band-breakout");
  });
});
