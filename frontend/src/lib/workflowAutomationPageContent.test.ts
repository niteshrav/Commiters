import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import {
  WORKFLOW_AUTOMATION_CTA_LABEL,
  WORKFLOW_AUTOMATION_FORM,
  WORKFLOW_AUTOMATION_HERO,
  WORKFLOW_AUTOMATION_PIPELINE,
  WORKFLOW_AUTOMATION_SEO,
  WORKFLOW_AUTOMATION_SOLUTIONS,
} from "./workflowAutomationPageContent";

describe("workflowAutomationPageContent", () => {
  it("defines SEO metadata for the workflow automation page", () => {
    expect(WORKFLOW_AUTOMATION_SEO.path).toBe(ROUTES.workflowAutomation);
    expect(WORKFLOW_AUTOMATION_SEO.path).toBe("/services/workflow-automation");
    expect(WORKFLOW_AUTOMATION_SEO.title).toMatch(/Workflow/i);
    expect(WORKFLOW_AUTOMATION_SEO.description).toMatch(/CRM/i);
  });

  it("uses the business process automation hero copy", () => {
    expect(WORKFLOW_AUTOMATION_HERO.eyebrow).toBe("BUSINESS PROCESS AUTOMATION");
    expect(WORKFLOW_AUTOMATION_HERO.headline).toBe("Connect Your Tools & Automate Repetitive Back-Office Tasks");
    expect(WORKFLOW_AUTOMATION_HERO.subheadline).toBe(
      "Stop wasting hours copy-pasting spreadsheet data. We build automated data pipelines connecting your CRM, WhatsApp, Email, and Accounting systems.",
    );
    expect(WORKFLOW_AUTOMATION_CTA_LABEL).toBe("Automate Your Workflows");
  });

  it("lists three solutions, a three-step pipeline, and an audit booking form", () => {
    expect(WORKFLOW_AUTOMATION_SOLUTIONS.map((card) => card.title)).toEqual([
      "Financial & Invoice Syncing",
      "Automated Customer Communications",
      "Data Reconciliation Pipelines",
    ]);
    expect(WORKFLOW_AUTOMATION_SOLUTIONS[0]?.body).toMatch(/Tally, QuickBooks, or Zoho/i);
    expect(WORKFLOW_AUTOMATION_SOLUTIONS[1]?.body).toMatch(/WhatsApp\/Email/i);
    expect(WORKFLOW_AUTOMATION_SOLUTIONS[2]?.body).toMatch(/multi-tenant/i);
    expect(WORKFLOW_AUTOMATION_PIPELINE.map((step) => step.title)).toEqual([
      "Unstructured Data / Email",
      "Commiters AI Pipeline",
      "Your ERP / CRM / Excel",
    ]);
    expect(WORKFLOW_AUTOMATION_FORM.title).toMatch(/AI Operational Audit/i);
    expect(WORKFLOW_AUTOMATION_FORM.auditTo).toBe(ROUTES.aiOperationalAudit);
    expect(WORKFLOW_AUTOMATION_FORM.serviceNeeded).toBe("AI Operational Audit");
  });
});
