import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createLead } from "../lib/api";
import { sanitizeNameInput } from "../lib/contactValidation";
import { ROUTES } from "../lib/routes";
import { validateWebApplicationsLead } from "../lib/webApplicationsLeadGate";
import {
  WEB_APPLICATIONS_CAPABILITIES,
  WEB_APPLICATIONS_CTA_LABEL,
  WEB_APPLICATIONS_FORM,
  WEB_APPLICATIONS_HERO,
  WEB_APPLICATIONS_STANDARDS,
} from "../lib/webApplicationsPageContent";
import {
  WEBAPP_CARD_CLASS,
  WEBAPP_CARDS_CLASS,
  WEBAPP_EYEBROW_CLASS,
  WEBAPP_FIELD_CLASS,
  WEBAPP_FORM_CLASS,
  WEBAPP_HEADLINE_CLASS,
  WEBAPP_HERO_CLASS,
  WEBAPP_INNER_CLASS,
  WEBAPP_SECTION_CLASS,
  WEBAPP_STANDARDS_CLASS,
  WEBAPP_SUBHEAD_CLASS,
} from "../lib/webApplicationsPageLayout";

export default function WebApplicationsSection() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [project, setProject] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const result = validateWebApplicationsLead({ name, email, company, project });
    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      await createLead({
        name: result.payload.name,
        email: result.payload.email,
        serviceNeeded: WEB_APPLICATIONS_FORM.serviceNeeded,
        message: `Company: ${result.payload.company}\n\nProject:\n${result.payload.project}`,
      });
      navigate(ROUTES.thankYou, { state: { submissionView: "client" } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className={WEBAPP_SECTION_CLASS} data-testid="web-applications-section">
      <div className={WEBAPP_INNER_CLASS}>
        <div className={WEBAPP_HERO_CLASS}>
          <p className={WEBAPP_EYEBROW_CLASS}>{WEB_APPLICATIONS_HERO.eyebrow}</p>
          <h1 className={WEBAPP_HEADLINE_CLASS}>{WEB_APPLICATIONS_HERO.headline}</h1>
          <p className={WEBAPP_SUBHEAD_CLASS}>{WEB_APPLICATIONS_HERO.subheadline}</p>
          <a className="btn btn-primary webapp-hero-cta" href="#webapp-project">
            {WEB_APPLICATIONS_CTA_LABEL}
          </a>
        </div>

        <ul className={WEBAPP_CARDS_CLASS} data-testid="web-applications-capabilities">
          {WEB_APPLICATIONS_CAPABILITIES.map((card) => (
            <li key={card.id} className={WEBAPP_CARD_CLASS}>
              <h2>{card.title}</h2>
              <p>{card.body}</p>
            </li>
          ))}
        </ul>

        <ul className={WEBAPP_STANDARDS_CLASS} data-testid="web-applications-standards">
          {WEB_APPLICATIONS_STANDARDS.map((item) => (
            <li key={item.id} className="webapp-standard">
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>

        <form id="webapp-project" className={WEBAPP_FORM_CLASS} onSubmit={onSubmit} aria-label={WEB_APPLICATIONS_FORM.title}>
          <h2>{WEB_APPLICATIONS_FORM.title}</h2>
          <div className={WEBAPP_FIELD_CLASS}>
            <label htmlFor="webapp-name">{WEB_APPLICATIONS_FORM.nameLabel}</label>
            <input
              id="webapp-name"
              value={name}
              onChange={(event) => setName(sanitizeNameInput(event.target.value))}
              placeholder={WEB_APPLICATIONS_FORM.namePlaceholder}
              autoComplete="name"
              required
            />
          </div>
          <div className={WEBAPP_FIELD_CLASS}>
            <label htmlFor="webapp-email">{WEB_APPLICATIONS_FORM.emailLabel}</label>
            <input
              id="webapp-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={WEB_APPLICATIONS_FORM.emailPlaceholder}
              autoComplete="email"
              required
            />
          </div>
          <div className={WEBAPP_FIELD_CLASS}>
            <label htmlFor="webapp-company">{WEB_APPLICATIONS_FORM.companyLabel}</label>
            <input
              id="webapp-company"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              placeholder={WEB_APPLICATIONS_FORM.companyPlaceholder}
              autoComplete="organization"
              required
            />
          </div>
          <div className={WEBAPP_FIELD_CLASS}>
            <label htmlFor="webapp-project-description">{WEB_APPLICATIONS_FORM.projectLabel}</label>
            <textarea
              id="webapp-project-description"
              value={project}
              onChange={(event) => setProject(event.target.value)}
              placeholder={WEB_APPLICATIONS_FORM.projectPlaceholder}
              required
              rows={5}
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Sending…" : WEB_APPLICATIONS_FORM.submitLabel}
          </button>
          {error ? (
            <p className="error" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
