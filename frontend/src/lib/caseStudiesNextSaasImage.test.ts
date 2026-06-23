import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  CASE_STUDIES_NEXTSAAS_IMAGE_HEIGHT,
  CASE_STUDIES_NEXTSAAS_IMAGE_WIDTH,
  CASE_STUDIES_NEXTSAAS_SOURCE_HEIGHT,
  CASE_STUDIES_NEXTSAAS_SOURCE_WIDTH,
} from "./caseStudiesNextSaasImage";

const publicRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "public");
const scriptsRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "scripts");

/** Reads PNG IHDR width/height without decoding the full bitmap. */
function readPngDimensions(relativePath: string): { width: number; height: number } {
  const buffer = readFileSync(join(publicRoot, relativePath));
  expect(buffer.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function hasVividAnalyticsDashboard(relativePath: string): boolean {
  const absolutePath = join(publicRoot, relativePath);
  const scriptPath = join(scriptsRoot, "has-vivid-analytics-dashboard.py");
  try {
    execSync(`python3 ${JSON.stringify(scriptPath)} ${JSON.stringify(absolutePath)}`, {
      encoding: "utf8",
    });
    return true;
  } catch {
    return false;
  }
}

describe("caseStudiesNextSaasImage", () => {
  it("ships the full-frame NextSaas pipelines hero art with the laptop and desk props", () => {
    const oneX = readPngDimensions("assets/case-studies/nextsaas.png");
    const twoX = readPngDimensions("assets/case-studies/nextsaas@2x.png");

    expect(oneX.width).toBe(CASE_STUDIES_NEXTSAAS_IMAGE_WIDTH);
    expect(oneX.height).toBe(CASE_STUDIES_NEXTSAAS_IMAGE_HEIGHT);
    expect(twoX.width).toBe(CASE_STUDIES_NEXTSAAS_SOURCE_WIDTH);
    expect(twoX.height).toBe(CASE_STUDIES_NEXTSAAS_SOURCE_HEIGHT);
    expect(oneX.height).toBeGreaterThan(500);
    expect(twoX.height).toBeGreaterThan(1000);

    expect(hasVividAnalyticsDashboard("assets/case-studies/nextsaas.png")).toBe(true);
    expect(hasVividAnalyticsDashboard("assets/case-studies/nextsaas@2x.png")).toBe(true);
  });
});
