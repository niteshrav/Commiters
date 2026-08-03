import { sendJobApplicationToOwner, sendLeadToOwner } from "./formSubmitOwner";
import { SITE_FORM_INBOX } from "./siteContact";
import { getApiBaseUrl, isBackendEnabled } from "./siteRuntime";

export type JobApplicationInput = {
  name: string;
  email: string;
  phone: string;
  positionAppliedFor: string;
  linkedinProfile?: string;
  portfolioGitHub?: string;
  coverLetter: string;
  resumeFileName: string;
  resumePdfBase64: string;
};

export function buildLeadMailto(input: LeadInput): string {
  const subject = encodeURIComponent(`Project inquiry — ${input.serviceNeeded}`);
  const lines = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Service: ${input.serviceNeeded}`,
    input.budgetRange ? `Budget: ${input.budgetRange}` : "",
    input.timeline ? `Timeline: ${input.timeline}` : "",
    input.referenceLinks ? `Links: ${input.referenceLinks}` : "",
    "",
    input.message,
  ].filter(Boolean);
  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:${SITE_FORM_INBOX}?subject=${subject}&body=${body}`;
}

export function buildJobApplicationMailto(input: JobApplicationInput): string {
  const subject = encodeURIComponent(`Application — ${input.positionAppliedFor}`);
  const lines = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Position: ${input.positionAppliedFor}`,
    input.linkedinProfile ? `LinkedIn: ${input.linkedinProfile}` : "",
    input.portfolioGitHub ? `Portfolio/GitHub: ${input.portfolioGitHub}` : "",
    "",
    "Cover letter:",
    input.coverLetter,
    "",
    `Resume file to attach: ${input.resumeFileName}`,
  ].filter(Boolean);
  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:${SITE_FORM_INBOX}?subject=${subject}&body=${body}`;
}

function isFetchNetworkFailure(error: unknown): boolean {
  return error instanceof TypeError || (error instanceof Error && error.message === "Failed to fetch");
}

function submitJobApplicationViaMailto(input: JobApplicationInput) {
  if (typeof window !== "undefined") {
    window.location.href = buildJobApplicationMailto(input);
  }
  return { ok: true, via: "mailto" as const };
}

function submitLeadViaMailto(input: LeadInput) {
  if (typeof window !== "undefined") {
    window.location.href = buildLeadMailto(input);
  }
  return { ok: true, via: "mailto" as const };
}

export async function createJobApplication(input: JobApplicationInput) {
  const apiBase = getApiBaseUrl();
  if (!apiBase) {
    try {
      await sendJobApplicationToOwner(input);
      return { ok: true, via: "email" as const };
    } catch {
      return submitJobApplicationViaMailto(input);
    }
  }

  try {
    const res = await fetch(`${apiBase}/api/job-applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const payload = await res.json().catch(() => null);
      const message = payload?.error ?? "Failed to submit application.";
      throw new Error(message);
    }

    return res.json();
  } catch (error) {
    if (isFetchNetworkFailure(error)) {
      return submitJobApplicationViaMailto(input);
    }
    throw error;
  }
}

export type LeadInput = {
  name: string;
  email: string;
  serviceNeeded: string;
  budgetRange?: string;
  timeline?: string;
  referenceLinks?: string;
  message: string;
};

export async function createLead(input: LeadInput) {
  const apiBase = getApiBaseUrl();
  if (!apiBase) {
    try {
      await sendLeadToOwner(input);
      return { ok: true, via: "email" as const };
    } catch {
      return submitLeadViaMailto(input);
    }
  }

  try {
    const res = await fetch(`${apiBase}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const payload = await res.json().catch(() => null);
      const message = payload?.error ?? "Failed to submit inquiry.";
      throw new Error(message);
    }

    return res.json();
  } catch (error) {
    if (isFetchNetworkFailure(error)) {
      return submitLeadViaMailto(input);
    }
    throw error;
  }
}

export type TechnicalLedgerArticleRecord = {
  id: string;
  category: string;
  title: string;
  summary: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  source: "medium" | "local";
  publishedAt: string;
  mediumPostId?: string;
};

export async function fetchTechnicalLedgerArticles(): Promise<TechnicalLedgerArticleRecord[]> {
  const apiBase = getApiBaseUrl();
  if (!apiBase) return [];

  const res = await fetch(`${apiBase}/api/technical-ledger/articles`);
  if (!res.ok) {
    const payload = await res.json().catch(() => null);
    const message = payload?.error ?? "Failed to load Technical Ledger articles.";
    throw new Error(message);
  }
  const payload = (await res.json()) as { articles: TechnicalLedgerArticleRecord[] };
  return payload.articles;
}

export { isBackendEnabled };
