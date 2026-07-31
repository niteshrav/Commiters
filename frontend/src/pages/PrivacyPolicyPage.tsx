import PrivacyPolicyIntro from "../components/PrivacyPolicyIntro";
import PrivacyPolicySections from "../components/PrivacyPolicySections";
import { usePageSeo } from "../hooks/usePageSeo";
import { PRIVACY_CONTENT_COLUMN_CLASS, PRIVACY_PAGE_CLASS } from "../lib/privacyPageLayout";
import { PRIVACY_POLICY_SECTIONS } from "../lib/privacyPageContent";
import { privacyPolicyPageSeo } from "../lib/sitePageSeo";

export default function PrivacyPolicyPage() {
  usePageSeo(privacyPolicyPageSeo());

  return (
    <div className={PRIVACY_PAGE_CLASS} data-testid="privacy-page">
      <div className={PRIVACY_CONTENT_COLUMN_CLASS} data-testid="privacy-policy-content">
        <PrivacyPolicyIntro />
        <PrivacyPolicySections sections={PRIVACY_POLICY_SECTIONS} />
      </div>
    </div>
  );
}
