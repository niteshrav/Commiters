import { describe, expect, it } from "vitest";
import { CASE_STUDY_PROJECTS, isHiddenFromWorkPage } from "../caseStudiesPageContent";
import { ROUTES } from "../routes";
import { TESTIMONIALS_PAGE_ITEMS } from "../testimonialsPageContent";
import { mapCmsProjectToCaseStudy, resolveCaseStudyProjects } from "./projects";
import { mapCmsTestimonial, resolveTestimonialsPageItems } from "./projects";

describe("cms projects", () => {
  it("falls back to static case studies when CMS projects are empty", () => {
    const expectedIds = CASE_STUDY_PROJECTS.filter((project) => !isHiddenFromWorkPage(project)).map(
      (project) => project.id,
    );
    const projects = resolveCaseStudyProjects(null);
    expect(projects.map((project) => project.id)).toEqual(expectedIds);
    expect(projects.find((project) => project.id === "commiters")?.gridSpan).toBe("wide");
    expect(projects.find((project) => project.id === "commiters")?.layout).toBe("horizontal");
    expect(resolveCaseStudyProjects([]).find((project) => project.id === "commiters")?.gridSpan).toBe("wide");
  });

  it("dedupes legacy and canonical Commiters.com CMS hrefs", () => {
    const projects = resolveCaseStudyProjects([
      {
        name: "Commiters.com",
        description: "Founder-led engineering studio website.",
        projectUrl: "/case-studies/commiters",
        isActive: true,
        order: 1,
      },
      {
        name: "Commiters.com",
        slug: "commiters",
        description: "Built a zero-latency React ecosystem with a custom minimalist design system.",
        projectUrl: "/work/commiters",
        isFeatured: true,
        isActive: true,
        order: 2,
      },
    ]);

    expect(projects.filter((project) => project.id === "commiters")).toHaveLength(1);
    expect(projects.find((project) => project.id === "commiters")?.detailsHref).toBe(ROUTES.commitersCaseStudy);
  });

  it("dedupes duplicate CMS Commiters.com cards that share the same case study href", () => {
    const projects = resolveCaseStudyProjects([
      {
        name: "Commiters.com",
        category: "Web Platform",
        description: "Founder-led engineering studio website.",
        projectUrl: "/work/commiters",
        isActive: true,
        order: 1,
      },
      {
        name: "Commiters.com",
        slug: "commiters",
        category: "Web Platform",
        description: "Built a zero-latency React ecosystem with a custom minimalist design system.",
        projectUrl: "/work/commiters",
        isFeatured: true,
        isActive: true,
        order: 2,
      },
    ]);

    expect(projects.filter((project) => project.detailsHref === ROUTES.commitersCaseStudy)).toHaveLength(1);
    expect(projects.find((project) => project.id === "commiters")?.title).toBe(
      "Commiters.com — Spec-Driven Cloud Platform",
    );
    expect(projects.find((project) => project.id === "commiters")?.impact).toEqual([
      "100/100 Lighthouse Speed",
      "<150ms TTFB",
    ]);
    expect(projects.find((project) => project.id === "commiters")?.solution).toBe(
      "Spec-driven cloud web platform built for high performance and clean UI execution.",
    );
  });

  it("maps CMS projects and preserves known case study layout metadata", () => {
    const projects = resolveCaseStudyProjects([
      {
        name: "Commiters.com",
        category: "Web Platform",
        description: "Founder-led engineering studio website.",
        projectUrl: "/work/commiters",
        isFeatured: true,
        isActive: true,
        order: 1,
      },
      {
        name: "Custom Client Portal",
        category: "SaaS",
        description: "Role-based portal with analytics dashboard.",
        technologies: ["React", "Node.js"],
        projectUrl: "https://example.com",
        isActive: true,
        order: 2,
      },
    ]);

    expect(projects[0].detailsHref).toBe(ROUTES.commitersCaseStudy);
    expect(projects[0].gridSpan).toBe("wide");
    expect(projects[0].layout).toBe("horizontal");
    expect(projects[0].impact).toEqual(["100/100 Lighthouse Speed", "<150ms TTFB"]);
    expect(projects[1].external).toBe(true);
    expect(projects[1].tags).toEqual(["React", "Node.js"]);
    expect(projects.filter((project) => project.id === "commiters")).toHaveLength(1);
    expect(projects.map((project) => project.id)).toEqual(
      expect.arrayContaining(["prospectiq-ai", "ecoroute-intelligence"]),
    );
  });

  it("appends curated static case studies the CMS bundle does not include", () => {
    const projects = resolveCaseStudyProjects([
      {
        name: "OpsFlow AI — PDF Ingestion Engine",
        projectUrl: ROUTES.opsFlow,
        isActive: true,
        order: 1,
      },
      {
        name: "NearDrop — Field & Logistics Coordination System",
        projectUrl: ROUTES.neardropCaseStudy,
        isActive: true,
        order: 2,
      },
    ]);

    expect(projects.map((project) => project.id)).toEqual(
      expect.arrayContaining(["neardrop-mvp", "prospectiq-ai", "ecoroute-intelligence"]),
    );
    expect(projects.map((project) => project.id)).not.toContain("opsflow");
    expect(projects.some((project) => project.detailsHref === ROUTES.opsFlow)).toBe(false);
    expect(projects.find((project) => project.id === "prospectiq-ai")?.detailsHref).toBe(ROUTES.prospectIqCaseStudy);
    expect(projects.find((project) => project.id === "ecoroute-intelligence")?.detailsHref).toBe(
      ROUTES.ecoRouteCaseStudy,
    );
  });

  it("builds a case study card from CMS-only projects", () => {
    const project = mapCmsProjectToCaseStudy(
      {
        name: "Ops Dashboard",
        slug: "ops-dashboard",
        category: "Internal Tools",
        description: "Unified operations dashboard for support teams.",
        projectUrl: "/work/ops-dashboard",
        isActive: true,
      },
      0,
    );

    expect(project.id).toBe("ops-dashboard");
    expect(project.problem).toContain("Internal Tools");
    expect(project.solution).toContain("operations dashboard");
  });
});

describe("cms testimonials", () => {
  it("falls back to static testimonials when CMS testimonials are empty", () => {
    expect(resolveTestimonialsPageItems(null)).toEqual(TESTIMONIALS_PAGE_ITEMS);
  });

  it("maps active CMS testimonials in order", () => {
    const items = resolveTestimonialsPageItems([
      {
        clientName: "Jane Doe",
        company: "Acme SaaS",
        review: "Excellent delivery and communication.",
        isActive: true,
        order: 2,
      },
      {
        clientName: "John Smith",
        company: "India",
        review: "Shipped ahead of schedule.",
        isActive: true,
        order: 1,
      },
      {
        clientName: "Hidden Client",
        company: "Stealth",
        review: "Should not render",
        isActive: false,
        order: 3,
      },
    ]);

    expect(items).toHaveLength(2);
    expect(items[0].name).toBe("John Smith");
    expect(items[0].country).toBe("India");
    expect(items[1].company).toBe("Acme SaaS");
    expect(mapCmsTestimonial({ clientName: "", review: "Missing name" }, 0)).toBeNull();
  });
});
