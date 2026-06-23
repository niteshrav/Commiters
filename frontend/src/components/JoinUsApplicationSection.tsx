import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconArrowRight, IconCloudUpload } from "./icons";
import { createJobApplication } from "../lib/api";
import { JOIN_US_PAGE_COPY } from "../lib/joinUsPageContent";
import {
  JOIN_US_FORM_FIELDS_CLASS,
  JOIN_US_FORM_FIELD_SHORT_CLASS,
  JOIN_US_FORM_ROW_CLASS,
  JOIN_US_FORM_SECTION_CLASS,
  JOIN_US_FORM_SECTION_HEADER_CLASS,
  JOIN_US_RESUME_DROPZONE_CLASS,
  STITCH_JOIN_US_FORM_CLASS,
} from "../lib/joinUsPageLayout";
import {
  JOIN_US_POSITION_DEFAULT,
  JOIN_US_POSITION_OPTIONS,
} from "../lib/joinUsPositions";
import {
  JOIN_US_RESUME_ACCEPT,
  readResumeAsBase64,
  validateResumeFile,
} from "../lib/joinUsResumeUpload";
import { ROUTES } from "../lib/routes";
import {
  validateCoverLetter,
  validateEmail,
  validateName,
  validateOptionalUrl,
  validatePhone,
  validatePositionAppliedFor,
  isJoinUsPosition,
} from "../lib/joinUsValidation";

export default function JoinUsApplicationSection() {
  const navigate = useNavigate();
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const { sections, fields, privacyDisclaimer, submitButton } = JOIN_US_PAGE_COPY;
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    positionAppliedFor: JOIN_US_POSITION_DEFAULT as string,
    linkedinProfile: "",
    portfolioGitHub: "",
    coverLetter: "",
  });

  function onResumeSelected(file: File | null) {
    const resumeErr = validateResumeFile(file);
    if (resumeErr) {
      setError(resumeErr);
      setResumeFile(null);
      return;
    }
    setError(null);
    setResumeFile(file);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const nameErr = validateName(form.name);
    const emailErr = validateEmail(form.email);
    const phoneErr = validatePhone(form.phone);
    const positionErr = validatePositionAppliedFor(form.positionAppliedFor);
    const linkedinErr = validateOptionalUrl(form.linkedinProfile, "LinkedIn");
    const portfolioErr = validateOptionalUrl(form.portfolioGitHub, "GitHub");
    const coverLetterErr = validateCoverLetter(form.coverLetter);
    const resumeErr = validateResumeFile(resumeFile);
    const first =
      nameErr ?? emailErr ?? phoneErr ?? positionErr ?? linkedinErr ?? portfolioErr ?? resumeErr ?? coverLetterErr ?? null;
    if (first) return setError(first);

    if (!isJoinUsPosition(form.positionAppliedFor) || !resumeFile) {
      return setError("Please complete all required fields.");
    }

    setSubmitting(true);
    try {
      const resumePdfBase64 = await readResumeAsBase64(resumeFile);
      await createJobApplication({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        positionAppliedFor: form.positionAppliedFor,
        linkedinProfile: form.linkedinProfile.trim(),
        portfolioGitHub: form.portfolioGitHub.trim(),
        coverLetter: form.coverLetter.trim(),
        resumeFileName: resumeFile.name,
        resumePdfBase64,
      });
      navigate(ROUTES.thankYou, { state: { submissionView: "candidate" } });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Submission failed.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Join Us application form"
      className={`card ${STITCH_JOIN_US_FORM_CLASS}`}
      data-testid="join-us-application-form"
    >
      <section
        className={JOIN_US_FORM_SECTION_CLASS}
        data-testid="join-us-form-section-personal"
        aria-labelledby="join-us-form-personal-title"
      >
        <div className={JOIN_US_FORM_SECTION_HEADER_CLASS}>
          <span className="join-us-form-section-number">{sections.personal.number}</span>
          <h2 id="join-us-form-personal-title" className="join-us-form-section-title">
            {sections.personal.title}
          </h2>
        </div>
        <div className={JOIN_US_FORM_FIELDS_CLASS}>
          <div className={JOIN_US_FORM_ROW_CLASS}>
            <div className="form-field">
              <label htmlFor="join-us-name">{fields.nameLabel}</label>
              <input
                id="join-us-name"
                value={form.name}
                onChange={(e) => setForm((state) => ({ ...state, name: e.target.value.replace(/[^a-zA-Z\s'-]/g, "") }))}
                placeholder={fields.namePlaceholder}
                autoComplete="name"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="join-us-email">{fields.emailLabel}</label>
              <input
                id="join-us-email"
                value={form.email}
                onChange={(e) => setForm((state) => ({ ...state, email: e.target.value }))}
                placeholder={fields.emailPlaceholder}
                type="email"
                autoComplete="email"
                required
              />
            </div>
          </div>
          <div className={`form-field ${JOIN_US_FORM_FIELD_SHORT_CLASS}`}>
            <label htmlFor="join-us-phone">{fields.phoneLabel}</label>
            <input
              id="join-us-phone"
              value={form.phone}
              onChange={(e) => setForm((state) => ({ ...state, phone: e.target.value }))}
              placeholder={fields.phonePlaceholder}
              type="tel"
              autoComplete="tel"
              required
            />
          </div>
          <div className={`form-field ${JOIN_US_FORM_FIELD_SHORT_CLASS}`}>
            <label htmlFor="join-us-position">{fields.positionLabel}</label>
            <select
              id="join-us-position"
              value={form.positionAppliedFor}
              onChange={(e) => setForm((state) => ({ ...state, positionAppliedFor: e.target.value }))}
              required
            >
              <option value={JOIN_US_POSITION_DEFAULT}>{JOIN_US_POSITION_DEFAULT}</option>
              {JOIN_US_POSITION_OPTIONS.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section
        className={JOIN_US_FORM_SECTION_CLASS}
        data-testid="join-us-form-section-digital"
        aria-labelledby="join-us-form-digital-title"
      >
        <div className={JOIN_US_FORM_SECTION_HEADER_CLASS}>
          <span className="join-us-form-section-number">{sections.digital.number}</span>
          <h2 id="join-us-form-digital-title" className="join-us-form-section-title">
            {sections.digital.title}
          </h2>
        </div>
        <div className={JOIN_US_FORM_FIELDS_CLASS}>
          <div className="form-field">
            <label htmlFor="join-us-linkedin">{fields.linkedinLabel}</label>
            <input
              id="join-us-linkedin"
              value={form.linkedinProfile}
              onChange={(e) => setForm((state) => ({ ...state, linkedinProfile: e.target.value }))}
              placeholder={fields.linkedinPlaceholder}
              type="url"
            />
          </div>
          <div className="form-field">
            <label htmlFor="join-us-portfolio">{fields.portfolioLabel}</label>
            <input
              id="join-us-portfolio"
              value={form.portfolioGitHub}
              onChange={(e) => setForm((state) => ({ ...state, portfolioGitHub: e.target.value }))}
              placeholder={fields.portfolioPlaceholder}
              type="url"
            />
          </div>
        </div>
      </section>

      <section
        className={JOIN_US_FORM_SECTION_CLASS}
        data-testid="join-us-form-section-credentials"
        aria-labelledby="join-us-form-credentials-title"
      >
        <div className={JOIN_US_FORM_SECTION_HEADER_CLASS}>
          <span className="join-us-form-section-number">{sections.credentials.number}</span>
          <h2 id="join-us-form-credentials-title" className="join-us-form-section-title">
            {sections.credentials.title}
          </h2>
        </div>
        <div className={JOIN_US_FORM_FIELDS_CLASS}>
          <div className="form-field">
            <span className="join-us-field-label" id="join-us-resume-label">
              {fields.resumeLabel}
            </span>
            <button
              type="button"
              className={JOIN_US_RESUME_DROPZONE_CLASS}
              data-testid="join-us-resume-dropzone"
              aria-labelledby="join-us-resume-label join-us-resume-hint"
              onClick={() => resumeInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                onResumeSelected(e.dataTransfer.files[0] ?? null);
              }}
            >
              <span className="join-us-resume-dropzone-icon" aria-hidden>
                <IconCloudUpload width={28} height={28} />
              </span>
              <span id="join-us-resume-hint" className="join-us-resume-dropzone-hint">
                {resumeFile ? resumeFile.name : fields.resumeHint}
              </span>
              <span className="join-us-resume-dropzone-help">{fields.resumeHelp}</span>
            </button>
            <input
              ref={resumeInputRef}
              id="join-us-resume"
              type="file"
              accept={JOIN_US_RESUME_ACCEPT}
              className="join-us-resume-input"
              data-testid="join-us-resume-input"
              onChange={(e) => onResumeSelected(e.target.files?.[0] ?? null)}
            />
          </div>
        </div>
      </section>

      <section
        className={JOIN_US_FORM_SECTION_CLASS}
        data-testid="join-us-form-section-core"
        aria-labelledby="join-us-form-core-title"
      >
        <div className={JOIN_US_FORM_SECTION_HEADER_CLASS}>
          <span className="join-us-form-section-number">{sections.core.number}</span>
          <h2 id="join-us-form-core-title" className="join-us-form-section-title">
            {sections.core.title}
          </h2>
        </div>
        <div className={JOIN_US_FORM_FIELDS_CLASS}>
          <div className="form-field form-field--full">
            <label htmlFor="join-us-cover-letter">{fields.coverLetterLabel}</label>
            <textarea
              id="join-us-cover-letter"
              value={form.coverLetter}
              onChange={(e) => setForm((state) => ({ ...state, coverLetter: e.target.value }))}
              placeholder={fields.coverLetterPlaceholder}
              required
            />
          </div>
        </div>
      </section>

      <p className="join-us-privacy-disclaimer">{privacyDisclaimer}</p>

      <div className="form-actions form-actions--start">
        <button className="btn btn-primary stitch-join-us-submit" type="submit" disabled={submitting}>
          <span>{submitting ? "Sending…" : submitButton}</span>
          {!submitting ? <IconArrowRight width={18} height={18} aria-hidden /> : null}
        </button>
      </div>
      {error ? (
        <div className="error" role="alert">
          {error}
        </div>
      ) : null}
    </form>
  );
}
