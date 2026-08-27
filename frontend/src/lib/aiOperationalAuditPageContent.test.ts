import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import {
  AI_OPERATIONAL_AUDIT_CTA_LABEL,
  AI_OPERATIONAL_AUDIT_DELIVERABLES,
  AI_OPERATIONAL_AUDIT_FORM,
  AI_OPERATIONAL_AUDIT_HERO,
  AI_OPERATIONAL_AUDIT_PROCESS,
  AI_OPERATIONAL_AUDIT_SEO,
} from "./aiOperationalAuditPageContent";

describe("aiOperationalAuditPageContent", () => {
  it("defines SEO metadata for the diagnostic landing page", () => {
    expect(AI_OPERATIONAL_AUDIT_SEO.path).toBe(ROUTES.aiOperationalAudit);
    expect(AI_OPERATIONAL_AUDIT_SEO.path).toBe("/services/ai-operational-audit");
    expect(AI_OPERATIONAL_AUDIT_SEO.title).toMatch(/AI Operational Audit/i);
    expect(AI_OPERATIONAL_AUDIT_SEO.description).toMatch(/20\+ hours/i);
  });

  it("uses the 2-week diagnostic hero copy", () => {
    expect(AI_OPERATIONAL_AUDIT_HERO.eyebrow).toBe("2-WEEK FIXED DIAGNOSTIC ENGAGEMENT");
    expect(AI_OPERATIONAL_AUDIT_HERO.headline).toBe(
      "Identify & Eliminate Back-Office Bottlenecks with AI Operational Engineering",
    );
    expect(AI_OPERATIONAL_AUDIT_HERO.subheadline).toBe(
      "We audit your manual workflows, spreadsheet dependencies, and legacy bottlenecks to deliver a blueprint and working prototype that saves 20+ hours per week.",
    );
    expect(AI_OPERATIONAL_AUDIT_CTA_LABEL).toBe("Book an AI Operational Audit ($3,000 - $5,000)");
  });

  it("lists four deliverable cards and a two-week process", () => {
    expect(AI_OPERATIONAL_AUDIT_DELIVERABLES.map((card) => card.title)).toEqual([
      "Bottleneck Mapping",
      "AI Architecture Spec",
      "Working Proof-of-Concept",
      "ROI & Execution Roadmap",
    ]);
    expect(AI_OPERATIONAL_AUDIT_DELIVERABLES[0]?.body).toMatch(/visual flowchart/i);
    expect(AI_OPERATIONAL_AUDIT_DELIVERABLES[1]?.body).toMatch(/GCP & Vertex AI/i);
    expect(AI_OPERATIONAL_AUDIT_DELIVERABLES[2]?.body).toMatch(/14-day prototype/i);
    expect(AI_OPERATIONAL_AUDIT_DELIVERABLES[3]?.body).toMatch(/hours saved/i);
    expect(AI_OPERATIONAL_AUDIT_PROCESS.map((step) => step.week)).toEqual(["Week 1", "Week 2"]);
    expect(AI_OPERATIONAL_AUDIT_PROCESS[0]?.body).toMatch(/Discovery/i);
    expect(AI_OPERATIONAL_AUDIT_PROCESS[1]?.body).toMatch(/Prototype Build/i);
  });

  it("defines booking form labels for work-email gated intake", () => {
    expect(AI_OPERATIONAL_AUDIT_FORM.nameLabel).toBe("Name");
    expect(AI_OPERATIONAL_AUDIT_FORM.emailLabel).toBe("Work Email");
    expect(AI_OPERATIONAL_AUDIT_FORM.companyLabel).toBe("Company Name");
    expect(AI_OPERATIONAL_AUDIT_FORM.bottleneckLabel).toBe("Current Manual Bottleneck Description");
    expect(AI_OPERATIONAL_AUDIT_FORM.submitLabel).toBe(AI_OPERATIONAL_AUDIT_CTA_LABEL);
  });
});
