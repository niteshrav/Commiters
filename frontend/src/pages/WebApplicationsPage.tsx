import WebApplicationsSection from "../components/WebApplicationsSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { withSiteCloudTheme } from "../lib/homeCloudTheme";
import { webApplicationsPageSeo } from "../lib/sitePageSeo";
import { WEBAPP_PAGE_CLASS } from "../lib/webApplicationsPageLayout";

export default function WebApplicationsPage() {
  usePageSeo(webApplicationsPageSeo());

  return (
    <div className={withSiteCloudTheme(WEBAPP_PAGE_CLASS)} data-testid="web-applications-page">
      <WebApplicationsSection />
    </div>
  );
}
