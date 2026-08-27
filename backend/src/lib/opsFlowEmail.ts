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
  if (!trimmed) return "Please enter your work email.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Please enter a valid work email.";
  if (isPersonalEmailDomain(trimmed)) return OPSFLOW_PERSONAL_EMAIL_ERROR;
  return null;
}
