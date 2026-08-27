export const OPSFLOW_GEMINI_SYSTEM_PROMPT =
  "Analyze this document (Invoice/Receipt/Tax Form). Extract structured data including: Document Date, Vendor Name, Tax IDs (GST/PAN), Invoice Number, Line Items (Description, Quantity, Unit Price, Total), Subtotal, Tax Amounts (CGST/SGST/IGST), and Grand Total. Return valid JSON only." as const;

export type OpsFlowLineItem = {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

export type OpsFlowDocumentFields = {
  documentDate: string;
  vendorName: string;
  taxIds: { gst: string; pan: string };
  invoiceNumber: string;
  lineItems: OpsFlowLineItem[];
  subtotal: number;
  taxAmounts: { cgst: number; sgst: number; igst: number };
  grandTotal: number;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value : value == null ? "" : String(value);
}

function asNumber(value: unknown): number {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function extractJsonObject(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = (fenced?.[1] ?? text).trim();
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start < 0 || end <= start) {
    throw new Error("Gemini did not return valid JSON.");
  }
  return candidate.slice(start, end + 1);
}

export function parseOpsFlowDocumentJson(text: string): OpsFlowDocumentFields {
  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(extractJsonObject(text)) as Record<string, unknown>;
  } catch {
    throw new Error("Gemini did not return valid JSON.");
  }

  const taxIds = (parsed.taxIds ?? {}) as Record<string, unknown>;
  const taxAmounts = (parsed.taxAmounts ?? parsed.tax ?? {}) as Record<string, unknown>;
  const items = Array.isArray(parsed.lineItems) ? parsed.lineItems : [];

  return {
    documentDate: asString(parsed.documentDate ?? parsed.date),
    vendorName: asString(parsed.vendorName ?? parsed.vendor),
    taxIds: {
      gst: asString(taxIds.gst ?? parsed.gst),
      pan: asString(taxIds.pan ?? parsed.pan),
    },
    invoiceNumber: asString(parsed.invoiceNumber ?? parsed.invoiceNo),
    lineItems: items.map((item) => {
      const row = (item ?? {}) as Record<string, unknown>;
      return {
        description: asString(row.description),
        quantity: asNumber(row.quantity),
        unitPrice: asNumber(row.unitPrice ?? row.price),
        total: asNumber(row.total),
      };
    }),
    subtotal: asNumber(parsed.subtotal),
    taxAmounts: {
      cgst: asNumber(taxAmounts.cgst),
      sgst: asNumber(taxAmounts.sgst),
      igst: asNumber(taxAmounts.igst),
    },
    grandTotal: asNumber(parsed.grandTotal ?? parsed.total),
  };
}
