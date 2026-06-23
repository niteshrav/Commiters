import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_HEIGHT,
  MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_WIDTH,
} from "./multiRoleCrmCaseStudyHeroImage";

const publicRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "public");

function readPngDimensions(relativePath: string): { width: number; height: number } {
  const buffer = readFileSync(join(publicRoot, relativePath));
  expect(buffer.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

describe("multiRoleCrmCaseStudyHeroImage", () => {
  it("ships the full tablet dashboard hero at 1x and 2x densities", () => {
    const oneX = readPngDimensions("assets/case-studies/multi-role-crm-hero.png");
    const twoX = readPngDimensions("assets/case-studies/multi-role-crm-hero@2x.png");

    expect(oneX.width).toBe(MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_WIDTH);
    expect(oneX.height).toBe(MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_HEIGHT);
    expect(twoX.width).toBe(MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_WIDTH * 2);
    expect(twoX.height).toBe(MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_HEIGHT * 2);
  });
});
