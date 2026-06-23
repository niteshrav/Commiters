import AboutBottomCta from "../components/AboutBottomCta";
import AboutCraftsmanshipSection from "../components/AboutCraftsmanshipSection";
import AboutIntroSection from "../components/AboutIntroSection";
import AboutOperatingPrinciplesSection from "../components/AboutOperatingPrinciplesSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { pageTitle } from "../lib/siteMeta";

export default function AboutPage() {
  useDocumentTitle(pageTitle("About"));

  return (
    <div className="about-page" data-testid="about-page">
      <AboutIntroSection />
      <AboutCraftsmanshipSection />
      <AboutOperatingPrinciplesSection />
      <AboutBottomCta />
    </div>
  );
}
