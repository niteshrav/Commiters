import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import {
  AI_SOLUTIONS_BOTTOM_CTA,
  AI_SOLUTIONS_CTA_LABEL,
  AI_SOLUTIONS_HERO,
  AI_SOLUTIONS_OFFERINGS,
  AI_SOLUTIONS_SEO,
  AI_SOLUTIONS_STACK,
} from "./aiSolutionsPageContent";

describe("aiSolutionsPageContent", () => {
  it("defines SEO metadata for the Gen AI service page", () => {
    expect(AI_SOLUTIONS_SEO.path).toBe(ROUTES.aiSolutions);
    expect(AI_SOLUTIONS_SEO.path).toBe("/services/ai-solutions");
    expect(AI_SOLUTIONS_SEO.title).toMatch(/Generative AI/i);
    expect(AI_SOLUTIONS_SEO.description).toMatch(/Vertex AI/i);
  });

  it("uses the enterprise Gen AI hero copy", () => {
    expect(AI_SOLUTIONS_HERO.eyebrow).toBe("ENTERPRISE-GRADE GEN AI INTEGRATIONS");
    expect(AI_SOLUTIONS_HERO.headline).toBe("Custom Generative AI Pipelines Built for Your Specific Business Logic");
    expect(AI_SOLUTIONS_HERO.subheadline).toBe(
      "We connect Google Vertex AI, Gemini 1.5, and fine-tuned LLMs directly into your databases, web apps, and operational workflows.",
    );
    expect(AI_SOLUTIONS_CTA_LABEL).toBe("Explore Custom AI Solutions");
  });

  it("lists three core offerings, a cloud stack banner, and a closing CTA", () => {
    expect(AI_SOLUTIONS_OFFERINGS.map((card) => card.title)).toEqual([
      "Intelligent Document Processing",
      "Knowledge Base & Vector Search (RAG)",
      "Automated Workflow Agents",
    ]);
    expect(AI_SOLUTIONS_OFFERINGS[0]?.body).toMatch(/ERP\/Database/i);
    expect(AI_SOLUTIONS_OFFERINGS[1]?.body).toMatch(/LLM-powered search/i);
    expect(AI_SOLUTIONS_OFFERINGS[2]?.body).toMatch(/triage emails/i);
    expect(AI_SOLUTIONS_STACK.map((item) => item.label)).toEqual([
      "Google Cloud Run",
      "Vertex AI",
      "Gemini 1.5",
      "PostgreSQL",
      "Python",
      "Node.js",
      "Terraform",
    ]);
    expect(AI_SOLUTIONS_BOTTOM_CTA.headline).toBe("Ready to embed Gen AI into your core stack?");
    expect(AI_SOLUTIONS_BOTTOM_CTA.to).toBe(ROUTES.aiOperationalAudit);
  });
});
