import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  WEBAPP_CARDS_CLASS,
  WEBAPP_PAGE_CLASS,
  WEBAPP_STANDARDS_CLASS,
} from "./webApplicationsPageLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles", "webApplications.css"), "utf8");

describe("webApplicationsPageLayout", () => {
  it("exports layout class names for the service landing", () => {
    expect(WEBAPP_PAGE_CLASS).toBe("webapp-page");
    expect(WEBAPP_CARDS_CLASS).toBe("webapp-cards");
    expect(WEBAPP_STANDARDS_CLASS).toBe("webapp-standards");
  });

  it("defines responsive grids for mobile, tablet, and desktop", () => {
    expect(css).toMatch(/\.webapp-cards\s*\{[^}]*grid-template-columns:\s*1fr/s);
    expect(css).toMatch(/@media \(min-width: 720px\)[\s\S]*\.webapp-cards[\s\S]*repeat\(2/);
    expect(css).toMatch(/@media \(min-width: 1080px\)[\s\S]*\.webapp-cards[\s\S]*repeat\(4/);
    expect(css).toMatch(/@media \(min-width: 800px\)[\s\S]*\.webapp-standards[\s\S]*repeat\(3/);
  });
});
