import OpsFlowSection from "../components/OpsFlowSection";
import { useLandingPageHashScroll } from "../hooks/useLandingPageHashScroll";
import { usePageSeo } from "../hooks/usePageSeo";
import { withSiteCloudTheme } from "../lib/homeCloudTheme";
import { opsFlowPageSeo } from "../lib/sitePageSeo";
import { OPSFLOW_PAGE_CLASS } from "../lib/opsFlowPageLayout";

export default function OpsFlowPage() {
  usePageSeo(opsFlowPageSeo());
  useLandingPageHashScroll();

  return (
    <div className={withSiteCloudTheme(OPSFLOW_PAGE_CLASS)} data-testid="opsflow-page">
      <OpsFlowSection />
    </div>
  );
}
