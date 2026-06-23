import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { InquiryNotificationInput } from "./inquiryNotificationTypes";

const whatsAppMocks = vi.hoisted(() => ({
  messagesCreate: vi.fn(),
  twilioFactory: vi.fn(),
}));

whatsAppMocks.twilioFactory.mockImplementation(() => ({
  messages: { create: whatsAppMocks.messagesCreate },
}));

vi.mock("twilio", () => ({
  default: whatsAppMocks.twilioFactory,
}));

import { sendInquiryWhatsApp } from "./inquiryWhatsApp";
import { registerNotificationMedia } from "./notificationMediaStore";

const inquiry: InquiryNotificationInput = {
  id: "lead_wa_1",
  kind: "job_application",
  name: "Alex Smith",
  email: "alex@company.com",
  phone: "+91 90000 11111",
  serviceOrPosition: "AI Engineer",
  timeline: "Job Application",
  message: "[Position Applied For: AI Engineer]",
  submittedAt: new Date("2026-04-15T10:30:00.000Z"),
};

describe("sendInquiryWhatsApp", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
    whatsAppMocks.messagesCreate.mockReset();
    whatsAppMocks.twilioFactory.mockClear();
    whatsAppMocks.messagesCreate.mockResolvedValue({ sid: "SM123" });
    process.env.WHATSAPP_ENABLED = "true";
    process.env.TWILIO_ACCOUNT_SID = "AC_test";
    process.env.TWILIO_AUTH_TOKEN = "auth_test";
    process.env.TWILIO_WHATSAPP_FROM = "whatsapp:+14155238886";
    process.env.WHATSAPP_NOTIFY_TO = "whatsapp:+919024882899";
    process.env.NOTIFICATION_PUBLIC_BASE_URL = "https://api.commiters.com";
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("sends a WhatsApp PDF link to the team number when configured", async () => {
    const pdf = Buffer.from("%PDF-test");
    const token = registerNotificationMedia(pdf);

    await sendInquiryWhatsApp(inquiry, token);

    expect(whatsAppMocks.twilioFactory).toHaveBeenCalledWith("AC_test", "auth_test");
    expect(whatsAppMocks.messagesCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "whatsapp:+14155238886",
        to: "whatsapp:+919024882899",
        body: expect.stringMatching(/Job application/i),
        mediaUrl: [`https://api.commiters.com/api/notification-media/${token}`],
      }),
    );
  });

  it("skips delivery when WhatsApp is disabled", async () => {
    process.env.WHATSAPP_ENABLED = "false";

    await sendInquiryWhatsApp(inquiry, "token_abc");

    expect(whatsAppMocks.twilioFactory).not.toHaveBeenCalled();
    expect(whatsAppMocks.messagesCreate).not.toHaveBeenCalled();
  });
});
