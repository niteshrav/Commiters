import { describe, expect, it } from "vitest";
import { COMMITERS_CASE_STUDY_COPY } from "./commitersCaseStudyContent";
import { HOME_HERO_OPS_FLOW_HREF } from "./homePageContent";
import { ROUTES } from "./routes";

describe("commitersCaseStudyContent", () => {
  it("matches the spec-driven cloud platform case study copy", () => {
    expect(COMMITERS_CASE_STUDY_COPY.kicker).toBe("TECHNICAL CASE STUDY");
    expect(COMMITERS_CASE_STUDY_COPY.title).toBe("Commiters.com — Spec-Driven Cloud Platform");
    expect(COMMITERS_CASE_STUDY_COPY.subtitle).toMatch(/zero-latency cloud web platform/i);
    expect(COMMITERS_CASE_STUDY_COPY.overview.heading).toBe("Project Overview");
    expect(COMMITERS_CASE_STUDY_COPY.coreStack.heading).toBe("CORE STACK");
    expect(COMMITERS_CASE_STUDY_COPY.coreStack.items.map((item) => item.title)).toEqual([
      "React 18",
      "Vite / Next.js",
      "PostgreSQL with RLS",
      "Tailwind CSS",
    ]);
    expect(COMMITERS_CASE_STUDY_COPY.architecture.heading).toBe("Technical Architecture");
    expect(COMMITERS_CASE_STUDY_COPY.architecture.kicker).toBe("TECHNICAL ARCHITECTURE");
    expect(COMMITERS_CASE_STUDY_COPY.architecture.sections).toHaveLength(3);
    expect(COMMITERS_CASE_STUDY_COPY.architecture.sections.map((section) => section.title)).toEqual([
      "Frontend Engineering",
      "Cloud Architecture",
      "Security & Governance",
    ]);
    expect(COMMITERS_CASE_STUDY_COPY.architecture.sections[0].body).toBe(
      "Atomic components with Tailwind CSS, powered by Vite and Next.js.",
    );
    expect(COMMITERS_CASE_STUDY_COPY.architecture.sections[1].body).toBe(
      "Type-safe persistence with PostgreSQL (RLS) on edge nodes.",
    );
    expect(COMMITERS_CASE_STUDY_COPY.architecture.sections[2].body).toBe(
      "Compliant with Commiters standards, with zero ambient authority.",
    );
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
