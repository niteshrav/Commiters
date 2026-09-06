import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { BREAKPOINT_DESKTOP_MIN_MQ, BREAKPOINT_TABLET_MIN_MQ } from "./responsiveLayout";
import {
  SERVICES_OVERVIEW_CAPABILITIES_GRID_CLASS,
  SERVICES_OVERVIEW_OFFERING_CARD_CLASS,
  SERVICES_OVERVIEW_OFFERINGS_GRID_CLASS,
  SERVICES_OVERVIEW_PRODUCTS_GRID_CLASS,
  SERVICES_OVERVIEW_STANDARDS_GRID_CLASS,
} from "./servicesOverviewPageLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles/servicesOverview.css"), "utf8");

describe("servicesOverviewPageLayout", () => {
  it("lays out three frosted offering cards and a two-column product showcase", () => {
    expect(css).toContain(`.${SERVICES_OVERVIEW_OFFERINGS_GRID_CLASS}`);
    expect(css).toContain(`.${SERVICES_OVERVIEW_CAPABILITIES_GRID_CLASS}`);
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
  });
});
