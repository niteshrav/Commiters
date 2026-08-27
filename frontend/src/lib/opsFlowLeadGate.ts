import { OPSFLOW_DOCUMENT_CATEGORIES, type OpsFlowDocumentCategory } from "./opsFlowPageContent";

export const OPSFLOW_FILE_MAX_BYTES = 10 * 1024 * 1024;

export const OPSFLOW_FILE_ACCEPT = ".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg" as const;

export const OPSFLOW_WORK_EMAIL_ERROR = "Please enter your work email." as const;

export const OPSFLOW_PERSONAL_EMAIL_ERROR =
  "Please enter your official work email (e.g., name@company.com) to access free daily extractions." as const;

const PERSONAL_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.in",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "aol.com",
  "protonmail.com",
  "proton.me",
  "ymail.com",
]);

const ALLOWED_EXTENSIONS = new Set([".pdf", ".png", ".jpg", ".jpeg"]);
const ALLOWED_MIME_TYPES = new Set(["application/pdf", "image/png", "image/jpeg", "image/jpg"]);

export type OpsFlowExtractPayload = {
  file: File;
  category: OpsFlowDocumentCategory;
  workEmail: string;
};

export function emailDomain(email: string): string {
  const at = email.lastIndexOf("@");
  if (at < 0) return "";
  return email.slice(at + 1).trim().toLowerCase();
}

export function isPersonalEmailDomain(email: string): boolean {
  return PERSONAL_EMAIL_DOMAINS.has(emailDomain(email));
}

export function validateOpsFlowWorkEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return OPSFLOW_WORK_EMAIL_ERROR;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Please enter a valid work email.";
  if (isPersonalEmailDomain(trimmed)) return OPSFLOW_PERSONAL_EMAIL_ERROR;
  return null;
}

function fileExtension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot).toLowerCase() : "";
}

export function validateOpsFlowFile(file: File | null): string | null {
  if (!file) return "Please attach a PDF, PNG, or JPG (max 10MB).";
  const type = file.type.toLowerCase();
  const extension = fileExtension(file.name);
  const typeOk = ALLOWED_MIME_TYPES.has(type) || ALLOWED_EXTENSIONS.has(extension);
  if (!typeOk) return "Please attach a PDF, PNG, or JPG (max 10MB).";
  if (file.size > OPSFLOW_FILE_MAX_BYTES) return "File must be 10MB or smaller.";
  return null;
}

export function validateOpsFlowCategory(value: string): string | null {
  if (!OPSFLOW_DOCUMENT_CATEGORIES.includes(value as OpsFlowDocumentCategory)) {
    return "Please choose a document category.";
  }
  return null;
}

export function buildOpsFlowSuccessMessage(): string {
  return "Extraction Complete! Your Excel file has been downloaded. Need auto-syncing email pipelines for your ERP? Click 'Talk to an Engineer'.";
}

export function validateOpsFlowLead(input: {
  file: File | null;
  category: string;
  workEmail: string;
}): { ok: true; payload: OpsFlowExtractPayload } | { ok: false; error: string } {
  const fileError = validateOpsFlowFile(input.file);
  if (fileError || !input.file) return { ok: false, error: fileError ?? "Please attach a PDF, PNG, or JPG (max 10MB)." };

  const categoryError = validateOpsFlowCategory(input.category);
  if (categoryError) return { ok: false, error: categoryError };

  const emailError = validateOpsFlowWorkEmail(input.workEmail);
  if (emailError) return { ok: false, error: emailError };

  return {
    ok: true,
    payload: {
      file: input.file,
      category: input.category as OpsFlowDocumentCategory,
      workEmail: input.workEmail.trim(),
    },
  };
}
