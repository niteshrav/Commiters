import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { BREAKPOINT_DESKTOP_MIN_MQ, BREAKPOINT_TABLET_MIN_MQ } from "./responsiveLayout";
import {
  SERVICES_OVERVIEW_ANCHOR_CLASS,
  SERVICES_OVERVIEW_CAPABILITIES_GRID_CLASS,
  SERVICES_OVERVIEW_CAPABILITY_CARD_CHROME_CLASS,
  SERVICES_OVERVIEW_EQUAL_CARD_CLASS,
  SERVICES_OVERVIEW_OFFERING_CARD_CLASS,
  SERVICES_OVERVIEW_OFFERINGS_GRID_CLASS,
  SERVICES_OVERVIEW_PRODUCTS_GRID_CLASS,
  SERVICES_OVERVIEW_STANDARDS_GRID_CLASS,
} from "./servicesOverviewPageLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles/servicesOverview.css"), "utf8");
const siteCss = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("servicesOverviewPageLayout", () => {
  it("lays out three frosted offering cards and a two-column product showcase", () => {
    expect(css).toContain(`.${SERVICES_OVERVIEW_OFFERINGS_GRID_CLASS}`);
    expect(css).toContain(`.${SERVICES_OVERVIEW_PRODUCTS_GRID_CLASS}`);
    expect(css).toContain(`.${SERVICES_OVERVIEW_STANDARDS_GRID_CLASS}`);
    expect(css).toContain(`.${SERVICES_OVERVIEW_OFFERING_CARD_CLASS}`);
    expect(css).toMatch(/grid-template-columns:\s*repeat\(3/);
    expect(css).toMatch(/grid-template-columns:\s*repeat\(2/);
    expect(css).toMatch(
      new RegExp(`@media ${BREAKPOINT_TABLET_MIN_MQ.replace(/[()]/g, "\\$&")}[\\s\\S]*\\.${SERVICES_OVERVIEW_OFFERINGS_GRID_CLASS}[\\s\\S]*repeat\\(2`),
    );
    expect(css).toMatch(
      new RegExp(`@media ${BREAKPOINT_DESKTOP_MIN_MQ.replace(/[()]/g, "\\$&")}[\\s\\S]*\\.${SERVICES_OVERVIEW_OFFERINGS_GRID_CLASS}[\\s\\S]*repeat\\(3`),
    );
    expect(SERVICES_OVERVIEW_EQUAL_CARD_CLASS).toBe(
      "bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full",
    );
    expect(SERVICES_OVERVIEW_CAPABILITIES_GRID_CLASS).toBe(
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch w-full mt-8",
    );
    expect(SERVICES_OVERVIEW_CAPABILITY_CARD_CHROME_CLASS).toBe(
      "bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full",
    );
    expect(SERVICES_OVERVIEW_ANCHOR_CLASS).toBe("scroll-mt-24");
    expect(siteCss).toContain(".scroll-mt-24");
    expect(siteCss).toContain(".sm\\:grid-cols-2");
    expect(siteCss).toContain(".lg\\:grid-cols-4");
    expect(siteCss).toContain(".mt-8");
    expect(css).toMatch(/scroll-margin-top:\s*6rem/);
    expect(css).not.toContain(".services-overview-capabilities-grid");
  });
});
