import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Reveal from "../components/motion/Reveal";
import JobCard from "../components/open-positions/JobCard";
import { usePageSeo, SITE_ORIGIN } from "../hooks/usePageSeo";
import {
  buildOpenPositionPath,
  fetchJobBySlug,
  formatPostedDate,
  isRecentlyPosted,
  type JobDetail,
  type PublicJob,
} from "../lib/jobs";
import { ROUTES } from "../lib/routes";
import { buildDiscoveryCallCalendarUrl } from "../lib/siteContact";
import { pageTitle } from "../lib/siteMeta";

function JobDetailHero({ job }: { job: JobDetail }) {
  return (
    <section className="open-positions-detail-hero" data-testid="job-detail-hero">
      <Reveal>
        <nav className="open-positions-breadcrumb" aria-label="Breadcrumb">
          <Link to={ROUTES.openPositions}>Open Positions</Link>
          <span aria-hidden>/</span>
          <span>{job.title}</span>
        </nav>
        <div className="open-positions-detail-head">
          <div>
            {job.featured ? <span className="open-positions-badge open-positions-badge--featured">Featured</span> : null}
            {isRecentlyPosted(job.createdAt) ? <span className="open-positions-badge">Recently Posted</span> : null}
            <h1>{job.title}</h1>
            <p className="open-positions-detail-meta">
              {job.department} · {job.location} · {job.workMode} · {job.employmentType}
            </p>
            <p className="open-positions-detail-stipend">{job.stipendSalary}</p>
          </div>
          <div className="open-positions-detail-actions">
            <Link className="btn btn-primary" to={`${ROUTES.joinUs}?position=${encodeURIComponent(job.title)}`}>
              Apply Now
            </Link>
            <a className="btn open-positions-btn-outline" href={buildDiscoveryCallCalendarUrl()} target="_blank" rel="noopener noreferrer">
              Get Free Consultation
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function JobDetailPage() {
  const { slug = "" } = useParams();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<PublicJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    void fetchJobBySlug(slug)
      .then((result) => {
        if (cancelled) return;
        setJob(result.job);
        setRelatedJobs(result.relatedJobs);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const seoTitle = job?.seo?.title || (job ? pageTitle(`${job.title} | Open Positions`) : pageTitle("Open Positions"));
  const seoDescription = job?.seo?.description || job?.roleOverview || "";

  usePageSeo(
    job
      ? {
          title: seoTitle,
          description: seoDescription,
          path: buildOpenPositionPath(job.slug),
          structuredData: {
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: job.title,
            description: job.roleOverview,
            datePosted: job.createdAt,
            validThrough: job.lastDateToApply,
            employmentType: job.employmentType,
            hiringOrganization: {
              "@type": "Organization",
              name: "Commiters",
              sameAs: SITE_ORIGIN,
            },
            jobLocation: {
              "@type": "Place",
              address: job.location,
            },
          },
        }
      : null,
  );

  const detailSections = useMemo(() => {
    if (!job) return [];
    return [
      { title: "About the Company", body: job.aboutCompany },
      { title: "Role Overview", body: job.roleOverview },
      { title: "Eligibility", body: job.eligibility },
      { title: "Learning Opportunities", body: job.learningOpportunities },
      { title: "Selection Process", body: job.selectionProcess },
    ].filter((section) => section.body?.trim());
  }, [job]);

  if (notFound) return <Navigate to={ROUTES.notFound} replace />;
  if (loading) {
    return (
      <div className="open-positions-page" data-testid="job-detail-loading">
        <JobListSkeletonPlaceholder />
      </div>
    );
  }
  if (!job) return null;

  const activeJob = job;

  async function copyLink() {
    await navigator.clipboard.writeText(`${SITE_ORIGIN}${buildOpenPositionPath(activeJob.slug)}`);
    setShareMessage("Job link copied.");
  }

  async function shareJob() {
    const url = `${SITE_ORIGIN}${buildOpenPositionPath(activeJob.slug)}`;
    if (navigator.share) {
      await navigator.share({ title: activeJob.title, text: activeJob.roleOverview, url });
      return;
    }
    await copyLink();
  }

  return (
    <div className="open-positions-detail-page" data-testid="job-detail-page">
      <JobDetailHero job={job} />

      <section className="open-positions-detail-toolbar">
        <Reveal className="open-positions-detail-toolbar-inner">
          <p>Posted {formatPostedDate(job.createdAt)}{job.lastDateToApply ? ` · Apply by ${formatPostedDate(job.lastDateToApply)}` : ""}</p>
          <div className="open-positions-detail-share">
            <button type="button" className="btn open-positions-btn-outline" onClick={() => void copyLink()}>Copy Job Link</button>
            <button type="button" className="btn open-positions-btn-outline" onClick={() => void shareJob()}>Share Job</button>
          </div>
          {shareMessage ? <p className="open-positions-share-message">{shareMessage}</p> : null}
        </Reveal>
      </section>

      {detailSections.map((section, index) => (
        <section key={section.title} className="open-positions-detail-section">
          <Reveal delay={index * 0.03}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </Reveal>
        </section>
      ))}

      {job.responsibilities.length > 0 ? (
        <section className="open-positions-detail-section">
          <Reveal><h2>Responsibilities</h2><ul>{job.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></Reveal>
        </section>
      ) : null}

      {job.requiredSkills.length > 0 ? (
        <section className="open-positions-detail-section">
          <Reveal><h2>Required Skills</h2><div className="open-positions-chip-row">{job.requiredSkills.map((skill) => <span key={skill}>{skill}</span>)}</div></Reveal>
        </section>
      ) : null}

      {job.preferredSkills.length > 0 ? (
        <section className="open-positions-detail-section">
          <Reveal><h2>Preferred Skills</h2><div className="open-positions-chip-row">{job.preferredSkills.map((skill) => <span key={skill}>{skill}</span>)}</div></Reveal>
        </section>
      ) : null}

      {job.benefits.length > 0 ? (
        <section className="open-positions-detail-section">
          <Reveal><h2>Benefits</h2><ul>{job.benefits.map((item) => <li key={item}>{item}</li>)}</ul></Reveal>
        </section>
      ) : null}

      {relatedJobs.length > 0 ? (
        <section className="open-positions-section">
          <Reveal><h2>Related Jobs</h2></Reveal>
          <div className="open-positions-grid">
            {relatedJobs.map((related, index) => (
              <JobCard key={related._id} job={related} delay={index * 0.04} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="open-positions-final-cta">
        <Reveal>
          <h2>Ready to apply?</h2>
          <p>Send your resume and tell us why this role is the right fit.</p>
          <div className="open-positions-detail-actions">
            <Link className="btn btn-primary" to={`${ROUTES.joinUs}?position=${encodeURIComponent(job.title)}`}>Apply for this role</Link>
            <Link className="btn open-positions-btn-outline" to={ROUTES.contact}>Contact Us</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function JobListSkeletonPlaceholder() {
  return <div className="open-positions-grid">{Array.from({ length: 3 }).map((_, index) => <div key={index} className="open-positions-card open-positions-card--skeleton" />)}</div>;
}
