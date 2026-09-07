import { describe, expect, it } from "vitest";
import { COMMITERS_CASE_STUDY_COPY } from "./commitersCaseStudyContent";
import { HOME_HERO_OPS_FLOW_HREF } from "./homePageContent";
import { ROUTES } from "./routes";

describe("commitersCaseStudyContent", () => {
  it("matches the spec-driven cloud platform case study copy", () => {
    expect(COMMITERS_CASE_STUDY_COPY.kicker).toBe("TECHNICAL CASE STUDY: SPEC-DRIVEN CLOUD PLATFORM");
    expect(COMMITERS_CASE_STUDY_COPY.title).toBe("Commiters.com: Spec-Driven Cloud Platform Architecture");
    expect(COMMITERS_CASE_STUDY_COPY.subtitle).toMatch(/zero-latency cloud web ecosystem/i);
    expect(COMMITERS_CASE_STUDY_COPY.overview.heading).toBe("Project Overview");
    expect(COMMITERS_CASE_STUDY_COPY.coreStack.heading).toBe("CORE STACK");
    expect(COMMITERS_CASE_STUDY_COPY.coreStack.items.map((item) => item.title)).toEqual([
      "React 18",
      "Vite / Next.js",
      "PostgreSQL with RLS",
      "Tailwind CSS",
    ]);
    expect(COMMITERS_CASE_STUDY_COPY.architecture.heading).toBe("Technical Architecture");
    expect(COMMITERS_CASE_STUDY_COPY.architecture.sections).toHaveLength(3);
    expect(COMMITERS_CASE_STUDY_COPY.architecture.sections.map((section) => section.title)).toEqual([
      "Frontend Engineering",
      "Cloud Architecture",
      "Security & Governance",
    ]);
    expect(COMMITERS_CASE_STUDY_COPY.architecture.sections[0].body).toContain("zero-runtime CSS footprint");
    expect(COMMITERS_CASE_STUDY_COPY.architecture.sections[1].body).toContain("<150ms TTFB");
    expect(COMMITERS_CASE_STUDY_COPY.architecture.sections[2].body).toContain("zero ambient authority");
    expect("heroImage" in COMMITERS_CASE_STUDY_COPY).toBe(false);
    expect(COMMITERS_CASE_STUDY_COPY.features).toHaveLength(3);
    expect(COMMITERS_CASE_STUDY_COPY.bottomCta.primaryLabel).toBe("Book Operational Audit");
    expect(COMMITERS_CASE_STUDY_COPY.bottomCta.secondaryLabel).toBe("Try OpsFlow AI");
  });

  it("wires CTAs to the operational audit and AI products", () => {
    expect(COMMITERS_CASE_STUDY_COPY.bottomCta.primaryTo).toBe(ROUTES.aiOperationalAudit);
    expect(COMMITERS_CASE_STUDY_COPY.bottomCta.secondaryTo).toBe(HOME_HERO_OPS_FLOW_HREF);
  });
});
