import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BREAKPOINT_DESKTOP_MIN_MQ, BREAKPOINT_TABLET_MIN_MQ } from "./responsiveLayout";
import {
  WFLOW_PAGE_CLASS,
  WFLOW_PIPELINE_CLASS,
  WFLOW_SOLUTIONS_CLASS,
} from "./workflowAutomationPageLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles", "workflowAutomation.css"), "utf8");

describe("workflowAutomationPageLayout", () => {
  it("exports layout class names for the service landing", () => {
    expect(WFLOW_PAGE_CLASS).toBe("wflow-page");
    expect(WFLOW_SOLUTIONS_CLASS).toBe("wflow-solutions");
    expect(WFLOW_PIPELINE_CLASS).toBe("wflow-pipeline");
  });

  it("defines responsive grids for mobile, tablet, and desktop", () => {
    expect(css).toMatch(/\.wflow-solutions\s*\{[^}]*grid-template-columns:\s*1fr/s);
    expect(css).toMatch(new RegExp(`@media ${BREAKPOINT_TABLET_MIN_MQ.replace(/[()]/g, "\\$&")}[\\s\\S]*\\.wflow-solutions[\\s\\S]*repeat\\(2`));
    expect(css).toMatch(new RegExp(`@media ${BREAKPOINT_DESKTOP_MIN_MQ.replace(/[()]/g, "\\$&")}[\\s\\S]*\\.wflow-solutions[\\s\\S]*repeat\\(3`));
    expect(css).toMatch(/\.wflow-pipeline\s*\{[^}]*flex-direction:\s*column/s);
    expect(css).toMatch(new RegExp(`@media ${BREAKPOINT_DESKTOP_MIN_MQ.replace(/[()]/g, "\\$&")}[\\s\\S]*\\.wflow-pipeline[\\s\\S]*flex-direction:\\s*row`));
  });
});
