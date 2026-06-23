import CookiePolicyDocument from "../components/CookiePolicyDocument";
import CookiePolicyIntro from "../components/CookiePolicyIntro";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { COOKIE_PAGE_COPY } from "../lib/cookiePageContent";
import { COOKIE_CONTENT_COLUMN_CLASS, COOKIE_PAGE_CLASS } from "../lib/cookiePageLayout";
import { pageTitle } from "../lib/siteMeta";

export default function CookiePolicyPage() {
  useDocumentTitle(pageTitle(COOKIE_PAGE_COPY.title));

  return (
    <div className={COOKIE_PAGE_CLASS} data-testid="cookie-policy-page">
      <div className={COOKIE_CONTENT_COLUMN_CLASS} data-testid="cookie-policy-content">
        <CookiePolicyIntro />
        <CookiePolicyDocument />
      </div>
    </div>
  );
}
