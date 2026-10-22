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
    vi.unstubAllGlobals();
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
        text: expect.stringContaining("B2B Lead Card"),
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

    const sendArgs = emailMocks.sendMail.mock.calls[0]?.[0] as { to: string[]; text: string };
    expect(sendArgs.to).toEqual(["hello@commiters.com", "commitersudaipur@gmail.com"]);
    expect(sendArgs.text).toContain("Client Email: jane@company.com");
    expect(sendArgs.text).toContain("Company Domain: company.com");
    expect(sendArgs.text).toContain("Interest: Web App");
    expect(sendArgs.text).toContain("Suggested Next Action: Schedule Scoping Call");
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

  it("delivers an OpsFlow benchmark inquiry to hello@commiters.com", async () => {
    const benchmark: InquiryNotificationInput = {
      ...inquiry,
      serviceOrPosition: "AI Integration",
      timeline: "Immediate",
      message: "Requested OpsFlow AI sample PDF-to-Excel extraction",
    };

    await sendInquiryEmail(benchmark, Buffer.from("%PDF-test"));

    const sendArgs = emailMocks.sendMail.mock.calls[0]?.[0] as { to: string[]; text: string };
    expect(sendArgs.to[0]).toBe("hello@commiters.com");
    expect(sendArgs.to).toContain("hello@commiters.com");
    expect(sendArgs.text).toContain("Requested OpsFlow AI sample PDF-to-Excel extraction");
    expect(sendArgs.text).toContain("AI Integration");
  });

  it("delivers to hello@commiters.com through FormSubmit when SMTP is off", async () => {
    process.env.SMTP_ENABLED = "false";
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await sendInquiryEmail(inquiry, Buffer.from("%PDF"));

    expect(emailMocks.createTransport).not.toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://formsubmit.co/ajax/hello%40commiters.com",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ Accept: "application/json" }),
      }),
    );
    const body = JSON.parse(String(fetchMock.mock.calls[0]?.[1]?.body)) as {
      email: string;
      _replyto: string;
      serviceNeeded: string;
    };
    expect(body.email).toBe("jane@company.com");
    expect(body._replyto).toBe("jane@company.com");
    expect(body.serviceNeeded).toBe("Website Development");
  });

  it("does not fail local submissions when FormSubmit TLS fails", async () => {
    process.env.SMTP_ENABLED = "false";
    delete process.env.NODE_ENV;
    const fetchMock = vi.fn().mockRejectedValue(new Error("unable to verify the first certificate"));
    vi.stubGlobal("fetch", fetchMock);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    await expect(sendInquiryEmail(inquiry, Buffer.from("%PDF"))).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalled();
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it("falls back to FormSubmit when SMTP is flagged on without credentials", async () => {
    process.env.SMTP_ENABLED = "true";
    process.env.SMTP_HOST = "smtp.gmail.com";
    process.env.SMTP_USER = "commitersudaipur@gmail.com";
    process.env.SMTP_PASS = "";
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await sendInquiryEmail(inquiry, Buffer.from("%PDF"));

    expect(emailMocks.createTransport).not.toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalled();
  });

  it("uses the OpsFlow lead subject and body for document extractions", async () => {
    const opsFlowLead: InquiryNotificationInput = {
      ...inquiry,
      id: "opsflow_lead_1",
      kind: "opsflow_extract",
      name: "hello@commiters.com",
      email: "hello@commiters.com",
      serviceOrPosition: "GST Invoices",
      message:
        "Work email: hello@commiters.com\nDocument category: GST Invoices\nFilename: ticket.pdf\nUsage: 3/10\nTimestamp: 2026-09-04T12:00:00.000Z",
    };

    await sendInquiryEmail(opsFlowLead, Buffer.from("%PDF-test"));

    expect(emailMocks.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: "[OpsFlow Lead] New Document Extracted by hello@commiters.com",
        text: expect.stringMatching(/Work email: hello@commiters.com/),
      }),
    );
    const sendArgs = emailMocks.sendMail.mock.calls[0]?.[0] as { text: string };
    expect(sendArgs.text).toContain("B2B Lead Card");
    expect(sendArgs.text).toContain("Interest: OpsFlow Lead");
    expect(sendArgs.text).toContain("Suggested Next Action: Send Audit Pitch");
    expect(sendArgs.text).toMatch(/GST Invoices/);
    expect(sendArgs.text).toMatch(/ticket\.pdf/);
    expect(sendArgs.text).toMatch(/3\/10/);
    expect(sendArgs.text).not.toMatch(/project inquiry/i);
  });
});
