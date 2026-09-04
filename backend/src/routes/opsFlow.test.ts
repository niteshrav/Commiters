import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

const mocks = vi.hoisted(() => ({
  extractDocumentFields: vi.fn(),
  isOpsFlowGeminiConfigured: vi.fn(),
  isMongoConnected: vi.fn(),
  getOpsFlowDailyCount: vi.fn(),
  recordOpsFlowExtraction: vi.fn(),
  dispatchInquiryNotifications: vi.fn(),
  createSubmissionRef: vi.fn(),
}));

vi.mock("../lib/opsFlowGemini", () => ({
  extractDocumentFields: mocks.extractDocumentFields,
  isOpsFlowGeminiConfigured: mocks.isOpsFlowGeminiConfigured,
}));

vi.mock("../cms/config/database", () => ({
  isMongoConnected: mocks.isMongoConnected,
}));

vi.mock("../lib/opsFlowUsageStore", () => ({
  getOpsFlowDailyCount: mocks.getOpsFlowDailyCount,
  recordOpsFlowExtraction: mocks.recordOpsFlowExtraction,
}));

vi.mock("../lib/inquiryNotifications", () => ({
  dispatchInquiryNotifications: mocks.dispatchInquiryNotifications,
}));

vi.mock("../lib/inquirySubmissionRef", () => ({
  createSubmissionRef: mocks.createSubmissionRef,
}));

import { createApp } from "../app";
import { OPSFLOW_DAILY_LIMIT, OPSFLOW_QUOTA_ERROR } from "../lib/opsFlowQuota";

const extractedFields = {
  documentDate: "2026-03-31",
  vendorName: "IRCTC",
  taxIds: { gst: "", pan: "" },
  invoiceNumber: "3107",
  lineItems: [{ description: "Ticket", quantity: 1, unitPrice: 450, total: 450 }],
  subtotal: 450,
  taxAmounts: { cgst: 0, sgst: 0, igst: 0 },
  grandTotal: 450,
};

function stubSuccessfulExtract() {
  mocks.isOpsFlowGeminiConfigured.mockReturnValue(true);
  mocks.isMongoConnected.mockReturnValue(true);
  mocks.getOpsFlowDailyCount.mockResolvedValue(0);
  mocks.recordOpsFlowExtraction.mockResolvedValue({ count: 1, remaining: 9, utcDate: "2026-09-04" });
  mocks.dispatchInquiryNotifications.mockResolvedValue(undefined);
  mocks.createSubmissionRef.mockReturnValue({
    id: "opsflow_lead_1",
    submittedAt: new Date("2026-09-04T12:00:00.000Z"),
  });
  mocks.extractDocumentFields.mockResolvedValue(extractedFields);
}

describe("POST /api/opsflow/parse", () => {
  afterEach(() => {
    mocks.extractDocumentFields.mockReset();
    mocks.isOpsFlowGeminiConfigured.mockReset();
    mocks.isMongoConnected.mockReset();
    mocks.getOpsFlowDailyCount.mockReset();
    mocks.recordOpsFlowExtraction.mockReset();
    mocks.dispatchInquiryNotifications.mockReset();
    mocks.createSubmissionRef.mockReset();
  });

  it("rejects personal email domains before calling Gemini", async () => {
    stubSuccessfulExtract();
    const app = createApp();
    const res = await request(app)
      .post("/api/opsflow/parse")
      .field("workEmail", "ops@gmail.com")
      .field("category", "Other")
      .attach("file", Buffer.from("%PDF-1.4 test"), { filename: "ticket.pdf", contentType: "application/pdf" });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/official work email/i);
    expect(mocks.extractDocumentFields).not.toHaveBeenCalled();
    expect(mocks.getOpsFlowDailyCount).not.toHaveBeenCalled();
  });

  it("returns an xlsx attachment for a valid work-email upload", async () => {
    stubSuccessfulExtract();
    const app = createApp();
    const res = await request(app)
      .post("/api/opsflow/parse")
      .field("workEmail", "hello@commiters.com")
      .field("category", "Other")
      .attach("file", Buffer.from("%PDF-1.4 ticket"), { filename: "ticket.pdf", contentType: "application/pdf" });

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/spreadsheetml/);
    expect(res.headers["content-disposition"]).toMatch(/OpsFlow_Extracted_Data\.xlsx/);
    expect(Number(res.headers["content-length"])).toBeGreaterThan(100);
    expect(res.headers["x-opsflow-remaining-extractions"]).toBe("9");
    expect(res.headers["x-opsflow-daily-limit"]).toBe(String(OPSFLOW_DAILY_LIMIT));
    expect(mocks.extractDocumentFields).toHaveBeenCalledTimes(1);
    expect(mocks.recordOpsFlowExtraction).toHaveBeenCalledWith(
      expect.objectContaining({
        workEmail: "hello@commiters.com",
        category: "Other",
      }),
    );
    expect(mocks.dispatchInquiryNotifications).toHaveBeenCalledWith(
      expect.objectContaining({
        kind: "opsflow_extract",
        email: "hello@commiters.com",
        serviceOrPosition: "Other",
      }),
    );
  });

  it("returns 429 without extracting when the daily quota is exhausted", async () => {
    stubSuccessfulExtract();
    mocks.getOpsFlowDailyCount.mockResolvedValue(10);
    const app = createApp();
    const res = await request(app)
      .post("/api/opsflow/parse")
      .field("workEmail", "hello@commiters.com")
      .field("category", "GST Invoices")
      .attach("file", Buffer.from("%PDF-1.4"), { filename: "invoice.pdf", contentType: "application/pdf" });

    expect(res.status).toBe(429);
    expect(res.body).toEqual({
      success: false,
      error: OPSFLOW_QUOTA_ERROR,
    });
    expect(mocks.extractDocumentFields).not.toHaveBeenCalled();
    expect(mocks.recordOpsFlowExtraction).not.toHaveBeenCalled();
    expect(mocks.dispatchInquiryNotifications).not.toHaveBeenCalled();
  });

  it("returns 503 when Mongo is disconnected so quota cannot be bypassed", async () => {
    stubSuccessfulExtract();
    mocks.isMongoConnected.mockReturnValue(false);
    const app = createApp();
    const res = await request(app)
      .post("/api/opsflow/parse")
      .field("workEmail", "hello@commiters.com")
      .field("category", "GST Invoices")
      .attach("file", Buffer.from("%PDF-1.4"), { filename: "invoice.pdf", contentType: "application/pdf" });

    expect(res.status).toBe(503);
    expect(res.body.error).toMatch(/temporarily unavailable/i);
    expect(mocks.extractDocumentFields).not.toHaveBeenCalled();
  });

  it("still returns the xlsx when lead notification fails after a successful extract", async () => {
    stubSuccessfulExtract();
    mocks.dispatchInquiryNotifications.mockRejectedValue(new Error("SMTP down"));
    const app = createApp();
    const res = await request(app)
      .post("/api/opsflow/parse")
      .field("workEmail", "hello@commiters.com")
      .field("category", "Other")
      .attach("file", Buffer.from("%PDF-1.4 ticket"), { filename: "ticket.pdf", contentType: "application/pdf" });

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/spreadsheetml/);
    expect(mocks.extractDocumentFields).toHaveBeenCalledTimes(1);
  });

  it("returns 503 when Gemini is not configured", async () => {
    stubSuccessfulExtract();
    mocks.isOpsFlowGeminiConfigured.mockReturnValue(false);
    const app = createApp();
    const res = await request(app)
      .post("/api/opsflow/parse")
      .field("workEmail", "hello@commiters.com")
      .field("category", "GST Invoices")
      .attach("file", Buffer.from("%PDF-1.4"), { filename: "invoice.pdf", contentType: "application/pdf" });

    expect(res.status).toBe(503);
    expect(mocks.extractDocumentFields).not.toHaveBeenCalled();
    expect(mocks.getOpsFlowDailyCount).not.toHaveBeenCalled();
  });

  it("exposes remaining-extraction headers on CORS preflight", async () => {
    const originalCorsOrigin = process.env.CORS_ORIGIN;
    delete process.env.CORS_ORIGIN;
    try {
      const app = createApp();
      const res = await request(app)
        .options("/api/opsflow/parse")
        .set("Origin", "http://localhost:5173")
        .set("Access-Control-Request-Method", "POST");

      expect(res.status).toBe(204);
      expect(res.headers["access-control-expose-headers"]).toMatch(/x-opsflow-remaining-extractions/i);
      expect(res.headers["access-control-expose-headers"]).toMatch(/x-opsflow-daily-limit/i);
    } finally {
      if (originalCorsOrigin === undefined) {
        delete process.env.CORS_ORIGIN;
      } else {
        process.env.CORS_ORIGIN = originalCorsOrigin;
      }
    }
  });
});
