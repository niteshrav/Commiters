import { describe, expect, it } from "vitest";
import { buildInquiryPdf, inquiryKindLabel, inquiryPdfFilename } from "./inquiryPdf";
import type { InquiryNotificationInput } from "./inquiryNotificationTypes";

const sampleInquiry: InquiryNotificationInput = {
  id: "lead_test_123",
  kind: "project_inquiry",
  name: "Jane Doe",
  email: "jane@company.com",
  serviceOrPosition: "Web Application Development",
  budgetRange: "$5,000 – $15,000",
  timeline: "2-4 weeks",
  referenceLinks: "https://example.com",
  message: "We need a customer portal with dashboards.",
  submittedAt: new Date("2026-04-15T10:30:00.000Z"),
};

describe("buildInquiryPdf", () => {
  it("returns a valid PDF buffer for project inquiries", async () => {
    const pdf = await buildInquiryPdf(sampleInquiry);

    expect(Buffer.isBuffer(pdf)).toBe(true);
    expect(pdf.subarray(0, 4).toString()).toBe("%PDF");
    expect(pdf.length).toBeGreaterThan(500);
    expect(inquiryPdfFilename(sampleInquiry)).toBe("commiters-inquiry-lead_test_123.pdf");
  });

  it("returns a valid PDF buffer for job applications", async () => {
    const pdf = await buildInquiryPdf({
      ...sampleInquiry,
      kind: "job_application",
      phone: "+91 98765 43210",
      serviceOrPosition: "AI Engineer",
      timeline: "Job Application",
      message: "[Position Applied For: AI Engineer]\nPhone: +91 98765 43210",
    });

    expect(pdf.subarray(0, 4).toString()).toBe("%PDF");
    expect(pdf.length).toBeGreaterThan(500);
  });

  it("labels OpsFlow extractions instead of project inquiries", async () => {
    const pdf = await buildInquiryPdf({
      ...sampleInquiry,
      id: "opsflow_lead_1",
      kind: "opsflow_extract",
      name: "hello@commiters.com",
      email: "hello@commiters.com",
      serviceOrPosition: "GST Invoices",
      message: "Work email: hello@commiters.com\nUsage: 3/10",
    });

    expect(inquiryKindLabel("opsflow_extract")).toBe("OpsFlow Extract");
    expect(inquiryKindLabel("project_inquiry")).toBe("Project Inquiry");
    expect(pdf.subarray(0, 4).toString()).toBe("%PDF");
    expect(pdf.length).toBeGreaterThan(500);
    expect(inquiryPdfFilename({ id: "opsflow_lead_1" })).toBe("commiters-inquiry-opsflow_lead_1.pdf");
  });
});
