import twilio from "twilio";
import type { InquiryNotificationInput } from "./inquiryNotificationTypes";

function isWhatsAppEnabled(): boolean {
  return process.env.WHATSAPP_ENABLED === "true";
}

function buildWhatsAppBody(input: InquiryNotificationInput): string {
  const label = input.kind === "job_application" ? "Job application" : "Project inquiry";
  const lines = [
    `New ${label} on commiters.com`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
  ];
  if (input.phone) lines.push(`Phone: ${input.phone}`);
  lines.push(`${input.kind === "job_application" ? "Position" : "Service"}: ${input.serviceOrPosition}`);
  return lines.join("\n");
}

export async function sendInquiryWhatsApp(input: InquiryNotificationInput, mediaToken: string): Promise<void> {
  if (!isWhatsAppEnabled()) return;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = process.env.WHATSAPP_NOTIFY_TO;
  const publicBaseUrl = process.env.NOTIFICATION_PUBLIC_BASE_URL?.replace(/\/+$/, "");

  if (!accountSid || !authToken || !from || !to || !publicBaseUrl) {
    throw new Error(
      "WhatsApp is enabled but TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM, WHATSAPP_NOTIFY_TO, or NOTIFICATION_PUBLIC_BASE_URL is missing.",
    );
  }

  const client = twilio(accountSid, authToken);
  const mediaUrl = `${publicBaseUrl}/api/notification-media/${mediaToken}`;

  await client.messages.create({
    from,
    to,
    body: buildWhatsAppBody(input),
    mediaUrl: [mediaUrl],
  });
}
