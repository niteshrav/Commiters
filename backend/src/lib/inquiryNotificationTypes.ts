export type InquiryKind = "project_inquiry" | "job_application";

export type InquiryNotificationInput = {
  id: string;
  kind: InquiryKind;
  name: string;
  email: string;
  phone?: string;
  serviceOrPosition: string;
  budgetRange?: string | null;
  timeline?: string;
  referenceLinks?: string | null;
  message: string;
  submittedAt: Date;
  resumeAttachment?: {
    filename: string;
    content: Buffer;
  };
};
