import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import {
  AI_SOLUTIONS_ARCHITECTURE,
  AI_SOLUTIONS_CTA_LABEL,
  AI_SOLUTIONS_FORM,
  AI_SOLUTIONS_HERO,
  AI_SOLUTIONS_OFFERINGS,
  AI_SOLUTIONS_SEO,
  AI_SOLUTIONS_STACK,
} from "./aiSolutionsPageContent";

describe("aiSolutionsPageContent", () => {
  it("defines SEO metadata for the governed AI workflow page", () => {
    expect(AI_SOLUTIONS_SEO.path).toBe(ROUTES.aiSolutions);
    expect(AI_SOLUTIONS_SEO.path).toBe("/services/governed-ai-workflow-systems");
    expect(AI_SOLUTIONS_SEO.title).toMatch(/Governed AI & Operational Workflow Systems/i);
    expect(AI_SOLUTIONS_SEO.description).toMatch(/MCP/i);
  });

  it("uses the custom AI engineering hero copy", () => {
    expect(AI_SOLUTIONS_HERO.eyebrow).toBe("ENTERPRISE AI ENGINEERING");
    expect(AI_SOLUTIONS_HERO.headline).toBe("Governed AI & Operational Workflow Systems");
    expect(AI_SOLUTIONS_HERO.subheadline).toBe(
      "Bespoke document parsing, automated back-office pipelines, and cloud verification systems—built with strict Model Context Protocol (MCP) sockets and zero vendor lock-in.",
    );
    expect(AI_SOLUTIONS_CTA_LABEL).toBe("Request Governed AI Scoping");
  });

  it("lists capabilities, architecture pillars, and a pre-selected governed AI form", () => {
    expect(AI_SOLUTIONS_OFFERINGS.map((card) => card.title)).toEqual([
      "Enterprise Document Ingestion",
      "Field & Back-Office Automation",
      "Zero Vendor Lock-in",
    ]);
    expect(AI_SOLUTIONS_ARCHITECTURE.map((card) => card.title)).toEqual([
      "MCP Tool Sockets",
      "Two-Tier Policy Gateways",
      "Row-Level Security (RLS)",
      "Vibe Diff Approval",
    ]);
    expect(AI_SOLUTIONS_STACK.map((item) => item.label)).toEqual([
      "Gemini",
      "Claude",
      "Node.js",
      "Python",
      "Google Cloud Run",
    ]);
    expect(AI_SOLUTIONS_FORM.scopeLabel).toBe("What should we scope?");
    expect(AI_SOLUTIONS_FORM.submitLabel).toBe(AI_SOLUTIONS_CTA_LABEL);
    expect(AI_SOLUTIONS_FORM.serviceNeeded).toBe("Governed AI & Workflow Systems");
  });
});
