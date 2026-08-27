import AiOperationalAuditSection from "../components/AiOperationalAuditSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { aiOperationalAuditPageSeo } from "../lib/sitePageSeo";
import { AUDIT_PAGE_CLASS } from "../lib/aiOperationalAuditPageLayout";

export default function AiOperationalAuditPage() {
  usePageSeo(aiOperationalAuditPageSeo());

  return (
    <div className={AUDIT_PAGE_CLASS} data-testid="ai-operational-audit-page">
      <AiOperationalAuditSection />
    </div>
  );
}
