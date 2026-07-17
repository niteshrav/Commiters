import FaqBottomCta from "../components/FaqBottomCta";
import FaqContentSection from "../components/FaqContentSection";
import FaqIntroSection from "../components/FaqIntroSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { FAQ_PAGE_COPY } from "../lib/faqPageContent";
import { FAQ_PAGE_CLASS } from "../lib/faqPageLayout";
import { pageTitle } from "../lib/siteMeta";

export default function FaqPage() {
  useDocumentTitle(pageTitle(FAQ_PAGE_COPY.title));

  return (
    <div className={FAQ_PAGE_CLASS} data-testid="faq-page">
      <FaqIntroSection />
      <FaqContentSection />
      <FaqBottomCta />
    </div>
  );
}
