import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import {
  AI_OPERATIONAL_AUDIT_CTA_LABEL,
  AI_OPERATIONAL_AUDIT_DELIVERABLES,
  AI_OPERATIONAL_AUDIT_FORM,
  AI_OPERATIONAL_AUDIT_HERO,
  AI_OPERATIONAL_AUDIT_PRICING,
  AI_OPERATIONAL_AUDIT_PROCESS,
  AI_OPERATIONAL_AUDIT_SEO,
} from "./aiOperationalAuditPageContent";

describe("aiOperationalAuditPageContent", () => {
  it("defines SEO metadata for the diagnostic landing page", () => {
    expect(AI_OPERATIONAL_AUDIT_SEO.path).toBe(ROUTES.aiOperationalAudit);
    expect(AI_OPERATIONAL_AUDIT_SEO.path).toBe("/services/ai-operational-audit");
    expect(AI_OPERATIONAL_AUDIT_SEO.title).toMatch(/AI Operational Audit/i);
    expect(AI_OPERATIONAL_AUDIT_SEO.description).toMatch(/2-week/i);
  });

  it("uses the 2-week cash-generator hero and value proposition", () => {
    expect(AI_OPERATIONAL_AUDIT_HERO.eyebrow).toBe("2-WEEK FIXED DIAGNOSTIC ENGAGEMENT");
    expect(AI_OPERATIONAL_AUDIT_HERO.headline).toBe(
      "Eliminate Back-Office Bottlenecks with a 2-Week AI Operational Audit.",
    );
    expect(AI_OPERATIONAL_AUDIT_HERO.subheadline).toBe(
      "We shadow your back-office workflows, identify manual spreadsheet friction, and build a live working AI automation prototype.",
    );
    expect(AI_OPERATIONAL_AUDIT_CTA_LABEL).toBe("Book Operational Audit");
  });

  it("publishes a fixed-scope dual-currency pricing block", () => {
    expect(AI_OPERATIONAL_AUDIT_PRICING.title).toBe("Pricing & Scope");
    expect(AI_OPERATIONAL_AUDIT_PRICING.engagement).toBe("Fixed-scope 2-week engagement");
    expect(AI_OPERATIONAL_AUDIT_PRICING.range).toBe("$3,000–$5,000 / ₹35,000–₹50,000");
    expect(AI_OPERATIONAL_AUDIT_PRICING.summary).toBe(
      "Fixed-scope 2-week engagement ($3,000–$5,000 / ₹35,000–₹50,000).",
    );
  });

  it("lists three deliverable cards and a two-week process", () => {
    expect(AI_OPERATIONAL_AUDIT_DELIVERABLES.map((card) => card.title)).toEqual([
      "Workflow Bottleneck Diagnostic Map",
      "Working AI / Automation Prototype",
      "ROI & Implementation Roadmap",
    ]);
    expect(AI_OPERATIONAL_AUDIT_DELIVERABLES.every((card) => card.body.trim().length > 24)).toBe(true);
    expect(AI_OPERATIONAL_AUDIT_PROCESS.map((step) => step.week)).toEqual(["Week 1", "Week 2"]);
    expect(AI_OPERATIONAL_AUDIT_PROCESS[0]?.body).toMatch(/shadow/i);
    expect(AI_OPERATIONAL_AUDIT_PROCESS[1]?.body).toMatch(/prototype/i);
  });

  it("defines booking form labels for work-email gated intake", () => {
    expect(AI_OPERATIONAL_AUDIT_FORM.nameLabel).toBe("Name");
    expect(AI_OPERATIONAL_AUDIT_FORM.emailLabel).toBe("Work Email");
    expect(AI_OPERATIONAL_AUDIT_FORM.companyLabel).toBe("Company Name");
    expect(AI_OPERATIONAL_AUDIT_FORM.bottleneckLabel).toBe("Current Manual Bottleneck Description");
    expect(AI_OPERATIONAL_AUDIT_FORM.submitLabel).toBe(AI_OPERATIONAL_AUDIT_CTA_LABEL);
    expect(AI_OPERATIONAL_AUDIT_FORM.budgetRange).toBe("$3,000–$5,000 / ₹35,000–₹50,000");
  });
});
