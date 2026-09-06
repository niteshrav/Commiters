import { describe, expect, it } from "vitest";
import { ECO_ROUTE_CASE_STUDY_COPY } from "./ecoRouteCaseStudyContent";
import { ROUTES } from "./routes";

describe("ecoRouteCaseStudyContent", () => {
  it("matches the spec-driven green fleet case study copy", () => {
    expect(ECO_ROUTE_CASE_STUDY_COPY.kicker).toBe("TECHNICAL CASE STUDY: SPEC-DRIVEN CLOUD PLATFORM");
    expect(ECO_ROUTE_CASE_STUDY_COPY.title).toBe(
      "EcoRoute Intelligence: Cloud-Native Green Fleet & Route Engine",
    );
    expect(ECO_ROUTE_CASE_STUDY_COPY.subtitle).toMatch(/geo-spatial optimization/i);
    expect(ECO_ROUTE_CASE_STUDY_COPY.coreStack.items.map((item) => item.title)).toEqual([
      "React 18",
      "Vite",
      "Node.js / Express",
      "PostgreSQL / PostGIS",
      "Tailwind CSS",
    ]);
    expect(ECO_ROUTE_CASE_STUDY_COPY.metrics.map((item) => item.label)).toEqual([
      "Emissions Reduction",
      "Query Latency",
      "System Uptime",
    ]);
    expect(ECO_ROUTE_CASE_STUDY_COPY.metrics.map((item) => item.value)).toEqual([
      "24% Average Fuel & CO2 Savings",
      "<100ms Telemetry Response",
      "99.99% Cloud SLA",
    ]);
    expect(ECO_ROUTE_CASE_STUDY_COPY.architecture.sections.map((section) => section.title)).toEqual([
      "High-Performance Geo-Spatial Engine",
      "Multi-Tenant Role-Based Access (RLS)",
      "Micro-Optimized Dashboard UI",
    ]);
    expect(ECO_ROUTE_CASE_STUDY_COPY.architecture.sections[1].body).toMatch(/Row-Level Security/i);
    expect(ECO_ROUTE_CASE_STUDY_COPY.bottomCta.primaryLabel).toBe("Build Your Cloud Platform");
    expect(ECO_ROUTE_CASE_STUDY_COPY.bottomCta.primaryTo).toBe(ROUTES.webApplications);
    expect(ECO_ROUTE_CASE_STUDY_COPY.bottomCta.secondaryTo).toBe(ROUTES.caseStudies);
    expect(ECO_ROUTE_CASE_STUDY_COPY.bottomCta.primaryVariant).toBe("gold-blue");
  });
});
