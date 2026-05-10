import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLead, LeadInput } from "../lib/api";
import PageHeroImmersive from "../components/PageHeroImmersive";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { ROUTES } from "../lib/routes";
import { pageTitle } from "../lib/siteMeta";
import { IconEnvelope, IconMapPin, IconPhone } from "../components/icons";
import {
  sanitizeBudgetInput,
  sanitizeNameInput,
  sanitizeTimelineInput,
  validateBudgetOptional,
  validateEmail,
  validateName,
  validateTimelineOptional,
} from "../lib/contactValidation";
import { LEAD_SERVICE_LABELS } from "../lib/leadServices";
import {
  buildOfficeMapDirectionsUrl,
  buildOfficeMapEmbedUrl,
  buildOfficeMapOpenUrl,
} from "../lib/officeMap";
import { COMMITERS_EMAIL_PRIMARY, COMMITERS_EMAIL_SECONDARY } from "../lib/siteContact";

const officeAddress = "82, Sobhagya Nagar, Nakoda Nagar, Udaipur, Rajasthan, India 313001";

export default function ContactPage() {
  useDocumentTitle(pageTitle("Contact"));

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<Omit<LeadInput, "serviceNeeded"> & { serviceNeeded: LeadInput["serviceNeeded"] }>(
    {
      name: "",
      email: "",
      serviceNeeded: "Website Development",
      budgetRange: "",
      timeline: "",
      referenceLinks: "",
      message: "",
    },
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const nameErr = validateName(form.name);
    const emailErr = validateEmail(form.email);
    const budgetErr = validateBudgetOptional(form.budgetRange ?? "");
    const timelineErr = validateTimelineOptional(form.timeline ?? "");
    const msgErr = !form.message.trim() ? "Please enter a brief description of your requirements." : null;

    const first =
      nameErr ?? emailErr ?? budgetErr ?? timelineErr ?? msgErr ?? null;
    if (first) return setError(first);

    setSubmitting(true);
    try {
      await createLead({
        name: form.name.trim(),
        email: form.email.trim(),
        serviceNeeded: form.serviceNeeded,
        budgetRange: form.budgetRange?.trim() ? form.budgetRange.trim() : undefined,
        timeline: form.timeline?.trim() ? form.timeline.trim() : "Not specified",
        referenceLinks: form.referenceLinks?.trim() ? form.referenceLinks : undefined,
        message: form.message.trim(),
      });
      navigate(ROUTES.thankYou);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Submission failed.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHeroImmersive centered>
        <h1 className="hero-title typography-display">Contact</h1>
        <p className="muted hero-subtext--premium">Tell us what you are building. We read every message.</p>
      </PageHeroImmersive>

      <section className="section section-contact">
        <div className="contact-page-stack mobile-safe-layout" data-testid="contact-layout">
          <form onSubmit={onSubmit} aria-label="Contact form" className="contact-form-card contact-form-premium">
            <h2 className="contact-form-title">Project inquiry</h2>
            <p className="contact-form-intro">A short brief is enough to start the conversation.</p>

            <div className="form-field-grid">
              <div className="form-field">
                <div className="form-field-label-stack">
                  <label htmlFor="name">Name</label>
                </div>
                <input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: sanitizeNameInput(e.target.value) }))}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </div>
              <div className="form-field">
                <div className="form-field-label-stack">
                  <label htmlFor="email">Email</label>
                </div>
                <input
                  id="email"
                  value={form.email}
                  onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="form-field-grid">
              <div className="form-field">
                <div className="form-field-label-stack">
                  <label htmlFor="service">Service</label>
                </div>
                <select
                  id="service"
                  value={form.serviceNeeded}
                  onChange={(e) => setForm((s) => ({ ...s, serviceNeeded: e.target.value as LeadInput["serviceNeeded"] }))}
                >
                  {LEAD_SERVICE_LABELS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <div className="form-field-label-stack">
                  <label htmlFor="budget">Budget range (₹)</label>
                </div>
                <input
                  id="budget"
                  value={form.budgetRange ?? ""}
                  onChange={(e) => setForm((s) => ({ ...s, budgetRange: sanitizeBudgetInput(e.target.value) }))}
                  placeholder="For example 50,000"
                  inputMode="numeric"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="form-field-grid">
              <div className="form-field">
                <div className="form-field-label-stack">
                  <label htmlFor="timeline">Timeline</label>
                </div>
                <input
                  id="timeline"
                  value={form.timeline}
                  onChange={(e) => setForm((s) => ({ ...s, timeline: sanitizeTimelineInput(e.target.value) }))}
                  placeholder="Optional — e.g. 4-8 weeks"
                  autoComplete="off"
                />
              </div>
              <div className="form-field">
                <div className="form-field-label-stack">
                  <label htmlFor="referenceLinks">Reference Links</label>
                </div>
                <input
                  id="referenceLinks"
                  value={form.referenceLinks ?? ""}
                  onChange={(e) => setForm((s) => ({ ...s, referenceLinks: e.target.value }))}
                  placeholder="Optional — URLs or notes"
                />
              </div>
            </div>

            <div className="form-field form-field--full">
              <div className="form-field-label-stack">
                <label htmlFor="message">Message</label>
              </div>
              <textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                placeholder="Goals, audience, and must-have features..."
                required
              />
            </div>

            <div className="form-actions form-actions--start">
              <button className="btn btn-minimal btn-minimal--solid" type="submit" disabled={submitting}>
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </div>

            {error ? (
              <div className="error" role="alert">
                {error}
              </div>
            ) : null}
          </form>

          <div className="contact-bottom contact-bottom-split" data-testid="contact-bottom">
            <div className="contact-bottom-left" data-testid="contact-bottom-left">
              <div className="contact-icons-column" data-testid="contact-strip">
                <a href="tel:+917891646568" className="contact-icon-row">
                  <span className="contact-strip-icon" aria-hidden>
                    <IconPhone width={22} height={22} />
                  </span>
                  <span className="contact-row-value">+91 7891646568</span>
                </a>
                <a href={`mailto:${COMMITERS_EMAIL_PRIMARY}`} className="contact-icon-row">
                  <span className="contact-strip-icon" aria-hidden>
                    <IconEnvelope width={22} height={22} />
                  </span>
                  <span className="contact-row-value">{COMMITERS_EMAIL_PRIMARY}</span>
                </a>
                <a href={`mailto:${COMMITERS_EMAIL_SECONDARY}`} className="contact-icon-row">
                  <span className="contact-strip-icon" aria-hidden>
                    <IconEnvelope width={22} height={22} />
                  </span>
                  <span className="contact-row-value">{COMMITERS_EMAIL_SECONDARY}</span>
                </a>
                <div className="contact-address-with-icon">
                  <span className="contact-strip-icon" aria-hidden>
                    <IconMapPin width={22} height={22} />
                  </span>
                  <p className="muted contact-address-text">{officeAddress}</p>
                </div>
              </div>
            </div>

            <div className="contact-bottom-right" data-testid="contact-bottom-right">
              <div className="office-map-card office-map-card--prominent">
                <iframe
                  title="Udaipur office location map"
                  src={buildOfficeMapEmbedUrl()}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div className="office-map-actions">
                  <a href={buildOfficeMapOpenUrl()} target="_blank" rel="noreferrer noopener" className="quote-link typography-link">
                    Open in Google Maps
                  </a>
                  <a href={buildOfficeMapDirectionsUrl()} target="_blank" rel="noreferrer noopener" className="quote-link typography-link">
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
