import { describe, expect, it } from "vitest";
import { CASE_STUDIES_PAGE_COPY, CASE_STUDY_PROJECTS } from "./caseStudiesPageContent";
import { ROUTES } from "./routes";

describe("caseStudiesPageContent", () => {
  it("matches the OUR WORK / Proven Precision screen copy", () => {
    expect(CASE_STUDIES_PAGE_COPY.intro.kicker).toBe("OUR WORK");
    expect(CASE_STUDIES_PAGE_COPY.intro.title).toBe("Proven Precision");
    expect(CASE_STUDIES_PAGE_COPY.intro.subtext).toMatch(/visionary founders/i);
  });

  it("lists five portfolio projects with problem-solution framing", () => {
    expect(CASE_STUDY_PROJECTS).toHaveLength(5);
    expect(CASE_STUDY_PROJECTS.map((project) => project.id)).toEqual([
      "commiters",
      "ai-summarizer",
      "multi-role-crm",
      "neardrop-mvp",
      "nextsaas",
    ]);
    expect(CASE_STUDY_PROJECTS[0]).toMatchObject({
      title: "Commiters.com",
      tags: ["Design Showcase"],
      gridSpan: "wide",
      layout: "horizontal",
    });
    expect(CASE_STUDY_PROJECTS[0].problem).toMatch(/high-performance brand showcase/i);
    expect(CASE_STUDY_PROJECTS[0].solution).toMatch(/React\/Next\.js ecosystem/i);
    expect(CASE_STUDY_PROJECTS[1].tags).toEqual(["Python • Google ADK"]);
    expect(CASE_STUDY_PROJECTS[1].problem).toMatch(/multi-page documents/i);
    expect(CASE_STUDY_PROJECTS[2].title).toBe("Multi-Role CRM & AI Chatbot");
    expect(CASE_STUDY_PROJECTS[2].problem).toMatch(/manual query resolution/i);
    expect(CASE_STUDY_PROJECTS[3].tags).toEqual(["AFFILIATES", "VENDORS", "CUSTOMERS"]);
    expect(CASE_STUDY_PROJECTS[4].title).toBe("NextSaas");
    expect(CASE_STUDY_PROJECTS[4].solution).toMatch(/end-to-end testing/i);
  });

  it("links the Commiters showcase card to the technical case study detail page", () => {
    expect(CASE_STUDY_PROJECTS[0].detailsHref).toBe(ROUTES.commitersCaseStudy);
    expect(CASE_STUDY_PROJECTS[0].external).toBeUndefined();
  });

  it("links the AI Summarizer card to the technical case study detail page", () => {
    expect(CASE_STUDY_PROJECTS[1].detailsHref).toBe(ROUTES.aiSummarizerCaseStudy);
    expect(CASE_STUDY_PROJECTS[1].external).toBeUndefined();
  });

  it("links the Multi-Role CRM card to the technical case study detail page", () => {
    expect(CASE_STUDY_PROJECTS[2].detailsHref).toBe(ROUTES.multiRoleCrmCaseStudy);
    expect(CASE_STUDY_PROJECTS[2].external).toBeUndefined();
  });

  it("links the NearDrop MVP card to the technical case study detail page", () => {
    expect(CASE_STUDY_PROJECTS[3].detailsHref).toBe(ROUTES.neardropCaseStudy);
    expect(CASE_STUDY_PROJECTS[3].external).toBeUndefined();
  });

  it("links the NextSaas card to the technical case study detail page", () => {
    expect(CASE_STUDY_PROJECTS[4].detailsHref).toBe(ROUTES.nextsaasCaseStudy);
    expect(CASE_STUDY_PROJECTS[4].external).toBeUndefined();
  });

  it("uses View Project Details CTAs and a bottom band linking to contact and services", () => {
    expect(CASE_STUDY_PROJECTS.every((project) => project.detailsLabel === "View Project Details")).toBe(true);
    expect(CASE_STUDIES_PAGE_COPY.bottomCta.title).toBe("Ready for the next level?");
    expect(CASE_STUDIES_PAGE_COPY.bottomCta.primaryTo).toBe(ROUTES.contact);
    expect(CASE_STUDIES_PAGE_COPY.bottomCta.secondaryTo).toBe(ROUTES.services);
  });
});
