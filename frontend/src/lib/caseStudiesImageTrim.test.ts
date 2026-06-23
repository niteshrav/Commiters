import { describe, expect, it } from "vitest";
import {
  countTrailingMockupCardPaddingColumns,
  countTrailingMockupDarkGutterGreyColumns,
  countTrailingMockupGutterGreyColumns,
  countTrailingMockupMarginColumns,
  isMockupCardPaddingRgb,
  isMockupDarkGutterGreyRgb,
  isMockupGutterGreyRgb,
  isMockupLightGutterGreyRgb,
  isMockupMarginRgb,
  isMockupMosaicPaddingRgb,
  isUniformMockupDarkGutterGreyColumn,
  isUniformMockupGutterGreyColumn,
  isUniformMockupMosaicPaddingColumn,
  isUniformMockupMosaicPaddingRow,
  countTrailingMockupMosaicPaddingColumns,
  countTrailingMockupMosaicPaddingRows,
} from "./caseStudiesImageTrim";

describe("caseStudiesImageTrim", () => {
  it("detects mockup margin and gutter grey columns independently", () => {
    expect(isMockupMarginRgb(249, 249, 249)).toBe(true);
    expect(isMockupMarginRgb(242, 242, 242)).toBe(false);
    expect(isMockupGutterGreyRgb(242, 242, 242)).toBe(true);
    expect(isMockupGutterGreyRgb(255, 255, 255)).toBe(false);
    expect(isMockupDarkGutterGreyRgb(235, 235, 235)).toBe(true);
    expect(isMockupDarkGutterGreyRgb(242, 242, 242)).toBe(false);
    expect(isMockupCardPaddingRgb(244, 244, 244)).toBe(true);
    expect(isMockupCardPaddingRgb(235, 235, 235)).toBe(false);
    expect(isMockupLightGutterGreyRgb(232, 232, 232)).toBe(true);
    expect(isMockupLightGutterGreyRgb(210, 210, 210)).toBe(false);
    expect(isMockupMosaicPaddingRgb(249, 249, 249)).toBe(true);
    expect(isMockupMosaicPaddingRgb(232, 232, 232)).toBe(true);
    expect(isMockupMosaicPaddingRgb(120, 120, 120)).toBe(false);

    const column = (pixel: [number, number, number]) => Array.from({ length: 4 }, () => pixel);
    expect(isUniformMockupGutterGreyColumn(column([242, 242, 242]))).toBe(true);
    expect(isUniformMockupGutterGreyColumn(column([255, 255, 255]))).toBe(false);
    expect(isUniformMockupDarkGutterGreyColumn(column([235, 235, 235]))).toBe(true);
  });

  it("counts trailing dark gutter and card padding columns from the right edge inward", () => {
    const column = (pixel: [number, number, number]) => Array.from({ length: 4 }, () => pixel);

    expect(
      countTrailingMockupDarkGutterGreyColumns([
        column([235, 235, 235]),
        column([235, 235, 235]),
        column([255, 255, 255]),
      ]),
    ).toBe(2);

    expect(
      countTrailingMockupCardPaddingColumns([
        column([255, 255, 255]),
        column([244, 244, 244]),
        column([120, 120, 120]),
      ]),
    ).toBe(2);

    expect(
      countTrailingMockupMarginColumns([
        column([249, 249, 249]),
        column([249, 249, 249]),
        column([242, 242, 242]),
      ]),
    ).toBe(2);

    expect(
      countTrailingMockupGutterGreyColumns([
        column([242, 242, 242]),
        column([242, 242, 242]),
        column([255, 255, 255]),
      ]),
    ).toBe(2);

    expect(
      countTrailingMockupMosaicPaddingColumns([
        column([232, 232, 232]),
        column([249, 249, 249]),
        column([18, 29, 35]),
      ]),
    ).toBe(2);

    expect(
      countTrailingMockupMosaicPaddingRows([
        column([249, 249, 249]),
        column([242, 242, 242]),
        column([18, 29, 35]),
      ]),
    ).toBe(2);

    expect(isUniformMockupMosaicPaddingColumn(column([232, 232, 232]))).toBe(true);
    expect(isUniformMockupMosaicPaddingRow(column([249, 249, 249]))).toBe(true);
  });
});
