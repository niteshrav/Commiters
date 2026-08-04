import TermsPageIntro from "../components/TermsPageIntro";
import TermsPageSections from "../components/TermsPageSections";
import { usePageSeo } from "../hooks/usePageSeo";
import { TERMS_CONTENT_COLUMN_CLASS, TERMS_PAGE_CLASS } from "../lib/termsPageLayout";
import { TERMS_PAGE_SECTIONS } from "../lib/termsPageContent";
import { termsPageSeo } from "../lib/sitePageSeo";

export default function TermsPage() {
  usePageSeo(termsPageSeo());

  return (
    <div className={TERMS_PAGE_CLASS} data-testid="terms-page">
      <div className={TERMS_CONTENT_COLUMN_CLASS} data-testid="terms-content">
        <TermsPageIntro />
        <TermsPageSections sections={TERMS_PAGE_SECTIONS} />
      </div>
    </div>
  );
}
