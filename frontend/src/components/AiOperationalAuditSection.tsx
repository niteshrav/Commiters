import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createLead } from "../lib/api";
import { validateAiOperationalAuditLead } from "../lib/aiOperationalAuditLeadGate";
import { AI_OPERATIONAL_AUDIT_DISPLAY } from "../lib/aiOperationalAuditPageDesign";
import {
  AI_OPERATIONAL_AUDIT_CTA_LABEL,
  AI_OPERATIONAL_AUDIT_DIAGNOSE,
  AI_OPERATIONAL_AUDIT_DIAGNOSE_TITLE,
  AI_OPERATIONAL_AUDIT_FORM,
  AI_OPERATIONAL_AUDIT_GOVERNANCE,
  AI_OPERATIONAL_AUDIT_HERO,
  AI_OPERATIONAL_AUDIT_PRICING,
  AI_OPERATIONAL_AUDIT_PROCESS,
  AI_OPERATIONAL_AUDIT_PROCESS_TITLE,
} from "../lib/aiOperationalAuditPageContent";
import {
  AUDIT_CARD_CLASS,
  AUDIT_CARDS_CLASS,
  AUDIT_ENGAGE_CLASS,
  AUDIT_EYEBROW_CLASS,
  AUDIT_FIELD_CLASS,
  AUDIT_FORM_CLASS,
  AUDIT_GOVERNANCE_CLASS,
  AUDIT_HEADLINE_CLASS,
  AUDIT_HERO_CHIPS_CLASS,
  AUDIT_HERO_CLASS,
  AUDIT_HERO_COPY_CLASS,
  AUDIT_HERO_VISUAL_CLASS,
  AUDIT_INNER_CLASS,
  AUDIT_PRICING_CLASS,
  AUDIT_SECTION_CLASS,
  AUDIT_SUBHEAD_CLASS,
  AUDIT_TIMELINE_CLASS,
} from "../lib/aiOperationalAuditPageLayout";
import { sanitizeNameInput } from "../lib/contactValidation";
import { FROSTED_GLASS_CLASS_NAME } from "../lib/frostedGlass";
import { ROUTES } from "../lib/routes";
import {
  IconBolt,
  IconChartLine,
  IconCheckCircle,
  IconCloud,
  IconDatabase,
  IconDocument,
  IconList,
  IconLock,
  IconShieldCheck,
  IconTarget,
  IconWorkflow,
} from "./icons";

function ChipIcon({ id }: { id: string }) {
  if (id === "prioritize") return <IconBolt width={16} height={16} />;
  if (id === "govern") return <IconShieldCheck width={16} height={16} />;
  return <IconDocument width={16} height={16} />;
}

function DiagnoseIcon({ id }: { id: string }) {
  if (id === "workflow-security-policy-gaps") return <IconWorkflow width={22} height={22} />;
  if (id === "automation-roi-roadmap") return <IconChartLine width={22} height={22} />;
  return <IconList width={22} height={22} />;
}

function HeroVisual() {
  return (
    <div className={AUDIT_HERO_VISUAL_CLASS} aria-hidden="true">
      <p className="audit-float audit-float--spreadsheets">
        <IconList width={16} height={16} />
        {AI_OPERATIONAL_AUDIT_DISPLAY.floats[0].title}
      </p>
      <p className="audit-float audit-float--manual">
        <IconDocument width={16} height={16} />
        {AI_OPERATIONAL_AUDIT_DISPLAY.floats[1].title}
      </p>
      <p className="audit-float audit-float--legacy">
        <IconDatabase width={16} height={16} />
        {AI_OPERATIONAL_AUDIT_DISPLAY.floats[2].title}
      </p>
      <p className="audit-float audit-float--cloud">
        <IconCloud width={16} height={16} />
        {AI_OPERATIONAL_AUDIT_DISPLAY.floats[3].title}
      </p>
      <p className="audit-float audit-float--insight">
        <IconChartLine width={16} height={16} />
        {AI_OPERATIONAL_AUDIT_DISPLAY.floats[4].title}
      </p>
      <p className="audit-float audit-float--note">{AI_OPERATIONAL_AUDIT_DISPLAY.floats[5].title}</p>
      <div className="audit-cube">
        <strong>AI</strong>
        <span>Audit</span>
      </div>
    </div>
  );
}

export default function AiOperationalAuditSection() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [bottleneck, setBottleneck] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const result = validateAiOperationalAuditLead({ name, email, company, bottleneck });
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
        serviceNeeded: AI_OPERATIONAL_AUDIT_FORM.serviceNeeded,
        budgetRange: AI_OPERATIONAL_AUDIT_FORM.budgetRange,
        timeline: AI_OPERATIONAL_AUDIT_FORM.timeline,
        message: `Company: ${result.payload.company}\n\nBottleneck:\n${result.payload.bottleneck}`,
      });
      navigate(ROUTES.thankYou, { state: { submissionView: "client" } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className={AUDIT_SECTION_CLASS} data-testid="ai-operational-audit-section">
      <div className={AUDIT_INNER_CLASS}>
        <div className={AUDIT_HERO_CLASS}>
          <div className={AUDIT_HERO_COPY_CLASS}>
            <p className={AUDIT_EYEBROW_CLASS}>{AI_OPERATIONAL_AUDIT_HERO.eyebrow}</p>
            <h1 className={AUDIT_HEADLINE_CLASS}>
              {AI_OPERATIONAL_AUDIT_DISPLAY.headlineLead}{" "}
              <span className="audit-headline-accent">{AI_OPERATIONAL_AUDIT_DISPLAY.headlineAccent}</span>
            </h1>
            <p className="audit-tagline">{AI_OPERATIONAL_AUDIT_DISPLAY.tagline}</p>
            <p className={AUDIT_SUBHEAD_CLASS}>{AI_OPERATIONAL_AUDIT_HERO.subheadline}</p>
            <a className="btn btn-primary audit-hero-cta" href="#audit-booking">
              {AI_OPERATIONAL_AUDIT_CTA_LABEL}
              <span aria-hidden="true"> {AI_OPERATIONAL_AUDIT_DISPLAY.ctaArrow}</span>
            </a>
            <ul className={AUDIT_HERO_CHIPS_CLASS}>
              {AI_OPERATIONAL_AUDIT_DISPLAY.chips.map((chip) => (
                <li key={chip.id}>
                  <ChipIcon id={chip.id} />
                  {chip.label}
                </li>
              ))}
            </ul>
          </div>
          <HeroVisual />
        </div>

        <div className="audit-diagnose-block">
          <h2 id="audit-diagnose-title">{AI_OPERATIONAL_AUDIT_DIAGNOSE_TITLE}</h2>
          <p className="audit-block-lead">{AI_OPERATIONAL_AUDIT_DISPLAY.diagnoseLead}</p>
          <ul className={AUDIT_CARDS_CLASS} data-testid="audit-diagnose" aria-labelledby="audit-diagnose-title">
            {AI_OPERATIONAL_AUDIT_DIAGNOSE.map((card) => (
              <li key={card.id} className={`${AUDIT_CARD_CLASS} ${FROSTED_GLASS_CLASS_NAME}`}>
                <span className="audit-card-icon" aria-hidden>
                  <DiagnoseIcon id={card.id} />
                </span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="audit-process-block">
          <h2 id="audit-process-title">{AI_OPERATIONAL_AUDIT_PROCESS_TITLE}</h2>
          <p className="audit-block-lead">{AI_OPERATIONAL_AUDIT_DISPLAY.processLead}</p>
          <ol className={AUDIT_TIMELINE_CLASS} data-testid="audit-process" aria-labelledby="audit-process-title">
            {AI_OPERATIONAL_AUDIT_PROCESS.map((step) => (
              <li key={step.id} className={`audit-timeline-step ${FROSTED_GLASS_CLASS_NAME}`}>
                <span className="audit-timeline-week">{step.week}</span>
                <p>{step.body}</p>
                <span className="audit-timeline-note">{AI_OPERATIONAL_AUDIT_DISPLAY.processNotes[step.id]}</span>
              </li>
            ))}
          </ol>
        </div>

        <aside className={`${AUDIT_GOVERNANCE_CLASS} ${FROSTED_GLASS_CLASS_NAME}`} data-testid="audit-governance">
          <span className="audit-gov-icon" aria-hidden>
            <IconTarget width={28} height={28} />
          </span>
          <div>
            <h2>{AI_OPERATIONAL_AUDIT_GOVERNANCE.title}</h2>
            <p>{AI_OPERATIONAL_AUDIT_GOVERNANCE.body}</p>
          </div>
          <p className="audit-gov-note" aria-hidden>
            {AI_OPERATIONAL_AUDIT_DISPLAY.governanceNote}
          </p>
        </aside>

        <aside className={`${AUDIT_PRICING_CLASS} ${FROSTED_GLASS_CLASS_NAME}`} data-testid="audit-pricing">
          <h2>{AI_OPERATIONAL_AUDIT_PRICING.title}</h2>
          <p className="audit-pricing-engagement">{AI_OPERATIONAL_AUDIT_PRICING.engagement}</p>
          <p className="audit-pricing-range">
            <IconLock width={18} height={18} aria-hidden />
            {AI_OPERATIONAL_AUDIT_PRICING.range}
          </p>
          <p>{AI_OPERATIONAL_AUDIT_PRICING.summary}</p>
        </aside>

        <div className={AUDIT_ENGAGE_CLASS}>
          <div className="audit-engage-copy">
            <p className="audit-engage-kicker">{AI_OPERATIONAL_AUDIT_DISPLAY.formKicker}</p>
            <h2 id="audit-booking-title">{AI_OPERATIONAL_AUDIT_FORM.title}</h2>
            <p className="audit-engage-lead">{AI_OPERATIONAL_AUDIT_DISPLAY.formLead}</p>
            <div className="audit-engage-visual" aria-hidden>
              <div className="audit-engage-sheet" />
              <ul className="audit-engage-checks">
                {AI_OPERATIONAL_AUDIT_DISPLAY.formChecks.map((item) => (
                  <li key={item}>
                    <IconCheckCircle width={16} height={16} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="audit-engage-aside">{AI_OPERATIONAL_AUDIT_DISPLAY.formAside}</p>
            </div>
          </div>
          <form
            id="audit-booking"
            className={`${AUDIT_FORM_CLASS} ${FROSTED_GLASS_CLASS_NAME}`}
            onSubmit={onSubmit}
            aria-label="AI Operational Audit booking"
            aria-labelledby="audit-booking-title"
          >
            <div className={AUDIT_FIELD_CLASS}>
              <label htmlFor="audit-scope">{AI_OPERATIONAL_AUDIT_FORM.scopeLabel}</label>
              <input id="audit-scope" value={AI_OPERATIONAL_AUDIT_FORM.serviceNeeded} readOnly />
            </div>
            <div className={AUDIT_FIELD_CLASS}>
              <label htmlFor="audit-name">{AI_OPERATIONAL_AUDIT_FORM.nameLabel}</label>
              <input
                id="audit-name"
                value={name}
                onChange={(event) => setName(sanitizeNameInput(event.target.value))}
                placeholder={AI_OPERATIONAL_AUDIT_FORM.namePlaceholder}
                autoComplete="name"
                required
              />
            </div>
            <div className={AUDIT_FIELD_CLASS}>
              <label htmlFor="audit-email">{AI_OPERATIONAL_AUDIT_FORM.emailLabel}</label>
              <input
                id="audit-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={AI_OPERATIONAL_AUDIT_FORM.emailPlaceholder}
                autoComplete="email"
                required
              />
            </div>
            <div className={AUDIT_FIELD_CLASS}>
              <label htmlFor="audit-company">{AI_OPERATIONAL_AUDIT_FORM.companyLabel}</label>
              <input
                id="audit-company"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                placeholder={AI_OPERATIONAL_AUDIT_FORM.companyPlaceholder}
                autoComplete="organization"
                required
              />
            </div>
            <div className={AUDIT_FIELD_CLASS}>
              <label htmlFor="audit-bottleneck">{AI_OPERATIONAL_AUDIT_FORM.bottleneckLabel}</label>
              <textarea
                id="audit-bottleneck"
                value={bottleneck}
                onChange={(event) => setBottleneck(event.target.value)}
                placeholder={AI_OPERATIONAL_AUDIT_FORM.bottleneckPlaceholder}
                required
                rows={5}
              />
            </div>
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Sending…" : AI_OPERATIONAL_AUDIT_FORM.submitLabel}
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
