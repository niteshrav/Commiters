import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { CASE_STUDIES_ROW_ONE_PROJECT_IDS } from "./caseStudiesRowOneCrops";
import { CASE_STUDIES_MOSAIC_PROJECT_IDS } from "./caseStudiesMosaicCrops";
import {
  CASE_STUDY_GRID_IMAGE_PROJECT_IDS,
  CASE_STUDY_IMAGE_ASSETS,
  caseStudyHasImage,
} from "./caseStudiesPageAssets";

const publicRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "public");

function fileHash(relativePath: string): string {
  return createHash("sha256").update(readFileSync(join(publicRoot, relativePath))).digest("hex");
}

describe("caseStudiesPageAssets", () => {
  it("ships all five grid card images including row-one Commiters and AI Summarizer crops", () => {
    for (const asset of CASE_STUDY_IMAGE_ASSETS) {
      expect(existsSync(join(publicRoot, asset.src))).toBe(true);
      expect(asset.src).toMatch(/^\/assets\/case-studies\/.+\.png$/);
      if (asset.srcSet) {
        const hiResPath = asset.srcSet.split(/\s+/)[0];
        expect(existsSync(join(publicRoot, hiResPath))).toBe(true);
      }
    }
    expect(CASE_STUDY_IMAGE_ASSETS.map((asset) => asset.id)).toEqual(CASE_STUDY_GRID_IMAGE_PROJECT_IDS);
    expect(CASE_STUDIES_ROW_ONE_PROJECT_IDS).toEqual(["commiters", "ai-summarizer"]);
    expect(CASE_STUDIES_MOSAIC_PROJECT_IDS).toEqual([]);
    expect(caseStudyHasImage("commiters")).toBe(true);
    expect(caseStudyHasImage("ai-summarizer")).toBe(true);
    expect(existsSync(join(publicRoot, "assets/case-studies/case-studies-row-one-mockup.png"))).toBe(true);
  });

  it("uses distinct photography per project (not shared server-rack art)", () => {
    const hashes = new Set(
      CASE_STUDY_IMAGE_ASSETS.map((asset) => fileHash(asset.src.replace(/^\//, ""))),
    );
    expect(hashes.size).toBe(CASE_STUDY_IMAGE_ASSETS.length);

    const commitersHash = fileHash("assets/case-studies/commiters.png");
    expect(commitersHash).not.toBe(fileHash("assets/home/server-racks.png"));
  });
});
