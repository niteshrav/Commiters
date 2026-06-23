import { describe, expect, it } from "vitest";
import {
  CASE_STUDIES_ROW_ONE_CROPS,
  CASE_STUDIES_ROW_ONE_MOCKUP_FILENAME,
  CASE_STUDIES_ROW_ONE_PROJECT_IDS,
} from "./caseStudiesRowOneCrops";

describe("caseStudiesRowOneCrops", () => {
  it("defines row-one crops for Commiters and AI Summarizer photography", () => {
    expect(CASE_STUDIES_ROW_ONE_MOCKUP_FILENAME).toBe("case-studies-row-one-mockup.png");
    expect(CASE_STUDIES_ROW_ONE_PROJECT_IDS).toEqual(["commiters", "ai-summarizer"]);
    expect(CASE_STUDIES_ROW_ONE_CROPS).toHaveLength(2);
    for (const crop of CASE_STUDIES_ROW_ONE_CROPS) {
      const [left, top, right, bottom] = crop.box;
      expect(right).toBeGreaterThan(left);
      expect(bottom).toBeGreaterThan(top);
    }
  });
});
