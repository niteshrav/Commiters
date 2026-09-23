import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, Paginated } from "../lib/api";
import type { CrawlJob, StartCrawlPayload } from "../lib/crawlerTypes";
import StudioModal, { StudioPageHeader, StudioPrimaryButton, StudioStatusBadge } from "../components/StudioModal";

const EMPTY_FORM: StartCrawlPayload = {
  startUrl: "",
  maxPages: 20,
  maxDepth: 2,
  timeout: 10000,
  retries: 2,
  delay: 500,
  sameSite: true,
  respectRobots: true,
  useSitemap: false,
};

function statusTone(status: CrawlJob["status"]) {
  if (status === "completed") return { label: "Completed", tone: "published" as const };
  if (status === "running" || status === "pending") return { label: status, tone: "published" as const };
  return { label: status, tone: "draft" as const };
}

export default function CrawlerListPage() {
  const [data, setData] = useState<Paginated<CrawlJob> | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<StartCrawlPayload>(EMPTY_FORM);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api<Paginated<CrawlJob>>("/api/admin/crawls?page=1&limit=30");
      setData(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load crawls.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function startCrawl() {
    setSaving(true);
    setError("");
    try {
      await api<{ job: CrawlJob }>("/api/admin/crawls", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setModalOpen(false);
      setForm(EMPTY_FORM);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start crawl.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-page studio-page">
      <StudioPageHeader
        title="Crawler"
        description="Bounded same-site crawls with robots.txt, SSRF protection, and stored page extracts."
        action={<StudioPrimaryButton onClick={() => setModalOpen(true)}>Start crawl</StudioPrimaryButton>}
      />

      {error ? <p className="error">{error}</p> : null}

      <div className="studio-table-card">
        <div className="studio-table-wrap">
          <table className="studio-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Start URL</th>
                <th>Status</th>
                <th>Crawled</th>
                <th>Failed</th>
                <th>Started</th>
                <th>Completed</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8}>Loading…</td>
                </tr>
              ) : null}
              {data?.items.map((job) => {
                const badge = statusTone(job.status);
                return (
                  <tr key={job.id} className="studio-table-row">
                    <td className="studio-table-muted">{job.id.slice(-8)}</td>
                    <td className="studio-table-title">{job.startUrl}</td>
                    <td>
                      <StudioStatusBadge published={badge.tone === "published"} label={badge.label} />
                    </td>
                    <td>
                      {job.pagesCrawled}/{job.maxPages}
                    </td>
                    <td>{job.pagesFailed}</td>
                    <td className="studio-table-muted">{job.startedAt ? new Date(job.startedAt).toLocaleString() : "—"}</td>
                    <td className="studio-table-muted">
                      {job.completedAt ? new Date(job.completedAt).toLocaleString() : "—"}
                    </td>
                    <td>
                      <Link className="studio-link" to={`/crawler/${job.id}`}>
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {!loading && !data?.items.length ? (
                <tr>
                  <td colSpan={8}>No crawls yet.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <StudioModal
        open={modalOpen}
        title="Start crawl"
        subtitle="Same hostname only by default. Private and local addresses are blocked."
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <button type="button" className="studio-secondary-btn" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <StudioPrimaryButton onClick={() => void startCrawl()} disabled={saving}>
              {saving ? "Starting…" : "Start"}
            </StudioPrimaryButton>
          </>
        }
      >
        <form className="studio-form" onSubmit={(event) => { event.preventDefault(); void startCrawl(); }}>
          <label className="studio-field">
            Start URL
            <input
              required
              value={form.startUrl}
              onChange={(e) => setForm({ ...form, startUrl: e.target.value })}
              placeholder="https://example.com"
            />
          </label>
          <label className="studio-field">
            Maximum pages (1–50)
            <input
              type="number"
              min={1}
              max={50}
              value={form.maxPages}
              onChange={(e) => setForm({ ...form, maxPages: Number(e.target.value) })}
            />
          </label>
          <label className="studio-field">
            Maximum depth (0–4)
            <input
              type="number"
              min={0}
              max={4}
              value={form.maxDepth}
              onChange={(e) => setForm({ ...form, maxDepth: Number(e.target.value) })}
            />
          </label>
          <label className="studio-field">
            Timeout (ms)
            <input
              type="number"
              min={1000}
              max={15000}
              value={form.timeout}
              onChange={(e) => setForm({ ...form, timeout: Number(e.target.value) })}
            />
          </label>
          <label className="studio-field">
            Retries
            <input
              type="number"
              min={0}
              max={2}
              value={form.retries}
              onChange={(e) => setForm({ ...form, retries: Number(e.target.value) })}
            />
          </label>
          <label className="studio-field">
            Delay (ms, min 200)
            <input
              type="number"
              min={200}
              max={5000}
              value={form.delay}
              onChange={(e) => setForm({ ...form, delay: Number(e.target.value) })}
            />
          </label>
          <label className="crawler-toggle">
            <input type="checkbox" checked={form.sameSite} onChange={(e) => setForm({ ...form, sameSite: e.target.checked })} />
            Same-site only
          </label>
          <label className="crawler-toggle">
            <input
              type="checkbox"
              checked={form.respectRobots}
              onChange={(e) => setForm({ ...form, respectRobots: e.target.checked })}
            />
            Respect robots.txt
          </label>
          <label className="crawler-toggle">
            <input
              type="checkbox"
              checked={form.useSitemap}
              onChange={(e) => setForm({ ...form, useSitemap: e.target.checked })}
            />
            Seed queue from sitemap.xml
          </label>
        </form>
      </StudioModal>
    </div>
  );
}
