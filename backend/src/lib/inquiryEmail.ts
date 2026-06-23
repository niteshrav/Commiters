import nodemailer from "nodemailer";
import type { InquiryNotificationInput } from "./inquiryNotificationTypes";
import { inquiryPdfFilename } from "./inquiryPdf";
import { teamInboxRecipients } from "./teamInboxes";

function isSmtpEnabled(): boolean {
  return process.env.SMTP_ENABLED === "true";
}

function buildSubject(input: InquiryNotificationInput): string {
  const label = input.kind === "job_application" ? "Job Application" : "Project Inquiry";
  return `New ${label}: ${input.name}`;
}

function buildTextBody(input: InquiryNotificationInput): string {
  const lines = [
    `A new ${input.kind === "job_application" ? "job application" : "project inquiry"} was submitted on commiters.com.`,
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
  ];
  if (input.phone) lines.push(`Phone: ${input.phone}`);
  lines.push(
    `${input.kind === "job_application" ? "Position" : "Service"}: ${input.serviceOrPosition}`,
  );
  if (input.timeline) lines.push(`Timeline: ${input.timeline}`);
  lines.push("", input.message);
  return lines.join("\n");
}

export async function sendInquiryEmail(input: InquiryNotificationInput, pdf: Buffer): Promise<void> {
  if (!isSmtpEnabled()) return;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    throw new Error("SMTP is enabled but SMTP_HOST, SMTP_USER, or SMTP_PASS is missing.");
  }

  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const from = process.env.SMTP_FROM ?? user;

  await transport.sendMail({
    from,
    to: [...teamInboxRecipients()],
    subject: buildSubject(input),
    text: buildTextBody(input),
    attachments: [
      {
        filename: inquiryPdfFilename(input),
        content: pdf,
        contentType: "application/pdf",
      },
      ...(input.resumeAttachment
        ? [
            {
              filename: input.resumeAttachment.filename,
              content: input.resumeAttachment.content,
              contentType: "application/pdf",
            },
          ]
        : []),
    ],
  });
}
