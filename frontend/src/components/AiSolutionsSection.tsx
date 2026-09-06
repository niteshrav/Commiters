import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createLead } from "../lib/api";
import {
  AI_SOLUTIONS_ARCHITECTURE,
  AI_SOLUTIONS_ARCHITECTURE_TITLE,
  AI_SOLUTIONS_CTA_LABEL,
  AI_SOLUTIONS_FORM,
  AI_SOLUTIONS_HERO,
  AI_SOLUTIONS_OFFERINGS,
  AI_SOLUTIONS_STACK,
} from "../lib/aiSolutionsPageContent";
import {
  AISOL_ARCH_CLASS,
  AISOL_ARCH_GRID_CLASS,
  AISOL_CARD_CLASS,
  AISOL_CARDS_CLASS,
  AISOL_EYEBROW_CLASS,
  AISOL_FIELD_CLASS,
  AISOL_FORM_CLASS,
  AISOL_HEADLINE_CLASS,
  AISOL_HERO_CLASS,
  AISOL_INNER_CLASS,
  AISOL_SECTION_CLASS,
  AISOL_STACK_CLASS,
  AISOL_SUBHEAD_CLASS,
} from "../lib/aiSolutionsPageLayout";
import { sanitizeNameInput } from "../lib/contactValidation";
import { FROSTED_GLASS_CLASS_NAME } from "../lib/frostedGlass";
import { resolveTechIconUrl } from "../lib/homeTechStack";
import { ROUTES } from "../lib/routes";
import { validateWebApplicationsLead } from "../lib/webApplicationsLeadGate";

export default function AiSolutionsSection() {
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
        serviceNeeded: AI_SOLUTIONS_FORM.serviceNeeded,
        message: `Company: ${result.payload.company}\n\nScope:\n${result.payload.project}`,
      });
      navigate(ROUTES.thankYou, { state: { submissionView: "client" } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className={AISOL_SECTION_CLASS} data-testid="ai-solutions-section">
      <div className={AISOL_INNER_CLASS}>
        <div className={AISOL_HERO_CLASS}>
          <p className={AISOL_EYEBROW_CLASS}>{AI_SOLUTIONS_HERO.eyebrow}</p>
          <h1 className={AISOL_HEADLINE_CLASS}>{AI_SOLUTIONS_HERO.headline}</h1>
          <p className={AISOL_SUBHEAD_CLASS}>{AI_SOLUTIONS_HERO.subheadline}</p>
          <a className="btn btn-primary aisol-hero-cta" href="#pipeline-scoping">
            {AI_SOLUTIONS_CTA_LABEL}
          </a>
        </div>

        <ul id="ai-offerings" className={AISOL_CARDS_CLASS} data-testid="ai-solutions-offerings">
          {AI_SOLUTIONS_OFFERINGS.map((card) => (
            <li key={card.id} className={`${AISOL_CARD_CLASS} ${FROSTED_GLASS_CLASS_NAME}`}>
              <h2>{card.title}</h2>
              <p>{card.body}</p>
            </li>
          ))}
        </ul>

        <div className={AISOL_ARCH_CLASS} data-testid="ai-solutions-architecture">
          <h2 className="aisol-arch-title">{AI_SOLUTIONS_ARCHITECTURE_TITLE}</h2>
          <ul className={AISOL_ARCH_GRID_CLASS}>
            {AI_SOLUTIONS_ARCHITECTURE.map((card) => (
              <li key={card.id} className={`${AISOL_CARD_CLASS} ${FROSTED_GLASS_CLASS_NAME}`}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${AISOL_STACK_CLASS} ${FROSTED_GLASS_CLASS_NAME}`} data-testid="ai-solutions-stack">
          <p className="aisol-stack-label">Technology & Cloud Stack</p>
          <ul className="aisol-stack-list">
            {AI_SOLUTIONS_STACK.map((item) => (
              <li key={item.id} className="aisol-stack-badge">
                <img src={resolveTechIconUrl({ slug: item.slug, alt: item.label })} alt="" />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <form
          id="pipeline-scoping"
          className={`${AISOL_FORM_CLASS} ${FROSTED_GLASS_CLASS_NAME}`}
          onSubmit={onSubmit}
          aria-label={AI_SOLUTIONS_FORM.title}
        >
          <h2>{AI_SOLUTIONS_FORM.title}</h2>
          <div className={AISOL_FIELD_CLASS}>
            <label htmlFor="pipeline-engagement-scope">{AI_SOLUTIONS_FORM.scopeLabel}</label>
            <input id="pipeline-engagement-scope" value={AI_SOLUTIONS_FORM.serviceNeeded} readOnly />
          </div>
          <div className={AISOL_FIELD_CLASS}>
            <label htmlFor="pipeline-name">{AI_SOLUTIONS_FORM.nameLabel}</label>
            <input
              id="pipeline-name"
              value={name}
              onChange={(event) => setName(sanitizeNameInput(event.target.value))}
              placeholder={AI_SOLUTIONS_FORM.namePlaceholder}
              autoComplete="name"
              required
            />
          </div>
          <div className={AISOL_FIELD_CLASS}>
            <label htmlFor="pipeline-email">{AI_SOLUTIONS_FORM.emailLabel}</label>
            <input
              id="pipeline-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={AI_SOLUTIONS_FORM.emailPlaceholder}
              autoComplete="email"
              required
            />
          </div>
          <div className={AISOL_FIELD_CLASS}>
            <label htmlFor="pipeline-company">{AI_SOLUTIONS_FORM.companyLabel}</label>
            <input
              id="pipeline-company"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              placeholder={AI_SOLUTIONS_FORM.companyPlaceholder}
              autoComplete="organization"
              required
            />
          </div>
          <div className={AISOL_FIELD_CLASS}>
            <label htmlFor="pipeline-scope">{AI_SOLUTIONS_FORM.projectLabel}</label>
            <textarea
              id="pipeline-scope"
              value={project}
              onChange={(event) => setProject(event.target.value)}
              placeholder={AI_SOLUTIONS_FORM.projectPlaceholder}
              required
              rows={5}
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Sending…" : AI_SOLUTIONS_FORM.submitLabel}
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
