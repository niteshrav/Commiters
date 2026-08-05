import { describe, expect, it } from "vitest";
import { CASE_STUDIES_PAGE_COPY, CASE_STUDY_PROJECTS } from "./caseStudiesPageContent";
import { ROUTES } from "./routes";

describe("caseStudiesPageContent", () => {
  it("matches the OUR WORK / Proven Precision screen copy", () => {
    expect(CASE_STUDIES_PAGE_COPY.intro.kicker).toBe("OUR WORK");
    expect(CASE_STUDIES_PAGE_COPY.intro.title).toBe("Proven Precision");
    expect(CASE_STUDIES_PAGE_COPY.intro.subtext).toMatch(/visionary founders/i);
  });

  it("lists six portfolio projects with problem-solution framing", () => {
    expect(CASE_STUDY_PROJECTS).toHaveLength(6);
    expect(CASE_STUDY_PROJECTS.map((project) => project.id)).toEqual([
      "commiters",
      "ai-summarizer",
      "multi-role-crm",
      "neardrop-mvp",
      "browse-my-vacation",
      "trusttap",
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
    expect(CASE_STUDY_PROJECTS[4].title).toBe("BrowseMyVacation");
    expect(CASE_STUDY_PROJECTS[4].solution).toMatch(/production-ready web application/i);
    expect(CASE_STUDY_PROJECTS[5].title).toBe("TrustTap");
    expect(CASE_STUDY_PROJECTS[5].detailsHref).toBe(ROUTES.trustTap);
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

  it("links the BrowseMyVacation card to the case study detail page", () => {
    expect(CASE_STUDY_PROJECTS[4].detailsHref).toBe(ROUTES.browseMyVacationCaseStudy);
    expect(CASE_STUDY_PROJECTS[4].external).toBeUndefined();
  });

  it("links the TrustTap card to the product page", () => {
    expect(CASE_STUDY_PROJECTS[5].detailsHref).toBe(ROUTES.trustTap);
    expect(CASE_STUDY_PROJECTS[5].detailsLabel).toBe("View Product");
  });

  it("uses portfolio CTAs and a bottom band linking to contact and services", () => {
    const projectDetailLabels = CASE_STUDY_PROJECTS.map((project) => project.detailsLabel);
    expect(projectDetailLabels.filter((label) => label === "View Project Details")).toHaveLength(5);
    expect(projectDetailLabels).toContain("View Product");
    expect(CASE_STUDIES_PAGE_COPY.bottomCta.title).toBe("Ready for the next level?");
    expect(CASE_STUDIES_PAGE_COPY.bottomCta.primaryTo).toBe(ROUTES.contact);
    expect(CASE_STUDIES_PAGE_COPY.bottomCta.secondaryTo).toBe(ROUTES.services);
  });
});
