import { describe, expect, it } from "vitest";
import { ECO_ROUTE_CASE_STUDY_COPY } from "./ecoRouteCaseStudyContent";
import { ROUTES } from "./routes";

describe("ecoRouteCaseStudyContent", () => {
  it("matches the GitHub EcoRoute Intelligence decision-intelligence copy", () => {
    expect(ECO_ROUTE_CASE_STUDY_COPY.kicker).toBe("TECHNICAL CASE STUDY: AI DECISION INTELLIGENCE");
    expect(ECO_ROUTE_CASE_STUDY_COPY.title).toBe(
      "EcoRoute Intelligence — AI Transportation Decision Platform",
    );
    expect(ECO_ROUTE_CASE_STUDY_COPY.subtitle).toMatch(/Google ADK and Gemini 2\.5 Flash/i);
    expect(ECO_ROUTE_CASE_STUDY_COPY.coreStack.items.map((item) => item.title)).toEqual([
      "Python",
      "Google ADK",
      "Gemini 2.5 Flash",
      "Pandas",
      "Matplotlib",
    ]);
    expect(ECO_ROUTE_CASE_STUDY_COPY.metrics.map((item) => item.label)).toEqual([
      "Routes Analyzed",
      "Critical Congestion Routes",
      "Peak CO2 Emissions",
    ]);
    expect(ECO_ROUTE_CASE_STUDY_COPY.metrics.map((item) => item.value)).toEqual([
      "15 Sample Traffic Routes",
      "6 High-Risk Corridors",
      "740 kg/hour on ROUTE_9",
    ]);
    expect(ECO_ROUTE_CASE_STUDY_COPY.architecture.sections.map((section) => section.title)).toEqual([
      "Transit Analyst Agent",
      "Policy Director Agent",
      "Root Coordinator Agent",
    ]);
    expect(ECO_ROUTE_CASE_STUDY_COPY.architecture.sections[0].body).toMatch(/congestion hotspots/i);
    expect(ECO_ROUTE_CASE_STUDY_COPY.bottomCta.primaryLabel).toBe("Start an AI Project");
    expect(ECO_ROUTE_CASE_STUDY_COPY.bottomCta.primaryTo).toBe(ROUTES.contact);
    expect(ECO_ROUTE_CASE_STUDY_COPY.bottomCta.secondaryTo).toBe(ROUTES.caseStudies);
    expect(ECO_ROUTE_CASE_STUDY_COPY.bottomCta.primaryVariant).toBe("gold-blue");
  });
});
