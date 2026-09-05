export const LEAD_INTERESTS = ["OpsFlow Lead", "AI Audit", "Pipeline", "Web App"] as const;
export type LeadInterest = (typeof LEAD_INTERESTS)[number];

export const LEAD_NEXT_ACTIONS = ["Send Audit Pitch", "Schedule Scoping Call"] as const;
export type LeadNextAction = (typeof LEAD_NEXT_ACTIONS)[number];

export const LEAD_SOURCES = ["lead", "opsflow"] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export const LEAD_STATUSES = ["NEW"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export function companyDomainFromEmail(email: string): string {
  const at = email.trim().toLowerCase().lastIndexOf("@");
  if (at < 0 || at === email.trim().length - 1) return "";
  return email.trim().toLowerCase().slice(at + 1);
}

export function classifyLeadInterest(input: {
  source?: LeadSource;
  serviceNeeded?: string;
}): { interest: LeadInterest; suggestedNextAction: LeadNextAction } {
  if (input.source === "opsflow") {
    return { interest: "OpsFlow Lead", suggestedNextAction: "Send Audit Pitch" };
  }

  const service = (input.serviceNeeded ?? "").toLowerCase();
  if (service.includes("opsflow")) {
    return { interest: "OpsFlow Lead", suggestedNextAction: "Send Audit Pitch" };
  }
  if (service.includes("audit")) {
    return { interest: "AI Audit", suggestedNextAction: "Send Audit Pitch" };
  }
  if (service.includes("pipeline") || service.includes("llm") || service.includes("document parsing")) {
    return { interest: "Pipeline", suggestedNextAction: "Schedule Scoping Call" };
  }
  if (service.includes("web") || service.includes("portal") || service.includes("application")) {
    return { interest: "Web App", suggestedNextAction: "Schedule Scoping Call" };
  }

  return { interest: "AI Audit", suggestedNextAction: "Send Audit Pitch" };
}

export function buildB2bLeadCard(input: {
  email: string;
  serviceNeeded?: string;
  source?: LeadSource;
}): {
  clientEmail: string;
  companyDomain: string;
  interest: LeadInterest;
  suggestedNextAction: LeadNextAction;
  text: string;
} {
  const clientEmail = input.email.trim();
  const companyDomain = companyDomainFromEmail(clientEmail);
  const { interest, suggestedNextAction } = classifyLeadInterest({
    source: input.source,
    serviceNeeded: input.serviceNeeded,
  });

  return {
    clientEmail,
    companyDomain,
    interest,
    suggestedNextAction,
    text: [
      "B2B Lead Card",
      `Client Email: ${clientEmail}`,
      `Company Domain: ${companyDomain}`,
      `Interest: ${interest}`,
      `Suggested Next Action: ${suggestedNextAction}`,
    ].join("\n"),
  };
}
