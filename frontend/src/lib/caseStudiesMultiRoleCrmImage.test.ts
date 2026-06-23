import { execSync } from "node:child_process";
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

function hasProminentCenterBlueIcon(relativePath: string): boolean {
  const absolutePath = join(publicRoot, relativePath);
  const scriptPath = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "..",
    "scripts",
    "has-prominent-center-blue-icon.py",
  );
  try {
    execSync(`python3 ${JSON.stringify(scriptPath)} ${JSON.stringify(absolutePath)}`, {
      encoding: "utf8",
    });
    return true;
  } catch {
    return false;
  }
}

describe("caseStudiesMultiRoleCrmImage", () => {
  it("ships standalone Multi-Role CRM grid art with a centered blue network icon", () => {
    const oneX = readPngDimensions("assets/case-studies/multi-role-crm.png");
    const twoX = readPngDimensions("assets/case-studies/multi-role-crm@2x.png");

    expect(oneX.width).toBe(CASE_STUDIES_MULTI_ROLE_CRM_IMAGE_WIDTH);
    expect(oneX.height).toBe(CASE_STUDIES_MULTI_ROLE_CRM_IMAGE_HEIGHT);
    expect(twoX.width).toBe(CASE_STUDIES_MULTI_ROLE_CRM_IMAGE_WIDTH * 2);
    expect(twoX.height).toBe(CASE_STUDIES_MULTI_ROLE_CRM_IMAGE_HEIGHT * 2);

    expect(hasProminentCenterBlueIcon("assets/case-studies/multi-role-crm.png")).toBe(true);
    expect(hasProminentCenterBlueIcon("assets/case-studies/multi-role-crm@2x.png")).toBe(true);
  });
});
