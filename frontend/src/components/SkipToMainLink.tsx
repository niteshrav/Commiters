import { ACCESSIBILITY_MAIN_CONTENT_ID, ACCESSIBILITY_SKIP_LINK_COPY } from "../lib/accessibilityContent";
import { ACCESSIBILITY_SKIP_LINK_CLASS } from "../lib/accessibilityLayout";

export default function SkipToMainLink() {
  return (
    <a
      className={ACCESSIBILITY_SKIP_LINK_CLASS}
      href={ACCESSIBILITY_SKIP_LINK_COPY.href}
      data-testid="skip-to-main"
      onClick={(event) => {
        event.preventDefault();
        const main = document.getElementById(ACCESSIBILITY_MAIN_CONTENT_ID);
        if (!main) return;

        if (typeof main.scrollIntoView === "function") {
          main.scrollIntoView();
        }

        main.focus({ preventScroll: true });
      }}
    >
      {ACCESSIBILITY_SKIP_LINK_COPY.label}
    </a>
  );
}
