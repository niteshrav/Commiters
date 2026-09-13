import { useEffect, useState } from "react";
import { IconChevronUp } from "./icons";
import {
  BACK_TO_TOP_CLASS,
  BACK_TO_TOP_LABEL,
  BACK_TO_TOP_POSITION_CLASS,
  BACK_TO_TOP_TEST_ID,
  BACK_TO_TOP_VISIBLE_CLASS,
  scrollDocumentToTop,
  shouldShowBackToTop,
} from "../lib/backToTop";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function syncVisibility() {
      setVisible(shouldShowBackToTop(window.scrollY || window.pageYOffset));
    }

    syncVisibility();
    window.addEventListener("scroll", syncVisibility, { passive: true });
    return () => window.removeEventListener("scroll", syncVisibility);
  }, []);

  return (
    <button
      type="button"
      className={[BACK_TO_TOP_CLASS, BACK_TO_TOP_POSITION_CLASS, visible ? BACK_TO_TOP_VISIBLE_CLASS : ""]
        .filter(Boolean)
        .join(" ")}
      data-testid={BACK_TO_TOP_TEST_ID}
      aria-label={BACK_TO_TOP_LABEL}
      hidden={!visible}
      onClick={scrollDocumentToTop}
    >
      <IconChevronUp width={18} height={18} aria-hidden />
    </button>
  );
}
