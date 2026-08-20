import { Link } from "react-router-dom";
import Reveal from "../motion/Reveal";
import {
  buildOpenPositionPath,
  type PublicJob,
} from "../../lib/jobs";
import { getStaticJobBySlug } from "../../lib/jobs/staticPublicJobs";
import { ROUTES, buildJoinUsApplyHref } from "../../lib/routes";

type Props = {
  job: PublicJob;
  delay?: number;
};

function formatJobMeta(job: PublicJob): string {
  return [job.department, job.location, job.workMode].filter(
    (part, index, parts) => Boolean(part?.trim()) && parts.indexOf(part) === index,
  ).join(" · ");
}

export default function JobCard({ job, delay = 0 }: Props) {
  const staticFallback = getStaticJobBySlug(job.slug)?.job;
  const rolePreview = staticFallback?.roleOverview ?? "";

  return (
    <Reveal delay={delay} className="open-positions-card">
      <article
        className={[
          "open-positions-card-inner",
          job.featured ? "open-positions-card-inner--featured" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="open-positions-card-head">
          <div className="open-positions-card-copy">
            <div className="open-positions-card-badges">
              {job.featured ? <span className="open-positions-badge open-positions-badge--featured">Featured</span> : null}
              <span className="open-positions-card-kicker">{job.department}</span>
            </div>
            <h3>{job.title}</h3>
            <p className="open-positions-card-meta">{formatJobMeta(job)}</p>
            {rolePreview ? <p className="open-positions-card-summary">{rolePreview}</p> : null}
          </div>
        </div>

        <div className="open-positions-card-tags">
          <span>{job.employmentType}</span>
          {staticFallback?.duration ? <span>{staticFallback.duration}</span> : null}
        </div>

        <div className="open-positions-card-actions">
          <Link className="btn btn-primary open-positions-card-apply" to={buildJoinUsApplyHref(job.title)}>
            Apply
          </Link>
          <Link className="open-positions-card-link" to={buildOpenPositionPath(job.slug)}>
            View details →
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export function JoinUsFeaturedJobCard({ job }: { job: PublicJob }) {
  return (
    <article className="join-us-job-card">
      <div>
        <p className="join-us-job-card-kicker">{job.department}</p>
        <h3>{job.title}</h3>
        <p className="join-us-job-card-meta">{job.location} · {job.workMode}</p>
      </div>
      <Link className="btn btn-primary" to={buildJoinUsApplyHref(job.title)}>Apply</Link>
    </article>
  );
}

export function JoinUsOpenPositionsSection({
  featuredJobs,
}: {
  featuredJobs: PublicJob[];
}) {
  return (
    <section className="join-us-open-positions" data-testid="join-us-open-positions">
      <div className="join-us-open-positions-head">
        <div>
          <p className="join-us-open-positions-kicker">Open Positions</p>
          <h2>Build with a founder-led engineering studio.</h2>
          <p>Explore current roles across web, mobile, and AI — or submit a general application below.</p>
        </div>
        <Link className="btn btn-secondary" to={ROUTES.openPositions}>
          View Open Positions
        </Link>
      </div>

      {featuredJobs.length > 0 ? (
        <div className="join-us-featured-jobs">
          {featuredJobs.slice(0, 3).map((job) => (
            <JoinUsFeaturedJobCard key={job._id} job={job} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
