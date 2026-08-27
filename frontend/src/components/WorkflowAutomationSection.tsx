import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createLead } from "../lib/api";
import { sanitizeNameInput } from "../lib/contactValidation";
import { ROUTES } from "../lib/routes";
import { validateWorkflowAutomationLead } from "../lib/workflowAutomationLeadGate";
import {
  WORKFLOW_AUTOMATION_CTA_LABEL,
  WORKFLOW_AUTOMATION_FORM,
  WORKFLOW_AUTOMATION_HERO,
  WORKFLOW_AUTOMATION_PIPELINE,
  WORKFLOW_AUTOMATION_SOLUTIONS,
} from "../lib/workflowAutomationPageContent";
import {
  WFLOW_CARD_CLASS,
  WFLOW_EYEBROW_CLASS,
  WFLOW_FIELD_CLASS,
  WFLOW_FORM_CLASS,
  WFLOW_HEADLINE_CLASS,
  WFLOW_HERO_CLASS,
  WFLOW_INNER_CLASS,
  WFLOW_PIPELINE_CLASS,
  WFLOW_SECTION_CLASS,
  WFLOW_SOLUTIONS_CLASS,
  WFLOW_SUBHEAD_CLASS,
} from "../lib/workflowAutomationPageLayout";

export default function WorkflowAutomationSection() {
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

    const result = validateWorkflowAutomationLead({ name, email, company, bottleneck });
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
        serviceNeeded: WORKFLOW_AUTOMATION_FORM.serviceNeeded,
        budgetRange: WORKFLOW_AUTOMATION_FORM.budgetRange,
        timeline: WORKFLOW_AUTOMATION_FORM.timeline,
        message: `Source: Workflow automation landing\nCompany: ${result.payload.company}\n\nBottleneck:\n${result.payload.bottleneck}`,
      });
      navigate(ROUTES.thankYou, { state: { submissionView: "client" } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className={WFLOW_SECTION_CLASS} data-testid="workflow-automation-section">
      <div className={WFLOW_INNER_CLASS}>
        <div className={WFLOW_HERO_CLASS}>
          <p className={WFLOW_EYEBROW_CLASS}>{WORKFLOW_AUTOMATION_HERO.eyebrow}</p>
          <h1 className={WFLOW_HEADLINE_CLASS}>{WORKFLOW_AUTOMATION_HERO.headline}</h1>
          <p className={WFLOW_SUBHEAD_CLASS}>{WORKFLOW_AUTOMATION_HERO.subheadline}</p>
          <a className="btn btn-primary wflow-hero-cta" href="#workflow-audit">
            {WORKFLOW_AUTOMATION_CTA_LABEL}
          </a>
        </div>

        <ul className={WFLOW_SOLUTIONS_CLASS} data-testid="workflow-automation-solutions">
          {WORKFLOW_AUTOMATION_SOLUTIONS.map((card) => (
            <li key={card.id} className={WFLOW_CARD_CLASS}>
              <h2>{card.title}</h2>
              <p>{card.body}</p>
            </li>
          ))}
        </ul>

        <ol
          className={WFLOW_PIPELINE_CLASS}
          data-testid="workflow-automation-pipeline"
          aria-label="Automation pipeline"
        >
          {WORKFLOW_AUTOMATION_PIPELINE.map((step) => (
            <li key={step.id} className="wflow-pipeline-step">
              <p className="wflow-pipeline-node">{step.title}</p>
            </li>
          ))}
        </ol>

        <form
          id="workflow-audit"
          className={WFLOW_FORM_CLASS}
          onSubmit={onSubmit}
          aria-label={WORKFLOW_AUTOMATION_FORM.title}
        >
          <h2>{WORKFLOW_AUTOMATION_FORM.title}</h2>
          <p className="wflow-form-intro">{WORKFLOW_AUTOMATION_FORM.intro}</p>
          <Link className="wflow-audit-link" to={WORKFLOW_AUTOMATION_FORM.auditTo}>
            {WORKFLOW_AUTOMATION_FORM.auditLinkLabel}
          </Link>
          <div className={WFLOW_FIELD_CLASS}>
            <label htmlFor="wflow-name">{WORKFLOW_AUTOMATION_FORM.nameLabel}</label>
            <input
              id="wflow-name"
              value={name}
              onChange={(event) => setName(sanitizeNameInput(event.target.value))}
              placeholder={WORKFLOW_AUTOMATION_FORM.namePlaceholder}
              autoComplete="name"
              required
            />
          </div>
          <div className={WFLOW_FIELD_CLASS}>
            <label htmlFor="wflow-email">{WORKFLOW_AUTOMATION_FORM.emailLabel}</label>
            <input
              id="wflow-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={WORKFLOW_AUTOMATION_FORM.emailPlaceholder}
              autoComplete="email"
              required
            />
          </div>
          <div className={WFLOW_FIELD_CLASS}>
            <label htmlFor="wflow-company">{WORKFLOW_AUTOMATION_FORM.companyLabel}</label>
            <input
              id="wflow-company"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              placeholder={WORKFLOW_AUTOMATION_FORM.companyPlaceholder}
              autoComplete="organization"
              required
            />
          </div>
          <div className={WFLOW_FIELD_CLASS}>
            <label htmlFor="wflow-bottleneck">{WORKFLOW_AUTOMATION_FORM.bottleneckLabel}</label>
            <textarea
              id="wflow-bottleneck"
              value={bottleneck}
              onChange={(event) => setBottleneck(event.target.value)}
              placeholder={WORKFLOW_AUTOMATION_FORM.bottleneckPlaceholder}
              required
              rows={5}
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Sending…" : WORKFLOW_AUTOMATION_FORM.submitLabel}
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
