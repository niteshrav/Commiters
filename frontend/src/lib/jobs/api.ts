import { getApiBaseUrl } from "../siteRuntime";
import type { JobDetail, JobFiltersResponse, JobQuery, PaginatedJobs, PublicJob } from "./types";
import {
  getStaticJobBySlug,
  listStaticPublicJobs,
  STATIC_JOB_FILTER_OPTIONS,
} from "./staticPublicJobs";

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

async function fetchJsonFromApi<T>(path: string): Promise<T | null> {
  const apiBase = getApiBaseUrl();
  if (!apiBase) return null;

  try {
    const response = await fetch(`${apiBase}${path}`);
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export function buildOpenPositionPath(slug: string): string {
  return `/open-positions/${slug}`;
}

export async function fetchPublicJobs(query: JobQuery = {}): Promise<PaginatedJobs<PublicJob>> {
  const qs = buildQuery({ limit: 12, ...query });
  const fromApi = await fetchJsonFromApi<PaginatedJobs<PublicJob>>(`/api/jobs?${qs}`);
  if (fromApi?.items?.length) return fromApi;

  const staticJobs = listStaticPublicJobs(query);
  if (!fromApi || staticJobs.items.length > 0) return staticJobs;
  return fromApi;
}

export async function fetchFeaturedJobs(limit = 3): Promise<PublicJob[]> {
  const result = await fetchPublicJobs({ featured: true, limit, page: 1 });
  return result.items;
}

export async function fetchJobFilters(): Promise<JobFiltersResponse> {
  const fromApi = await fetchJsonFromApi<JobFiltersResponse>("/api/jobs/filters");
  if (
    fromApi &&
    (fromApi.departments.length > 0 || fromApi.workModes.length > 0 || fromApi.employmentTypes.length > 0)
  ) {
    return fromApi;
  }
  return STATIC_JOB_FILTER_OPTIONS;
}

export async function fetchJobBySlug(slug: string): Promise<{ job: JobDetail; relatedJobs: PublicJob[] }> {
  const fromApi = await fetchJsonFromApi<{ job: JobDetail; relatedJobs: PublicJob[] }>(
    `/api/jobs/${encodeURIComponent(slug)}`,
  );
  if (fromApi?.job) return fromApi;

  const result = getStaticJobBySlug(slug);
  if (!result) throw new Error("Job not found.");
  return result;
}

export function isRecentlyPosted(createdAt: string, days = 7): boolean {
  const created = new Date(createdAt).getTime();
  return Date.now() - created <= days * 24 * 60 * 60 * 1000;
}

export function formatPostedDate(value: string): string {
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
