import JoinUsApplicationSection from "../components/JoinUsApplicationSection";
import JoinUsIntroSection from "../components/JoinUsIntroSection";
import JoinUsVisualPanel from "../components/JoinUsVisualPanel";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  JOIN_US_PAGE_CLASS,
  STITCH_JOIN_US_GRID_CLASS,
  STITCH_JOIN_US_SECTION_CLASS,
} from "../lib/joinUsPageLayout";
import { pageTitle } from "../lib/siteMeta";

export default function JoinUsPage() {
  useDocumentTitle(pageTitle("Join Us"));

  return (
    <div className={JOIN_US_PAGE_CLASS} data-testid="join-us-page">
      <JoinUsIntroSection />
      <section className={`section ${STITCH_JOIN_US_SECTION_CLASS}`} data-testid="join-us-layout">
        <div className={STITCH_JOIN_US_GRID_CLASS}>
          <JoinUsApplicationSection />
          <JoinUsVisualPanel />
        </div>
      </section>
    </div>
  );
}
