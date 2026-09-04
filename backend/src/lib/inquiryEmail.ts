import nodemailer from "nodemailer";
import type { InquiryNotificationInput } from "./inquiryNotificationTypes";
import { inquiryPdfFilename } from "./inquiryPdf";
import { resolveSmtpConfig } from "./smtpConfig";
import { teamInboxRecipients } from "./teamInboxes";

function buildSubject(input: InquiryNotificationInput): string {
  if (input.kind === "opsflow_extract") {
    return `[OpsFlow Lead] New Document Extracted by ${input.email}`;
  }
  const label = input.kind === "job_application" ? "Job Application" : "Project Inquiry";
  return `New ${label}: ${input.name}`;
}

function buildTextBody(input: InquiryNotificationInput): string {
  if (input.kind === "opsflow_extract") {
    return ["A new OpsFlow document extraction was submitted on commiters.com.", "", input.message].join("\n");
  }

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
  const smtp = resolveSmtpConfig();
  if (!smtp) return;

  const transport = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.pass },
  });

  await transport.sendMail({
    from: smtp.from,
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
