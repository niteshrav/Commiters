import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import {
  formatOpsFlowRemainingLabel,
  OPSFLOW_BOTTOM_CTA,
  OPSFLOW_DAILY_LIMIT,
  OPSFLOW_DOCUMENT_CATEGORIES,
  OPSFLOW_HERO,
  OPSFLOW_HOW_IT_WORKS,
  OPSFLOW_PREVIEW,
  OPSFLOW_PROCESSING_LABEL,
  OPSFLOW_QUOTA_BODY,
  OPSFLOW_QUOTA_CONTACT_EMAIL,
  OPSFLOW_QUOTA_TITLE,
  OPSFLOW_SECURITY_FOOTER,
  OPSFLOW_SEO,
  OPSFLOW_SUBMIT_LABEL,
  OPSFLOW_VALUE_CARDS,
} from "./opsFlowPageContent";

describe("opsFlowPageContent", () => {
  it("defines SEO metadata for the product landing page", () => {
    expect(OPSFLOW_SEO.path).toBe(ROUTES.opsFlow);
    expect(OPSFLOW_SEO.title).toBe("OpsFlow AI");
    expect(OPSFLOW_SEO.description).toMatch(/PDF invoices/i);
  });

  it("uses the free-utility hero copy", () => {
    expect(OPSFLOW_HERO.eyebrow).toBe("FREE BUSINESS UTILITY | ZERO SETUP REQUIRED");
    expect(OPSFLOW_HERO.headline).toBe("Turn PDF Invoices, Receipts & Shipping Bills into Clean Excel Files");
    expect(OPSFLOW_HERO.subheadline).toMatch(/Indian GST invoices/i);
  });

  it("lists three B2B value propositions", () => {
    expect(OPSFLOW_VALUE_CARDS.map((card) => card.title)).toEqual([
      "Zero-Friction Web Sandbox",
      "Direct Excel & CSV Bridge",
      "B2B Pipeline Ready",
    ]);
    expect(OPSFLOW_VALUE_CARDS.map((card) => card.icon)).toEqual(["upload", "spreadsheet", "pipeline"]);
    expect(OPSFLOW_VALUE_CARDS[0]?.body).toMatch(/10 free daily extractions/i);
    expect(OPSFLOW_VALUE_CARDS[1]?.body).toMatch(/Tally\/QuickBooks/i);
    expect(OPSFLOW_VALUE_CARDS[2]?.body).toMatch(/Zapier\/ERP/i);
  });

  it("defines how-it-works steps, preview fields, and bottom CTA", () => {
    expect(OPSFLOW_HOW_IT_WORKS.steps).toHaveLength(3);
    expect(OPSFLOW_HOW_IT_WORKS.steps[0]?.title).toMatch(/Upload/i);
    expect(OPSFLOW_PREVIEW.fields.some((field) => field.label === "GSTIN")).toBe(true);
    expect(OPSFLOW_PREVIEW.lineItems).toHaveLength(2);
    expect(OPSFLOW_BOTTOM_CTA.primaryTo).toBe(ROUTES.contact);
    expect(OPSFLOW_BOTTOM_CTA.secondaryTo).toBe(ROUTES.workflowAutomation);
  });

  it("exposes lead-gate labels, categories, and trust copy", () => {
    expect(OPSFLOW_DOCUMENT_CATEGORIES).toEqual([
      "GST Invoices",
      "Shipping Manifests/Bills",
      "Tax Receipts",
      "Purchase Orders",
      "Other",
    ]);
    expect(OPSFLOW_SUBMIT_LABEL).toBe("Extract Data to Excel (Free)");
    expect(OPSFLOW_PROCESSING_LABEL).toBe("Analyzing document fields with Gemini...");
    expect(OPSFLOW_SECURITY_FOOTER).toMatch(/Google Gemini via Google AI Studio/i);
    expect(OPSFLOW_SECURITY_FOOTER).toMatch(/deleted automatically/i);
  });

  it("formats remaining extractions and quota copy for the sandbox", () => {
    expect(OPSFLOW_DAILY_LIMIT).toBe(10);
    expect(formatOpsFlowRemainingLabel(10)).toBe("Extractions remaining today: 10/10");
    expect(formatOpsFlowRemainingLabel(7)).toBe("Extractions remaining today: 7/10");
    expect(formatOpsFlowRemainingLabel(0)).toBe("Extractions remaining today: 0/10");
    expect(OPSFLOW_QUOTA_TITLE).toMatch(/Daily limit reached/i);
    expect(OPSFLOW_QUOTA_BODY).toMatch(/10 free extractions/i);
    expect(OPSFLOW_QUOTA_BODY).toContain("hello@commiters.com");
    expect(OPSFLOW_QUOTA_CONTACT_EMAIL).toBe("hello@commiters.com");
  });
});
