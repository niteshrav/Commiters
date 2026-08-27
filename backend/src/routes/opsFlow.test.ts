import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

const mocks = vi.hoisted(() => ({
  extractDocumentFields: vi.fn(),
  isOpsFlowGeminiConfigured: vi.fn(),
}));

vi.mock("../lib/opsFlowGemini", () => ({
  extractDocumentFields: mocks.extractDocumentFields,
  isOpsFlowGeminiConfigured: mocks.isOpsFlowGeminiConfigured,
}));

import { createApp } from "../app";

describe("POST /api/opsflow/parse", () => {
  afterEach(() => {
    mocks.extractDocumentFields.mockReset();
    mocks.isOpsFlowGeminiConfigured.mockReset();
  });

  it("rejects personal email domains before calling Gemini", async () => {
    mocks.isOpsFlowGeminiConfigured.mockReturnValue(true);
    const app = createApp();
    const res = await request(app)
      .post("/api/opsflow/parse")
      .field("workEmail", "ops@gmail.com")
      .field("category", "Other")
      .attach("file", Buffer.from("%PDF-1.4 test"), { filename: "ticket.pdf", contentType: "application/pdf" });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/official work email/i);
    expect(mocks.extractDocumentFields).not.toHaveBeenCalled();
  });

  it("returns an xlsx attachment for a valid work-email upload", async () => {
    mocks.isOpsFlowGeminiConfigured.mockReturnValue(true);
    mocks.extractDocumentFields.mockResolvedValue({
      documentDate: "2026-03-31",
      vendorName: "IRCTC",
      taxIds: { gst: "", pan: "" },
      invoiceNumber: "3107",
      lineItems: [{ description: "Ticket", quantity: 1, unitPrice: 450, total: 450 }],
      subtotal: 450,
      taxAmounts: { cgst: 0, sgst: 0, igst: 0 },
      grandTotal: 450,
    });

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
    expect(mocks.extractDocumentFields).toHaveBeenCalledTimes(1);
  });

  it("returns 503 when Gemini is not configured", async () => {
    mocks.isOpsFlowGeminiConfigured.mockReturnValue(false);
    const app = createApp();
    const res = await request(app)
      .post("/api/opsflow/parse")
      .field("workEmail", "hello@commiters.com")
      .field("category", "GST Invoices")
      .attach("file", Buffer.from("%PDF-1.4"), { filename: "invoice.pdf", contentType: "application/pdf" });

    expect(res.status).toBe(503);
    expect(mocks.extractDocumentFields).not.toHaveBeenCalled();
  });
});
