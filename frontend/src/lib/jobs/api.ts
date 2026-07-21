import type { JobDetail, JobFiltersResponse, JobQuery, PaginatedJobs, PublicJob } from "./types";

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "http://localhost:4000";

function buildQuery(params: JobQuery): string {
  const search = new URLSearchParams();
  if (params.page) search.set("page", String(params.page));
  if (params.limit) search.set("limit", String(params.limit));
  if (params.search) search.set("search", params.search);
  if (params.department) search.set("department", params.department);
  if (params.workMode) search.set("workMode", params.workMode);
  if (params.employmentType) search.set("employmentType", params.employmentType);
  if (params.featured) search.set("featured", "true");
  return search.toString();
}

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export function buildOpenPositionPath(slug: string): string {
  return `/open-positions/${slug}`;
}

export async function fetchPublicJobs(query: JobQuery = {}): Promise<PaginatedJobs<PublicJob>> {
  const qs = buildQuery({ limit: 12, ...query });
  return fetchJson(`/api/jobs?${qs}`);
}

export async function fetchFeaturedJobs(limit = 3): Promise<PublicJob[]> {
  const result = await fetchPublicJobs({ featured: true, limit, page: 1 });
  return result.items;
}

export async function fetchJobFilters(): Promise<JobFiltersResponse> {
  return fetchJson("/api/jobs/filters");
}

export async function fetchJobBySlug(slug: string): Promise<{ job: JobDetail; relatedJobs: PublicJob[] }> {
  return fetchJson(`/api/jobs/${encodeURIComponent(slug)}`);
}

export function isRecentlyPosted(createdAt: string, days = 7): boolean {
  const created = new Date(createdAt).getTime();
  return Date.now() - created <= days * 24 * 60 * 60 * 1000;
}

export function formatPostedDate(value: string): string {
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
