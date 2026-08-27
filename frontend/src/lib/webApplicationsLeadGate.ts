import { sanitizeNameInput, validateName } from "./contactValidation";
import { validateAiOperationalAuditEmail } from "./aiOperationalAuditLeadGate";

export type WebApplicationsLeadPayload = {
  name: string;
  email: string;
  company: string;
  project: string;
};

export function validateWebApplicationsLead(input: {
  name: string;
  email: string;
  company: string;
  project: string;
}): { ok: true; payload: WebApplicationsLeadPayload } | { ok: false; error: string } {
  const nameError = validateName(sanitizeNameInput(input.name));
  if (nameError) return { ok: false, error: nameError };

  const emailError = validateAiOperationalAuditEmail(input.email);
  if (emailError) return { ok: false, error: emailError };

  const company = input.company.trim();
  if (!company) return { ok: false, error: "Please enter your company name." };

  const project = input.project.trim();
  if (!project) return { ok: false, error: "Please describe your web application project." };

  return {
    ok: true,
    payload: {
      name: input.name.trim(),
      email: input.email.trim(),
      company,
      project,
    },
  };
}
