import TermsPageIntro from "../components/TermsPageIntro";
import TermsPageSections from "../components/TermsPageSections";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { TERMS_CONTENT_COLUMN_CLASS, TERMS_PAGE_CLASS } from "../lib/termsPageLayout";
import { TERMS_PAGE_COPY, TERMS_PAGE_SECTIONS } from "../lib/termsPageContent";
import { pageTitle } from "../lib/siteMeta";

export default function TermsPage() {
  useDocumentTitle(pageTitle("Terms of Service"));

  return (
    <div className={TERMS_PAGE_CLASS} data-testid="terms-page">
      <div className={TERMS_CONTENT_COLUMN_CLASS} data-testid="terms-content">
        <TermsPageIntro />
        <TermsPageSections sections={TERMS_PAGE_SECTIONS} />
      </div>
    </div>
  );
}
