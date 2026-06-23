import { describe, expect, it } from "vitest";
import { NEARDROP_CASE_STUDY_COPY } from "./neardropCaseStudyContent";
import { ROUTES } from "./routes";
import { buildDiscoveryCallCalendarUrl } from "./siteContact";

describe("neardropCaseStudyContent", () => {
  it("matches the NearDrop logistics brand-architecture intro copy", () => {
    expect(NEARDROP_CASE_STUDY_COPY.kicker).toBe("CASE STUDY: LOGISTICS BRAND ARCHITECTURE");
    expect(NEARDROP_CASE_STUDY_COPY.titleLead).toBe("NearDrop ");
    expect(NEARDROP_CASE_STUDY_COPY.titleAccent).toBe("Logistics");
    expect(NEARDROP_CASE_STUDY_COPY.titleTrail).toBe("MVP.");
    expect("title" in NEARDROP_CASE_STUDY_COPY).toBe(false);
    expect(NEARDROP_CASE_STUDY_COPY.description).toBe(
      "A high-fidelity three-role logistics system engineered for seamless merchant-driver coordination and enterprise-grade real-time delivery tracking.",
    );
    expect("heading" in NEARDROP_CASE_STUDY_COPY.introStack).toBe(false);
    expect(NEARDROP_CASE_STUDY_COPY.introStack.items.map((item) => item.role)).toEqual([
      "ARCHITECTURE",
      "DATABASE",
      "BACKEND",
    ]);
    expect(NEARDROP_CASE_STUDY_COPY.introStack.items.map((item) => item.label)).toEqual([
      "Next.js",
      "PostgreSQL",
      "Node.js",
    ]);
    expect(NEARDROP_CASE_STUDY_COPY.functionalExcellence.heading).toBe("Functional Excellence");
    expect(NEARDROP_CASE_STUDY_COPY.functionalExcellence.countLabel).toBe("FEATURES [04]");
    expect(NEARDROP_CASE_STUDY_COPY.functionalExcellence.description).toMatch(/Strategic features designed/i);
    expect(NEARDROP_CASE_STUDY_COPY.functionalExcellence.items).toHaveLength(4);
    expect(NEARDROP_CASE_STUDY_COPY.functionalExcellence.items.map((item) => item.title)).toEqual([
      "Role-Based Access Control",
      "Real-time Tracking",
      "Normalized Schema",
      "Driver-Merchant Coordination",
    ]);
    expect(NEARDROP_CASE_STUDY_COPY.functionalExcellence.items[1].body).toMatch(/Sub-second latency updates/i);
    expect(NEARDROP_CASE_STUDY_COPY.functionalExcellence.items[2].body).toMatch(/massive scale and complex relationship/i);
    expect(NEARDROP_CASE_STUDY_COPY.functionalExcellence.items.filter((item) => item.highlight)).toHaveLength(1);
    expect("heroImage" in NEARDROP_CASE_STUDY_COPY).toBe(false);
    expect(NEARDROP_CASE_STUDY_COPY.execution.kicker).toBe("PROCESS");
    expect(NEARDROP_CASE_STUDY_COPY.execution.heading).toBe("The Precision Execution.");
    expect(NEARDROP_CASE_STUDY_COPY.execution.description).toMatch(/performant digital ecosystem/i);
    expect(NEARDROP_CASE_STUDY_COPY.execution.items).toHaveLength(3);
    expect(NEARDROP_CASE_STUDY_COPY.execution.items.map((item) => item.number)).toEqual(["01", "02", "03"]);
    expect(NEARDROP_CASE_STUDY_COPY.execution.items.map((item) => item.title)).toEqual([
      "Architectural Integrity",
      "Precision Engineering",
      "Security First",
    ]);
    expect(NEARDROP_CASE_STUDY_COPY.bottomCta.title).toBe("Need Enterprise-Grade Software Engineering?");
    expect(NEARDROP_CASE_STUDY_COPY.bottomCta.subtext).toMatch(/We specialize in high-performance systems/i);
    expect(NEARDROP_CASE_STUDY_COPY.bottomCta.primaryLabel).toBe("Book a Consultation");
    expect(NEARDROP_CASE_STUDY_COPY.bottomCta.secondaryLabel).toBe("View Portfolio");
  });

  it("wires CTAs to the Google Calendar discovery inbox and the portfolio index", () => {
    expect(NEARDROP_CASE_STUDY_COPY.bottomCta.primaryHref).toBe(buildDiscoveryCallCalendarUrl());
    expect(NEARDROP_CASE_STUDY_COPY.bottomCta.primaryHref).not.toContain("calendly.com");
    expect(NEARDROP_CASE_STUDY_COPY.bottomCta.secondaryTo).toBe(ROUTES.caseStudies);
  });
});
