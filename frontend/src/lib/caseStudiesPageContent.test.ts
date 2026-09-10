import { describe, expect, it } from "vitest";
import { CASE_STUDIES_PAGE_COPY, CASE_STUDY_PROJECTS, isHiddenFromWorkPage } from "./caseStudiesPageContent";
import { ROUTES } from "./routes";

describe("caseStudiesPageContent", () => {
  it("matches the governed architecture work-page hero copy", () => {
    expect(CASE_STUDIES_PAGE_COPY.intro.kicker).toBe("CASE STUDIES");
    expect(CASE_STUDIES_PAGE_COPY.intro.title).toBe("Governed AI & Cloud Engineering in Action");
    expect(CASE_STUDIES_PAGE_COPY.intro.titleAccent).toBe("in Action");
    expect(CASE_STUDIES_PAGE_COPY.intro.subtext).toMatch(/AI, cloud, and secure engineering/i);
  });

  it("lists five enterprise case studies with problem-solution and impact framing", () => {
    expect(CASE_STUDY_PROJECTS).toHaveLength(5);
    expect(CASE_STUDY_PROJECTS.map((project) => project.id)).toEqual([
      "governed-ai",
      "commiters",
      "neardrop-mvp",
      "prospectiq-ai",
      "ecoroute-intelligence",
    ]);
    expect(CASE_STUDY_PROJECTS[0].title).toBe("Governed Enterprise AI & Automated Ingestion");
    expect(CASE_STUDY_PROJECTS[0].tags).toEqual([
      "Model Context Protocol (MCP)",
      "Row-Level Security (RLS)",
      "Express",
      "MongoDB",
    ]);
    expect(CASE_STUDY_PROJECTS[1].title).toBe("Commiters.com — Spec-Driven Cloud Platform");
    expect(CASE_STUDY_PROJECTS[1].impact).toEqual(["100/100 Lighthouse Speed", "<150ms TTFB"]);
    expect(CASE_STUDY_PROJECTS[2].title).toBe("NearDrop — Field & Logistics Coordination System");
    expect(CASE_STUDY_PROJECTS[2].tags).toEqual(["Node.js", "React", "Geo-Fencing", "Real-time WebSockets"]);
    expect(CASE_STUDY_PROJECTS[3]).toMatchObject({
      title: "ProspectIQ AI — Governed B2B Prospecting & Intelligence Engine",
      category: "ENTERPRISE AI & WORKFLOW SYSTEM",
      tags: ["Python", "FastAPI", "MCP Protocol", "LLM Pipeline", "PostgreSQL"],
      detailsHref: ROUTES.prospectIqCaseStudy,
    });
    expect(CASE_STUDY_PROJECTS[3].problem).toMatch(/fragmented B2B databases/i);
    expect(CASE_STUDY_PROJECTS[3].solution).toMatch(/governed LLM agents/i);
    expect(CASE_STUDY_PROJECTS[3].impact).toEqual(["10x Lead Discovery Velocity", "Zero Hallucinated Contacts"]);
    expect(CASE_STUDY_PROJECTS[4]).toMatchObject({
      title: "EcoRoute Intelligence — Cloud-Native Green Fleet & Route Optimization",
      category: "SPEC-DRIVEN CLOUD PLATFORM",
      tags: ["React", "Node.js", "Geo-Spatial Algorithms", "PostgreSQL (RLS)", "Express"],
      detailsHref: ROUTES.ecoRouteCaseStudy,
    });
    expect(CASE_STUDY_PROJECTS[4].problem).toMatch(/static, non-adaptive route planning/i);
    expect(CASE_STUDY_PROJECTS[4].solution).toMatch(/green fleet optimization/i);
    expect(CASE_STUDY_PROJECTS[4].impact).toEqual(["-24% Emissions Footprint", "<100ms Route Computation"]);
  });

  it("keeps OpsFlow off the Work page", () => {
    expect(CASE_STUDY_PROJECTS.map((project) => project.id)).not.toContain("opsflow");
    expect(CASE_STUDY_PROJECTS.some((project) => project.detailsHref === ROUTES.opsFlow)).toBe(false);
    expect(
      isHiddenFromWorkPage({
        id: "opsflow",
        detailsHref: ROUTES.opsFlow,
        title: "OpsFlow AI — PDF Ingestion Engine",
      }),
    ).toBe(true);
    expect(
      isHiddenFromWorkPage({
        id: "governed-ai",
        detailsHref: ROUTES.aiSolutions,
        title: "Governed Enterprise AI & Automated Ingestion",
      }),
    ).toBe(false);
  });

  it("links the governed AI card to the AI solutions page", () => {
    expect(CASE_STUDY_PROJECTS[0].detailsHref).toBe(ROUTES.aiSolutions);
    expect(CASE_STUDY_PROJECTS[0].external).toBeUndefined();
  });

  it("links the Commiters card to the technical case study detail page", () => {
    expect(CASE_STUDY_PROJECTS[1].detailsHref).toBe(ROUTES.commitersCaseStudy);
    expect(CASE_STUDY_PROJECTS[1].external).toBeUndefined();
  });

  it("links the NearDrop card to the technical case study detail page", () => {
    expect(CASE_STUDY_PROJECTS[2].detailsHref).toBe(ROUTES.neardropCaseStudy);
    expect(CASE_STUDY_PROJECTS[2].external).toBeUndefined();
  });

  it("links the ProspectIQ and EcoRoute cards to dedicated case study pages", () => {
    expect(CASE_STUDY_PROJECTS[3].detailsHref).toBe(ROUTES.prospectIqCaseStudy);
    expect(CASE_STUDY_PROJECTS[4].detailsHref).toBe(ROUTES.ecoRouteCaseStudy);
    expect(CASE_STUDY_PROJECTS[3].external).toBeUndefined();
    expect(CASE_STUDY_PROJECTS[4].external).toBeUndefined();
  });

  it("uses portfolio CTAs and a bottom band linking to conversation", () => {
    const projectDetailLabels = CASE_STUDY_PROJECTS.map((project) => project.detailsLabel);
    expect(projectDetailLabels.every((label) => label === "View Project Details")).toBe(true);
    expect(CASE_STUDIES_PAGE_COPY.bottomCta.title).toBe("Have a project in mind?");
    expect(CASE_STUDIES_PAGE_COPY.bottomCta.subtext).toBe("Let's build something impactful together.");
    expect(CASE_STUDIES_PAGE_COPY.bottomCta.primaryLabel).toBe("Start a Conversation");
    expect(CASE_STUDIES_PAGE_COPY.bottomCta.primaryTo).toBe(ROUTES.contact);
  });
});
