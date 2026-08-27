import OpsFlowSection from "../components/OpsFlowSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { opsFlowPageSeo } from "../lib/sitePageSeo";
import { OPSFLOW_PAGE_CLASS } from "../lib/opsFlowPageLayout";

export default function OpsFlowPage() {
  usePageSeo(opsFlowPageSeo());

  return (
    <div className={`${OPSFLOW_PAGE_CLASS} band-breakout`} data-testid="opsflow-page">
      <OpsFlowSection />
    </div>
  );
}
