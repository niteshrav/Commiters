import { FormEvent, useCallback, useEffect, useState } from "react";
import { api, Paginated } from "../lib/api";
import { useRegisterPageSearch } from "../lib/AdminPageContext";
import type { EntityConfig } from "../lib/entityConfigs";
import {
  formatRowDate,
  getInitials,
  getRowCategory,
  getRowLabel,
  getRowStatus,
  getThumbnailSrc,
} from "../lib/crudDisplay";
import FieldRenderer, { JobRequirementsField } from "./FieldRenderer";
import MaterialIcon from "./MaterialIcon";
import StudioModal, {
  StudioIconButton,
  StudioPageHeader,
  StudioPrimaryButton,
  StudioStatusBadge,
} from "./StudioModal";

type Row = Record<string, unknown> & { _id: string };

export default function CrudModulePage({ config }: { config: EntityConfig }) {
  const [data, setData] = useState<Paginated<Row> | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState<Row | null>(null);
  const [draft, setDraft] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);

  const onSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  useRegisterPageSearch({
    placeholder: `Search ${config.title.toLowerCase()}...`,
    value: search,
    onChange: onSearchChange,
  });

  const load = useCallback(
    async (nextPage = page) => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({ page: String(nextPage), limit: "10", search });
        const res = await api<Paginated<Row>>(`${config.endpoint}?${params.toString()}`);
        setData(res);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load.");
      } finally {
        setLoading(false);
      }
    },
    [config.endpoint, page, search],
  );

  useEffect(() => {
    setData(null);
    setEditing(null);
    setDraft({});
    setMessage("");
    setPage(1);
    void (async () => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({ page: "1", limit: "10", search });
        const res = await api<Paginated<Row>>(`${config.endpoint}?${params.toString()}`);
        setData(res);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load.");
      } finally {
        setLoading(false);
      }
    })();
  }, [search, config.endpoint]);

  useEffect(() => {
    if (page === 1) return;
    void load(page);
  }, [page, load]);

  function openCreate() {
    setEditing({ _id: "" });
    setDraft({ ...(config.defaultValues ?? {}) });
    setMessage("");
  }

  function openEdit(row: Row) {
    setEditing(row);
    setDraft({ ...row });
    setMessage("");
  }

  function closeModal() {
    setEditing(null);
    setDraft({});
  }

  function setField(key: string, value: unknown) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);
    try {
      const body = { ...draft };
      delete body._id;
      delete body.__v;
      delete body.createdAt;
      delete body.updatedAt;

      if (editing?._id) {
        await api(`${config.endpoint}/${editing._id}`, { method: "PUT", body: JSON.stringify(body) });
        setMessage("Updated successfully.");
      } else {
        await api(config.endpoint, { method: "POST", body: JSON.stringify(body) });
        setMessage("Created successfully.");
      }
      closeModal();
      await load(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    setError("");
    try {
      await api(`${config.endpoint}/${id}`, { method: "DELETE" });
      await load(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    }
  }

  const studio = config.studio;
  const singular = config.singularName ?? config.title.replace(/s$/, "");
  const total = data?.total ?? 0;
  const start = total ? (page - 1) * 10 + 1 : 0;
  const end = total ? Math.min(page * 10, total) : 0;

  return (
    <div className="admin-page studio-page">
      <StudioPageHeader
        title={config.title}
        description={config.description}
        action={
          <StudioPrimaryButton onClick={openCreate}>
            {config.addButtonLabel ?? `Add ${singular}`}
          </StudioPrimaryButton>
        }
      />

      {error && !editing ? <p className="error">{error}</p> : null}
      {message ? <p className="success">{message}</p> : null}

      <div className="studio-table-card">
        {loading ? (
          <p className="studio-table-empty">Loading…</p>
        ) : studio ? (
          <div className="studio-table-wrap">
            <table className="studio-table">
              <thead>
                <tr>
                  <th>{studio.primaryLabel}</th>
                  {studio.categoryLabel ? <th>{studio.categoryLabel}</th> : null}
                  {studio.statusKey ? <th>Status</th> : null}
                  <th>Last Updated</th>
                  <th className="studio-table-actions-head">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.items.map((row) => {
                  const label = getRowLabel(row, config);
                  const category = getRowCategory(row, config);
                  const status = getRowStatus(row, config);
                  const thumb = getThumbnailSrc(row, config);
                  return (
                    <tr key={row._id} className="studio-table-row">
                      <td>
                        <div className="studio-table-primary">
                          <div className="studio-table-thumb">
                            {thumb ? <img src={thumb} alt="" /> : <span>{getInitials(label)}</span>}
                          </div>
                          <span className="studio-table-title">{label}</span>
                        </div>
                      </td>
                      {studio.categoryLabel ? (
                        <td>{category ? <span className="studio-chip">{category}</span> : "—"}</td>
                      ) : null}
                      {studio.statusKey ? (
                        <td>
                          <StudioStatusBadge published={status.published} label={status.label} />
                        </td>
                      ) : null}
                      <td className="studio-table-muted">{formatRowDate(row, config)}</td>
                      <td className="studio-table-actions">
                        <StudioIconButton icon="edit" label={`Edit ${label}`} onClick={() => openEdit(row)} />
                        <StudioIconButton
                          icon="delete"
                          label={`Delete ${label}`}
                          tone="danger"
                          onClick={() => onDelete(row._id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                {config.columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.items.map((row) => (
                <tr key={row._id}>
                  {config.columns.map((col) => (
                    <td key={col}>{formatCell(row[col])}</td>
                  ))}
                  <td className="actions-cell">
                    <button className="btn secondary" type="button" onClick={() => openEdit(row)}>
                      Edit
                    </button>
                    <button className="btn danger" type="button" onClick={() => onDelete(row._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && data?.items.length === 0 ? (
          <p className="studio-table-empty">
            No items yet. Click &quot;{config.addButtonLabel ?? "Add New"}&quot;.
          </p>
        ) : null}

        <div className="studio-table-footer">
          <span>
            Showing {start}-{end} of {total} {config.title.toLowerCase()}
          </span>
          <div className="studio-table-pagination">
            <button type="button" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              <MaterialIcon name="chevron_left" />
            </button>
            <button type="button" disabled={!data || page >= data.totalPages} onClick={() => setPage((p) => p + 1)}>
              <MaterialIcon name="chevron_right" />
            </button>
          </div>
        </div>
      </div>

      <StudioModal
        open={Boolean(editing)}
        title={editing?._id ? `Edit ${singular}` : `Add New ${singular}`}
        subtitle={`Fill in the details to ${editing?._id ? "update" : "create"} this ${singular.toLowerCase()}.`}
        onClose={closeModal}
        footer={
          <>
            <button className="studio-btn studio-btn--outline" type="button" onClick={closeModal}>
              Cancel
            </button>
            <button className="studio-btn studio-btn--primary" type="submit" form="studio-crud-form" disabled={saving}>
              {saving ? "Saving…" : `Save ${singular}`}
            </button>
          </>
        }
      >
        <form id="studio-crud-form" className="studio-form" onSubmit={onSave}>
          {config.fields.map((field) =>
            field.key === "requirements" ? (
              <JobRequirementsField
                key={field.key}
                value={draft.requirements}
                onChange={(v) => setField("requirements", v)}
              />
            ) : (
              <FieldRenderer
                key={field.key}
                field={field}
                value={draft[field.key]}
                onChange={(v) => setField(field.key, v)}
                variant="studio"
              />
            ),
          )}
          {error ? <p className="error">{error}</p> : null}
        </form>
      </StudioModal>
    </div>
  );
}

function formatCell(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.length ? value.join(", ") : "—";
  return String(value);
}
