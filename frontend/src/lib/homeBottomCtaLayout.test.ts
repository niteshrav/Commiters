import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  HOME_BOTTOM_CTA_MIN_HEIGHT,
  HOME_BOTTOM_CTA_PADDING_BLOCK,
  HOME_BOTTOM_CTA_PADDING_INLINE,
  HOME_BOTTOM_CTA_SECTION_CLASS,
  HOME_BOTTOM_CTA_SUBTEXT_MARGIN_BOTTOM,
  HOME_BOTTOM_CTA_SUBTEXT_MAX_WIDTH,
  HOME_BOTTOM_CTA_TITLE_MARGIN_BOTTOM,
} from "./homeBottomCtaLayout";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("homeBottomCtaLayout", () => {
  it("matches Stitch screenshot CTA band height and inner spacing", () => {
    expect(css).toMatch(
      new RegExp(
        `\\.${HOME_BOTTOM_CTA_SECTION_CLASS.replace(/-/g, "\\-")}[\\s\\S]*min-height:\\s*${HOME_BOTTOM_CTA_MIN_HEIGHT.replace(/[()]/g, "\\$&")}`,
      ),
    );
    expect(css).toMatch(
      new RegExp(
        `\\.${HOME_BOTTOM_CTA_SECTION_CLASS.replace(/-/g, "\\-")}[\\s\\S]*padding:\\s*${HOME_BOTTOM_CTA_PADDING_BLOCK.replace(/[()]/g, "\\$&")}[\\s\\S]*${HOME_BOTTOM_CTA_PADDING_INLINE.replace(/[()]/g, "\\$&")}`,
      ),
    );
    expect(css).toMatch(
      new RegExp(
        `\\.${HOME_BOTTOM_CTA_SECTION_CLASS.replace(/-/g, "\\-")}-title[\\s\\S]*margin:[\\s\\S]*${HOME_BOTTOM_CTA_TITLE_MARGIN_BOTTOM}`,
      ),
    );
    expect(css).toMatch(
      new RegExp(
        `\\.${HOME_BOTTOM_CTA_SECTION_CLASS.replace(/-/g, "\\-")}-subtext[\\s\\S]*margin:[\\s\\S]*${HOME_BOTTOM_CTA_SUBTEXT_MARGIN_BOTTOM}`,
      ),
    );
    expect(css).toMatch(
      new RegExp(
        `\\.${HOME_BOTTOM_CTA_SECTION_CLASS.replace(/-/g, "\\-")}-subtext[\\s\\S]*max-width:\\s*${HOME_BOTTOM_CTA_SUBTEXT_MAX_WIDTH}`,
      ),
    );
    expect(css).toMatch(
      new RegExp(
        `\\.${HOME_BOTTOM_CTA_SECTION_CLASS.replace(/-/g, "\\-")}[\\s\\S]*display:\\s*flex[\\s\\S]*align-items:\\s*center`,
      ),
    );
  });
});
