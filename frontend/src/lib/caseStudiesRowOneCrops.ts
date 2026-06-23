/** Crop regions for the Commiters + AI Summarizer row mockup (1024×372). */
export const CASE_STUDIES_ROW_ONE_MOCKUP_FILENAME = "case-studies-row-one-mockup.png" as const;

export type CaseStudyRowOneCrop = {
  id: "commiters" | "ai-summarizer";
  box: readonly [left: number, top: number, right: number, bottom: number];
};

export const CASE_STUDIES_ROW_ONE_CROPS: CaseStudyRowOneCrop[] = [
  { id: "commiters", box: [368, 28, 648, 338] },
  { id: "ai-summarizer", box: [688, 26, 998, 188] },
] as const;

export const CASE_STUDIES_ROW_ONE_PROJECT_IDS = CASE_STUDIES_ROW_ONE_CROPS.map((entry) => entry.id);
