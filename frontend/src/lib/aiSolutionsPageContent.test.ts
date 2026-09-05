import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import {
  AI_SOLUTIONS_CTA_LABEL,
  AI_SOLUTIONS_FORM,
  AI_SOLUTIONS_HERO,
  AI_SOLUTIONS_OFFERINGS,
  AI_SOLUTIONS_SEO,
  AI_SOLUTIONS_STACK,
} from "./aiSolutionsPageContent";

describe("aiSolutionsPageContent", () => {
  it("defines SEO metadata for the AI pipeline engineering page", () => {
    expect(AI_SOLUTIONS_SEO.path).toBe(ROUTES.aiSolutions);
    expect(AI_SOLUTIONS_SEO.path).toBe("/services/ai-pipeline-engineering");
    expect(AI_SOLUTIONS_SEO.title).toMatch(/AI Pipeline Engineering/i);
    expect(AI_SOLUTIONS_SEO.description).toMatch(/document parsing|LLM/i);
  });

  it("uses the enterprise document-parsing hero copy", () => {
    expect(AI_SOLUTIONS_HERO.eyebrow).toBe("ENTERPRISE-GRADE DOCUMENT PARSING");
    expect(AI_SOLUTIONS_HERO.headline).toBe("Enterprise-Grade Document Parsing & LLM Workflows Built for Speed.");
    expect(AI_SOLUTIONS_HERO.subheadline).toBe(
      "We design custom extraction pipelines for Indian GST/PAN documents, wire Gemini and Claude into your operations, and keep the backend free of vendor lock-in.",
    );
    expect(AI_SOLUTIONS_CTA_LABEL).toBe("Schedule Technical Scoping Call");
  });

  it("lists GST/PAN extraction, Gemini/Claude, and zero-lock-in features", () => {
    expect(AI_SOLUTIONS_OFFERINGS.map((card) => card.title)).toEqual([
      "Custom Document Extraction",
      "Gemini & Claude Integrations",
      "Zero Vendor-Lock-In Architecture",
    ]);
    expect(AI_SOLUTIONS_OFFERINGS[0]?.body).toMatch(/GST\/PAN/i);
    expect(AI_SOLUTIONS_OFFERINGS[1]?.body).toMatch(/Gemini/i);
    expect(AI_SOLUTIONS_OFFERINGS[1]?.body).toMatch(/Claude/i);
    expect(AI_SOLUTIONS_OFFERINGS[2]?.body).toMatch(/vendor[- ]lock/i);
    expect(AI_SOLUTIONS_STACK.map((item) => item.label)).toEqual([
      "Gemini",
      "Claude",
      "Node.js",
      "Python",
      "Google Cloud Run",
    ]);
    expect(AI_SOLUTIONS_FORM.submitLabel).toBe(AI_SOLUTIONS_CTA_LABEL);
    expect(AI_SOLUTIONS_FORM.serviceNeeded).toBe("Custom AI Pipeline Engineering");
  });
});
