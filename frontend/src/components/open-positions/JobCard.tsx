import { Link } from "react-router-dom";
import Reveal from "../motion/Reveal";
import {
  buildOpenPositionPath,
  formatPostedDate,
  isRecentlyPosted,
  type PublicJob,
} from "../../lib/jobs";
import { ROUTES } from "../../lib/routes";

type Props = {
  job: PublicJob;
  delay?: number;
};

export default function JobCard({ job, delay = 0 }: Props) {
  const recentlyPosted = isRecentlyPosted(job.createdAt);

  return (
    <Reveal delay={delay} className="open-positions-card">
      <article className="open-positions-card-inner">
        <div className="open-positions-card-head">
          <div>
            {job.featured ? <span className="open-positions-badge open-positions-badge--featured">Featured</span> : null}
            {recentlyPosted ? <span className="open-positions-badge">Recently Posted</span> : null}
            <h3>{job.title}</h3>
            <p className="open-positions-card-meta">
              {job.department} · {job.location} · {job.workMode}
            </p>
          </div>
          <p className="open-positions-card-stipend">{job.stipendSalary || "Competitive"}</p>
        </div>

        <div className="open-positions-card-tags">
          {job.internshipType ? <span>{job.internshipType}</span> : null}
          <span>{job.employmentType}</span>
          <span>Posted {formatPostedDate(job.createdAt)}</span>
        </div>

        <div className="open-positions-card-actions">
          <Link className="btn btn-primary open-positions-card-apply" to={buildOpenPositionPath(job.slug)}>
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
      <Link className="btn btn-primary" to={buildOpenPositionPath(job.slug)}>Apply</Link>
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
        <Link className="btn open-positions-btn-outline" to={ROUTES.openPositions}>
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
