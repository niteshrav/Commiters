import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import {
  AI_OPERATIONAL_AUDIT_CTA_LABEL,
  AI_OPERATIONAL_AUDIT_DIAGNOSE,
  AI_OPERATIONAL_AUDIT_DIAGNOSE_TITLE,
  AI_OPERATIONAL_AUDIT_FORM,
  AI_OPERATIONAL_AUDIT_GOVERNANCE,
  AI_OPERATIONAL_AUDIT_HERO,
  AI_OPERATIONAL_AUDIT_PRICING,
  AI_OPERATIONAL_AUDIT_PROCESS,
  AI_OPERATIONAL_AUDIT_PROCESS_TITLE,
  AI_OPERATIONAL_AUDIT_SEO,
} from "./aiOperationalAuditPageContent";

describe("aiOperationalAuditPageContent", () => {
  it("defines SEO metadata for the diagnostic landing page", () => {
    expect(AI_OPERATIONAL_AUDIT_SEO.path).toBe(ROUTES.aiOperationalAudit);
    expect(AI_OPERATIONAL_AUDIT_SEO.path).toBe("/services/ai-operational-audit");
    expect(AI_OPERATIONAL_AUDIT_SEO.title).toMatch(/AI Operational Audit/i);
    expect(AI_OPERATIONAL_AUDIT_SEO.description).toMatch(/2-week/i);
    expect(AI_OPERATIONAL_AUDIT_SEO.description).toMatch(/Spec-Driven Architecture Blueprint/i);
  });

  it("uses the 2-week engagement hero and workflow diagnostics value proposition", () => {
    expect(AI_OPERATIONAL_AUDIT_HERO.eyebrow).toBe("2-WEEK ENGAGEMENT");
    expect(AI_OPERATIONAL_AUDIT_HERO.headline).toBe("AI Operational Audits & Cloud Diagnostics");
    expect(AI_OPERATIONAL_AUDIT_HERO.subheadline).toBe(
      "We analyze your manual operational bottlenecks, spreadsheet dependencies, and legacy workflows to deliver a live automation prototype and a Spec-Driven Architecture Blueprint (/specs).",
    );
    expect(AI_OPERATIONAL_AUDIT_CTA_LABEL).toBe("Book Your 2-Week Audit");
  });

  it("publishes a fixed-scope dual-currency pricing block", () => {
    expect(AI_OPERATIONAL_AUDIT_PRICING.title).toBe("Pricing & Scope");
    expect(AI_OPERATIONAL_AUDIT_PRICING.engagement).toBe("Fixed-scope 2-week engagement");
    expect(AI_OPERATIONAL_AUDIT_PRICING.range).toBe("$3,000–$5,000 / ₹35,000–₹50,000");
    expect(AI_OPERATIONAL_AUDIT_PRICING.summary).toBe(
      "Includes discovery sessions, a working prototype, and the Spec-Driven Architecture Blueprint.",
    );
  });

  it("lists three diagnose cards and a 14-day deliverable timeline", () => {
    expect(AI_OPERATIONAL_AUDIT_DIAGNOSE_TITLE).toBe("What We Diagnose");
    expect(AI_OPERATIONAL_AUDIT_DIAGNOSE.map((card) => ({ title: card.title, body: card.body }))).toEqual([
      {
        title: "Spreadsheet & Manual Bottlenecks",
        body: "Identify re-typing, manual invoice parsing, and slow data entry.",
      },
      {
        title: "Workflow Security & Policy Gaps",
        body: "Audit where sensitive company data is exposed to unmonitored AI tools.",
      },
      {
        title: "Automation ROI Roadmap",
        body: "Deliver a clear cost-benefit breakdown before you write a single line of production code.",
      },
    ]);
    expect(AI_OPERATIONAL_AUDIT_PROCESS_TITLE).toBe("The 2-Week Deliverables");
    expect(AI_OPERATIONAL_AUDIT_PROCESS.map((step) => ({ week: step.week, body: step.body }))).toEqual([
      {
        week: "Days 1-3",
        body: "Discovery",
      },
      {
        week: "Days 4-8",
        body: "Prototype Build",
      },
      {
        week: "Days 9-14",
        body: "Deliver Spec-Driven Blueprint",
      },
    ]);
  });

  it("pins audit recommendations to The Committers Way governance banner", () => {
    expect(AI_OPERATIONAL_AUDIT_GOVERNANCE.title).toBe("The Committers Way");
    expect(AI_OPERATIONAL_AUDIT_GOVERNANCE.body).toBe(
      'All audit recommendations follow "The Committers Way": Zero ambient authority, two-tier policy gateways, and human-in-the-loop validation.',
    );
  });

  it("hardcodes the 2-week blueprint scope on the booking form", () => {
    expect(AI_OPERATIONAL_AUDIT_FORM.nameLabel).toBe("Name");
    expect(AI_OPERATIONAL_AUDIT_FORM.emailLabel).toBe("Work Email");
    expect(AI_OPERATIONAL_AUDIT_FORM.companyLabel).toBe("Company Name");
    expect(AI_OPERATIONAL_AUDIT_FORM.bottleneckLabel).toBe("Current Manual Bottleneck Description");
    expect(AI_OPERATIONAL_AUDIT_FORM.scopeLabel).toBe("What should we scope?");
    expect(AI_OPERATIONAL_AUDIT_FORM.serviceNeeded).toBe("AI Operational Audit (2-Week Blueprint)");
    expect(AI_OPERATIONAL_AUDIT_FORM.submitLabel).toBe("Submit Audit Request");
    expect(AI_OPERATIONAL_AUDIT_FORM.budgetRange).toBe("$3,000–$5,000 / ₹35,000–₹50,000");
  });
});
