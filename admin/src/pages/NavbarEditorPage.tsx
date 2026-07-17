import { FormEvent, useEffect, useState } from "react";
import { api } from "../lib/api";
import type { FieldConfig } from "../lib/entityConfigs";
import FieldRenderer from "../components/FieldRenderer";
import { StudioPageHeader } from "../components/StudioModal";

type NavLink = { label: string; url: string; order: number };

export default function NavbarEditorPage() {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const fields: FieldConfig[] = [
    { key: "logo", label: "Logo", type: "image" },
    { key: "logoAlt", label: "Logo Alt Text" },
    { key: "ctaLabel", label: "Start Project Button Label" },
    { key: "ctaUrl", label: "Start Project Button URL" },
  ];

  useEffect(() => {
    api<Record<string, unknown> | null>("/api/admin/navbar")
      .then((data) => {
        if (data) {
          setValues(data);
          setNavLinks(Array.isArray(data.navLinks) ? (data.navLinks as NavLink[]) : []);
        }
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load."))
      .finally(() => setLoading(false));
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);
    try {
      await api("/api/admin/navbar", {
        method: "PUT",
        body: JSON.stringify({ ...values, navLinks, isActive: true }),
      });
      setMessage("Navbar saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="muted">Loading…</p>;

  return (
    <div className="admin-page studio-page">
      <StudioPageHeader title="Navbar" description="Manage site navigation, logo, and primary call-to-action." />

      <form className="studio-editor-card studio-form" onSubmit={onSubmit}>
        {fields.map((field) => (
          <FieldRenderer
            key={field.key}
            field={field}
            value={values[field.key]}
            onChange={(v) => setValues((prev) => ({ ...prev, [field.key]: v }))}
            variant="studio"
          />
        ))}

        <div className="nav-links-editor">
          <div className="page-header">
            <h3>Navigation Links</h3>
            <button
              className="studio-btn studio-btn--outline"
              type="button"
              onClick={() => setNavLinks((prev) => [...prev, { label: "", url: "", order: prev.length + 1 }])}
            >
              + Add Link
            </button>
          </div>
          {navLinks.map((link, index) => (
            <div className="nav-link-row" key={index}>
              <input
                placeholder="Label"
                value={link.label}
                onChange={(e) => {
                  const next = [...navLinks];
                  next[index] = { ...link, label: e.target.value };
                  setNavLinks(next);
                }}
              />
              <input
                placeholder="URL"
                value={link.url}
                onChange={(e) => {
                  const next = [...navLinks];
                  next[index] = { ...link, url: e.target.value };
                  setNavLinks(next);
                }}
              />
              <input
                type="number"
                placeholder="Order"
                value={link.order}
                onChange={(e) => {
                  const next = [...navLinks];
                  next[index] = { ...link, order: Number(e.target.value) };
                  setNavLinks(next);
                }}
              />
              <button className="btn danger" type="button" onClick={() => setNavLinks(navLinks.filter((_, i) => i !== index))}>
                Remove
              </button>
            </div>
          ))}
        </div>

        {error ? <p className="error">{error}</p> : null}
        {message ? <p className="success">{message}</p> : null}
        <div className="studio-editor-actions">
          <button className="studio-btn studio-btn--primary" type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save Navbar"}
          </button>
        </div>
      </form>
    </div>
  );
}
