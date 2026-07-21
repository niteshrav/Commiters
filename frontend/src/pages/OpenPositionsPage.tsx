import { useEffect, useMemo, useState } from "react";
import JobCard from "../components/open-positions/JobCard";
import JobFiltersBar, { JobListSkeleton } from "../components/open-positions/JobFiltersBar";
import Reveal from "../components/motion/Reveal";
import { usePageSeo } from "../hooks/usePageSeo";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  fetchJobFilters,
  fetchPublicJobs,
  type JobQuery,
  type PublicJob,
} from "../lib/jobs";
import { pageTitle } from "../lib/siteMeta";

export default function OpenPositionsPage() {
  useDocumentTitle(pageTitle("Open Positions"));
  usePageSeo({
    title: pageTitle("Open Positions"),
    description: "Explore open roles at Commiters across web, mobile, and AI engineering.",
    path: "/open-positions",
  });

  const [query, setQuery] = useState<JobQuery>({ page: 1, limit: 12, search: "" });
  const [jobs, setJobs] = useState<PublicJob[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<PublicJob[]>([]);
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

  useEffect(() => {
    void fetchPublicJobs({ featured: true, limit: 3, page: 1 })
      .then((result) => setFeaturedJobs(result.items))
      .catch(() => setFeaturedJobs([]));
  }, []);

  const latestJobs = useMemo(() => jobs.filter((job) => !job.featured), [jobs]);

  return (
    <div className="open-positions-page" data-testid="open-positions-page">
      <section className="open-positions-hero">
        <Reveal>
          <p className="open-positions-kicker">Careers</p>
          <h1>Open Positions</h1>
          <p>Join Commiters and help founders ship production-ready web, mobile, and AI products.</p>
        </Reveal>
      </section>

      {featuredJobs.length > 0 ? (
        <section className="open-positions-section">
          <Reveal><h2>Featured Jobs</h2></Reveal>
          <div className="open-positions-grid">
            {featuredJobs.map((job, index) => (
              <JobCard key={job._id} job={job} delay={index * 0.05} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="open-positions-section">
        <Reveal><h2>Latest Jobs</h2></Reveal>
        <JobFiltersBar
          search={query.search ?? ""}
          department={query.department ?? ""}
          workMode={query.workMode ?? ""}
          employmentType={query.employmentType ?? ""}
          departments={filters.departments}
          workModes={filters.workModes}
          employmentTypes={filters.employmentTypes}
          onChange={(next) => setQuery((current) => ({ ...current, ...next }))}
        />

        {loading ? <JobListSkeleton /> : null}
        {!loading && error ? <p className="open-positions-empty">{error}</p> : null}
        {!loading && !error && jobs.length === 0 ? (
          <p className="open-positions-empty">No open positions match your filters right now. Check back soon or apply generally on Join Us.</p>
        ) : null}

        {!loading && !error && latestJobs.length > 0 ? (
          <div className="open-positions-grid">
            {latestJobs.map((job, index) => (
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
    </div>
  );
}
