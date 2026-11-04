import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { SITE_CLOUD_THEME_CLASS } from "./homeCloudTheme";

const srcDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const pagesDir = join(srcDir, "pages");

const DELEGATING_PAGES = [
  "HomePage.tsx",
  "ProspectIqCaseStudyPage.tsx",
  "EcoRouteCaseStudyPage.tsx",
  "NearDropCaseStudyPage.tsx",
  "CommitersCaseStudyPage.tsx",
  "AiSummarizerCaseStudyPage.tsx",
  "MultiRoleCrmCaseStudyPage.tsx",
  "NextSaasCaseStudyPage.tsx",
  "WebsiteDevelopmentUdaipurPage.tsx",
  "WhatsAppAutomationUdaipurPage.tsx",
] as const;

const SHARED_SHELLS = [
  ["TechnicalCaseStudyPage.tsx", join("components", "TechnicalCaseStudyPage.tsx")],
  ["SeoLandingPage.tsx", join("components", "SeoLandingPage.tsx")],
  ["WorkCaseStudyLayout.tsx", join("components", "work-case-study", "WorkCaseStudyLayout.tsx")],
] as const;

describe("siteCloudThemePages", () => {
  it("puts the Cloud, Built Right page shell on every route", () => {
    const pageFiles = readdirSync(pagesDir).filter((name) => name.endsWith("Page.tsx"));
    expect(pageFiles.length).toBeGreaterThan(20);

    for (const name of pageFiles) {
      const src = readFileSync(join(pagesDir, name), "utf8");
      if ((DELEGATING_PAGES as readonly string[]).includes(name)) {
        expect(src).toMatch(/HomeDemoPage|WorkCaseStudyLayout|TechnicalCaseStudyPage|SeoLandingPage/);
        continue;
      }
      expect(src, name).toMatch(/SITE_CLOUD_THEME_CLASS|withSiteCloudTheme/);
    }

    for (const [name, relative] of SHARED_SHELLS) {
      const src = readFileSync(join(srcDir, relative), "utf8");
      expect(src, name).toMatch(/SITE_CLOUD_THEME_CLASS|withSiteCloudTheme/);
    }

    expect(SITE_CLOUD_THEME_CLASS).toBe("site-cloud-theme");
  });
});
