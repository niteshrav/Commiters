import React, { useEffect, useId, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createLead, type LeadInput } from "../lib/api";
import {
  sanitizeNameInput,
  validateEmail,
  validateName,
} from "../lib/contactValidation";
import { LEAD_SERVICE_LABELS } from "../lib/leadServices";
import { ROUTES } from "../lib/routes";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function QuickInquiryModal({ open, onClose }: Props) {
  const navigate = useNavigate();
  const titleId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<{
    name: string;
    email: string;
    serviceNeeded: LeadInput["serviceNeeded"];
    message: string;
  }>({
    name: "",
    email: "",
    serviceNeeded: "Website Development",
    message: "",
  });

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setError(null);
      setSubmitting(false);
    }
  }, [open]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const nameErr = validateName(form.name);
    const emailErr = validateEmail(form.email);
    const msgErr = !form.message.trim() ? "Please describe what you need." : null;

    const first = nameErr ?? emailErr ?? msgErr;
    if (first) return setError(first);

    setSubmitting(true);
    try {
      await createLead({
        name: form.name.trim(),
        email: form.email.trim(),
        serviceNeeded: form.serviceNeeded,
        timeline: "Quick inquiry",
        message: `[Quick inquiry — site widget]\n\n${form.message.trim()}`,
      });
      onClose();
      navigate(ROUTES.thankYou);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Submission failed.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="quick-inquiry-backdrop"
      role="presentation"
      onClick={onClose}
      data-testid="quick-inquiry-backdrop"
    >
      <div
        className="quick-inquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-testid="quick-inquiry-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="quick-inquiry-modal__header">
          <h2 id={titleId} className="quick-inquiry-modal__title">
            Quick inquiry
          </h2>
          <button type="button" className="quick-inquiry-modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <p className="quick-inquiry-modal__hint">
          Same lead pipeline as the full form — fewer fields for speed. Need more detail?{" "}
          <Link to={ROUTES.contact} onClick={onClose}>
            Full project inquiry
          </Link>
        </p>

        <form onSubmit={onSubmit} className="quick-inquiry-form" aria-label="Quick inquiry form">
          {error ? (
            <p className="quick-inquiry-form__error" role="alert">
              {error}
            </p>
          ) : null}

          <div className="form-field">
            <label htmlFor="qi-name">Name</label>
            <input
              ref={firstFieldRef}
              id="qi-name"
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: sanitizeNameInput(e.target.value) }))}
              autoComplete="name"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="qi-email">Email</label>
            <input
              id="qi-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="qi-service">Service</label>
            <select
              id="qi-service"
              value={form.serviceNeeded}
              onChange={(e) =>
                setForm((s) => ({ ...s, serviceNeeded: e.target.value as LeadInput["serviceNeeded"] }))
              }
            >
              {LEAD_SERVICE_LABELS.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="qi-message">What do you need?</label>
            <textarea
              id="qi-message"
              rows={4}
              value={form.message}
              onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
              placeholder="Brief project description"
              required
            />
          </div>

          <div className="quick-inquiry-form__actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Sending…" : "Send inquiry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
