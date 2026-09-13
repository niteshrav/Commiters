export const BACK_TO_TOP_CLASS = "back-to-top" as const;
export const BACK_TO_TOP_POSITION_CLASS = "fixed bottom-28 right-6 z-40" as const;
export const BACK_TO_TOP_VISIBLE_CLASS = "back-to-top--visible" as const;
export const BACK_TO_TOP_TEST_ID = "back-to-top" as const;
export const BACK_TO_TOP_LABEL = "Back to top" as const;
export const BACK_TO_TOP_SHOW_AFTER_PX = 400 as const;

export function shouldShowBackToTop(scrollY: number) {
  return scrollY >= BACK_TO_TOP_SHOW_AFTER_PX;
}

export function scrollDocumentToTop() {
  try {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch {
    window.scrollTo(0, 0);
  }
}
