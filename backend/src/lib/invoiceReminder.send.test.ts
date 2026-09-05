import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const emailMocks = vi.hoisted(() => ({
  sendMail: vi.fn(),
  createTransport: vi.fn(),
}));

emailMocks.createTransport.mockImplementation(() => ({ sendMail: emailMocks.sendMail }));

vi.mock("nodemailer", () => ({
  default: {
    createTransport: emailMocks.createTransport,
  },
}));

import { sendPaymentReminderEmail } from "./invoiceReminder";

const reminder = {
  to: "priya@acme.com",
  clientName: "Priya Shah",
  projectName: "AI Operational Audit",
  pendingAmount: "$3,000",
  dueDate: "2026-09-15",
  bankDetails: {
    accountName: "Commiters Softwares",
    bankName: "HDFC Bank",
    accountNumber: "50100123456789",
    ifsc: "HDFC0001234",
  },
};

describe("sendPaymentReminderEmail", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
    emailMocks.sendMail.mockReset();
    emailMocks.createTransport.mockClear();
    emailMocks.sendMail.mockResolvedValue({ messageId: "msg_reminder" });
    process.env.SMTP_ENABLED = "true";
    process.env.SMTP_HOST = "smtp.example.com";
    process.env.SMTP_PORT = "587";
    process.env.SMTP_USER = "alerts@commiters.com";
    process.env.SMTP_PASS = "secret";
    process.env.SMTP_FROM = "Commiters Billing <alerts@commiters.com>";
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("sends the generated reminder through nodemailer", async () => {
    const result = await sendPaymentReminderEmail(reminder);

    expect(emailMocks.createTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        host: "smtp.example.com",
        auth: { user: "alerts@commiters.com", pass: "secret" },
      }),
    );
    expect(emailMocks.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "Commiters Billing <alerts@commiters.com>",
        to: "priya@acme.com",
        subject: result.subject,
        text: expect.stringContaining("Dear Priya Shah"),
        html: expect.stringContaining("AI Operational Audit"),
      }),
    );
    expect(result.to).toBe("priya@acme.com");
    expect(result.subject).toMatch(/Payment reminder/i);
  });

  it("refuses to send when SMTP is disabled", async () => {
    process.env.SMTP_ENABLED = "false";

    await expect(sendPaymentReminderEmail(reminder)).rejects.toThrow(/SMTP/i);
    expect(emailMocks.sendMail).not.toHaveBeenCalled();
  });
});
