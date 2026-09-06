import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BREAKPOINT_DESKTOP_MIN_MQ, BREAKPOINT_TABLET_MIN_MQ } from "./responsiveLayout";
import { WEBAPP_CARDS_CLASS, WEBAPP_PAGE_CLASS, WEBAPP_STACK_CLASS } from "./webApplicationsPageLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles", "webApplications.css"), "utf8");

describe("webApplicationsPageLayout", () => {
  it("exports layout class names for the service landing", () => {
    expect(WEBAPP_PAGE_CLASS).toBe("webapp-page");
    expect(WEBAPP_CARDS_CLASS).toBe("webapp-cards");
    expect(WEBAPP_STACK_CLASS).toBe("webapp-stack");
  });

  it("defines responsive grids for mobile, tablet, and desktop", () => {
    expect(css).toMatch(/\.webapp-cards\s*\{[^}]*grid-template-columns:\s*1fr/s);
    expect(css).toMatch(new RegExp(`@media ${BREAKPOINT_TABLET_MIN_MQ.replace(/[()]/g, "\\$&")}[\\s\\S]*\\.webapp-cards[\\s\\S]*repeat\\(2`));
    expect(css).toMatch(new RegExp(`@media ${BREAKPOINT_DESKTOP_MIN_MQ.replace(/[()]/g, "\\$&")}[\\s\\S]*\\.webapp-cards[\\s\\S]*repeat\\(4`));
  });
});
