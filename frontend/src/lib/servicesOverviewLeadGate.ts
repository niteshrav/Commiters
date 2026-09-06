import { validateAiOperationalAuditEmail } from "./aiOperationalAuditLeadGate";
import { sanitizeNameInput, validateName } from "./contactValidation";
import {
  SERVICES_OVERVIEW_INQUIRY_INTERESTS,
  type ServicesOverviewInquiryInterest,
} from "./servicesOverviewPageContent";

export type ServicesOverviewLeadPayload = {
  name: string;
  email: string;
  company: string;
  interest: ServicesOverviewInquiryInterest;
  details: string;
  serviceNeeded: ServicesOverviewInquiryInterest;
  timeline: string;
};

export function isServicesOverviewInquiryInterest(value: string): value is ServicesOverviewInquiryInterest {
  return (SERVICES_OVERVIEW_INQUIRY_INTERESTS as readonly string[]).includes(value);
}

export function validateServicesOverviewLead(input: {
  name: string;
  email: string;
  company: string;
  interest: string;
  details: string;
}): { ok: true; payload: ServicesOverviewLeadPayload } | { ok: false; error: string } {
  const nameError = validateName(sanitizeNameInput(input.name));
  if (nameError) return { ok: false, error: nameError };

  const emailError = validateAiOperationalAuditEmail(input.email);
  if (emailError) return { ok: false, error: emailError };

  const company = input.company.trim();
  if (!company) return { ok: false, error: "Please enter your company name." };

  if (!isServicesOverviewInquiryInterest(input.interest)) {
    return { ok: false, error: "Please choose a scoping track." };
  }

  const details = input.details.trim();
  if (!details) return { ok: false, error: "Please describe what you want scoped." };

  return {
    ok: true,
    payload: {
      name: input.name.trim(),
      email: input.email.trim(),
      company,
      interest: input.interest,
      details,
      serviceNeeded: input.interest,
      timeline: input.interest === "AI Operational Audit (2-Week Blueprint)" ? "2-week diagnostic" : "To be scoped",
    },
  };
}
