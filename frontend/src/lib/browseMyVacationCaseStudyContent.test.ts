import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  BROWSE_MY_VACATION_CASE_STUDY_COPY,
  uniqueBrowseMyVacationGallery,
} from "./browseMyVacationCaseStudyContent";
import { NEXTSAAS_CASE_STUDY_COPY } from "./nextsaasCaseStudyContent";
import { ROUTES } from "./routes";

const publicRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "public");

describe("browseMyVacationCaseStudyContent", () => {
  it("re-exports through the legacy NextSaas content module", () => {
    expect(NEXTSAAS_CASE_STUDY_COPY).toBe(BROWSE_MY_VACATION_CASE_STUDY_COPY);
  });

  it("matches the BrowseMyVacation travel platform case study copy", () => {
    expect(BROWSE_MY_VACATION_CASE_STUDY_COPY.title).toBe("BrowseMyVacation: Curated B2C/B2B Travel Platform");
    expect(BROWSE_MY_VACATION_CASE_STUDY_COPY.kicker).toMatch(/B2B E-COMMERCE PLATFORM/i);
    expect(BROWSE_MY_VACATION_CASE_STUDY_COPY.description).toMatch(/city-first discovery/i);
    expect(BROWSE_MY_VACATION_CASE_STUDY_COPY.scope.items).toEqual([
      "City-based package discovery",
      "Customise & Quote journeys",
      "Vacation Meter, MICE & admin",
    ]);
    expect(BROWSE_MY_VACATION_CASE_STUDY_COPY.metadata.coreStack.value).toMatch(/React/i);
    expect(BROWSE_MY_VACATION_CASE_STUDY_COPY.metadata.liveSite.href).toBe("https://browsemyvacations.com/");
    expect(BROWSE_MY_VACATION_CASE_STUDY_COPY.techStack.items).toHaveLength(4);
    expect(BROWSE_MY_VACATION_CASE_STUDY_COPY.outcomes.items).toHaveLength(3);
    expect(BROWSE_MY_VACATION_CASE_STUDY_COPY.infrastructure.items).toHaveLength(3);
    expect(BROWSE_MY_VACATION_CASE_STUDY_COPY.bottomCta.secondaryLabel).toBe("Visit live site");
    expect(BROWSE_MY_VACATION_CASE_STUDY_COPY.bottomCta.tertiaryLabel).toBe("Start a project");
  });

  it("wires CTAs to the portfolio index, live site, and contact page", () => {
    expect(BROWSE_MY_VACATION_CASE_STUDY_COPY.bottomCta.primaryTo).toBe(ROUTES.caseStudies);
    expect(BROWSE_MY_VACATION_CASE_STUDY_COPY.bottomCta.secondaryHref).toBe("https://browsemyvacations.com/");
    expect(BROWSE_MY_VACATION_CASE_STUDY_COPY.bottomCta.tertiaryTo).toBe(ROUTES.contact);
  });

  it("maps each gallery asset URL once and drops the duplicate mountain landscape", () => {
    const gallery = uniqueBrowseMyVacationGallery();
    const srcs = gallery.map((item) => item.src);

    expect(srcs).toEqual([...new Set(srcs)]);
    expect(srcs).toContain(BROWSE_MY_VACATION_CASE_STUDY_COPY.introHeroImage.src);
    expect(srcs).toContain("/assets/case-studies/browse-my-vacation-visual.png");
    expect(srcs).not.toContain("/assets/case-studies/browse-my-vacation-hero.png");
    expect(srcs.filter((src) => src.includes("browse-my-vacation-hero"))).toEqual([]);
    expect(gallery).toHaveLength(2);
    expect(new Set(gallery.map((item) => item.alt)).size).toBe(gallery.length);
  });

  it("references on-disk imagery for the intro hero and visual break", () => {
    for (const relativePath of [
      BROWSE_MY_VACATION_CASE_STUDY_COPY.introHeroImage.src.replace(/^\//, ""),
      BROWSE_MY_VACATION_CASE_STUDY_COPY.introHeroImage.srcSet.split(",")[1].trim().split(" ")[0].replace(/^\//, ""),
      BROWSE_MY_VACATION_CASE_STUDY_COPY.visualBreak.image.src.replace(/^\//, ""),
      ...BROWSE_MY_VACATION_CASE_STUDY_COPY.collageTiles.map((tile) => tile.src.replace(/^\//, "")),
    ]) {
      expect(existsSync(join(publicRoot, relativePath))).toBe(true);
    }
  });
});
