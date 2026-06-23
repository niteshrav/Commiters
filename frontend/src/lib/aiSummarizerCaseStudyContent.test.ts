import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { AI_SUMMARIZER_CASE_STUDY_COPY } from "./aiSummarizerCaseStudyContent";
import {
  AI_SUMMARIZER_CASE_STUDY_HERO_IMAGE_HEIGHT,
  AI_SUMMARIZER_CASE_STUDY_HERO_IMAGE_WIDTH,
} from "./aiSummarizerCaseStudyHeroImage";
import { AI_SUMMARIZER_CASE_STUDY_DESIGN } from "./aiSummarizerCaseStudyDesign";

const publicRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "public");

describe("aiSummarizerCaseStudyContent", () => {
  it("matches the mockup introduction copy and hero asset", () => {
    expect(AI_SUMMARIZER_CASE_STUDY_COPY.documentTitle).toBe("AI Summarizer Case Study");
    expect(AI_SUMMARIZER_CASE_STUDY_COPY.kicker).toBe("TECHNICAL CASE STUDY");
    expect(AI_SUMMARIZER_CASE_STUDY_COPY.title).toBe("AI Summarizer POC");
    expect(AI_SUMMARIZER_CASE_STUDY_HERO_IMAGE_WIDTH).toBe(1024);
    expect(AI_SUMMARIZER_CASE_STUDY_HERO_IMAGE_HEIGHT).toBe(438);

    for (const assetPath of [
      AI_SUMMARIZER_CASE_STUDY_COPY.heroImage.src,
      AI_SUMMARIZER_CASE_STUDY_COPY.heroImage.srcSet.split(" ")[0],
    ]) {
      const relativePath = assetPath.replace(/^\//, "");
      expect(existsSync(join(publicRoot, relativePath))).toBe(true);
    }
  });

  it("matches the bordered core architecture and tech stack copy", () => {
    expect(AI_SUMMARIZER_CASE_STUDY_COPY.architecture.heading).toBe("Core Architecture");
    expect(AI_SUMMARIZER_CASE_STUDY_COPY.techStack.heading).toBe("The Tech Stack");
    expect(AI_SUMMARIZER_CASE_STUDY_COPY.techStack.items).toHaveLength(4);
    expect("documentationLabel" in AI_SUMMARIZER_CASE_STUDY_COPY.techStack).toBe(false);
    expect(AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.sectionHeading).toBe("#111827");
    expect(AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.sectionBody).toBe("#6b7280");
    expect(AI_SUMMARIZER_CASE_STUDY_DESIGN.colors.accentBlue).toBe("#2563eb");
  });

  it("matches the execution strategy copy", () => {
    expect(AI_SUMMARIZER_CASE_STUDY_COPY.execution.heading).toBe("Execution Strategy");
    expect(AI_SUMMARIZER_CASE_STUDY_COPY.execution.items).toHaveLength(3);
    expect(AI_SUMMARIZER_CASE_STUDY_COPY.execution.items.map((item) => item.title)).toEqual([
      "Data Tokenization",
      "Latency Chaining",
      "Output Validation",
    ]);
    expect(AI_SUMMARIZER_CASE_STUDY_COPY.execution.items[0]?.body).toContain("semantic chunks");
  });
});
