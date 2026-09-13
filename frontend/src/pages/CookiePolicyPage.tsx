import CookiePolicyDocument from "../components/CookiePolicyDocument";
import CookiePolicyIntro from "../components/CookiePolicyIntro";
import { usePageSeo } from "../hooks/usePageSeo";
import { withSiteCloudTheme } from "../lib/homeCloudTheme";
import { COOKIE_CONTENT_COLUMN_CLASS, COOKIE_PAGE_CLASS } from "../lib/cookiePageLayout";
import { cookiePolicyPageSeo } from "../lib/sitePageSeo";

export default function CookiePolicyPage() {
  usePageSeo(cookiePolicyPageSeo());

  return (
    <div className={withSiteCloudTheme(COOKIE_PAGE_CLASS)} data-testid="cookie-policy-page">
      <div className={COOKIE_CONTENT_COLUMN_CLASS} data-testid="cookie-policy-content">
        <CookiePolicyIntro />
        <CookiePolicyDocument />
      </div>
    </div>
  );
}
