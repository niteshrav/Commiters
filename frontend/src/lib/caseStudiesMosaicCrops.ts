/** Crop regions for the Proven Precision case studies mosaic (687×1024 mockup). */
export const CASE_STUDIES_MOSAIC_MOCKUP_FILENAME = "case-studies-mosaic-mockup.png" as const;

export type CaseStudyMosaicCrop = {
  id: string;
  box: readonly [left: number, top: number, right: number, bottom: number];
};

/** Left, top, right, bottom pixel bounds on the Stitch OUR WORK screen (rows 2–3). */
export const CASE_STUDIES_MOSAIC_CROPS: CaseStudyMosaicCrop[] = [] as const;

export const CASE_STUDIES_MOSAIC_PROJECT_IDS = CASE_STUDIES_MOSAIC_CROPS.map((entry) => entry.id);
