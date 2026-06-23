import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  CASE_STUDIES_COMMITERS_IMAGE_HEIGHT,
  CASE_STUDIES_COMMITERS_IMAGE_WIDTH,
} from "./caseStudiesCommitersImage";
import { CASE_STUDIES_MOCKUP_GUTTER_GREY_MAX, CASE_STUDIES_MOCKUP_GUTTER_GREY_MIN } from "./caseStudiesImageTrim";

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

function rightEdgeHasMockupGutterGreySeam(relativePath: string): boolean {
  const absolutePath = join(publicRoot, relativePath);
  const scriptPath = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "..",
    "scripts",
    "has-mockup-gutter-grey-seam.py",
  );
  try {
    execSync(
      `python3 ${JSON.stringify(scriptPath)} ${JSON.stringify(absolutePath)} ${CASE_STUDIES_MOCKUP_GUTTER_GREY_MIN} ${CASE_STUDIES_MOCKUP_GUTTER_GREY_MAX}`,
      { encoding: "utf8" },
    );
    return false;
  } catch {
    return true;
  }
}

describe("caseStudiesCommitersImage", () => {
  it("ships a trimmed Commiters mosaic crop without the mockup gutter column", () => {
    const oneX = readPngDimensions("assets/case-studies/commiters.png");
    const twoX = readPngDimensions("assets/case-studies/commiters@2x.png");

    expect(oneX.width).toBe(CASE_STUDIES_COMMITERS_IMAGE_WIDTH);
    expect(oneX.height).toBe(CASE_STUDIES_COMMITERS_IMAGE_HEIGHT);
    expect(twoX.width).toBe(CASE_STUDIES_COMMITERS_IMAGE_WIDTH * 2);
    expect(twoX.height).toBe(CASE_STUDIES_COMMITERS_IMAGE_HEIGHT * 2);

    expect(rightEdgeHasMockupGutterGreySeam("assets/case-studies/commiters.png")).toBe(false);
    expect(rightEdgeHasMockupGutterGreySeam("assets/case-studies/commiters@2x.png")).toBe(false);
  });
});
