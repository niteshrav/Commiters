import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { BROWSE_MY_VACATION_CASE_STUDY_COPY } from "./browseMyVacationCaseStudyContent";
import { NEXTSAAS_CASE_STUDY_COPY } from "./nextsaasCaseStudyContent";
import { ROUTES } from "./routes";

const publicRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "public");

describe("nextsaasCaseStudyContent (BrowseMyVacation)", () => {
  it("re-exports BrowseMyVacation copy for legacy imports", () => {
    expect(NEXTSAAS_CASE_STUDY_COPY).toBe(BROWSE_MY_VACATION_CASE_STUDY_COPY);
  });

  it("matches the BrowseMyVacation travel platform case study copy", () => {
    expect(NEXTSAAS_CASE_STUDY_COPY.title).toBe("BrowseMyVacation — Curated Rajasthan Vacations.");
    expect(NEXTSAAS_CASE_STUDY_COPY.scope.items).toEqual([
      "City-based package discovery",
      "Customise & Quote journeys",
      "Vacation Meter, MICE & admin",
    ]);
  });

  it("wires CTAs to the portfolio index, live site, and contact page", () => {
    expect(NEXTSAAS_CASE_STUDY_COPY.bottomCta.primaryTo).toBe(ROUTES.caseStudies);
    expect(NEXTSAAS_CASE_STUDY_COPY.bottomCta.secondaryHref).toBe("https://browsemyvacations.com/");
    expect(NEXTSAAS_CASE_STUDY_COPY.bottomCta.tertiaryTo).toBe(ROUTES.contact);
  });

  it("references on-disk imagery for the intro hero and visual break", () => {
    for (const relativePath of [
      NEXTSAAS_CASE_STUDY_COPY.introHeroImage.src.replace(/^\//, ""),
      NEXTSAAS_CASE_STUDY_COPY.visualBreak.image.src.replace(/^\//, ""),
    ]) {
      expect(existsSync(join(publicRoot, relativePath))).toBe(true);
    }
  });
});
