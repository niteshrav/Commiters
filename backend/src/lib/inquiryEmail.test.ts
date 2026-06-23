import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { InquiryNotificationInput } from "./inquiryNotificationTypes";

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

import { sendInquiryEmail } from "./inquiryEmail";
import { teamInboxRecipients } from "./teamInboxes";

const inquiry: InquiryNotificationInput = {
  id: "lead_email_1",
  kind: "project_inquiry",
  name: "Jane Doe",
  email: "jane@company.com",
  serviceOrPosition: "Website Development",
  budgetRange: null,
  timeline: "2 weeks",
  message: "Need a marketing site.",
  submittedAt: new Date("2026-04-15T10:30:00.000Z"),
};

describe("sendInquiryEmail", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
    emailMocks.sendMail.mockReset();
    emailMocks.createTransport.mockClear();
    emailMocks.sendMail.mockResolvedValue({ messageId: "msg_123" });
    process.env.SMTP_ENABLED = "true";
    process.env.SMTP_HOST = "smtp.example.com";
    process.env.SMTP_PORT = "587";
    process.env.SMTP_USER = "alerts@commiters.com";
    process.env.SMTP_PASS = "secret";
    process.env.SMTP_FROM = "Commiters Alerts <alerts@commiters.com>";
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("sends the PDF to both team inboxes when SMTP is enabled", async () => {
    const pdf = Buffer.from("%PDF-test");

    await sendInquiryEmail(inquiry, pdf);

    expect(emailMocks.createTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        host: "smtp.example.com",
        port: 587,
        auth: { user: "alerts@commiters.com", pass: "secret" },
      }),
    );
    expect(emailMocks.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: [...teamInboxRecipients()],
        subject: expect.stringMatching(/New Project Inquiry/i),
        attachments: [
          expect.objectContaining({
            filename: "commiters-inquiry-lead_email_1.pdf",
            content: pdf,
            contentType: "application/pdf",
          }),
        ],
      }),
    );
  });

  it("routes inquiry alerts to hello@commiters.com and commitersudaipur@gmail.com", async () => {
    await sendInquiryEmail(inquiry, Buffer.from("%PDF-test"));

    const sendArgs = emailMocks.sendMail.mock.calls[0]?.[0] as { to: string[] };
    expect(sendArgs.to).toEqual(["hello@commiters.com", "commitersudaipur@gmail.com"]);
  });

  it("attaches the applicant resume PDF for job applications", async () => {
    const pdf = Buffer.from("%PDF-inquiry");
    const resume = Buffer.from("%PDF-resume");
    const jobApplication: InquiryNotificationInput = {
      ...inquiry,
      id: "lead_job_1",
      kind: "job_application",
      serviceOrPosition: "AI Engineer",
      resumeAttachment: {
        filename: "jane-resume.pdf",
        content: resume,
      },
    };

    await sendInquiryEmail(jobApplication, pdf);

    expect(emailMocks.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        attachments: [
          expect.objectContaining({
            filename: "commiters-inquiry-lead_job_1.pdf",
            content: pdf,
          }),
          expect.objectContaining({
            filename: "jane-resume.pdf",
            content: resume,
            contentType: "application/pdf",
          }),
        ],
      }),
    );
  });

  it("skips delivery when SMTP is disabled", async () => {
    process.env.SMTP_ENABLED = "false";

    await sendInquiryEmail(inquiry, Buffer.from("%PDF"));

    expect(emailMocks.createTransport).not.toHaveBeenCalled();
    expect(emailMocks.sendMail).not.toHaveBeenCalled();
  });
});
