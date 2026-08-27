import HomeBottomCta from "../components/HomeBottomCta";
import HomeBuiltForScale from "../components/HomeBuiltForScale";
import HomeCorePillars from "../components/HomeCorePillars";
import HomeHeroStitch from "../components/HomeHeroStitch";
import HomeLeadMagnetSection from "../components/HomeLeadMagnetSection";
import HomeSectionSeparator from "../components/HomeSectionSeparator";
import { usePageSeo } from "../hooks/usePageSeo";
import { HOME_SECTION_SEPARATOR_IDS } from "../lib/homeSectionLayout";
import { homePageSeo } from "../lib/sitePageSeo";

export default function HomePage() {
  usePageSeo(homePageSeo());

  return (
    <div className="home-page" data-testid="home-page">
      <HomeHeroStitch />
      <HomeSectionSeparator testId={HOME_SECTION_SEPARATOR_IDS.afterHero} />
      <HomeCorePillars />
      <HomeSectionSeparator testId={HOME_SECTION_SEPARATOR_IDS.afterPillars} />
      <HomeBuiltForScale />
      <HomeLeadMagnetSection />
      <HomeBottomCta />
    </div>
  );
}
