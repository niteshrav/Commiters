import { describe, expect, it } from "vitest";
import { fetchJobFilters, fetchPublicJobs } from "./api";
import { getStaticJobBySlug } from "./staticPublicJobs";

describe("static public jobs", () => {
  it("exposes filter options and three roles when the API is off", async () => {
    const filters = await fetchJobFilters();
    expect(filters.departments).toEqual(["Development", "Marketing", "Sales"]);
    expect(filters.workModes).toEqual(["Remote"]);
    expect(filters.employmentTypes).toEqual(["Internship"]);

    const jobs = await fetchPublicJobs({ page: 1, limit: 12 });
    expect(jobs.items.map((j) => j.slug).sort()).toEqual(
      ["ai-engineer-intern", "marketing-executive", "sales-executive"].sort(),
    );
  });

  it("loads job detail by slug", () => {
    const result = getStaticJobBySlug("marketing-executive");
    expect(result?.job.title).toBe("Marketing Intern");
    expect(result?.job.department).toBe("Marketing");
  });
});
