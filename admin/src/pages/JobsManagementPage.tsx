import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { api, Paginated } from "../lib/api";
import { useRegisterPageSearch } from "../lib/AdminPageContext";
import {
  EMPTY_JOB_FORM,
  formToPayload,
  jobToForm,
  slugifyTitle,
  type JobFormValues,
} from "../lib/jobManagement";
import StudioModal, {
  StudioIconButton,
  StudioPageHeader,
  StudioPrimaryButton,
  StudioStatusBadge,
} from "../components/StudioModal";

type JobRow = Record<string, unknown> & { _id: string; slug?: string; status?: string };

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "open", label: "Open" },
  { value: "closed", label: "Closed" },
  { value: "draft", label: "Draft" },
];

const PUBLIC_SITE = import.meta.env.VITE_PUBLIC_SITE_URL ?? "http://localhost:5173";

function statusBadge(status: string | undefined) {
  if (status === "open") return { label: "Open", tone: "published" as const };
  if (status === "closed") return { label: "Closed", tone: "draft" as const };
  return { label: "Draft", tone: "draft" as const };
}

export default function JobsManagementPage() {
  const [data, setData] = useState<Paginated<JobRow> | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<JobFormValues>(EMPTY_JOB_FORM);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  const onSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  useRegisterPageSearch({
    placeholder: "Search jobs...",
    value: search,
    onChange: onSearchChange,
  });

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(page), limit: "10", search });
      if (statusFilter) params.set("status", statusFilter);
      const res = await api<Paginated<JobRow>>(`/api/admin/jobs?${params.toString()}`);
      setData(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_JOB_FORM);
    setSlugTouched(false);
    setModalOpen(true);
    setMessage("");
  }

  function openEdit(row: JobRow) {
    setEditingId(row._id);
    setForm(jobToForm(row));
    setSlugTouched(true);
    setModalOpen(true);
    setMessage("");
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setForm(EMPTY_JOB_FORM);
  }

  function updateField<K extends keyof JobFormValues>(key: K, value: JobFormValues[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && !slugTouched) {
        next.slug = slugifyTitle(String(value));
        if (!next.seoTitle) next.seoTitle = `${String(value)} | Commiters Careers`;
      }
      if (key === "roleOverview" && !prev.seoDescription) {
        next.seoDescription = String(value).slice(0, 160);
      }
      return next;
    });
  }

  async function onSave(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = formToPayload(form);
      if (editingId) {
        await api(`/api/admin/jobs/${editingId}`, { method: "PUT", body: JSON.stringify(payload) });
        setMessage("Job updated.");
      } else {
        await api("/api/admin/jobs", { method: "POST", body: JSON.stringify(payload) });
        setMessage("Job created.");
      }
      closeModal();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(row: JobRow) {
    if (!confirm(`Delete "${row.title}" permanently?`)) return;
    try {
      await api(`/api/admin/jobs/${row._id}`, { method: "DELETE" });
      setMessage("Job deleted.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    }
  }

  async function onDuplicate(row: JobRow) {
    try {
      await api(`/api/admin/jobs/${row._id}/duplicate`, { method: "POST" });
      setMessage("Job duplicated as draft.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Duplicate failed.");
    }
  }

  async function onPublish(row: JobRow) {
    try {
      await api(`/api/admin/jobs/${row._id}/publish`, { method: "PATCH" });
      setMessage("Job published.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Publish failed.");
    }
  }

  async function onUnpublish(row: JobRow, nextStatus: "draft" | "closed") {
    try {
      await api(`/api/admin/jobs/${row._id}/unpublish`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus }),
      });
      setMessage(nextStatus === "closed" ? "Job closed." : "Job moved to draft.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed.");
    }
  }

  function previewJob(slug?: string) {
    if (!slug) return;
    window.open(`${PUBLIC_SITE}/open-positions/${slug}`, "_blank", "noopener,noreferrer");
  }

  function copyLink(slug?: string) {
    if (!slug) return;
    void navigator.clipboard.writeText(`${PUBLIC_SITE}/open-positions/${slug}`);
    setMessage("Job link copied.");
  }

  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const rows = data?.items ?? [];

  const formSections = useMemo(
    () => [
      {
        title: "Basics",
        fields: (
          <div className="admin-job-form-grid">
            <label className="studio-field"><span>Job Title *</span><input value={form.title} onChange={(e) => updateField("title", e.target.value)} required /></label>
            <label className="studio-field"><span>Slug</span><input value={form.slug} onChange={(e) => { setSlugTouched(true); updateField("slug", e.target.value); }} /></label>
            <label className="studio-field"><span>Department</span><input value={form.department} onChange={(e) => updateField("department", e.target.value)} /></label>
            <label className="studio-field"><span>Employment Type</span><input value={form.employmentType} onChange={(e) => updateField("employmentType", e.target.value)} /></label>
            <label className="studio-field"><span>Internship Type</span><input value={form.internshipType} onChange={(e) => updateField("internshipType", e.target.value)} /></label>
            <label className="studio-field"><span>Experience</span><input value={form.experience} onChange={(e) => updateField("experience", e.target.value)} /></label>
            <label className="studio-field"><span>Location</span><input value={form.location} onChange={(e) => updateField("location", e.target.value)} /></label>
            <label className="studio-field"><span>Work Mode</span><select value={form.workMode} onChange={(e) => updateField("workMode", e.target.value as JobFormValues["workMode"])}><option value="Remote">Remote</option><option value="Hybrid">Hybrid</option><option value="Onsite">Onsite</option></select></label>
            <label className="studio-field"><span>Duration</span><input value={form.duration} onChange={(e) => updateField("duration", e.target.value)} /></label>
            <label className="studio-field"><span>Stipend / Salary</span><input value={form.stipendSalary} onChange={(e) => updateField("stipendSalary", e.target.value)} /></label>
            <label className="studio-field"><span>Number of Openings</span><input type="number" min={1} value={form.numberOfOpenings} onChange={(e) => updateField("numberOfOpenings", Number(e.target.value))} /></label>
            <label className="studio-field"><span>Last Date to Apply</span><input type="date" value={form.lastDateToApply} onChange={(e) => updateField("lastDateToApply", e.target.value)} /></label>
            <label className="studio-field"><span>Status</span><select value={form.status} onChange={(e) => updateField("status", e.target.value as JobFormValues["status"])}><option value="draft">Draft</option><option value="open">Open</option><option value="closed">Closed</option></select></label>
            <label className="studio-field"><span>Display Order</span><input type="number" value={form.displayOrder} onChange={(e) => updateField("displayOrder", Number(e.target.value))} /></label>
            <label className="admin-job-checkbox"><input type="checkbox" checked={form.featured} onChange={(e) => updateField("featured", e.target.checked)} /><span>Featured Job</span></label>
          </div>
        ),
      },
      {
        title: "Role Content",
        fields: (
          <>
            <label className="studio-field"><span>About Company</span><textarea rows={3} value={form.aboutCompany} onChange={(e) => updateField("aboutCompany", e.target.value)} /></label>
            <label className="studio-field"><span>Role Overview</span><textarea rows={4} value={form.roleOverview} onChange={(e) => updateField("roleOverview", e.target.value)} /></label>
            <label className="studio-field"><span>Responsibilities (one per line)</span><textarea rows={5} value={form.responsibilitiesText} onChange={(e) => updateField("responsibilitiesText", e.target.value)} /></label>
            <label className="studio-field"><span>Required Skills (comma separated)</span><input value={form.requiredSkillsText} onChange={(e) => updateField("requiredSkillsText", e.target.value)} /></label>
            <label className="studio-field"><span>Preferred Skills (comma separated)</span><input value={form.preferredSkillsText} onChange={(e) => updateField("preferredSkillsText", e.target.value)} /></label>
            <label className="studio-field"><span>Eligibility</span><textarea rows={3} value={form.eligibility} onChange={(e) => updateField("eligibility", e.target.value)} /></label>
            <label className="studio-field"><span>Benefits (one per line)</span><textarea rows={4} value={form.benefitsText} onChange={(e) => updateField("benefitsText", e.target.value)} /></label>
            <label className="studio-field"><span>Learning Opportunities</span><textarea rows={3} value={form.learningOpportunities} onChange={(e) => updateField("learningOpportunities", e.target.value)} /></label>
            <label className="studio-field"><span>Selection Process</span><textarea rows={3} value={form.selectionProcess} onChange={(e) => updateField("selectionProcess", e.target.value)} /></label>
          </>
        ),
      },
      {
        title: "SEO",
        fields: (
          <>
            <label className="studio-field"><span>SEO Title</span><input value={form.seoTitle} onChange={(e) => updateField("seoTitle", e.target.value)} /></label>
            <label className="studio-field"><span>SEO Description</span><textarea rows={3} value={form.seoDescription} onChange={(e) => updateField("seoDescription", e.target.value)} /></label>
          </>
        ),
      },
    ],
    [form, slugTouched],
  );

  return (
    <div className="admin-page studio-page">
      <StudioPageHeader
        title="Job Management"
        description="Create, publish, and manage open positions shown on the careers page."
        action={<StudioPrimaryButton onClick={openCreate}>Create Job</StudioPrimaryButton>}
      />

      {error && !modalOpen ? <p className="error">{error}</p> : null}
      {message ? <p className="success">{message}</p> : null}

      <div className="admin-job-toolbar">
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value || "all"} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="studio-table-card">
        {loading ? (
          <p className="studio-table-empty">Loading jobs…</p>
        ) : rows.length === 0 ? (
          <p className="studio-table-empty">No jobs found.</p>
        ) : (
          <div className="studio-table-wrap">
            <table className="studio-table">
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Department</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const badge = statusBadge(String(row.status));
                  return (
                    <tr key={row._id}>
                      <td>
                        <strong>{String(row.title ?? "")}</strong>
                        {row.featured ? <span className="admin-job-featured-pill">Featured</span> : null}
                        <div className="admin-job-slug">{String(row.slug ?? "")}</div>
                      </td>
                      <td>{String(row.department ?? "—")}</td>
                      <td>{String(row.location ?? "—")}</td>
                      <td><StudioStatusBadge published={badge.label === "Open"} label={badge.label} /></td>
                      <td>{row.updatedAt ? new Date(String(row.updatedAt)).toLocaleDateString() : "—"}</td>
                      <td>
                        <div className="admin-job-actions">
                          <StudioIconButton icon="edit" label="Edit" onClick={() => openEdit(row)} />
                          <StudioIconButton icon="visibility" label="Preview" onClick={() => previewJob(String(row.slug))} />
                          <StudioIconButton icon="link" label="Copy link" onClick={() => copyLink(String(row.slug))} />
                          <StudioIconButton icon="content_copy" label="Duplicate" onClick={() => void onDuplicate(row)} />
                          {row.status !== "open" ? (
                            <StudioIconButton icon="publish" label="Publish" onClick={() => void onPublish(row)} />
                          ) : (
                            <StudioIconButton icon="unpublished" label="Unpublish" onClick={() => void onUnpublish(row, "draft")} />
                          )}
                          <StudioIconButton icon="delete" label="Delete" tone="danger" onClick={() => void onDelete(row)} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {totalPages > 1 ? (
        <div className="studio-pagination">
          <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
          <span>Page {page} of {totalPages}</span>
          <button type="button" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      ) : null}

      <StudioModal
        open={modalOpen}
        title={editingId ? "Edit Job" : "Create Job"}
        onClose={closeModal}
        footer={
          <>
            <button type="button" className="studio-btn" onClick={closeModal}>Cancel</button>
            <button type="submit" form="admin-job-form" className="studio-btn studio-btn--primary" disabled={saving}>
              {saving ? "Saving…" : editingId ? "Save Changes" : "Create Job"}
            </button>
          </>
        }
      >
        <form id="admin-job-form" className="studio-form admin-job-form" onSubmit={onSave}>
          {error && modalOpen ? <p className="error">{error}</p> : null}
          {formSections.map((section) => (
            <section key={section.title} className="admin-job-form-section">
              <h3>{section.title}</h3>
              {section.fields}
            </section>
          ))}
        </form>
      </StudioModal>
    </div>
  );
}
