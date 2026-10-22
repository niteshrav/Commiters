import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactIntroSection from "../components/ContactIntroSection";
import ContactSidebarCards from "../components/ContactSidebarCards";
import { createLead } from "../lib/api";
import { usePageSeo } from "../hooks/usePageSeo";
import { withSiteCloudTheme } from "../lib/homeCloudTheme";
import { ROUTES } from "../lib/routes";
import { STITCH_COPY } from "../lib/stitchDesign";
import { STITCH_PROJECT_TYPE_DEFAULT } from "../lib/stitchPageContent";
import { contactPageSeo } from "../lib/sitePageSeo";
import {
  sanitizeNameInput,
  validateEmail,
  validateName,
} from "../lib/contactValidation";
import { useLeadServiceOptions } from "../lib/cms/hooks";

export default function ContactPage() {
  usePageSeo(contactPageSeo());
  const leadServiceOptions = useLeadServiceOptions();

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: STITCH_PROJECT_TYPE_DEFAULT as string,
    message: "",
    website: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const nameErr = validateName(form.name);
    const emailErr = validateEmail(form.email);
    const msgErr = !form.message.trim() ? "Please add a short description of what you're building." : null;
    const first = nameErr ?? emailErr ?? msgErr ?? null;
    if (first) return setError(first);

    const serviceNeeded =
      form.projectType === STITCH_PROJECT_TYPE_DEFAULT
        ? "Website Development"
        : form.projectType.trim() || "Website Development";

    setSubmitting(true);
    try {
      await createLead({
        name: form.name.trim(),
        email: form.email.trim(),
        serviceNeeded,
        message: form.message.trim(),
        timeline: "Not specified",
        website: form.website,
      });
      navigate(ROUTES.thankYou, { state: { submissionView: "client" } });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Submission failed.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={withSiteCloudTheme("contact-page")} data-testid="contact-page">
      <ContactIntroSection />

      <section className="section stitch-contact-section" data-testid="contact-layout">
        <div className="stitch-contact-grid">
          <form
            onSubmit={onSubmit}
            aria-label="Contact form"
            className="card stitch-contact-form"
            data-testid="stitch-contact-form"
          >
            <h2 className="stitch-contact-form-title">{STITCH_COPY.contact.formTitle}</h2>
            <div className="stitch-contact-form-row">
              <div className="form-field">
                <label htmlFor="name">{STITCH_COPY.contact.nameLabel}</label>
                <input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: sanitizeNameInput(e.target.value) }))}
                  placeholder={STITCH_COPY.contact.namePlaceholder}
                  autoComplete="name"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="email">{STITCH_COPY.contact.emailLabel}</label>
                <input
                  id="email"
                  value={form.email}
                  onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                  placeholder={STITCH_COPY.contact.emailPlaceholder}
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="projectType">{STITCH_COPY.contact.projectTypeLabel}</label>
              <select
                id="projectType"
                value={form.projectType}
                onChange={(e) => setForm((s) => ({ ...s, projectType: e.target.value }))}
              >
                <option value={STITCH_PROJECT_TYPE_DEFAULT}>{STITCH_PROJECT_TYPE_DEFAULT}</option>
                {leadServiceOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-honeypot" aria-hidden="true">
              <label htmlFor="contact-company-website">Company website</label>
              <input
                id="contact-company-website"
                name="website"
                type="text"
                value={form.website}
                onChange={(e) => setForm((s) => ({ ...s, website: e.target.value }))}
                tabIndex={-1}
                autoComplete="off"
                data-testid="contact-honeypot"
              />
            </div>
            <div className="form-field form-field--full">
              <label htmlFor="message">{STITCH_COPY.contact.messageLabel}</label>
              <textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                placeholder={STITCH_COPY.contact.messagePlaceholder}
                required
              />
            </div>
            <div className="form-actions form-actions--start">
              <button className="btn btn-primary stitch-contact-submit" type="submit" disabled={submitting}>
                {submitting ? "Sending…" : STITCH_COPY.contact.submitButton}
              </button>
            </div>
            {error ? (
              <div className="error" role="alert">
                {error}
              </div>
            ) : null}
          </form>

          <ContactSidebarCards />
        </div>
      </section>
    </div>
  );
}
