import { sendInquiryEmail } from "./inquiryEmail";
import type { InquiryNotificationInput } from "./inquiryNotificationTypes";
import { buildInquiryPdf } from "./inquiryPdf";

export async function dispatchInquiryNotifications(input: InquiryNotificationInput): Promise<void> {
  const pdf = await buildInquiryPdf(input);
  await sendInquiryEmail(input, pdf);
}
