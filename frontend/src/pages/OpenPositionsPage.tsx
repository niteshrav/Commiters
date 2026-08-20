import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobCard from "../components/open-positions/JobCard";
import JobFiltersBar, { JobListSkeleton } from "../components/open-positions/JobFiltersBar";
import Reveal from "../components/motion/Reveal";
import { usePageSeo } from "../hooks/usePageSeo";
import { JOIN_US_PAGE_CLASS } from "../lib/joinUsPageLayout";
import {
  fetchJobFilters,
  fetchPublicJobs,
  type JobQuery,
  type PublicJob,
} from "../lib/jobs";
import { ROUTES } from "../lib/routes";
import { openPositionsPageSeo } from "../lib/sitePageSeo";

export default function OpenPositionsPage() {
  usePageSeo(openPositionsPageSeo());

  const [query, setQuery] = useState<JobQuery>({ page: 1, limit: 12, search: "" });
  const [jobs, setJobs] = useState<PublicJob[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ departments: [] as string[], workModes: [] as string[], employmentTypes: [] as string[] });

  useEffect(() => {
    void fetchJobFilters()
      .then(setFilters)
      .catch(() => setFilters({ departments: [], workModes: [], employmentTypes: [] }));
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    void fetchPublicJobs(query)
      .then((result) => {
        if (cancelled) return;
        setJobs(result.items);
        setTotalPages(result.totalPages);
      })
      .catch(() => {
        if (!cancelled) setError("Unable to load open positions right now.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div className={`${JOIN_US_PAGE_CLASS} open-positions-page`} data-testid="open-positions-page">
      <section className="open-positions-hero-band" aria-labelledby="open-positions-list-title">
        <Reveal className="open-positions-hero-inner">
          <p className="open-positions-kicker">Open Positions</p>
          <h1 id="open-positions-list-title">Build with a founder-led engineering studio.</h1>
          <p className="open-positions-hero-lead">
            Explore current roles across web, mobile, and AI—or share a general application if you do not see the right
            opening yet.
          </p>
        </Reveal>
      </section>

      <section className="open-positions-listings" aria-label="Job listings">
        <div className="open-positions-filters-panel">
          <JobFiltersBar
            search={query.search ?? ""}
            department={query.department ?? ""}
            workMode={query.workMode ?? ""}
            employmentType={query.employmentType ?? ""}
            departments={filters.departments}
            workModes={filters.workModes}
            employmentTypes={filters.employmentTypes}
            onChange={(next) => setQuery((current) => ({ ...current, ...next, page: 1 }))}
          />
        </div>

        {loading ? <JobListSkeleton /> : null}
        {!loading && error ? <p className="open-positions-empty">{error}</p> : null}
        {!loading && !error && jobs.length === 0 ? (
          <p className="open-positions-empty">
            No open positions match your filters right now.{" "}
            <Link to={ROUTES.joinUs}>Apply with a general application</Link>
            {" "}and we will review your profile.
          </p>
        ) : null}

        {!loading && !error && jobs.length > 0 ? (
          <div className="open-positions-grid">
            {jobs.map((job, index) => (
              <JobCard key={job._id} job={job} delay={index * 0.04} />
            ))}
          </div>
        ) : null}

        {!loading && totalPages > 1 ? (
          <div className="open-positions-pagination">
            <button type="button" disabled={(query.page ?? 1) <= 1} onClick={() => setQuery((q) => ({ ...q, page: (q.page ?? 1) - 1 }))}>
              Previous
            </button>
            <span>Page {query.page ?? 1} of {totalPages}</span>
            <button
              type="button"
              disabled={(query.page ?? 1) >= totalPages}
              onClick={() => setQuery((q) => ({ ...q, page: (q.page ?? 1) + 1 }))}
            >
              Next
            </button>
          </div>
        ) : null}
      </section>

      <section className="open-positions-section open-positions-final-cta" aria-labelledby="open-positions-apply-title">
        <Reveal>
          <h2 id="open-positions-apply-title">Don&apos;t see the right role?</h2>
          <p>Send us your resume and tell us how you would like to contribute at Commiters.</p>
          <Link className="btn btn-primary" to={ROUTES.joinUs}>
            Apply for a role
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
