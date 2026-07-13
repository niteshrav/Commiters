import { STITCH_COPY } from "./stitchDesign";
import type { AccessibilityTextSize } from "./accessibilityStorage";

export const ACCESSIBILITY_MAIN_CONTENT_ID = "main-content" as const;

export const ACCESSIBILITY_SKIP_LINK_COPY = {
  label: STITCH_COPY.accessibility.skipLinkLabel,
  href: `#${ACCESSIBILITY_MAIN_CONTENT_ID}`,
} as const;

export const ACCESSIBILITY_WIDGET_COPY = {
  toggleLabel: STITCH_COPY.accessibility.widgetLabel,
  panelTitle: STITCH_COPY.accessibility.panelTitle,
  panelDescription: STITCH_COPY.accessibility.panelDescription,
  textSizeLabel: STITCH_COPY.accessibility.textSizeLabel,
  highContrastLabel: STITCH_COPY.accessibility.highContrastLabel,
  highContrastDescription: STITCH_COPY.accessibility.highContrastDescription,
  underlineLinksLabel: STITCH_COPY.accessibility.underlineLinksLabel,
  underlineLinksDescription: STITCH_COPY.accessibility.underlineLinksDescription,
  reduceMotionLabel: STITCH_COPY.accessibility.reduceMotionLabel,
  reduceMotionDescription: STITCH_COPY.accessibility.reduceMotionDescription,
  resetLabel: STITCH_COPY.accessibility.resetLabel,
  closeLabel: STITCH_COPY.accessibility.closeLabel,
} as const;

export const ACCESSIBILITY_TEXT_SIZE_OPTIONS: readonly {
  id: AccessibilityTextSize;
  label: string;
}[] = [
  { id: "default", label: STITCH_COPY.accessibility.textSizeOptions.default },
  { id: "large", label: STITCH_COPY.accessibility.textSizeOptions.large },
  { id: "xlarge", label: STITCH_COPY.accessibility.textSizeOptions.xlarge },
] as const;
