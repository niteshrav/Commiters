import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("../siteRuntime", () => ({
  getApiBaseUrl: vi.fn(),
}));

import { getApiBaseUrl } from "../siteRuntime";
import { fetchJobBySlug, fetchJobFilters, fetchPublicJobs } from "./api";

describe("jobs api production fallback", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("falls back to static jobs when the API request fails", async () => {
    vi.mocked(getApiBaseUrl).mockReturnValue("https://api.example.com");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));

    const jobs = await fetchPublicJobs({ page: 1, limit: 12 });
    expect(jobs.items.map((job) => job.slug).sort()).toEqual(
      ["ai-engineer-intern", "marketing-executive", "sales-executive"].sort(),
    );
  });

  it("falls back to static jobs when the API returns a non-OK status", async () => {
    vi.mocked(getApiBaseUrl).mockReturnValue("https://api.example.com");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      }),
    );

    const jobs = await fetchPublicJobs({ page: 1, limit: 12 });
    expect(jobs.items).toHaveLength(3);
  });

  it("falls back to static filters when the API filters endpoint fails", async () => {
    vi.mocked(getApiBaseUrl).mockReturnValue("https://api.example.com");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));

    const filters = await fetchJobFilters();
    expect(filters.departments).toEqual(["Development", "Marketing", "Sales"]);
  });

  it("falls back to static job detail when the API detail request fails", async () => {
    vi.mocked(getApiBaseUrl).mockReturnValue("https://api.example.com");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));

    const result = await fetchJobBySlug("marketing-executive");
    expect(result.job.title).toBe("Marketing Intern");
  });
});
