import PrivacyPolicyIntro from "../components/PrivacyPolicyIntro";
import PrivacyPolicySections from "../components/PrivacyPolicySections";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PRIVACY_CONTENT_COLUMN_CLASS, PRIVACY_PAGE_CLASS } from "../lib/privacyPageLayout";
import { PRIVACY_PAGE_COPY, PRIVACY_POLICY_SECTIONS } from "../lib/privacyPageContent";
import { pageTitle } from "../lib/siteMeta";

export default function PrivacyPolicyPage() {
  useDocumentTitle(pageTitle(PRIVACY_PAGE_COPY.title));

  return (
    <div className={PRIVACY_PAGE_CLASS} data-testid="privacy-page">
      <div className={PRIVACY_CONTENT_COLUMN_CLASS} data-testid="privacy-policy-content">
        <PrivacyPolicyIntro />
        <PrivacyPolicySections sections={PRIVACY_POLICY_SECTIONS} />
      </div>
    </div>
  );
}
