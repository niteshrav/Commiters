import { FormEvent, useEffect, useState } from "react";
import { api } from "../lib/api";
import type { SingletonConfig } from "../lib/entityConfigs";
import FieldRenderer from "../components/FieldRenderer";
import { StudioPageHeader } from "../components/StudioModal";

export default function SingletonEditorPage({ config }: { config: SingletonConfig }) {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api<Record<string, unknown> | null>(config.endpoint)
      .then((data) => {
        if (data) setValues(data);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load."))
      .finally(() => setLoading(false));
  }, [config.endpoint]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);
    const body = { ...values };
    delete body._id;
    delete body.__v;
    delete body.createdAt;
    delete body.updatedAt;
    try {
      await api(config.endpoint, { method: "PUT", body: JSON.stringify(body) });
      setMessage("Saved successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="muted">Loading…</p>;

  return (
    <div className="admin-page studio-page">
      <StudioPageHeader title={config.title} description={`Update ${config.title.toLowerCase()} content for the public website.`} />

      <form className="studio-editor-card studio-form" onSubmit={onSubmit}>
        {config.fields.map((field) => (
          <FieldRenderer
            key={field.key}
            field={field}
            value={values[field.key]}
            onChange={(v) => setValues((prev) => ({ ...prev, [field.key]: v }))}
            variant="studio"
          />
        ))}
        {error ? <p className="error">{error}</p> : null}
        {message ? <p className="success">{message}</p> : null}
        <div className="studio-editor-actions">
          <button className="studio-btn studio-btn--primary" type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
