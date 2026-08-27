import { describe, expect, it } from "vitest";
import { parseOpsFlowDocumentJson } from "./opsFlowDocument";

describe("parseOpsFlowDocumentJson", () => {
  it("parses fenced JSON from the model", () => {
    const parsed = parseOpsFlowDocumentJson(`
\`\`\`json
{"vendorName":"IRCTC","invoiceNumber":"3107","grandTotal":1250,"lineItems":[{"description":"Ticket","quantity":1,"unitPrice":1250,"total":1250}]}
\`\`\`
`);
    expect(parsed.vendorName).toBe("IRCTC");
    expect(parsed.invoiceNumber).toBe("3107");
    expect(parsed.grandTotal).toBe(1250);
    expect(parsed.lineItems).toHaveLength(1);
  });

  it("rejects empty or invalid model output", () => {
    expect(() => parseOpsFlowDocumentJson("")).toThrow(/valid JSON/i);
    expect(() => parseOpsFlowDocumentJson("not json")).toThrow(/valid JSON/i);
  });
});
