import { describe, expect, it } from "vitest";
import { COMMITERS_CASE_STUDY_COPY } from "./commitersCaseStudyContent";
import { ROUTES } from "./routes";
import { buildDiscoveryCallCalendarUrl } from "./siteContact";

describe("commitersCaseStudyContent", () => {
  it("matches the technical case study screen copy", () => {
    expect(COMMITERS_CASE_STUDY_COPY.kicker).toBe("TECHNICAL CASE STUDY");
    expect(COMMITERS_CASE_STUDY_COPY.title).toBe("Commiters.com: Architectural Foundation.");
    expect(COMMITERS_CASE_STUDY_COPY.subtitle).toBe(
      "Building a high-performance brand showcase from the ground up, optimized for technical precision and extreme minimalist aesthetics.",
    );
    expect(COMMITERS_CASE_STUDY_COPY.overview.heading).toBe("Project Overview");
    expect(COMMITERS_CASE_STUDY_COPY.overview.body).toBe(
      "The challenge was to engineer a digital identity that mirrors the precision of our codebase. We eschewed template-based solutions in favor of a custom-built React ecosystem. Every interaction, from page transitions to font rendering, was architected to provide a frictionless professional experience.",
    );
    expect(COMMITERS_CASE_STUDY_COPY.overview.objective).toEqual({
      label: "OBJECTIVE",
      body: "Develop a zero-latency showcase that communicates technical authority through minimalist UI patterns.",
    });
    expect(COMMITERS_CASE_STUDY_COPY.overview.outcome).toEqual({
      label: "OUTCOME",
      body: 'A 100/100 Lighthouse score performance engine with a unique "Void-First" design philosophy.',
    });
    expect(COMMITERS_CASE_STUDY_COPY.coreStack.heading).toBe("CORE STACK");
    expect(COMMITERS_CASE_STUDY_COPY.coreStack.items.map((item) => item.title)).toEqual([
      "React 18",
      "Next.js",
      "PostgreSQL",
    ]);
    expect("architecture" in COMMITERS_CASE_STUDY_COPY).toBe(true);
    expect(COMMITERS_CASE_STUDY_COPY.architecture.heading).toBe("Technical Architecture");
    expect(COMMITERS_CASE_STUDY_COPY.architecture.sections).toHaveLength(3);
    expect(COMMITERS_CASE_STUDY_COPY.architecture.sections.map((section) => section.title)).toEqual([
      "Frontend Engineering",
      "Infrastructure & Backend",
      "SEO & Performance",
    ]);
    expect(COMMITERS_CASE_STUDY_COPY.architecture.sections[0].body).toContain("zero-runtime CSS footprint");
    expect(COMMITERS_CASE_STUDY_COPY.architecture.sections[1].body).toContain("TTFB (Time to First Byte)");
    expect(COMMITERS_CASE_STUDY_COPY.architecture.sections[2].body).toContain("semantic HTML5 structure");
    expect("heroImage" in COMMITERS_CASE_STUDY_COPY).toBe(false);
    expect(COMMITERS_CASE_STUDY_COPY.features).toHaveLength(3);
    expect(COMMITERS_CASE_STUDY_COPY.features.map((feature) => feature.title)).toEqual([
      "High Performance",
      "SEO Optimization",
      "Minimalist UI",
    ]);
    expect(COMMITERS_CASE_STUDY_COPY.bottomCta.title).toBe("Ready to build your next breakthrough?");
  });

  it("wires CTAs to the Google Calendar discovery inbox and the case studies index", () => {
    expect(COMMITERS_CASE_STUDY_COPY.bottomCta.primaryHref).toBe(buildDiscoveryCallCalendarUrl());
    expect(COMMITERS_CASE_STUDY_COPY.bottomCta.primaryHref).not.toContain("calendly.com");
    expect(COMMITERS_CASE_STUDY_COPY.bottomCta.secondaryTo).toBe(ROUTES.caseStudies);
  });
});
