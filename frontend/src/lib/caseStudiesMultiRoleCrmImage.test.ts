import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  CASE_STUDIES_MULTI_ROLE_CRM_IMAGE_HEIGHT,
  CASE_STUDIES_MULTI_ROLE_CRM_IMAGE_WIDTH,
} from "./caseStudiesMultiRoleCrmImage";

const publicRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "public");

/** Reads PNG IHDR width/height without decoding the full bitmap. */
function readPngDimensions(relativePath: string): { width: number; height: number } {
  const buffer = readFileSync(join(publicRoot, relativePath));
  expect(buffer.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

describe("caseStudiesMultiRoleCrmImage", () => {
  it("ships standalone Multi-Role CRM grid art", () => {
    const oneX = readPngDimensions("assets/case-studies/multi-role-crm.png");
    const twoX = readPngDimensions("assets/case-studies/multi-role-crm@2x.png");

    expect(oneX.width).toBe(CASE_STUDIES_MULTI_ROLE_CRM_IMAGE_WIDTH);
    expect(oneX.height).toBe(CASE_STUDIES_MULTI_ROLE_CRM_IMAGE_HEIGHT);
    expect(twoX.width).toBeGreaterThanOrEqual(CASE_STUDIES_MULTI_ROLE_CRM_IMAGE_WIDTH);
    expect(twoX.height).toBeGreaterThanOrEqual(CASE_STUDIES_MULTI_ROLE_CRM_IMAGE_HEIGHT);
  });
});
