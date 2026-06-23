import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  CASE_STUDIES_NEARDROP_SOURCE_ASPECT_RATIO,
  CASE_STUDIES_NEARDROP_IMAGE_HEIGHT,
  CASE_STUDIES_NEARDROP_IMAGE_WIDTH,
} from "./caseStudiesNearDropImage";
import {
  CASE_STUDIES_MOCKUP_CARD_PADDING_RGB_THRESHOLD,
  CASE_STUDIES_MOCKUP_DARK_GUTTER_GREY_MAX,
  CASE_STUDIES_MOCKUP_DARK_GUTTER_GREY_MIN,
  CASE_STUDIES_MOCKUP_GUTTER_GREY_MAX,
  CASE_STUDIES_MOCKUP_GUTTER_GREY_MIN,
  CASE_STUDIES_MOCKUP_LIGHT_GUTTER_GREY_MAX,
  CASE_STUDIES_MOCKUP_LIGHT_GUTTER_GREY_MIN,
} from "./caseStudiesImageTrim";

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

function hasProminentCenterTealPin(relativePath: string): boolean {
  const absolutePath = join(publicRoot, relativePath);
  const scriptPath = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "..",
    "scripts",
    "has-prominent-center-teal-pin.py",
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

function leftEdgeHasUniformLightGutterSeam(relativePath: string): boolean {
  const absolutePath = join(publicRoot, relativePath);
  const scriptPath = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "..",
    "scripts",
    "has-mockup-light-gutter-edge.py",
  );
  try {
    execSync(
      `python3 ${JSON.stringify(scriptPath)} ${JSON.stringify(absolutePath)} ${CASE_STUDIES_MOCKUP_LIGHT_GUTTER_GREY_MIN} ${CASE_STUDIES_MOCKUP_LIGHT_GUTTER_GREY_MAX}`,
      { encoding: "utf8" },
    );
    return false;
  } catch {
    return true;
  }
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

function rightEdgeHasUniformDarkGutterSeam(relativePath: string): boolean {
  const absolutePath = join(publicRoot, relativePath);
  const scriptPath = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "..",
    "scripts",
    "has-mockup-dark-gutter-edge.py",
  );
  try {
    execSync(
      `python3 ${JSON.stringify(scriptPath)} ${JSON.stringify(absolutePath)} ${CASE_STUDIES_MOCKUP_DARK_GUTTER_GREY_MIN} ${CASE_STUDIES_MOCKUP_DARK_GUTTER_GREY_MAX}`,
      { encoding: "utf8" },
    );
    return false;
  } catch {
    return true;
  }
}

function rightEdgeHasUniformCardPaddingSeam(relativePath: string): boolean {
  const absolutePath = join(publicRoot, relativePath);
  const scriptPath = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "..",
    "scripts",
    "has-mockup-card-padding-edge.py",
  );
  try {
    execSync(
      `python3 ${JSON.stringify(scriptPath)} ${JSON.stringify(absolutePath)} ${CASE_STUDIES_MOCKUP_CARD_PADDING_RGB_THRESHOLD}`,
      { encoding: "utf8" },
    );
    return false;
  } catch {
    return true;
  }
}

describe("caseStudiesNearDropImage", () => {
  it("ships standalone NearDrop grid art without mockup gutter strips or left-edge grey seams", () => {
    const oneX = readPngDimensions("assets/case-studies/neardrop-mvp.png");
    const twoX = readPngDimensions("assets/case-studies/neardrop-mvp@2x.png");

    expect(oneX.width).toBe(CASE_STUDIES_NEARDROP_IMAGE_WIDTH);
    expect(oneX.height).toBe(CASE_STUDIES_NEARDROP_IMAGE_HEIGHT);
    expect(twoX.width).toBe(CASE_STUDIES_NEARDROP_IMAGE_WIDTH * 2);
    expect(twoX.height).toBe(CASE_STUDIES_NEARDROP_IMAGE_HEIGHT * 2);
    expect(oneX.width / oneX.height).toBeCloseTo(335 / 571, 2);
    expect(CASE_STUDIES_NEARDROP_SOURCE_ASPECT_RATIO).toBe("335 / 571");

    expect(hasProminentCenterTealPin("assets/case-studies/neardrop-mvp.png")).toBe(true);
    expect(hasProminentCenterTealPin("assets/case-studies/neardrop-mvp@2x.png")).toBe(true);
    expect(leftEdgeHasUniformLightGutterSeam("assets/case-studies/neardrop-mvp.png")).toBe(false);
    expect(leftEdgeHasUniformLightGutterSeam("assets/case-studies/neardrop-mvp@2x.png")).toBe(false);
    expect(rightEdgeHasMockupGutterGreySeam("assets/case-studies/neardrop-mvp.png")).toBe(false);
    expect(rightEdgeHasMockupGutterGreySeam("assets/case-studies/neardrop-mvp@2x.png")).toBe(false);
    expect(rightEdgeHasUniformDarkGutterSeam("assets/case-studies/neardrop-mvp.png")).toBe(false);
    expect(rightEdgeHasUniformDarkGutterSeam("assets/case-studies/neardrop-mvp@2x.png")).toBe(false);
    expect(rightEdgeHasUniformCardPaddingSeam("assets/case-studies/neardrop-mvp.png")).toBe(false);
    expect(rightEdgeHasUniformCardPaddingSeam("assets/case-studies/neardrop-mvp@2x.png")).toBe(false);
  });
});
