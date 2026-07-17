import { FormEvent, useEffect, useState } from "react";
import { api } from "../lib/api";
import type { FieldConfig } from "../lib/entityConfigs";
import FieldRenderer from "../components/FieldRenderer";
import { StudioPageHeader } from "../components/StudioModal";

type SocialLink = { platform: string; url: string };
type FooterLink = { label: string; url: string; order: number };

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { platform: "LinkedIn", url: "https://www.linkedin.com/company/commiters-softwares/?viewAsMember=true" },
  { platform: "WhatsApp", url: "https://wa.me/919024882899" },
  { platform: "Instagram", url: "https://www.instagram.com/commitersconnect/" },
  { platform: "Medium", url: "https://medium.com/@erniteshrav" },
];

const DEFAULT_NAVIGATION_LINKS: FooterLink[] = [
  { label: "Home", url: "/", order: 1 },
  { label: "About", url: "/about", order: 2 },
  { label: "Our Work", url: "/case-studies", order: 3 },
  { label: "Technical Ledger", url: "/technical-ledger", order: 4 },
  { label: "Services", url: "/services", order: 5 },
  { label: "Join Us", url: "/join-us", order: 6 },
  { label: "FAQ", url: "/faq", order: 7 },
  { label: "Contact", url: "/contact", order: 8 },
];

const DEFAULT_LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy", url: "/privacy-policy", order: 1 },
  { label: "Cookies", url: "/cookie-policy", order: 2 },
  { label: "Terms", url: "/terms", order: 3 },
];

function FooterLinkEditor({
  title,
  links,
  onChange,
}: {
  title: string;
  links: FooterLink[];
  onChange: (links: FooterLink[]) => void;
}) {
  return (
    <div className="nav-links-editor">
      <div className="page-header">
        <h3>{title}</h3>
        <button
          className="studio-btn studio-btn--outline"
          type="button"
          onClick={() => onChange([...links, { label: "", url: "", order: links.length + 1 }])}
        >
          + Add Link
        </button>
      </div>
      {links.map((link, index) => (
        <div className="nav-link-row" key={index}>
          <input
            placeholder="Label"
            value={link.label}
            onChange={(e) => {
              const next = [...links];
              next[index] = { ...link, label: e.target.value };
              onChange(next);
            }}
          />
          <input
            placeholder="URL"
            value={link.url}
            onChange={(e) => {
              const next = [...links];
              next[index] = { ...link, url: e.target.value };
              onChange(next);
            }}
          />
          <input
            type="number"
            placeholder="Order"
            value={link.order}
            onChange={(e) => {
              const next = [...links];
              next[index] = { ...link, order: Number(e.target.value) };
              onChange(next);
            }}
          />
          <button className="btn danger" type="button" onClick={() => onChange(links.filter((_, i) => i !== index))}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default function FooterEditorPage() {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(DEFAULT_SOCIAL_LINKS);
  const [navigationLinks, setNavigationLinks] = useState<FooterLink[]>(DEFAULT_NAVIGATION_LINKS);
  const [legalLinks, setLegalLinks] = useState<FooterLink[]>(DEFAULT_LEGAL_LINKS);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const fields: FieldConfig[] = [
    { key: "logo", label: "Footer Logo", type: "image" },
    { key: "description", label: "Description", type: "textarea", rows: 3 },
    { key: "copyright", label: "Copyright" },
  ];

  useEffect(() => {
    api<Record<string, unknown> | null>("/api/admin/footer")
      .then((data) => {
        if (!data) return;
        setValues(data);
        if (Array.isArray(data.socialLinks) && data.socialLinks.length) {
          setSocialLinks(data.socialLinks as SocialLink[]);
        }
        if (Array.isArray(data.navigationLinks) && data.navigationLinks.length) {
          setNavigationLinks(data.navigationLinks as FooterLink[]);
        }
        if (Array.isArray(data.legalLinks) && data.legalLinks.length) {
          setLegalLinks(data.legalLinks as FooterLink[]);
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
      await api("/api/admin/footer", {
        method: "PUT",
        body: JSON.stringify({
          ...values,
          socialLinks,
          navigationLinks,
          legalLinks,
          isActive: true,
        }),
      });
      setMessage("Footer saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="muted">Loading…</p>;

  return (
    <div className="admin-page studio-page">
      <StudioPageHeader
        title="Footer"
        description="Manage footer branding, navigation links, social links, legal links, and copyright."
      />

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

        <FooterLinkEditor title="Navigation Links" links={navigationLinks} onChange={setNavigationLinks} />
        <FooterLinkEditor title="Legal Links" links={legalLinks} onChange={setLegalLinks} />

        <div className="nav-links-editor">
          <div className="page-header">
            <h3>Social Links</h3>
            <button
              className="studio-btn studio-btn--outline"
              type="button"
              onClick={() => setSocialLinks((prev) => [...prev, { platform: "", url: "" }])}
            >
              + Add Social Link
            </button>
          </div>
          {socialLinks.map((link, index) => (
            <div className="nav-link-row footer-social-row" key={index}>
              <input
                placeholder="Platform (e.g. WhatsApp)"
                value={link.platform}
                onChange={(e) => {
                  const next = [...socialLinks];
                  next[index] = { ...link, platform: e.target.value };
                  setSocialLinks(next);
                }}
              />
              <input
                placeholder="URL"
                value={link.url}
                onChange={(e) => {
                  const next = [...socialLinks];
                  next[index] = { ...link, url: e.target.value };
                  setSocialLinks(next);
                }}
              />
              <button
                className="btn danger"
                type="button"
                onClick={() => setSocialLinks(socialLinks.filter((_, i) => i !== index))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {error ? <p className="error">{error}</p> : null}
        {message ? <p className="success">{message}</p> : null}
        <div className="studio-editor-actions">
          <button className="studio-btn studio-btn--primary" type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save Footer"}
          </button>
        </div>
      </form>
    </div>
  );
}
