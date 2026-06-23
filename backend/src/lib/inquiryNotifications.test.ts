import { beforeEach, describe, expect, it, vi } from "vitest";
import type { InquiryNotificationInput } from "./inquiryNotificationTypes";

const notificationMocks = vi.hoisted(() => ({
  buildInquiryPdf: vi.fn(),
  sendInquiryEmail: vi.fn(),
}));

vi.mock("./inquiryPdf", () => ({
  buildInquiryPdf: notificationMocks.buildInquiryPdf,
}));
vi.mock("./inquiryEmail", () => ({
  sendInquiryEmail: notificationMocks.sendInquiryEmail,
}));

import { dispatchInquiryNotifications } from "./inquiryNotifications";

const inquiry: InquiryNotificationInput = {
  id: "lead_notify_1",
  kind: "project_inquiry",
  name: "Jane Doe",
  email: "jane@company.com",
  serviceOrPosition: "Website Development",
  message: "Need help.",
  submittedAt: new Date("2026-04-15T10:30:00.000Z"),
};

describe("dispatchInquiryNotifications", () => {
  beforeEach(() => {
    notificationMocks.buildInquiryPdf.mockReset();
    notificationMocks.sendInquiryEmail.mockReset();
    notificationMocks.buildInquiryPdf.mockResolvedValue(Buffer.from("%PDF"));
    notificationMocks.sendInquiryEmail.mockResolvedValue(undefined);
  });

  it("builds a PDF and sends email notification", async () => {
    await dispatchInquiryNotifications(inquiry);

    expect(notificationMocks.buildInquiryPdf).toHaveBeenCalledWith(inquiry);
    expect(notificationMocks.sendInquiryEmail).toHaveBeenCalledWith(inquiry, Buffer.from("%PDF"));
  });
});
