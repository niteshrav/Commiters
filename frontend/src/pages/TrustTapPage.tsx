import TrustTapBenefitsSection from "../components/trust-tap/TrustTapBenefitsSection";
import TrustTapBottomCtaSection from "../components/trust-tap/TrustTapBottomCtaSection";
import TrustTapFaqSection from "../components/trust-tap/TrustTapFaqSection";
import TrustTapFeaturesSection from "../components/trust-tap/TrustTapFeaturesSection";
import TrustTapHeroSection from "../components/trust-tap/TrustTapHeroSection";
import TrustTapHowItWorksSection from "../components/trust-tap/TrustTapHowItWorksSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { trustTapPageSeo } from "../lib/sitePageSeo";
import { TRUSTTAP_PAGE_CLASS } from "../lib/trustTapPageLayout";

export default function TrustTapPage() {
  usePageSeo(trustTapPageSeo());

  return (
    <div className={TRUSTTAP_PAGE_CLASS} data-testid="trusttap-page">
      <TrustTapHeroSection />
      <TrustTapFeaturesSection />
      <TrustTapBenefitsSection />
      <TrustTapHowItWorksSection />
      <TrustTapFaqSection />
      <TrustTapBottomCtaSection />
    </div>
  );
}
