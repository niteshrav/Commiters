import ThankYouContentSection from "../components/ThankYouContentSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { COMMITERS_HEADER_LOGO_ALT, COMMITERS_HEADER_LOGO_SRC } from "../lib/siteBrand";
import { pageTitle } from "../lib/siteMeta";
import { THANK_YOU_PAGE_COPY } from "../lib/thankYouPageContent";
import {
  THANK_YOU_INFRASTRUCTURE_CLASS,
  THANK_YOU_INFRASTRUCTURE_LABEL_CLASS,
  THANK_YOU_INFRASTRUCTURE_LOGO_CLASS,
  THANK_YOU_PAGE_CLASS,
} from "../lib/thankYouPageLayout";

export default function ThankYouPage() {
  useDocumentTitle(pageTitle("Thank you"));

  return (
    <div className={THANK_YOU_PAGE_CLASS} data-testid="thank-you-page">
      <ThankYouContentSection />
      <section className={THANK_YOU_INFRASTRUCTURE_CLASS} data-testid="thank-you-infrastructure" aria-label="Commiters infrastructure branding">
        <p className={THANK_YOU_INFRASTRUCTURE_LABEL_CLASS}>{THANK_YOU_PAGE_COPY.infrastructureLabel}</p>
        <img
          className={THANK_YOU_INFRASTRUCTURE_LOGO_CLASS}
          src={COMMITERS_HEADER_LOGO_SRC}
          alt={COMMITERS_HEADER_LOGO_ALT}
          width={420}
          height={116}
          decoding="async"
          loading="lazy"
        />
      </section>
    </div>
  );
}
