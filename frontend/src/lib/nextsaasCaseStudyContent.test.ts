import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { NEXTSAAS_CASE_STUDY_COPY } from "./nextsaasCaseStudyContent";
import { ROUTES } from "./routes";

const publicRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "public");

describe("nextsaasCaseStudyContent", () => {
  it("matches the NextSaas QA deep-dive screen copy", () => {
    expect(NEXTSAAS_CASE_STUDY_COPY.kicker).toBe("CASE STUDY — TECHNICAL");
    expect(NEXTSAAS_CASE_STUDY_COPY.title).toBe("NextSaas Quality Assurance.");
    expect(NEXTSAAS_CASE_STUDY_COPY.description).toBe(
      "Comprehensive end-to-end quality assurance for a SaaS template, ensuring performance and reliability across web and mobile platforms.",
    );
    expect(NEXTSAAS_CASE_STUDY_COPY.scope.heading).toBe("Scope");
    expect(NEXTSAAS_CASE_STUDY_COPY.scope.description).toBe(
      "Manual and automated testing frameworks tailored for scalable SaaS ecosystems.",
    );
    expect(NEXTSAAS_CASE_STUDY_COPY.scope.items).toEqual(["Unit Testing", "Integration Tests", "CI/CD Hooks"]);
    expect(NEXTSAAS_CASE_STUDY_COPY.pipelines.heading).toBe("Automated Pipelines");
    expect(NEXTSAAS_CASE_STUDY_COPY.pipelines.subheading).toBe(
      "99.9% uptime validation through persistent monitoring scripts.",
    );
    expect(NEXTSAAS_CASE_STUDY_COPY.introHeroImage.alt).toMatch(/dark laptop/i);
    expect(NEXTSAAS_CASE_STUDY_COPY.capabilities.items).toHaveLength(3);
    expect(NEXTSAAS_CASE_STUDY_COPY.capabilities.items.map((item) => item.label)).toEqual([
      "CROSS-PLATFORM",
      "REGRESSION",
      "BENCHMARKING",
    ]);
    expect(NEXTSAAS_CASE_STUDY_COPY.infrastructure.heading).toBe("Precision Infrastructure.");
    expect(NEXTSAAS_CASE_STUDY_COPY.infrastructure.items).toHaveLength(2);
    expect(NEXTSAAS_CASE_STUDY_COPY.infrastructure.items.map((item) => item.title)).toEqual([
      "Unit Calibration",
      "Load Simulation",
    ]);
    expect(NEXTSAAS_CASE_STUDY_COPY.infrastructure.items[1]?.body).toBe(
      "Rigorous stress testing to identify system limits and ensure stability under peak production loads",
    );
    expect(NEXTSAAS_CASE_STUDY_COPY.visualBreak.badgeLabel).toBe("PASS RATE");
    expect(NEXTSAAS_CASE_STUDY_COPY.visualBreak.badgeValue).toBe("99.8%");
    expect(NEXTSAAS_CASE_STUDY_COPY.bottomCta.title).toBe("Ready for Production.");
    expect(NEXTSAAS_CASE_STUDY_COPY.bottomCta.description).toBe(
      "The NextSaas framework is now fully certified for enterprise-grade deployment, having cleared over 450 technical audit checkpoints.",
    );
    expect(NEXTSAAS_CASE_STUDY_COPY.bottomCta.primaryLabel).toBe("Review Full Audit");
    expect(NEXTSAAS_CASE_STUDY_COPY.bottomCta.secondaryLabel).toBe("Contact Engineer");
  });

  it("wires CTAs to the portfolio index and contact page", () => {
    expect(NEXTSAAS_CASE_STUDY_COPY.bottomCta.primaryTo).toBe(ROUTES.caseStudies);
    expect(NEXTSAAS_CASE_STUDY_COPY.bottomCta.secondaryTo).toBe(ROUTES.contact);
  });

  it("references on-disk imagery for the intro hero and visual break", () => {
    expect(NEXTSAAS_CASE_STUDY_COPY.introHeroImage.src).toBe("/assets/case-studies/nextsaas.png");
    expect(NEXTSAAS_CASE_STUDY_COPY.visualBreak.image.src).toBe("/assets/case-studies/nextsaas-infrastructure.png");

    for (const relativePath of [
      NEXTSAAS_CASE_STUDY_COPY.introHeroImage.src.replace(/^\//, ""),
      NEXTSAAS_CASE_STUDY_COPY.visualBreak.image.src.replace(/^\//, ""),
    ]) {
      expect(existsSync(join(publicRoot, relativePath))).toBe(true);
    }
  });
});
