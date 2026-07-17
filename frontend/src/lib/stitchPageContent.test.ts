import { describe, expect, it } from "vitest";
import { STITCH_CASE_STUDIES, STITCH_SERVICES_GRID } from "./stitchPageContent";

describe("stitchPageContent", () => {
  it("lists six expertise cards in the Stitch mosaic order", () => {
    expect(STITCH_SERVICES_GRID).toHaveLength(6);
    expect(STITCH_SERVICES_GRID.map((service) => service.id)).toEqual([
      "website-development",
      "ai-integration",
      "web-applications",
      "mobile-applications",
      "mvp-development",
      "automation-tools",
    ]);
    expect(STITCH_SERVICES_GRID[0].gridSpan).toBe(2);
    expect(STITCH_SERVICES_GRID[1].gridSpan).toBe(1);
    expect(STITCH_SERVICES_GRID[5].gridSpan).toBe(3);
    expect(STITCH_SERVICES_GRID[5].layout).toBe("split");
  });

  it("uses Stitch screenshot copy for each service card", () => {
    expect(STITCH_SERVICES_GRID[0]).toMatchObject({
      title: "Website Development",
      description:
        "High-conversion marketing sites and enterprise portals built with speed, SEO, and accessibility as core priorities.",
      actionVisibility: "always",
      hoverAction: { kind: "link", label: "Learn more", href: "/services/website-development" },
    });
    expect(STITCH_SERVICES_GRID[1].description).toBe(
      "Embedding LLMs and custom machine learning models into your existing workflows to drive automation.",
    );
    expect(STITCH_SERVICES_GRID[2].description).toBe(
      "Complex, data-driven platforms designed for scalability and performance. We handle the heavy lifting of state management and API architecture.",
    );
    expect(STITCH_SERVICES_GRID[3].description).toBe(
      "Native and cross-platform mobile experiences that feel fluid and integrated. Performance-first iOS and Android development.",
    );
    expect(STITCH_SERVICES_GRID[4].description).toBe(
      "Go from concept to market in weeks. We focus on the core value proposition to validate your product quickly.",
    );
    expect(STITCH_SERVICES_GRID[5]).toMatchObject({
      title: "Automation Tools",
      description:
        "Bespoke internal tools and scripts that eliminate repetitive tasks, connecting your disparate data sources into a unified ecosystem.",
      actionVisibility: "always",
      hoverAction: { kind: "button", label: "Learn more", href: "/services/automation-tools" },
    });
  });

  it("includes case study cards from the Stitch portfolio screen", () => {
    expect(STITCH_CASE_STUDIES).toHaveLength(2);
    expect(STITCH_CASE_STUDIES[0].title).toMatch(/Finflow/i);
  });
});
