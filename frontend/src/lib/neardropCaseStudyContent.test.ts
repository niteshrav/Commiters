import { describe, expect, it } from "vitest";
import { NEARDROP_CASE_STUDY_COPY } from "./neardropCaseStudyContent";
import { ROUTES } from "./routes";

describe("neardropCaseStudyContent", () => {
  it("matches the cloud logistics platform intro copy", () => {
    expect(NEARDROP_CASE_STUDY_COPY.kicker).toBe("CASE STUDY: CLOUD LOGISTICS PLATFORM");
    expect(NEARDROP_CASE_STUDY_COPY.titleLead).toBe("NearDrop: ");
    expect(NEARDROP_CASE_STUDY_COPY.titleAccent).toBe("Field Operations");
    expect(NEARDROP_CASE_STUDY_COPY.titleTrail).toBe("& Real-Time Coordination System");
    expect("title" in NEARDROP_CASE_STUDY_COPY).toBe(false);
    expect(NEARDROP_CASE_STUDY_COPY.description).toMatch(/merchant-driver coordination/i);
    expect("heading" in NEARDROP_CASE_STUDY_COPY.introStack).toBe(false);
    expect(NEARDROP_CASE_STUDY_COPY.introStack.items.map((item) => item.label)).toEqual([
      "React / Next.js",
      "Node.js",
      "PostgreSQL",
      "WebSockets",
    ]);
    expect(NEARDROP_CASE_STUDY_COPY.functionalExcellence.heading).toBe("Functional Excellence");
    expect(NEARDROP_CASE_STUDY_COPY.functionalExcellence.items).toHaveLength(4);
    expect(NEARDROP_CASE_STUDY_COPY.functionalExcellence.items.map((item) => item.title)).toEqual([
      "Role-Isolated Portals",
      "Real-time Tracking",
      "Normalized Schema",
      "Driver-Merchant Coordination",
    ]);
    expect("heroImage" in NEARDROP_CASE_STUDY_COPY).toBe(false);
    expect(NEARDROP_CASE_STUDY_COPY.execution.items.map((item) => item.title)).toEqual([
      "Architectural Integrity",
      "Dedicated Portal Surfaces",
      "Security First",
    ]);
    expect(NEARDROP_CASE_STUDY_COPY.execution.items[2].body).toMatch(/JWT session scoping/i);
    expect(NEARDROP_CASE_STUDY_COPY.bottomCta.primaryLabel).toBe("Discuss Your Cloud Platform");
  });

  it("wires CTAs to contact and the portfolio index", () => {
    expect(NEARDROP_CASE_STUDY_COPY.bottomCta.primaryTo).toBe(ROUTES.contact);
    expect(NEARDROP_CASE_STUDY_COPY.bottomCta.secondaryTo).toBe(ROUTES.caseStudies);
  });
});
