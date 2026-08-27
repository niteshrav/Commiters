import * as XLSX from "xlsx";
import type { OpsFlowDocumentFields } from "./opsFlowDocument";

export function buildOpsFlowWorkbook(fields: OpsFlowDocumentFields): Buffer {
  const workbook = XLSX.utils.book_new();

  const summaryRows = [
    { Field: "Document Date", Value: fields.documentDate },
    { Field: "Vendor Name", Value: fields.vendorName },
    { Field: "GSTIN", Value: fields.taxIds.gst },
    { Field: "PAN", Value: fields.taxIds.pan },
    { Field: "Invoice Number", Value: fields.invoiceNumber },
    { Field: "Subtotal", Value: fields.subtotal },
    { Field: "CGST", Value: fields.taxAmounts.cgst },
    { Field: "SGST", Value: fields.taxAmounts.sgst },
    { Field: "IGST", Value: fields.taxAmounts.igst },
    { Field: "Grand Total", Value: fields.grandTotal },
  ];

  const lineItemRows =
    fields.lineItems.length > 0
      ? fields.lineItems.map((item) => ({
          Description: item.description,
          Quantity: item.quantity,
          "Unit Price": item.unitPrice,
          Total: item.total,
        }))
      : [{ Description: "", Quantity: "", "Unit Price": "", Total: "" }];

  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(summaryRows), "Summary");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(lineItemRows), "Line Items");

  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" }) as Buffer;
}
