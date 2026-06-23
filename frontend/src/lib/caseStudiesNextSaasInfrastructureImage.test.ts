import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  CASE_STUDIES_NEXTSAAS_INFRASTRUCTURE_IMAGE_HEIGHT,
  CASE_STUDIES_NEXTSAAS_INFRASTRUCTURE_IMAGE_WIDTH,
  CASE_STUDIES_NEXTSAAS_INFRASTRUCTURE_SOURCE_HEIGHT,
  CASE_STUDIES_NEXTSAAS_INFRASTRUCTURE_SOURCE_WIDTH,
} from "./caseStudiesNextSaasInfrastructureImage";

const publicRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "public");
const scriptsRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "scripts");

function readPngDimensions(relativePath: string): { width: number; height: number } {
  const buffer = readFileSync(join(publicRoot, relativePath));
  expect(buffer.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function hasInfrastructureChip(relativePath: string): boolean {
  const absolutePath = join(publicRoot, relativePath);
  const scriptPath = join(scriptsRoot, "has-nextsaas-infrastructure-chip.py");
  try {
    execSync(`python3 ${JSON.stringify(scriptPath)} ${JSON.stringify(absolutePath)}`, {
      encoding: "utf8",
    });
    return true;
  } catch {
    return false;
  }
}

describe("caseStudiesNextSaasInfrastructureImage", () => {
  it("ships the framed microchip infrastructure visual from the features mockup", () => {
    const oneX = readPngDimensions("assets/case-studies/nextsaas-infrastructure.png");
    const twoX = readPngDimensions("assets/case-studies/nextsaas-infrastructure@2x.png");

    expect(oneX.width).toBe(CASE_STUDIES_NEXTSAAS_INFRASTRUCTURE_IMAGE_WIDTH);
    expect(oneX.height).toBe(CASE_STUDIES_NEXTSAAS_INFRASTRUCTURE_IMAGE_HEIGHT);
    expect(twoX.width).toBe(CASE_STUDIES_NEXTSAAS_INFRASTRUCTURE_SOURCE_WIDTH);
    expect(twoX.height).toBe(CASE_STUDIES_NEXTSAAS_INFRASTRUCTURE_SOURCE_HEIGHT);

    expect(hasInfrastructureChip("assets/case-studies/nextsaas-infrastructure.png")).toBe(true);
    expect(hasInfrastructureChip("assets/case-studies/nextsaas-infrastructure@2x.png")).toBe(true);
  });
});
