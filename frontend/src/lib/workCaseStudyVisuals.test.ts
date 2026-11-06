import { describe, expect, it } from "vitest";
import { WORK_CASE_STUDIES } from "./workCaseStudyProjects";
import { WORK_CASE_STUDY_VISUALS } from "./workCaseStudyVisuals";

describe("workCaseStudyVisuals", () => {
  it("adds a workflow diagram for every published case study", () => {
    for (const study of WORK_CASE_STUDIES) {
      expect(WORK_CASE_STUDY_VISUALS[study.id]?.pipeline.steps.length, study.id).toBeGreaterThan(1);
      expect(WORK_CASE_STUDY_VISUALS[study.id]?.table?.rows.length, study.id).toBeGreaterThan(1);
    }
    expect(WORK_CASE_STUDY_VISUALS["ecoroute-intelligence"]?.bars?.items.map((item) => item.value)).toEqual([
      "15",
      "6",
      "740 kg/h CO₂",
    ]);
    expect(WORK_CASE_STUDY_VISUALS.commiters?.tiles?.items.map((item) => item.value)).toEqual(["100/100", "<150ms"]);
  });

  it("keeps charts and tables on documented study figures only", () => {
    expect(WORK_CASE_STUDY_VISUALS.commiters?.table?.rows.map((row) => row.cells[1])).toEqual([
      "100/100",
      "<150ms",
      "Zero across the public platform",
    ]);
    expect(WORK_CASE_STUDY_VISUALS["prospectiq-ai"]?.tiles?.items[0]).toMatchObject({ value: "5", label: "Sequential ADK agents" });
    expect(WORK_CASE_STUDY_VISUALS["ecoroute-intelligence"]?.table?.rows.map((row) => row.cells[1])).toEqual([
      "15 sample traffic routes",
      "6 high-risk corridors",
      "740 kg/hour on ROUTE_9",
    ]);
    expect(WORK_CASE_STUDY_VISUALS["multi-role-crm"]?.table?.rows.map((row) => row.cells[0])).toEqual([
      "Admin",
      "Manager",
      "Field Agent",
    ]);
  });
});
