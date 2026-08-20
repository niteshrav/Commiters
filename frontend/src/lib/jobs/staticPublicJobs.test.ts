import { describe, expect, it } from "vitest";
import { fetchJobFilters, fetchPublicJobs } from "./api";
import { getStaticJobBySlug, enrichJobDetailFromStaticFallback } from "./staticPublicJobs";

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
    expect(result?.job.responsibilities.length).toBeGreaterThan(0);
  });

  it("enriches sparse API jobs with richer static copy for known slugs", () => {
    const enriched = enrichJobDetailFromStaticFallback({
      _id: "api-marketing",
      title: "Marketing Intern",
      slug: "marketing-executive",
      department: "Marketing",
      location: "Remote",
      workMode: "Remote",
      internshipType: "",
      stipendSalary: "",
      employmentType: "Internship",
      featured: true,
      lastDateToApply: null,
      createdAt: "2026-01-15T00:00:00.000Z",
      updatedAt: "2026-02-01T00:00:00.000Z",
      experience: "",
      duration: "",
      numberOfOpenings: 0,
      aboutCompany: "Short company blurb.",
      roleOverview: "Short role blurb.",
      responsibilities: [],
      requiredSkills: [],
      preferredSkills: [],
      eligibility: "Students only.",
      benefits: [],
      learningOpportunities: "Learn GTM.",
      selectionProcess: "",
      seo: { title: "", description: "" },
    });

    expect(enriched.stipendSalary).toBe("₹8,000 / month");
    expect(enriched.responsibilities.length).toBeGreaterThan(0);
    expect(enriched.roleOverview.length).toBeGreaterThan(40);
    expect(enriched.aboutCompany).toContain("founder-led engineering studio");
  });
});
