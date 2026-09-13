import { describe, expect, it } from "vitest";
import { BUDGET_RANGE_OPTIONS } from "./budgetRanges";
import { AI_OPERATIONAL_AUDIT_BOOKING_ANCHOR, AI_OPERATIONAL_AUDIT_BOOKING_HREF, ROUTES } from "./routes";
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
    expect(AI_OPERATIONAL_AUDIT_SEO.description).toMatch(/48 hours/i);
    expect(AI_OPERATIONAL_AUDIT_SEO.description).toMatch(/credited/i);
  });

  it("uses the low-risk discovery hero and 48-hour diagnostic value proposition", () => {
    expect(AI_OPERATIONAL_AUDIT_HERO.eyebrow).toBe("ENTERPRISE AI & CLOUD SYSTEMS");
    expect(AI_OPERATIONAL_AUDIT_HERO.headline).toBe("AI Operational Audits & Cloud Diagnostics");
    expect(AI_OPERATIONAL_AUDIT_HERO.subheadline).toBe(
      "We audit your manual workflows, spreadsheet bottlenecks, and software stack to deliver a complete technical blueprint and AI implementation map within 48 hours. 100% of your diagnostic fee is credited directly toward your software build.",
    );
    expect(AI_OPERATIONAL_AUDIT_CTA_LABEL).toBe("Book Your AI Diagnostic");
  });

  it("publishes a dual-market deductible pricing card", () => {
    expect(AI_OPERATIONAL_AUDIT_PRICING.title).toBe("Fixed-Scope AI & Technical Diagnostic");
    expect(AI_OPERATIONAL_AUDIT_PRICING.indiaLabel).toBe("India");
    expect(AI_OPERATIONAL_AUDIT_PRICING.indiaPrice).toBe("₹4,999");
    expect(AI_OPERATIONAL_AUDIT_PRICING.internationalLabel).toBe("International");
    expect(AI_OPERATIONAL_AUDIT_PRICING.internationalPrice).toBe("$499");
    expect(AI_OPERATIONAL_AUDIT_PRICING.badge).toBe(
      "100% DEDUCTIBLE — Credited directly toward your full build",
    );
    expect(AI_OPERATIONAL_AUDIT_PRICING.features).toEqual([
      "48-Hour Operational & Data Bottleneck Audit",
      "Custom Spec-Driven Architecture Blueprint",
      "Tool selection, security gap assessment, and ROI roadmap",
      "100% Credit Guarantee: ₹4,999 / $499 credited toward implementation when you build with us.",
    ]);
  });

  it("lists three diagnose cards and a 48-hour deliverable timeline", () => {
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
    expect(AI_OPERATIONAL_AUDIT_PROCESS_TITLE).toBe("The Deliverables");
    expect(AI_OPERATIONAL_AUDIT_PROCESS.map((step) => ({ week: step.week, title: step.title, body: step.body }))).toEqual([
      {
        week: "Days 1–2",
        title: "48-Hour Technical Diagnostic",
        body: "Deep dive into operational bottlenecks, tech stack, and data flow gaps.",
      },
      {
        week: "Days 3–5",
        title: "Prototype & Spec-Driven Blueprint",
        body: "Architecture breakdown, tool selection, and fixed-scope build roadmap.",
      },
      {
        week: "Days 6+",
        title: "Full Build Rollout & Fee Credit",
        body: "100% of your diagnostic fee is applied directly toward production code implementation.",
      },
    ]);
  });

  it("pins audit recommendations to The Commiters Way governance banner", () => {
    expect(AI_OPERATIONAL_AUDIT_GOVERNANCE.title).toBe("The Commiters Way");
    expect(AI_OPERATIONAL_AUDIT_GOVERNANCE.body).toBe(
      'All audit recommendations follow "The Commiters Way": Zero ambient authority, two-tier policy gateways, and human-in-the-loop validation.',
    );
  });

  it("hardcodes the deductible diagnostic scope on the booking form", () => {
    expect(AI_OPERATIONAL_AUDIT_FORM.title).toBe("Book your diagnostic");
    expect(AI_OPERATIONAL_AUDIT_BOOKING_HREF).toBe(
      `${ROUTES.aiOperationalAudit}#${AI_OPERATIONAL_AUDIT_BOOKING_ANCHOR}`,
    );
    expect(AI_OPERATIONAL_AUDIT_FORM.nameLabel).toBe("Name");
    expect(AI_OPERATIONAL_AUDIT_FORM.emailLabel).toBe("Work Email");
    expect(AI_OPERATIONAL_AUDIT_FORM.companyLabel).toBe("Company Name");
    expect(AI_OPERATIONAL_AUDIT_FORM.bottleneckLabel).toBe("Current Manual Bottleneck Description");
    expect(AI_OPERATIONAL_AUDIT_FORM.scopeLabel).toBe("What should we scope?");
    expect(AI_OPERATIONAL_AUDIT_FORM.scopeOptions).toEqual(["AI & Workflow Diagnostic (₹4,999 / $499)"]);
    expect(AI_OPERATIONAL_AUDIT_FORM.serviceNeeded).toBe("AI & Workflow Diagnostic (₹4,999 / $499)");
    expect(AI_OPERATIONAL_AUDIT_FORM.submitLabel).toBe("Request AI Diagnostic (₹4,999 / $499)");
    expect(AI_OPERATIONAL_AUDIT_FORM.budgetRange).toBe("₹4,999 / $499");
    expect(AI_OPERATIONAL_AUDIT_FORM.timeline).toBe("48-hour diagnostic");
    expect(BUDGET_RANGE_OPTIONS).toContain(AI_OPERATIONAL_AUDIT_FORM.budgetRange);
  });
});
