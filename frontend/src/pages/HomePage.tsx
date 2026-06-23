import HomeBottomCta from "../components/HomeBottomCta";
import HomeBuiltForScale from "../components/HomeBuiltForScale";
import HomeCorePillars from "../components/HomeCorePillars";
import HomeHeroStitch from "../components/HomeHeroStitch";
import HomeSectionSeparator from "../components/HomeSectionSeparator";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { HOME_SECTION_SEPARATOR_IDS } from "../lib/homeSectionLayout";
import { DEFAULT_DOCUMENT_TITLE } from "../lib/siteMeta";

export default function HomePage() {
  useDocumentTitle(DEFAULT_DOCUMENT_TITLE);

  return (
    <div className="home-page" data-testid="home-page">
      <HomeHeroStitch />
      <HomeSectionSeparator testId={HOME_SECTION_SEPARATOR_IDS.afterHero} />
      <HomeCorePillars />
      <HomeSectionSeparator testId={HOME_SECTION_SEPARATOR_IDS.afterPillars} />
      <HomeBuiltForScale />
      <HomeSectionSeparator testId={HOME_SECTION_SEPARATOR_IDS.afterBuiltForScale} />
      <HomeBottomCta />
    </div>
  );
}
