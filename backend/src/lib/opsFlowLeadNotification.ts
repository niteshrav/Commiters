import type { InquiryNotificationInput } from "./inquiryNotificationTypes";
import { OPSFLOW_DAILY_LIMIT } from "./opsFlowQuota";

export function buildOpsFlowInquiryNotification(input: {
  id: string;
  workEmail: string;
  category: string;
  filename: string;
  usageCount: number;
  usageLimit?: number;
  submittedAt: Date;
}): InquiryNotificationInput {
  const usageLimit = input.usageLimit ?? OPSFLOW_DAILY_LIMIT;
  return {
    id: input.id,
    kind: "opsflow_extract",
    name: input.workEmail,
    email: input.workEmail,
    serviceOrPosition: input.category,
    message: [
      `Work email: ${input.workEmail}`,
      `Document category: ${input.category}`,
      `Filename: ${input.filename}`,
      `Usage: ${input.usageCount}/${usageLimit}`,
      `Timestamp: ${input.submittedAt.toISOString()}`,
    ].join("\n"),
    submittedAt: input.submittedAt,
  };
}
