import { describe, expect, it } from "vitest";
import { STITCH_CASE_STUDIES, STITCH_SERVICES_GRID } from "./stitchPageContent";

describe("stitchPageContent", () => {
  it("lists seven expertise cards in a consistent grid order", () => {
    expect(STITCH_SERVICES_GRID).toHaveLength(7);
    expect(STITCH_SERVICES_GRID.map((service) => service.id)).toEqual([
      "website-development",
      "web-applications",
      "mobile-applications",
      "e-commerce-development",
      "ai-integration",
      "automation-tools",
      "mvp-development",
    ]);
    for (const service of STITCH_SERVICES_GRID) {
      expect(service.gridSpan).toBe(1);
      expect(service.layout).toBe("standard");
      expect(service.actionVisibility).toBe("always");
      expect(service.hoverAction.kind).toBe("link");
      expect(service.hoverAction.label).toBe("View service");
    }
  });

  it("uses Stitch screenshot copy for each service card", () => {
    expect(STITCH_SERVICES_GRID[0]).toMatchObject({
      title: "Website Development",
      description:
        "High-conversion marketing sites and enterprise portals built with speed, SEO, and accessibility as core priorities.",
      hoverAction: { kind: "link", label: "View service", href: "/services/website-development" },
    });
    expect(STITCH_SERVICES_GRID[4].description).toBe(
      "Embedding LLMs and custom machine learning models into your existing workflows to drive automation.",
    );
    expect(STITCH_SERVICES_GRID[5]).toMatchObject({
      title: "Automation Tools",
      hoverAction: { kind: "link", label: "View service", href: "/services/automation-tools" },
    });
  });

  it("includes case study cards from the Stitch portfolio screen", () => {
    expect(STITCH_CASE_STUDIES).toHaveLength(2);
    expect(STITCH_CASE_STUDIES[0].title).toMatch(/Finflow/i);
  });
});
