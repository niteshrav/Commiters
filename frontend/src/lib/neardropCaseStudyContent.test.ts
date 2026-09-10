import { describe, expect, it } from "vitest";
import { NEARDROP_CASE_STUDY_COPY } from "./neardropCaseStudyContent";
import { ROUTES } from "./routes";
import { SITE_GITHUB_URL } from "./siteLinks";

describe("neardropCaseStudyContent", () => {
  it("matches the cloud logistics platform intro copy", () => {
    expect(NEARDROP_CASE_STUDY_COPY.kicker).toBe("CASE STUDY");
    expect(NEARDROP_CASE_STUDY_COPY.titleLead).toBe("NearDrop ");
    expect(NEARDROP_CASE_STUDY_COPY.titleAccent).toBe("Field Operations");
    expect(NEARDROP_CASE_STUDY_COPY.titleTrail).toBe(" & Real-Time Coordination");
    expect("title" in NEARDROP_CASE_STUDY_COPY).toBe(false);
    expect(NEARDROP_CASE_STUDY_COPY.description).toMatch(/modern field teams/i);
    expect(NEARDROP_CASE_STUDY_COPY.heroImage.src).toBe("/assets/case-studies/neardrop-hero-devices.png");
    expect(NEARDROP_CASE_STUDY_COPY.heroActions.sourceHref).toBe(SITE_GITHUB_URL);
    expect("heading" in NEARDROP_CASE_STUDY_COPY.architecture).toBe(true);
    expect(NEARDROP_CASE_STUDY_COPY.architecture.kicker).toBe("TECHNICAL ARCHITECTURE");
    expect(NEARDROP_CASE_STUDY_COPY.architecture.heading).toBe("Engineering for Scalability");
    expect(NEARDROP_CASE_STUDY_COPY.architecture.items.map((item) => item.title)).toEqual([
      "Modern Frontend",
      "Scalable Backend",
      "Reliable Storage",
      "Real-time Sync",
    ]);
    expect(NEARDROP_CASE_STUDY_COPY.introStack.items.map((item) => item.alt)).toEqual([
      "React",
      "Node.js",
      "PostgreSQL",
      "WebSockets",
    ]);
    expect(NEARDROP_CASE_STUDY_COPY.functionalExcellence.heading).toBe("KEY FEATURES");
    expect(NEARDROP_CASE_STUDY_COPY.functionalExcellence.items).toHaveLength(4);
    expect(NEARDROP_CASE_STUDY_COPY.functionalExcellence.items.map((item) => item.title)).toEqual([
      "Role-based Access",
      "Real-time Tracking",
      "Normalized Schema",
      "Driver-Merchant Coordination",
    ]);
    expect(NEARDROP_CASE_STUDY_COPY.execution.items.map((item) => item.title)).toEqual([
      "Secure Access",
      "Scalable Data",
      "Reliable Operations",
    ]);
    expect(NEARDROP_CASE_STUDY_COPY.execution.heading).toBe("Built for Impact");
    expect(NEARDROP_CASE_STUDY_COPY.bottomCta.primaryLabel).toBe("Discuss Your Project");
  });

  it("wires CTAs to contact and the portfolio index", () => {
    expect(NEARDROP_CASE_STUDY_COPY.bottomCta.primaryTo).toBe(ROUTES.contact);
    expect(NEARDROP_CASE_STUDY_COPY.bottomCta.secondaryTo).toBe(ROUTES.caseStudies);
    expect(NEARDROP_CASE_STUDY_COPY.heroActions.primaryTo).toBe(ROUTES.contact);
  });
});
