import { describe, expect, it } from "vitest";
import { buildOpsFlowInquiryNotification } from "./opsFlowLeadNotification";

describe("buildOpsFlowInquiryNotification", () => {
  it("builds an opsflow_extract inquiry with usage, category, and filename", () => {
    const submittedAt = new Date("2026-09-04T12:00:00.000Z");
    const notification = buildOpsFlowInquiryNotification({
      id: "opsflow_lead_1",
      workEmail: "hello@commiters.com",
      category: "GST Invoices",
      filename: "ticket.pdf",
      usageCount: 3,
      usageLimit: 10,
      submittedAt,
    });

    expect(notification.kind).toBe("opsflow_extract");
    expect(notification.email).toBe("hello@commiters.com");
    expect(notification.name).toBe("hello@commiters.com");
    expect(notification.serviceOrPosition).toBe("GST Invoices");
    expect(notification.submittedAt).toBe(submittedAt);
    expect(notification.message).toMatch(/hello@commiters.com/);
    expect(notification.message).toMatch(/GST Invoices/);
    expect(notification.message).toMatch(/ticket\.pdf/);
    expect(notification.message).toMatch(/3\/10/);
    expect(notification.message).toMatch(/2026-09-04T12:00:00.000Z/);
  });
});
