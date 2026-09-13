import AboutBottomCta from "../components/AboutBottomCta";
import AboutCraftsmanshipSection from "../components/AboutCraftsmanshipSection";
import AboutDeliveryJourneySection from "../components/AboutDeliveryJourneySection";
import AboutIntroSection from "../components/AboutIntroSection";
import AboutOperatingPrinciplesSection from "../components/AboutOperatingPrinciplesSection";
import { useLandingPageHashScroll } from "../hooks/useLandingPageHashScroll";
import { usePageSeo } from "../hooks/usePageSeo";
import { withSiteCloudTheme } from "../lib/homeCloudTheme";
import { aboutPageSeo } from "../lib/sitePageSeo";

export default function AboutPage() {
  usePageSeo(aboutPageSeo());
  useLandingPageHashScroll();

  return (
    <div className={withSiteCloudTheme("about-page")} data-testid="about-page">
      <AboutIntroSection />
      <AboutCraftsmanshipSection />
      <AboutOperatingPrinciplesSection />
      <AboutDeliveryJourneySection />
      <AboutBottomCta />
    </div>
  );
}
