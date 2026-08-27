import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  generateContent: vi.fn(),
  getGenerativeModel: vi.fn(),
  GoogleGenerativeAI: vi.fn(),
}));

vi.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: mocks.GoogleGenerativeAI,
}));

import { OPSFLOW_GEMINI_SYSTEM_PROMPT } from "./opsFlowDocument";
import {
  extractDocumentFields,
  isOpsFlowGeminiConfigured,
  resolveOpsFlowGeminiApiKey,
  resolveOpsFlowGeminiModel,
} from "./opsFlowGemini";

const SAMPLE_FIELDS = {
  documentDate: "2026-03-31",
  vendorName: "IRCTC",
  taxIds: { gst: "29AABCU9603R1ZM", pan: "AABCU9603R" },
  invoiceNumber: "3107",
  lineItems: [{ description: "Ticket", quantity: 1, unitPrice: 450, total: 450 }],
  subtotal: 450,
  taxAmounts: { cgst: 0, sgst: 0, igst: 0 },
  grandTotal: 450,
};

describe("opsFlowGemini Google AI Studio client", () => {
  const originalKey = process.env.GEMINI_API_KEY;
  const originalModel = process.env.GEMINI_MODEL;

  beforeEach(() => {
    mocks.getGenerativeModel.mockReturnValue({ generateContent: mocks.generateContent });
    mocks.GoogleGenerativeAI.mockImplementation(function GoogleGenerativeAI() {
      return { getGenerativeModel: mocks.getGenerativeModel };
    });
    mocks.generateContent.mockResolvedValue({
      response: { text: () => JSON.stringify(SAMPLE_FIELDS) },
    });
  });

  afterEach(() => {
    if (originalKey === undefined) {
      delete process.env.GEMINI_API_KEY;
    } else {
      process.env.GEMINI_API_KEY = originalKey;
    }
    if (originalModel === undefined) {
      delete process.env.GEMINI_MODEL;
    } else {
      process.env.GEMINI_MODEL = originalModel;
    }
    vi.clearAllMocks();
  });

  it("reads only GEMINI_API_KEY from Google AI Studio (not Vertex or GCP credentials)", () => {
    expect(resolveOpsFlowGeminiApiKey({ GEMINI_API_KEY: " studio-key " })).toBe("studio-key");
    expect(
      resolveOpsFlowGeminiApiKey({
        GOOGLE_API_KEY: "ignored",
        GOOGLE_APPLICATION_CREDENTIALS: "/secrets/vertex.json",
        GOOGLE_CLOUD_PROJECT: "paid-gcp-project",
      }),
    ).toBe("");
    expect(isOpsFlowGeminiConfigured({ GEMINI_API_KEY: "studio-key" })).toBe(true);
    expect(isOpsFlowGeminiConfigured({})).toBe(false);
  });

  it("defaults to a current Google AI Studio Flash model", () => {
    expect(resolveOpsFlowGeminiModel({})).toBe("gemini-2.5-flash");
    expect(resolveOpsFlowGeminiModel({ GEMINI_MODEL: "gemini-2.5-flash" })).toBe("gemini-2.5-flash");
  });

  it("sends the document buffer to gemini-2.5-flash and returns extracted JSON fields", async () => {
    process.env.GEMINI_API_KEY = "ai-studio-free-key";
    delete process.env.GEMINI_MODEL;

    const buffer = Buffer.from("%PDF-1.4 invoice");
    const fields = await extractDocumentFields({
      buffer,
      mimeType: "application/pdf",
      category: "GST Invoices",
    });

    expect(mocks.GoogleGenerativeAI).toHaveBeenCalledWith("ai-studio-free-key");
    expect(mocks.getGenerativeModel).toHaveBeenCalledWith({ model: "gemini-2.5-flash" });
    expect(mocks.generateContent).toHaveBeenCalledTimes(1);

    const parts = mocks.generateContent.mock.calls[0]?.[0] as Array<{
      text?: string;
      inlineData?: { mimeType: string; data: string };
    }>;
    expect(parts[0]?.text).toContain(OPSFLOW_GEMINI_SYSTEM_PROMPT);
    expect(parts[1]?.inlineData).toEqual({
      mimeType: "application/pdf",
      data: buffer.toString("base64"),
    });
    expect(fields).toEqual(SAMPLE_FIELDS);
  });

  it("retries a current Flash model when the configured model is retired (404)", async () => {
    process.env.GEMINI_API_KEY = "ai-studio-free-key";
    process.env.GEMINI_MODEL = "gemini-1.5-flash";
    mocks.generateContent
      .mockRejectedValueOnce(
        Object.assign(new Error("models/gemini-1.5-flash is not found for API version v1beta"), { status: 404 }),
      )
      .mockResolvedValueOnce({
        response: { text: () => JSON.stringify(SAMPLE_FIELDS) },
      });

    await extractDocumentFields({
      buffer: Buffer.from("%PDF-1.4 invoice"),
      mimeType: "application/pdf",
      category: "Other",
    });

    expect(mocks.getGenerativeModel).toHaveBeenNthCalledWith(1, { model: "gemini-1.5-flash" });
    expect(mocks.getGenerativeModel).toHaveBeenNthCalledWith(2, { model: "gemini-2.5-flash" });
  });
});
