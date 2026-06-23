import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { MULTI_ROLE_CRM_CASE_STUDY_COPY } from "./multiRoleCrmCaseStudyContent";
import {
  MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_HEIGHT,
  MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_WIDTH,
} from "./multiRoleCrmCaseStudyHeroImage";
import { ROUTES } from "./routes";

const publicRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "public");

describe("multiRoleCrmCaseStudyContent", () => {
  it("matches the centered grid intro copy and hero asset", () => {
    expect(MULTI_ROLE_CRM_CASE_STUDY_COPY.kicker).toBe("CASE STUDY: ENTERPRISE AI");
    expect(MULTI_ROLE_CRM_CASE_STUDY_COPY.titleLead).toBe("AI-Powered");
    expect(MULTI_ROLE_CRM_CASE_STUDY_COPY.titleAccent).toBe("Multi-Role CRM");
    expect(MULTI_ROLE_CRM_CASE_STUDY_COPY.subheadline).toBe("Intelligent Operations with RAG & LLMs");
    expect("title" in MULTI_ROLE_CRM_CASE_STUDY_COPY).toBe(false);
    expect("heroActions" in MULTI_ROLE_CRM_CASE_STUDY_COPY).toBe(false);
    expect(MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_WIDTH).toBe(512);
    expect(MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_HEIGHT).toBe(503);

    for (const assetPath of [
      MULTI_ROLE_CRM_CASE_STUDY_COPY.heroImage.src,
      MULTI_ROLE_CRM_CASE_STUDY_COPY.heroImage.srcSet.split(" ")[0],
    ]) {
      const relativePath = assetPath.replace(/^\//, "");
      expect(existsSync(join(publicRoot, relativePath))).toBe(true);
    }
  });

  it("matches the vision and tech stack mosaic copy", () => {
    expect(MULTI_ROLE_CRM_CASE_STUDY_COPY.vision.heading).toBe("The Vision");
    expect(MULTI_ROLE_CRM_CASE_STUDY_COPY.vision.body).toMatch(/Retrieval-Augmented Generation/i);
    expect(MULTI_ROLE_CRM_CASE_STUDY_COPY.vision.challenge.text).toMatch(/Fragmented data access/i);
    expect(MULTI_ROLE_CRM_CASE_STUDY_COPY.vision.solution.text).toMatch(/institutional knowledge/i);
    expect("heading" in MULTI_ROLE_CRM_CASE_STUDY_COPY.techStack).toBe(false);
    expect(MULTI_ROLE_CRM_CASE_STUDY_COPY.techStack.items).toHaveLength(4);
    expect(MULTI_ROLE_CRM_CASE_STUDY_COPY.techStack.items.map((item) => item.role)).toEqual([
      "Frontend",
      "Storage",
      "Runtime",
      "LLM & RAG Integration",
    ]);
    expect(MULTI_ROLE_CRM_CASE_STUDY_COPY.techStack.items.filter((item) => item.layout === "wide")).toHaveLength(2);
  });

  it("matches the architectural excellence feature grid copy", () => {
    expect(MULTI_ROLE_CRM_CASE_STUDY_COPY.architecture.heading).toBe("Architectural Excellence");
    expect(MULTI_ROLE_CRM_CASE_STUDY_COPY.architecture.description).toMatch(/high-density enterprise/i);
    expect(MULTI_ROLE_CRM_CASE_STUDY_COPY.architecture.indicators.map((item) => item.icon)).toEqual([
      "shield",
      "gauge",
    ]);
    expect("features" in MULTI_ROLE_CRM_CASE_STUDY_COPY).toBe(false);
    expect(MULTI_ROLE_CRM_CASE_STUDY_COPY.architecture.features).toHaveLength(4);
    expect(MULTI_ROLE_CRM_CASE_STUDY_COPY.architecture.features.map((item) => item.title)).toEqual([
      "Multi-role RBAC",
      "RAG Chatbot",
      "Real-time Sync",
      "Smart Analytics",
    ]);
    expect(MULTI_ROLE_CRM_CASE_STUDY_COPY.bottomCta.title).toBe("Ready to build?");
    expect("socialProof" in MULTI_ROLE_CRM_CASE_STUDY_COPY.bottomCta).toBe(false);
    expect("socialProofIconSrc" in MULTI_ROLE_CRM_CASE_STUDY_COPY.bottomCta).toBe(false);
  });

  it("wires the bottom CTA to contact", () => {
    expect(MULTI_ROLE_CRM_CASE_STUDY_COPY.bottomCta.primaryTo).toBe(ROUTES.contact);
  });
});
