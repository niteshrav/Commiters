import { describe, expect, it } from "vitest";
import {
  OPSFLOW_FILE_MAX_BYTES,
  OPSFLOW_PERSONAL_EMAIL_ERROR,
  OPSFLOW_WORK_EMAIL_ERROR,
  buildOpsFlowSuccessMessage,
  isPersonalEmailDomain,
  validateOpsFlowCategory,
  validateOpsFlowFile,
  validateOpsFlowWorkEmail,
} from "./opsFlowLeadGate";
import { OPSFLOW_DOCUMENT_CATEGORIES } from "./opsFlowPageContent";

function pdfFile(name = "invoice.pdf", size = 1024): File {
  const file = new File(["%PDF"], name, { type: "application/pdf" });
  Object.defineProperty(file, "size", { value: size });
  return file;
}

describe("opsFlowLeadGate", () => {
  describe("validateOpsFlowWorkEmail", () => {
    it("requires a work email", () => {
      expect(validateOpsFlowWorkEmail("")).toBe(OPSFLOW_WORK_EMAIL_ERROR);
      expect(validateOpsFlowWorkEmail("   ")).toBe(OPSFLOW_WORK_EMAIL_ERROR);
    });

    it("rejects invalid email shapes", () => {
      expect(validateOpsFlowWorkEmail("not-an-email")).toMatch(/valid/i);
    });

    it("blocks free personal domains used by consumer inboxes", () => {
      expect(validateOpsFlowWorkEmail("ops@gmail.com")).toBe(OPSFLOW_PERSONAL_EMAIL_ERROR);
      expect(validateOpsFlowWorkEmail("ops@yahoo.com")).toBe(OPSFLOW_PERSONAL_EMAIL_ERROR);
      expect(validateOpsFlowWorkEmail("ops@hotmail.com")).toBe(OPSFLOW_PERSONAL_EMAIL_ERROR);
      expect(validateOpsFlowWorkEmail("ops@outlook.com")).toBe(OPSFLOW_PERSONAL_EMAIL_ERROR);
      expect(isPersonalEmailDomain("name@Gmail.com")).toBe(true);
    });

    it("accepts official company domains", () => {
      expect(validateOpsFlowWorkEmail("coo@acme.co.in")).toBeNull();
      expect(validateOpsFlowWorkEmail("  accounts@commiters.com  ")).toBeNull();
    });
  });

  describe("validateOpsFlowFile", () => {
    it("requires a document", () => {
      expect(validateOpsFlowFile(null)).toMatch(/attach/i);
    });

    it("accepts PDF, PNG, and JPG under 10MB", () => {
      expect(validateOpsFlowFile(pdfFile())).toBeNull();
      expect(validateOpsFlowFile(new File(["x"], "bill.png", { type: "image/png" }))).toBeNull();
      expect(validateOpsFlowFile(new File(["x"], "receipt.jpg", { type: "image/jpeg" }))).toBeNull();
    });

    it("rejects unsupported types and oversized files", () => {
      expect(validateOpsFlowFile(new File(["x"], "notes.txt", { type: "text/plain" }))).toMatch(/PDF, PNG, or JPG/i);
      expect(validateOpsFlowFile(pdfFile("huge.pdf", OPSFLOW_FILE_MAX_BYTES + 1))).toMatch(/10MB/i);
    });
  });

  describe("validateOpsFlowCategory", () => {
    it("requires a listed document category", () => {
      expect(validateOpsFlowCategory("")).toMatch(/category/i);
      expect(validateOpsFlowCategory("Unknown")).toMatch(/category/i);
    });

    it("accepts every published category", () => {
      for (const category of OPSFLOW_DOCUMENT_CATEGORIES) {
        expect(validateOpsFlowCategory(category)).toBeNull();
      }
    });
  });

  it("builds the success notice after instant Excel download", () => {
    expect(buildOpsFlowSuccessMessage()).toMatch(/Extraction Complete/i);
    expect(buildOpsFlowSuccessMessage()).toMatch(/Talk to an Engineer/i);
  });
});
