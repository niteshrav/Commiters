import { describe, expect, it } from "vitest";
import {
  CASE_STUDIES_MOSAIC_CROPS,
  CASE_STUDIES_MOSAIC_MOCKUP_FILENAME,
  CASE_STUDIES_MOSAIC_PROJECT_IDS,
} from "./caseStudiesMosaicCrops";

describe("caseStudiesMosaicCrops", () => {
  it("keeps mosaic crops empty now that lower-row cards use standalone art", () => {
    expect(CASE_STUDIES_MOSAIC_MOCKUP_FILENAME).toBe("case-studies-mosaic-mockup.png");
    expect(CASE_STUDIES_MOSAIC_PROJECT_IDS).toEqual([]);
    expect(CASE_STUDIES_MOSAIC_CROPS).toHaveLength(0);
  });
});
