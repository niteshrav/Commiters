import FaqBottomCta from "../components/FaqBottomCta";
import FaqContentSection from "../components/FaqContentSection";
import FaqIntroSection from "../components/FaqIntroSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { FAQ_PAGE_CLASS } from "../lib/faqPageLayout";
import { faqPageSeo } from "../lib/sitePageSeo";

export default function FaqPage() {
  usePageSeo(faqPageSeo());

  return (
    <div className={FAQ_PAGE_CLASS} data-testid="faq-page">
      <FaqIntroSection />
      <FaqContentSection />
      <FaqBottomCta />
    </div>
  );
}
