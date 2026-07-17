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

export async function createJobApplication(input: JobApplicationInput) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
  const apiBase = baseUrl ?? "http://localhost:4000";

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
  const baseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
  const apiBase = baseUrl ?? "http://localhost:4000";

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
}

function getApiBase(): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
  return baseUrl ?? "http://localhost:4000";
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
  const res = await fetch(`${getApiBase()}/api/technical-ledger/articles`);
  if (!res.ok) {
    const payload = await res.json().catch(() => null);
    const message = payload?.error ?? "Failed to load Technical Ledger articles.";
    throw new Error(message);
  }
  const payload = (await res.json()) as { articles: TechnicalLedgerArticleRecord[] };
  return payload.articles;
}

