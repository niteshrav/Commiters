import AiOperationalAuditSection from "../components/AiOperationalAuditSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { withSiteCloudTheme } from "../lib/homeCloudTheme";
import { aiOperationalAuditPageSeo } from "../lib/sitePageSeo";
import { AUDIT_PAGE_CLASS } from "../lib/aiOperationalAuditPageLayout";

export default function AiOperationalAuditPage() {
  usePageSeo(aiOperationalAuditPageSeo());

  return (
    <div className={withSiteCloudTheme(AUDIT_PAGE_CLASS)} data-testid="ai-operational-audit-page">
      <AiOperationalAuditSection />
    </div>
  );
}
