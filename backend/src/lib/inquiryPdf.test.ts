import { describe, expect, it } from "vitest";
import { buildInquiryPdf, inquiryPdfFilename } from "./inquiryPdf";
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
});
