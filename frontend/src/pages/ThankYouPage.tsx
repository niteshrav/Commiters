import ThankYouContentSection from "../components/ThankYouContentSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { withSiteCloudTheme } from "../lib/homeCloudTheme";
import { thankYouPageSeo } from "../lib/sitePageSeo";
import { THANK_YOU_PAGE_CLASS } from "../lib/thankYouPageLayout";

export default function ThankYouPage() {
  usePageSeo(thankYouPageSeo());

  return (
    <div className={withSiteCloudTheme(THANK_YOU_PAGE_CLASS)} data-testid="thank-you-page">
      <ThankYouContentSection />
    </div>
  );
}
