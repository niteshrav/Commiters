import { useEffect, useState } from "react";
import JoinUsApplicationSection from "../components/JoinUsApplicationSection";
import JoinUsIntroSection from "../components/JoinUsIntroSection";
import JoinUsVisualPanel from "../components/JoinUsVisualPanel";
import { JoinUsOpenPositionsSection } from "../components/open-positions/JobCard";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { fetchFeaturedJobs, type PublicJob } from "../lib/jobs";
import {
  JOIN_US_PAGE_CLASS,
  STITCH_JOIN_US_GRID_CLASS,
  STITCH_JOIN_US_SECTION_CLASS,
} from "../lib/joinUsPageLayout";
import { pageTitle } from "../lib/siteMeta";

export default function JoinUsPage() {
  useDocumentTitle(pageTitle("Apply"));
  const [featuredJobs, setFeaturedJobs] = useState<PublicJob[]>([]);

  useEffect(() => {
    void fetchFeaturedJobs(3)
      .then(setFeaturedJobs)
      .catch(() => setFeaturedJobs([]));
  }, []);

  return (
    <div className={JOIN_US_PAGE_CLASS} data-testid="join-us-page">
      <JoinUsIntroSection />
      <JoinUsOpenPositionsSection featuredJobs={featuredJobs} />
      <section className={`section ${STITCH_JOIN_US_SECTION_CLASS}`} data-testid="join-us-layout">
        <div className={STITCH_JOIN_US_GRID_CLASS}>
          <JoinUsVisualPanel />
          <JoinUsApplicationSection />
        </div>
      </section>
    </div>
  );
}
