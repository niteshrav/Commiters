import AboutBottomCta from "../components/AboutBottomCta";
import AboutCraftsmanshipSection from "../components/AboutCraftsmanshipSection";
import AboutIntroSection from "../components/AboutIntroSection";
import AboutOperatingPrinciplesSection from "../components/AboutOperatingPrinciplesSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { aboutPageSeo } from "../lib/sitePageSeo";

export default function AboutPage() {
  usePageSeo(aboutPageSeo());

  return (
    <div className="about-page" data-testid="about-page">
      <AboutIntroSection />
      <AboutCraftsmanshipSection />
      <AboutOperatingPrinciplesSection />
      <AboutBottomCta />
    </div>
  );
}
