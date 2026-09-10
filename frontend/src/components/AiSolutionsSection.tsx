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
import { AI_SOLUTIONS_DISPLAY } from "../lib/aiSolutionsPageDesign";
import {
  AISOL_ARCH_CLASS,
  AISOL_ARCH_GRID_CLASS,
  AISOL_CARD_CLASS,
  AISOL_CARDS_CLASS,
  AISOL_ENGAGE_CLASS,
  AISOL_EYEBROW_CLASS,
  AISOL_FIELD_CLASS,
  AISOL_FORM_CLASS,
  AISOL_HEADLINE_CLASS,
  AISOL_HERO_CHIPS_CLASS,
  AISOL_HERO_CLASS,
  AISOL_HERO_COPY_CLASS,
  AISOL_HERO_VISUAL_CLASS,
  AISOL_INNER_CLASS,
  AISOL_SECTION_CLASS,
  AISOL_STACK_CLASS,
  AISOL_SUBHEAD_CLASS,
} from "../lib/aiSolutionsPageLayout";
import { sanitizeNameInput } from "../lib/contactValidation";
import { resolveTechIconUrl } from "../lib/homeTechStack";
import { ROUTES } from "../lib/routes";
import { validateWebApplicationsLead } from "../lib/webApplicationsLeadGate";
import {
  IconAutomationSpark,
  IconBolt,
  IconCheckCircle,
  IconCloud,
  IconDocument,
  IconLayers,
  IconLock,
  IconShieldCheck,
} from "./icons";

function OfferingIcon({ id }: { id: string }) {
  if (id === "field-back-office-automation") return <IconAutomationSpark width={22} height={22} />;
  if (id === "zero-vendor-lock-in") return <IconShieldCheck width={22} height={22} />;
  return <IconDocument width={22} height={22} />;
}

function ArchitectureIcon({ id }: { id: string }) {
  if (id === "two-tier-policy-gateways") return <IconShieldCheck width={22} height={22} />;
  if (id === "row-level-security-rls") return <IconLock width={22} height={22} />;
  if (id === "vibe-diff-approval") return <IconCheckCircle width={22} height={22} />;
  return <IconLayers width={22} height={22} />;
}

function ChipIcon({ id }: { id: string }) {
  if (id === "automate") return <IconBolt width={16} height={16} />;
  if (id === "secure") return <IconShieldCheck width={16} height={16} />;
  return <IconDocument width={16} height={16} />;
}

function HeroVisual() {
  return (
    <div className={AISOL_HERO_VISUAL_CLASS} aria-hidden="true">
      <p className="aisol-float aisol-float--docs">{AI_SOLUTIONS_DISPLAY.floats[0].title}</p>
      <p className="aisol-float aisol-float--secure">
        <IconShieldCheck width={16} height={16} />
        {AI_SOLUTIONS_DISPLAY.floats[1].title}
      </p>
      <p className="aisol-float aisol-float--scale">
        <IconCloud width={16} height={16} />
        <span>
          <strong>{AI_SOLUTIONS_DISPLAY.floats[2].title}</strong>
          {AI_SOLUTIONS_DISPLAY.floats[2].body}
        </span>
      </p>
      <div className="aisol-paper aisol-paper--gst">GST</div>
      <div className="aisol-paper aisol-paper--pan">PAN</div>
      <div className="aisol-paper aisol-paper--invoice">INVOICE</div>
      <div className="aisol-laptop">
        <div className="aisol-laptop-screen">
          <div className="aisol-dash-side">
            <strong>AI Workflow</strong>
            <span>Document Pipeline</span>
            <span>Verification</span>
            <span>Workflows</span>
            <span>Analytics</span>
            <span>Settings</span>
          </div>
          <div className="aisol-dash-main">
            <p>Document Pipeline</p>
            <span className="aisol-dash-caption">From documents to insights</span>
            <ol>
              <li>
                <i className="aisol-step aisol-step--ingest" />
                Ingest
              </li>
              <li>
                <i className="aisol-step aisol-step--validate" />
                Validate
              </li>
              <li>
                <i className="aisol-step aisol-step--automate" />
                Automate
              </li>
              <li>
                <i className="aisol-step aisol-step--deliver" />
                Deliver
              </li>
            </ol>
          </div>
          <div className="aisol-dash-stat">
            <span>Processing Status</span>
            <div className="aisol-donut">
              <strong>98%</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
          <div className={AISOL_HERO_COPY_CLASS}>
            <p className={AISOL_EYEBROW_CLASS}>{AI_SOLUTIONS_HERO.eyebrow}</p>
            <h1 className={AISOL_HEADLINE_CLASS}>
              {AI_SOLUTIONS_DISPLAY.headlineLead}{" "}
              <span className="aisol-headline-accent">{AI_SOLUTIONS_DISPLAY.headlineAccent}</span>
            </h1>
            <p className={AISOL_SUBHEAD_CLASS}>{AI_SOLUTIONS_HERO.subheadline}</p>
            <a className="btn btn-primary aisol-hero-cta" href="#pipeline-scoping">
              {AI_SOLUTIONS_CTA_LABEL}
              <span aria-hidden="true"> {AI_SOLUTIONS_DISPLAY.ctaPlus}</span>
            </a>
            <ul className={AISOL_HERO_CHIPS_CLASS}>
              {AI_SOLUTIONS_DISPLAY.chips.map((chip) => (
                <li key={chip.id}>
                  <ChipIcon id={chip.id} />
                  {chip.label}
                </li>
              ))}
            </ul>
          </div>
          <HeroVisual />
        </div>

        <ul id="ai-offerings" className={AISOL_CARDS_CLASS} data-testid="ai-solutions-offerings">
          {AI_SOLUTIONS_OFFERINGS.map((card) => (
            <li key={card.id} className={AISOL_CARD_CLASS}>
              <span className="aisol-card-icon" aria-hidden>
                <OfferingIcon id={card.id} />
              </span>
              <h2>{card.title}</h2>
              <p>{card.body}</p>
            </li>
          ))}
        </ul>

        <div className={AISOL_ARCH_CLASS} data-testid="ai-solutions-architecture">
          <p className="aisol-arch-kicker">{AI_SOLUTIONS_ARCHITECTURE_TITLE}</p>
          <h2 className="aisol-arch-title">{AI_SOLUTIONS_DISPLAY.architectureHeading}</h2>
          <ul className={AISOL_ARCH_GRID_CLASS}>
            {AI_SOLUTIONS_ARCHITECTURE.map((card) => (
              <li key={card.id} className={AISOL_CARD_CLASS}>
                <span className="aisol-card-icon" aria-hidden>
                  <ArchitectureIcon id={card.id} />
                </span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={AISOL_STACK_CLASS} data-testid="ai-solutions-stack">
          <p className="aisol-stack-label">Technology & Cloud Stack</p>
          <ul className="aisol-stack-list">
            {AI_SOLUTIONS_STACK.map((item) => (
              <li key={item.id} className="aisol-stack-badge">
                <img src={resolveTechIconUrl({ slug: item.slug, alt: item.label })} alt="" />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
          <p className="aisol-stack-note" aria-hidden>
            {AI_SOLUTIONS_DISPLAY.stackNote}
          </p>
        </div>

        <div className={AISOL_ENGAGE_CLASS}>
          <div className="aisol-engage-copy">
            <p className="aisol-engage-kicker">{AI_SOLUTIONS_DISPLAY.formKicker}</p>
            <h2 id="pipeline-scoping-title">{AI_SOLUTIONS_FORM.title}</h2>
            <p className="aisol-engage-lead">{AI_SOLUTIONS_DISPLAY.formLead}</p>
            <div className="aisol-engage-docs" aria-hidden>
              <span>PDF</span>
              <span>GST</span>
              <span>PAN</span>
            </div>
          </div>
          <form
            id="pipeline-scoping"
            className={AISOL_FORM_CLASS}
            onSubmit={onSubmit}
            aria-label={AI_SOLUTIONS_FORM.title}
            aria-labelledby="pipeline-scoping-title"
          >
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
      </div>
    </section>
  );
}
