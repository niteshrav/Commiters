import { isPersonalEmailDomain } from "./opsFlowLeadGate";
import { sanitizeNameInput, validateName } from "./contactValidation";

export const AI_OPERATIONAL_AUDIT_PERSONAL_EMAIL_ERROR =
  "Please enter your official work email (e.g., name@company.com)." as const;

export type AiOperationalAuditLeadPayload = {
  name: string;
  email: string;
  company: string;
  bottleneck: string;
};

export function validateAiOperationalAuditEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Please enter your work email.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Please enter a valid work email.";
  if (isPersonalEmailDomain(trimmed)) return AI_OPERATIONAL_AUDIT_PERSONAL_EMAIL_ERROR;
  return null;
}

export function validateAiOperationalAuditLead(input: {
  name: string;
  email: string;
  company: string;
  bottleneck: string;
}): { ok: true; payload: AiOperationalAuditLeadPayload } | { ok: false; error: string } {
  const nameError = validateName(sanitizeNameInput(input.name));
  if (nameError) return { ok: false, error: nameError };

  const emailError = validateAiOperationalAuditEmail(input.email);
  if (emailError) return { ok: false, error: emailError };

  const company = input.company.trim();
  if (!company) return { ok: false, error: "Please enter your company name." };

  const bottleneck = input.bottleneck.trim();
  if (!bottleneck) return { ok: false, error: "Please describe your current manual bottleneck." };

  return {
    ok: true,
    payload: {
      name: input.name.trim(),
      email: input.email.trim(),
      company,
      bottleneck,
    },
  };
}
