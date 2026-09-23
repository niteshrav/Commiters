import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, Paginated } from "../lib/api";
import type { CrawledPage, CrawlJob } from "../lib/crawlerTypes";
import StudioModal, { StudioPageHeader, StudioPrimaryButton, StudioStatusBadge } from "../components/StudioModal";

export default function CrawlerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<CrawlJob | null>(null);
  const [pages, setPages] = useState<Paginated<CrawledPage> | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<CrawledPage | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    try {
      const jobRes = await api<{ job: CrawlJob }>(`/api/admin/crawls/${id}`);
      setJob(jobRes.job);
      const params = new URLSearchParams({ page: "1", limit: "50" });
      if (statusFilter) params.set("status", statusFilter);
      const pageRes = await api<Paginated<CrawledPage>>(`/api/admin/crawls/${id}/pages?${params.toString()}`);
      setPages(pageRes);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load crawl.");
    }
  }, [id, statusFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!job || (job.status !== "running" && job.status !== "pending")) return;
    const timer = window.setInterval(() => void load(), 2000);
    return () => window.clearInterval(timer);
  }, [job, load]);

  async function cancel() {
    if (!id) return;
    await api<{ job: CrawlJob }>(`/api/admin/crawls/${id}/cancel`, { method: "POST" });
    await load();
  }

  async function openPage(page: CrawledPage) {
    if (!id) return;
    const res = await api<{ page: CrawledPage }>(`/api/admin/crawls/${id}/pages/${page.id}`);
    setSelected(res.page);
  }

  if (error && !job) {
    return (
      <div className="admin-page">
        <p className="error">{error}</p>
        <Link to="/crawler">Back to crawler</Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="admin-page">
        <p>Loading…</p>
      </div>
    );
  }

  const live = job.status === "running" || job.status === "pending";

  return (
    <div className="admin-page studio-page">
      <StudioPageHeader
        title={job.startUrl}
        description={`Job ${job.id}`}
        action={
          live ? (
            <StudioPrimaryButton onClick={() => void cancel()}>Cancel crawl</StudioPrimaryButton>
          ) : (
            <Link className="studio-link" to="/crawler">
              Back
            </Link>
          )
        }
      />

      {error ? <p className="error">{error}</p> : null}

      <div className="crawler-stats">
        <div>
          <span>Status</span>
          <strong>
            <StudioStatusBadge published={live || job.status === "completed"} label={job.status} />
          </strong>
        </div>
        <div>
          <span>Discovered</span>
          <strong>{job.pagesDiscovered}</strong>
        </div>
        <div>
          <span>Crawled</span>
          <strong>
            {job.pagesCrawled}/{job.maxPages}
          </strong>
        </div>
        <div>
          <span>Failed</span>
          <strong>{job.pagesFailed}</strong>
        </div>
        <div>
          <span>Skipped</span>
          <strong>{job.pagesSkipped}</strong>
        </div>
      </div>

      <p className="crawler-current">{job.currentUrl ? `Current: ${job.currentUrl}` : null}</p>
      {job.error ? <p className="error">{job.error}</p> : null}

      <dl className="crawler-config">
        <div>
          <dt>Depth</dt>
          <dd>{job.maxDepth}</dd>
        </div>
        <div>
          <dt>Timeout</dt>
          <dd>{job.timeout} ms</dd>
        </div>
        <div>
          <dt>Retries</dt>
          <dd>{job.retries}</dd>
        </div>
        <div>
          <dt>Delay</dt>
          <dd>{job.delay} ms</dd>
        </div>
        <div>
          <dt>Same-site</dt>
          <dd>{job.sameSite ? "yes" : "no"}</dd>
        </div>
        <div>
          <dt>robots.txt</dt>
          <dd>{job.robotsEnabled ? "respected" : "off"}</dd>
        </div>
        <div>
          <dt>Sitemap</dt>
          <dd>{job.sitemapEnabled ? "seeded" : "off"}</dd>
        </div>
      </dl>

      <div className="studio-toolbar">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All pages</option>
          <option value="crawled">Crawled</option>
          <option value="failed">Failed</option>
          <option value="skipped">Skipped</option>
        </select>
      </div>

      <div className="studio-table-card">
        <div className="studio-table-wrap">
          <table className="studio-table">
            <thead>
              <tr>
                <th>URL</th>
                <th>Status</th>
                <th>HTTP</th>
                <th>Depth</th>
                <th>Title</th>
                <th>Meta</th>
                <th>Crawled</th>
              </tr>
            </thead>
            <tbody>
              {pages?.items.map((page) => (
                <tr key={page.id} className="studio-table-row" onClick={() => void openPage(page)}>
                  <td>{page.url}</td>
                  <td>{page.status}</td>
                  <td>{page.httpStatus ?? "—"}</td>
                  <td>{page.depth}</td>
                  <td>{page.title || "—"}</td>
                  <td className="studio-table-message">{page.metaDescription.slice(0, 80) || "—"}</td>
                  <td className="studio-table-muted">{new Date(page.crawledAt).toLocaleString()}</td>
                </tr>
              ))}
              {!pages?.items.length ? (
                <tr>
                  <td colSpan={7}>No pages stored yet.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <StudioModal
        open={Boolean(selected)}
        title={selected?.title || selected?.url || "Page"}
        onClose={() => setSelected(null)}
        footer={
          <button type="button" className="studio-secondary-btn" onClick={() => setSelected(null)}>
            Close
          </button>
        }
      >
        {selected ? (
          <div className="crawler-page-detail">
            <p>
              <strong>URL:</strong> {selected.url}
            </p>
            <p>
              <strong>HTTP:</strong> {selected.httpStatus ?? "—"} · depth {selected.depth}
            </p>
            <p>
              <strong>Canonical:</strong> {selected.canonicalUrl || "—"}
            </p>
            <p>
              <strong>H1:</strong> {selected.headings.h1 || "—"}
            </p>
            <p>
              <strong>H2:</strong> {selected.headings.h2.join(" · ") || "—"}
            </p>
            <p>
              <strong>Description:</strong> {selected.metaDescription || "—"}
            </p>
            <p>
              <strong>Internal links:</strong> {selected.internalLinks.length}
            </p>
            <ul>
              {selected.internalLinks.slice(0, 20).map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
            <p>
              <strong>External links:</strong> {selected.externalLinks.length}
            </p>
            <p className="crawler-text">{selected.textContent || selected.error}</p>
          </div>
        ) : null}
      </StudioModal>
    </div>
  );
}
