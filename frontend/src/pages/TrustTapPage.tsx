import TrustTapBottomCtaSection from "../components/trust-tap/TrustTapBottomCtaSection";
import TrustTapFeaturesSection from "../components/trust-tap/TrustTapFeaturesSection";
import TrustTapHeroSection from "../components/trust-tap/TrustTapHeroSection";
import TrustTapHowItWorksSection from "../components/trust-tap/TrustTapHowItWorksSection";
import TrustTapPortalBanner from "../components/trust-tap/TrustTapPortalBanner";
import { useLandingPageHashScroll } from "../hooks/useLandingPageHashScroll";
import { usePageSeo } from "../hooks/usePageSeo";
import { withSiteCloudTheme } from "../lib/homeCloudTheme";
import { trustTapPageSeo } from "../lib/sitePageSeo";
import { TRUSTTAP_PAGE_CLASS } from "../lib/trustTapPageLayout";

export default function TrustTapPage() {
  usePageSeo(trustTapPageSeo());
  useLandingPageHashScroll();

  return (
    <div className={withSiteCloudTheme(TRUSTTAP_PAGE_CLASS)} data-testid="trusttap-page">
      <TrustTapHeroSection />
      <TrustTapFeaturesSection />
      <TrustTapHowItWorksSection />
      <TrustTapPortalBanner />
      <TrustTapBottomCtaSection />
    </div>
  );
}
