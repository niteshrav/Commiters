import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createLead } from "../lib/api";
import { sanitizeNameInput } from "../lib/contactValidation";
import { FROSTED_GLASS_CLASS_NAME } from "../lib/frostedGlass";
import { resolveTechIconUrl, TECH_LOCAL_ICONS } from "../lib/homeTechStack";
import { ROUTES } from "../lib/routes";
import { validateWebApplicationsLead } from "../lib/webApplicationsLeadGate";
import { WEB_APPLICATIONS_DISPLAY } from "../lib/webApplicationsPageDesign";
import {
  WEB_APPLICATIONS_CAPABILITIES,
  WEB_APPLICATIONS_CTA_LABEL,
  WEB_APPLICATIONS_FORM,
  WEB_APPLICATIONS_HERO,
  WEB_APPLICATIONS_STACK,
} from "../lib/webApplicationsPageContent";
import {
  WEBAPP_CARD_CLASS,
  WEBAPP_CARDS_CLASS,
  WEBAPP_ENGAGE_CLASS,
  WEBAPP_EYEBROW_CLASS,
  WEBAPP_FIELD_CLASS,
  WEBAPP_FORM_CLASS,
  WEBAPP_HEADLINE_CLASS,
  WEBAPP_HERO_CHIPS_CLASS,
  WEBAPP_HERO_CLASS,
  WEBAPP_HERO_COPY_CLASS,
  WEBAPP_HERO_VISUAL_CLASS,
  WEBAPP_INNER_CLASS,
  WEBAPP_SECTION_CLASS,
  WEBAPP_STACK_CLASS,
  WEBAPP_SUBHEAD_CLASS,
} from "../lib/webApplicationsPageLayout";
import {
  IconBolt,
  IconBrowserWindow,
  IconChartLine,
  IconCheckCircle,
  IconCloud,
  IconCodeBracket,
  IconLock,
  IconShieldCheck,
} from "./icons";

function ChipIcon({ id }: { id: string }) {
  if (id === "debt") return <IconShieldCheck width={18} height={18} />;
  if (id === "stack") return <IconCloud width={18} height={18} />;
  return <IconBolt width={18} height={18} />;
}

function CapabilityIcon({ id }: { id: string }) {
  if (id === "declarative-ui-a2ui") return <IconCodeBracket width={22} height={22} />;
  if (id === "database-security-rls") return <IconShieldCheck width={22} height={22} />;
  if (id === "cicd-policy-enforcement") return <IconLock width={22} height={22} />;
  return <IconBrowserWindow width={22} height={22} />;
}

function stackIconSrc(item: (typeof WEB_APPLICATIONS_STACK)[number]) {
  if ("slug" in item && item.slug) {
    return resolveTechIconUrl({ slug: item.slug, alt: item.label });
  }
  if (item.id === "mcp") {
    return resolveTechIconUrl({ slug: "mcp", alt: item.label, iconSrc: TECH_LOCAL_ICONS.mcp });
  }
  return null;
}

function HeroVisual() {
  return (
    <div className={WEBAPP_HERO_VISUAL_CLASS} aria-hidden="true">
      <p className="webapp-float webapp-float--spec">{WEB_APPLICATIONS_DISPLAY.floats[0].title}</p>
      <ul className="webapp-checks">
        {WEB_APPLICATIONS_DISPLAY.checks.map((item) => (
          <li key={item}>
            <IconCheckCircle width={14} height={14} />
            {item}
          </li>
        ))}
      </ul>
      <div className="webapp-cloud" />
      <ol className="webapp-tower">
        {WEB_APPLICATIONS_DISPLAY.tower.map((layer) => (
          <li key={layer}>{layer}</li>
        ))}
      </ol>
      <p className="webapp-float webapp-float--deploy">
        <IconChartLine width={16} height={16} />
        {WEB_APPLICATIONS_DISPLAY.floats[1].title}
      </p>
    </div>
  );
}

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
          <div className={WEBAPP_HERO_COPY_CLASS}>
            <p className={WEBAPP_EYEBROW_CLASS}>{WEB_APPLICATIONS_HERO.eyebrow}</p>
            <h1 className={WEBAPP_HEADLINE_CLASS}>
              <span className="webapp-headline-lead">{WEB_APPLICATIONS_DISPLAY.headlineLead}</span>{" "}
              <span className="webapp-headline-accent">{WEB_APPLICATIONS_DISPLAY.headlineAccent}</span>
            </h1>
            <p className={WEBAPP_SUBHEAD_CLASS}>{WEB_APPLICATIONS_HERO.subheadline}</p>
            <div className="webapp-hero-actions">
              <a className="btn btn-primary webapp-hero-cta" href="#webapp-project">
                {WEB_APPLICATIONS_CTA_LABEL}
                <span aria-hidden="true"> {WEB_APPLICATIONS_DISPLAY.ctaArrow}</span>
              </a>
              <Link className="btn btn-secondary webapp-hero-secondary" to={ROUTES.caseStudies}>
                {WEB_APPLICATIONS_DISPLAY.sampleWorkLabel}
              </Link>
            </div>
            <ul className={WEBAPP_HERO_CHIPS_CLASS}>
              {WEB_APPLICATIONS_DISPLAY.chips.map((chip) => (
                <li key={chip.id}>
                  <ChipIcon id={chip.id} />
                  <span>
                    <strong>{chip.title}</strong>
                    {chip.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <HeroVisual />
        </div>

        <div className="webapp-deliver">
          <p className="webapp-deliver-kicker">{WEB_APPLICATIONS_DISPLAY.deliverKicker}</p>
          <h2 className="webapp-deliver-title">{WEB_APPLICATIONS_DISPLAY.deliverHeading}</h2>
          <p className="webapp-deliver-lead">{WEB_APPLICATIONS_DISPLAY.deliverLead}</p>
          <ul className={WEBAPP_CARDS_CLASS} data-testid="web-applications-capabilities">
            {WEB_APPLICATIONS_CAPABILITIES.map((card) => (
              <li key={card.id} className={`${WEBAPP_CARD_CLASS} ${FROSTED_GLASS_CLASS_NAME}`}>
                <span className="webapp-card-icon" aria-hidden>
                  <CapabilityIcon id={card.id} />
                </span>
                <h2>{card.title}</h2>
                <p>{card.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${WEBAPP_STACK_CLASS} ${FROSTED_GLASS_CLASS_NAME}`} data-testid="web-applications-stack">
          <p className="webapp-stack-label">Stack Highlights</p>
          <h2 className="webapp-stack-title">{WEB_APPLICATIONS_DISPLAY.stackHeading}</h2>
          <p className="webapp-stack-note">{WEB_APPLICATIONS_DISPLAY.stackNote}</p>
          <ul className="webapp-stack-list">
            {WEB_APPLICATIONS_STACK.map((item) => {
              const src = stackIconSrc(item);
              return (
                <li key={item.id} className="webapp-stack-badge">
                  {src ? <img src={src} alt="" /> : null}
                  <span>{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={WEBAPP_ENGAGE_CLASS}>
          <div className="webapp-engage-copy">
            <p className="webapp-engage-kicker">{WEB_APPLICATIONS_DISPLAY.formKicker}</p>
            <h2 id="webapp-project-title">{WEB_APPLICATIONS_FORM.title}</h2>
            <p className="webapp-engage-lead">{WEB_APPLICATIONS_DISPLAY.formLead}</p>
            <div className="webapp-engage-visual" aria-hidden>
              <ul className="webapp-engage-checks">
                {WEB_APPLICATIONS_DISPLAY.formChecks.map((item) => (
                  <li key={item}>
                    <IconCheckCircle width={16} height={16} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="webapp-engage-aside">{WEB_APPLICATIONS_DISPLAY.formAside}</p>
              <span className="webapp-engage-code">
                <IconCodeBracket width={22} height={22} />
              </span>
            </div>
          </div>
          <form
            id="webapp-project"
            className={`${WEBAPP_FORM_CLASS} ${FROSTED_GLASS_CLASS_NAME}`}
            onSubmit={onSubmit}
            aria-label={WEB_APPLICATIONS_FORM.title}
            aria-labelledby="webapp-project-title"
          >
            <div className={WEBAPP_FIELD_CLASS}>
              <label htmlFor="webapp-engagement-scope">{WEB_APPLICATIONS_FORM.scopeLabel}</label>
              <input id="webapp-engagement-scope" value={WEB_APPLICATIONS_FORM.serviceNeeded} readOnly />
            </div>
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
              {submitting ? null : <span aria-hidden="true"> {WEB_APPLICATIONS_DISPLAY.ctaArrow}</span>}
            </button>
            <p className="webapp-privacy">
              <IconLock width={14} height={14} aria-hidden />
              {WEB_APPLICATIONS_DISPLAY.privacyNote}
            </p>
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
