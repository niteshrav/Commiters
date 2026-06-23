/** Stitch row-one mockup margin columns beside the card crop (e.g. #f9f9f9). */
export const CASE_STUDIES_MOCKUP_MARGIN_RGB_THRESHOLD = 245 as const;

/** Stitch mockup gutter seam between margin and card art (#f2f2f2). */
export const CASE_STUDIES_MOCKUP_GUTTER_GREY_MIN = 240 as const;
export const CASE_STUDIES_MOCKUP_GUTTER_GREY_MAX = 246 as const;

/** Darker Stitch mockup gutter seam beside row-one card crops (#ebebeb). */
export const CASE_STUDIES_MOCKUP_DARK_GUTTER_GREY_MIN = 230 as const;
export const CASE_STUDIES_MOCKUP_DARK_GUTTER_GREY_MAX = 239 as const;

/** Uniform near-white mockup padding columns beside card art. */
export const CASE_STUDIES_MOCKUP_CARD_PADDING_RGB_THRESHOLD = 244 as const;

/** Light neutral mockup gutter grey beside mosaic card crops (#e8e8e8). */
export const CASE_STUDIES_MOCKUP_LIGHT_GUTTER_GREY_MIN = 220 as const;
export const CASE_STUDIES_MOCKUP_LIGHT_GUTTER_GREY_MAX = 239 as const;
export const CASE_STUDIES_MOCKUP_LIGHT_GUTTER_RGB_DELTA = 5 as const;

export type RgbPixel = readonly [red: number, green: number, blue: number];

export function isMockupMarginRgb(
  red: number,
  green: number,
  blue: number,
  threshold: number = CASE_STUDIES_MOCKUP_MARGIN_RGB_THRESHOLD,
): boolean {
  return red >= threshold && green >= threshold && blue >= threshold;
}

export function isMockupGutterGreyRgb(red: number, green: number, blue: number): boolean {
  return (
    red >= CASE_STUDIES_MOCKUP_GUTTER_GREY_MIN &&
    red <= CASE_STUDIES_MOCKUP_GUTTER_GREY_MAX &&
    green >= CASE_STUDIES_MOCKUP_GUTTER_GREY_MIN &&
    green <= CASE_STUDIES_MOCKUP_GUTTER_GREY_MAX &&
    blue >= CASE_STUDIES_MOCKUP_GUTTER_GREY_MIN &&
    blue <= CASE_STUDIES_MOCKUP_GUTTER_GREY_MAX
  );
}

export function isMockupDarkGutterGreyRgb(red: number, green: number, blue: number): boolean {
  return (
    red >= CASE_STUDIES_MOCKUP_DARK_GUTTER_GREY_MIN &&
    red <= CASE_STUDIES_MOCKUP_DARK_GUTTER_GREY_MAX &&
    green >= CASE_STUDIES_MOCKUP_DARK_GUTTER_GREY_MIN &&
    green <= CASE_STUDIES_MOCKUP_DARK_GUTTER_GREY_MAX &&
    blue >= CASE_STUDIES_MOCKUP_DARK_GUTTER_GREY_MIN &&
    blue <= CASE_STUDIES_MOCKUP_DARK_GUTTER_GREY_MAX
  );
}

export function isMockupCardPaddingRgb(
  red: number,
  green: number,
  blue: number,
  threshold: number = CASE_STUDIES_MOCKUP_CARD_PADDING_RGB_THRESHOLD,
): boolean {
  return red >= threshold && green >= threshold && blue >= threshold;
}

export function isMockupLightGutterGreyRgb(red: number, green: number, blue: number): boolean {
  return (
    red >= CASE_STUDIES_MOCKUP_LIGHT_GUTTER_GREY_MIN &&
    red <= CASE_STUDIES_MOCKUP_LIGHT_GUTTER_GREY_MAX &&
    green >= CASE_STUDIES_MOCKUP_LIGHT_GUTTER_GREY_MIN &&
    green <= CASE_STUDIES_MOCKUP_LIGHT_GUTTER_GREY_MAX &&
    blue >= CASE_STUDIES_MOCKUP_LIGHT_GUTTER_GREY_MIN &&
    blue <= CASE_STUDIES_MOCKUP_LIGHT_GUTTER_GREY_MAX &&
    Math.abs(red - green) <= CASE_STUDIES_MOCKUP_LIGHT_GUTTER_RGB_DELTA &&
    Math.abs(green - blue) <= CASE_STUDIES_MOCKUP_LIGHT_GUTTER_RGB_DELTA
  );
}

export function isMockupMosaicPaddingRgb(red: number, green: number, blue: number): boolean {
  return (
    isMockupMarginRgb(red, green, blue) ||
    isMockupCardPaddingRgb(red, green, blue) ||
    isMockupGutterGreyRgb(red, green, blue) ||
    isMockupLightGutterGreyRgb(red, green, blue)
  );
}

export function isUniformMockupMarginColumn(
  column: ReadonlyArray<RgbPixel>,
  threshold: number = CASE_STUDIES_MOCKUP_MARGIN_RGB_THRESHOLD,
): boolean {
  return column.length > 0 && column.every(([red, green, blue]) => isMockupMarginRgb(red, green, blue, threshold));
}

export function isUniformMockupGutterGreyColumn(column: ReadonlyArray<RgbPixel>): boolean {
  return column.length > 0 && column.every(([red, green, blue]) => isMockupGutterGreyRgb(red, green, blue));
}

export function isUniformMockupDarkGutterGreyColumn(column: ReadonlyArray<RgbPixel>): boolean {
  return column.length > 0 && column.every(([red, green, blue]) => isMockupDarkGutterGreyRgb(red, green, blue));
}

export function isUniformMockupCardPaddingColumn(
  column: ReadonlyArray<RgbPixel>,
  threshold: number = CASE_STUDIES_MOCKUP_CARD_PADDING_RGB_THRESHOLD,
): boolean {
  return (
    column.length > 0 &&
    column.every(([red, green, blue]) => isMockupCardPaddingRgb(red, green, blue, threshold))
  );
}

export function isUniformMockupMosaicPaddingColumn(column: ReadonlyArray<RgbPixel>): boolean {
  return column.length > 0 && column.every(([red, green, blue]) => isMockupMosaicPaddingRgb(red, green, blue));
}

export function isUniformMockupMosaicPaddingRow(row: ReadonlyArray<RgbPixel>): boolean {
  return row.length > 0 && row.every(([red, green, blue]) => isMockupMosaicPaddingRgb(red, green, blue));
}

/** Returns how many trailing columns on the right edge are mockup margin. */
export function countTrailingMockupMarginColumns(
  columnsRightToLeft: ReadonlyArray<ReadonlyArray<RgbPixel>>,
  threshold: number = CASE_STUDIES_MOCKUP_MARGIN_RGB_THRESHOLD,
): number {
  let count = 0;
  for (const column of columnsRightToLeft) {
    if (!isUniformMockupMarginColumn(column, threshold)) break;
    count += 1;
  }
  return count;
}

/** Returns how many trailing columns on the right edge are the #f2f2f2 gutter seam. */
export function countTrailingMockupGutterGreyColumns(
  columnsRightToLeft: ReadonlyArray<ReadonlyArray<RgbPixel>>,
): number {
  let count = 0;
  for (const column of columnsRightToLeft) {
    if (!isUniformMockupGutterGreyColumn(column)) break;
    count += 1;
  }
  return count;
}

/** Returns how many trailing columns on the right edge are the darker #ebebeb gutter seam. */
export function countTrailingMockupDarkGutterGreyColumns(
  columnsRightToLeft: ReadonlyArray<ReadonlyArray<RgbPixel>>,
): number {
  let count = 0;
  for (const column of columnsRightToLeft) {
    if (!isUniformMockupDarkGutterGreyColumn(column)) break;
    count += 1;
  }
  return count;
}

/** Returns how many trailing columns on the right edge are uniform near-white padding. */
export function countTrailingMockupCardPaddingColumns(
  columnsRightToLeft: ReadonlyArray<ReadonlyArray<RgbPixel>>,
  threshold: number = CASE_STUDIES_MOCKUP_CARD_PADDING_RGB_THRESHOLD,
): number {
  let count = 0;
  for (const column of columnsRightToLeft) {
    if (!isUniformMockupCardPaddingColumn(column, threshold)) break;
    count += 1;
  }
  return count;
}

/** Returns how many trailing columns on the right edge are mockup mosaic padding. */
export function countTrailingMockupMosaicPaddingColumns(
  columnsRightToLeft: ReadonlyArray<ReadonlyArray<RgbPixel>>,
): number {
  let count = 0;
  for (const column of columnsRightToLeft) {
    if (!isUniformMockupMosaicPaddingColumn(column)) break;
    count += 1;
  }
  return count;
}

/** Returns how many trailing rows on the bottom edge are mockup mosaic padding. */
export function countTrailingMockupMosaicPaddingRows(
  rowsBottomToTop: ReadonlyArray<ReadonlyArray<RgbPixel>>,
): number {
  let count = 0;
  for (const row of rowsBottomToTop) {
    if (!isUniformMockupMosaicPaddingRow(row)) break;
    count += 1;
  }
  return count;
}
