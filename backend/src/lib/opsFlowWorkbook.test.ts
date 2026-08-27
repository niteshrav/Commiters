import { describe, expect, it } from "vitest";
import * as XLSX from "xlsx";
import { buildOpsFlowWorkbook } from "./opsFlowWorkbook";
import type { OpsFlowDocumentFields } from "./opsFlowDocument";

const sample: OpsFlowDocumentFields = {
  documentDate: "2026-03-31",
  vendorName: "IRCTC",
  taxIds: { gst: "08AAAAA0000A1Z5", pan: "AAAAA0000A" },
  invoiceNumber: "3107",
  lineItems: [
    { description: "Chittor to Kota", quantity: 1, unitPrice: 1250, total: 1250 },
  ],
  subtotal: 1250,
  taxAmounts: { cgst: 0, sgst: 0, igst: 0 },
  grandTotal: 1250,
};

describe("buildOpsFlowWorkbook", () => {
  it("writes summary and line-item sheets as xlsx", () => {
    const buffer = buildOpsFlowWorkbook(sample);
    expect(buffer.subarray(0, 2).toString()).toBe("PK");

    const workbook = XLSX.read(buffer, { type: "buffer" });
    expect(workbook.SheetNames).toEqual(["Summary", "Line Items"]);

    const summary = XLSX.utils.sheet_to_json<Record<string, string>>(workbook.Sheets.Summary!);
    expect(summary.some((row) => row.Field === "Vendor Name" && row.Value === "IRCTC")).toBe(true);
    expect(summary.some((row) => row.Field === "Invoice Number" && row.Value === "3107")).toBe(true);

    const items = XLSX.utils.sheet_to_json<Record<string, string | number>>(workbook.Sheets["Line Items"]!);
    expect(items[0]).toMatchObject({ Description: "Chittor to Kota", Quantity: 1, Total: 1250 });
  });
});
