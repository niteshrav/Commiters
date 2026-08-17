import JoinUsApplicationSection from "../components/JoinUsApplicationSection";
import JoinUsIntroSection from "../components/JoinUsIntroSection";
import JoinUsVisualPanel from "../components/JoinUsVisualPanel";
import { usePageSeo } from "../hooks/usePageSeo";
import {
  JOIN_US_PAGE_CLASS,
  STITCH_JOIN_US_GRID_CLASS,
  STITCH_JOIN_US_SECTION_CLASS,
} from "../lib/joinUsPageLayout";
import { joinUsPageSeo } from "../lib/sitePageSeo";

export default function JoinUsPage() {
  usePageSeo(joinUsPageSeo());

  return (
    <div className={JOIN_US_PAGE_CLASS} data-testid="join-us-page">
      <JoinUsIntroSection />
      <section className={`section ${STITCH_JOIN_US_SECTION_CLASS}`} data-testid="join-us-layout">
        <div className={STITCH_JOIN_US_GRID_CLASS}>
          <JoinUsVisualPanel />
          <JoinUsApplicationSection />
        </div>
      </section>
    </div>
  );
}
