import { useRef, useState, type DragEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { IconChartLine, IconCheckCircle, IconClock, IconCloudUpload, IconWorkflow } from "./icons";
import { OPSFLOW_FILE_ACCEPT, validateOpsFlowLead, type OpsFlowExtractPayload } from "../lib/opsFlowLeadGate";
import { parseOpsFlowDocument, OpsFlowQuotaError, type OpsFlowParseResult } from "../lib/opsFlowParse";
import {
  formatOpsFlowRemainingLabel,
  OPSFLOW_BOTTOM_CTA,
  OPSFLOW_CATEGORY_LABEL,
  OPSFLOW_CATEGORY_PLACEHOLDER,
  OPSFLOW_DAILY_LIMIT,
  OPSFLOW_DOCUMENT_CATEGORIES,
  OPSFLOW_DROPZONE_HELP,
  OPSFLOW_DROPZONE_LABEL,
  OPSFLOW_ENGINEER_CTA_LABEL,
  OPSFLOW_HERO,
  OPSFLOW_HOW_IT_WORKS,
  OPSFLOW_SANDBOX_ANCHOR,
  OPSFLOW_PREVIEW,
  OPSFLOW_PROCESSING_LABEL,
  OPSFLOW_QUOTA_BODY,
  OPSFLOW_QUOTA_CONTACT_EMAIL,
  OPSFLOW_QUOTA_TITLE,
  OPSFLOW_SECURITY_FOOTER,
  OPSFLOW_SUBMIT_LABEL,
  OPSFLOW_SUCCESS_COPY,
  OPSFLOW_VALUE_CARDS,
  OPSFLOW_WORK_EMAIL_LABEL,
  OPSFLOW_WORK_EMAIL_PLACEHOLDER,
} from "../lib/opsFlowPageContent";
import {
  OPSFLOW_BOTTOM_CTA_CLASS,
  OPSFLOW_CARD_CLASS,
  OPSFLOW_CARD_ICON_CLASS,
  OPSFLOW_CARDS_CLASS,
  OPSFLOW_DROPZONE_ACTIVE_CLASS,
  OPSFLOW_DROPZONE_CLASS,
  OPSFLOW_EYEBROW_CLASS,
  OPSFLOW_FIELD_CLASS,
  OPSFLOW_FORM_CLASS,
  OPSFLOW_HEADLINE_CLASS,
  OPSFLOW_HERO_CLASS,
  OPSFLOW_INNER_CLASS,
  OPSFLOW_PANEL_BODY_CLASS,
  OPSFLOW_PANEL_CARD_CLASS,
  OPSFLOW_PANEL_CLASS,
  OPSFLOW_PANEL_HEADER_CLASS,
  OPSFLOW_PREVIEW_CLASS,
  OPSFLOW_PROGRESS_CLASS,
  OPSFLOW_QUOTA_CLASS,
  OPSFLOW_REMAINING_CLASS,
  OPSFLOW_SECTION_CLASS,
  OPSFLOW_STEP_CLASS,
  OPSFLOW_STEPS_CLASS,
  OPSFLOW_SUBHEAD_CLASS,
  OPSFLOW_SUCCESS_CLASS,
  OPSFLOW_TOP_GRID_CLASS,
  OPSFLOW_TRUST_CLASS,
} from "../lib/opsFlowPageLayout";
import { ROUTES } from "../lib/routes";

export type OpsFlowSectionProps = {
  onExtract?: (payload: OpsFlowExtractPayload) => Promise<void | OpsFlowParseResult>;
};

function ValueCardIcon({ icon }: { icon: (typeof OPSFLOW_VALUE_CARDS)[number]["icon"] }) {
  const props = { width: 22, height: 22, "aria-hidden": true as const };
  if (icon === "upload") return <IconCloudUpload {...props} />;
  if (icon === "spreadsheet") return <IconChartLine {...props} />;
  return <IconWorkflow {...props} />;
}

export default function OpsFlowSection({ onExtract = parseOpsFlowDocument }: OpsFlowSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [quotaMessage, setQuotaMessage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "quota">("idle");
  const [remaining, setRemaining] = useState<number>(OPSFLOW_DAILY_LIMIT);
  const [dailyLimit, setDailyLimit] = useState<number>(OPSFLOW_DAILY_LIMIT);

  function applyFile(nextFile: File | null) {
    setFile(nextFile);
    setError(null);
    setStatus("idle");
  }

  function onDrop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    setDragActive(false);
    const dropped = event.dataTransfer.files[0] ?? null;
    applyFile(dropped);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "processing") return;

    const result = validateOpsFlowLead({ file, category, workEmail });
    if (!result.ok) {
      setError(result.error);
      setStatus("idle");
      return;
    }

    setError(null);
    setQuotaMessage(null);
    setStatus("processing");

    try {
      const extractResult = await onExtract(result.payload);
      if (extractResult && typeof extractResult.remainingExtractions === "number") {
        setRemaining(extractResult.remainingExtractions);
        if (typeof extractResult.dailyLimit === "number" && extractResult.dailyLimit > 0) {
          setDailyLimit(extractResult.dailyLimit);
        }
      }
      setStatus("success");
    } catch (extractError) {
      if (extractError instanceof OpsFlowQuotaError) {
        setQuotaMessage(extractError.message);
        setRemaining(0);
        setError(null);
        setStatus("quota");
        return;
      }
      const message =
        extractError instanceof Error ? extractError.message : "Something went wrong. Please try again or use the Contact page.";
      setError(message);
      setStatus("idle");
    }
  }

  const formPanel =
    status === "success" ? (
      <div className={OPSFLOW_SUCCESS_CLASS} role="status">
        <IconCheckCircle width={22} height={22} />
        <div>
          <p className="opsflow-success-title">Extraction complete</p>
          <p className="opsflow-success-body">
            {OPSFLOW_SUCCESS_COPY}{" "}
            <Link to={ROUTES.contact}>{OPSFLOW_ENGINEER_CTA_LABEL}</Link>.
          </p>
          <button className="btn btn-secondary opsflow-success-reset" type="button" onClick={() => setStatus("idle")}>
            Extract another document
          </button>
        </div>
      </div>
    ) : status === "quota" ? (
      <div className={OPSFLOW_QUOTA_CLASS} role="alert" data-testid="opsflow-quota">
        <IconClock width={22} height={22} />
        <div>
          <p className="opsflow-quota-title">{OPSFLOW_QUOTA_TITLE}</p>
          <p className="opsflow-quota-body">{quotaMessage ?? OPSFLOW_QUOTA_BODY}</p>
          <div className="opsflow-quota-actions">
            <a className="btn btn-secondary" href={`mailto:${OPSFLOW_QUOTA_CONTACT_EMAIL}`}>
              {OPSFLOW_QUOTA_CONTACT_EMAIL}
            </a>
            <Link className="btn btn-primary" to={ROUTES.contact}>
              {OPSFLOW_ENGINEER_CTA_LABEL}
            </Link>
          </div>
        </div>
      </div>
    ) : (
      <>
        <div className={OPSFLOW_PANEL_HEADER_CLASS}>
          <p className="opsflow-form-kicker">Free sandbox</p>
          <h2 className="opsflow-form-title">Upload & extract now</h2>
        </div>
        <form className={OPSFLOW_FORM_CLASS} onSubmit={onSubmit} noValidate>
          <button
          type="button"
          className={`${OPSFLOW_DROPZONE_CLASS}${dragActive ? ` ${OPSFLOW_DROPZONE_ACTIVE_CLASS}` : ""}`}
          data-testid="opsflow-dropzone"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
        >
          <IconCloudUpload width={32} height={32} />
          <span className="opsflow-dropzone-label">{file ? file.name : OPSFLOW_DROPZONE_LABEL}</span>
          <span className="opsflow-dropzone-help">{OPSFLOW_DROPZONE_HELP}</span>
        </button>
        <input
          ref={fileInputRef}
          className="opsflow-file-input"
          data-testid="opsflow-file-input"
          type="file"
          accept={OPSFLOW_FILE_ACCEPT}
          onChange={(event) => applyFile(event.target.files?.item(0) ?? null)}
        />

        <label className={OPSFLOW_FIELD_CLASS}>
          <span>{OPSFLOW_CATEGORY_LABEL}</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label={OPSFLOW_CATEGORY_LABEL}
            required
          >
            <option value="">{OPSFLOW_CATEGORY_PLACEHOLDER}</option>
            {OPSFLOW_DOCUMENT_CATEGORIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className={OPSFLOW_FIELD_CLASS}>
          <span>{OPSFLOW_WORK_EMAIL_LABEL}</span>
          <input
            type="email"
            value={workEmail}
            onChange={(event) => setWorkEmail(event.target.value)}
            placeholder={OPSFLOW_WORK_EMAIL_PLACEHOLDER}
            required
            autoComplete="email"
          />
        </label>

        {error ? (
          <p className="opsflow-error" role="alert">
            {error}
          </p>
        ) : null}

        {status === "processing" ? (
          <div className={OPSFLOW_PROGRESS_CLASS}>
            <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-label={OPSFLOW_PROCESSING_LABEL}>
              <span />
            </div>
            <p>{OPSFLOW_PROCESSING_LABEL}</p>
          </div>
        ) : (
          <button className="btn btn-primary opsflow-submit" type="submit">
            {OPSFLOW_SUBMIT_LABEL}
          </button>
        )}
        </form>
      </>
    );

  return (
    <>
      <section className={OPSFLOW_SECTION_CLASS} data-testid="opsflow-section" aria-labelledby="opsflow-headline">
        <div className={OPSFLOW_INNER_CLASS}>
          <div className={OPSFLOW_TOP_GRID_CLASS}>
            <div className={OPSFLOW_HERO_CLASS}>
              <p className={OPSFLOW_EYEBROW_CLASS}>{OPSFLOW_HERO.eyebrow}</p>
              <h1 id="opsflow-headline" className={OPSFLOW_HEADLINE_CLASS}>
                {OPSFLOW_HERO.headline}
              </h1>
              <p className={OPSFLOW_SUBHEAD_CLASS}>{OPSFLOW_HERO.subheadline}</p>
              <div className="opsflow-hero-actions">
                <a className="btn btn-primary" href={OPSFLOW_HERO.tryFreeHref}>
                  {OPSFLOW_HERO.tryFreeLabel}
                </a>
                <Link className="btn btn-secondary" to={OPSFLOW_HERO.demoTo}>
                  {OPSFLOW_HERO.demoLabel}
                </Link>
              </div>
            </div>

            <aside className={OPSFLOW_PANEL_CLASS} id={OPSFLOW_SANDBOX_ANCHOR} data-testid="opsflow-panel">
              <div className={OPSFLOW_PANEL_CARD_CLASS} data-testid="opsflow-panel-card">
                <div className={OPSFLOW_PANEL_BODY_CLASS}>
                  <p className={OPSFLOW_REMAINING_CLASS} data-testid="opsflow-remaining">
                    {formatOpsFlowRemainingLabel(remaining, dailyLimit)}
                  </p>
                  {formPanel}
                </div>
                <p className={OPSFLOW_TRUST_CLASS}>{OPSFLOW_SECURITY_FOOTER}</p>
              </div>
            </aside>
          </div>

          <ul className={OPSFLOW_CARDS_CLASS}>
            {OPSFLOW_VALUE_CARDS.map((card) => (
              <li key={card.id} className={OPSFLOW_CARD_CLASS}>
                <span className={OPSFLOW_CARD_ICON_CLASS} aria-hidden>
                  <ValueCardIcon icon={card.icon} />
                </span>
                <div>
                  <h2>{card.title}</h2>
                  <p>{card.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className={OPSFLOW_STEPS_CLASS} data-testid="opsflow-how-it-works" id="opsflow-how-it-works">
            <h2 className="opsflow-steps-title">{OPSFLOW_HOW_IT_WORKS.title}</h2>
            <ol className="opsflow-steps-list">
              {OPSFLOW_HOW_IT_WORKS.steps.map((step) => (
                <li key={step.id} className={OPSFLOW_STEP_CLASS}>
                  <span className="opsflow-step-index">{step.step}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className={OPSFLOW_PREVIEW_CLASS} data-testid="opsflow-preview" id="opsflow-preview">
            <h2 className="opsflow-preview-title">{OPSFLOW_PREVIEW.title}</h2>
            <div className="opsflow-preview-grid">
              <div className="opsflow-preview-pane opsflow-preview-pane--pdf">
                <span className="opsflow-preview-label">{OPSFLOW_PREVIEW.pdfLabel}</span>
                <div className="opsflow-preview-doc" aria-hidden>
                  <span className="opsflow-preview-doc-line opsflow-preview-doc-line--wide" />
                  <span className="opsflow-preview-doc-line" />
                  <span className="opsflow-preview-doc-line" />
                  <span className="opsflow-preview-doc-table">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className="opsflow-preview-doc-line opsflow-preview-doc-line--short" />
                </div>
              </div>
              <div className="opsflow-preview-arrow" aria-hidden>
                →
              </div>
              <div className="opsflow-preview-pane opsflow-preview-pane--excel">
                <span className="opsflow-preview-label">{OPSFLOW_PREVIEW.excelLabel}</span>
                <dl className="opsflow-preview-fields">
                  {OPSFLOW_PREVIEW.fields.map((field) => (
                    <div key={field.label} className="opsflow-preview-field">
                      <dt>{field.label}</dt>
                      <dd>{field.value}</dd>
                    </div>
                  ))}
                </dl>
                <table className="opsflow-preview-table">
                  <thead>
                    <tr>
                      <th scope="col">Description</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OPSFLOW_PREVIEW.lineItems.map((row) => (
                      <tr key={row.description}>
                        <td>{row.description}</td>
                        <td>{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={OPSFLOW_BOTTOM_CTA_CLASS} data-testid="opsflow-bottom-cta" aria-labelledby="opsflow-bottom-cta-title">
        <div className={OPSFLOW_INNER_CLASS}>
          <h2 id="opsflow-bottom-cta-title" className="opsflow-bottom-cta-title">
            {OPSFLOW_BOTTOM_CTA.title}
          </h2>
          <p className="opsflow-bottom-cta-subtext">{OPSFLOW_BOTTOM_CTA.subtext}</p>
          <div className="opsflow-bottom-cta-actions">
            <Link className="btn btn-primary" to={OPSFLOW_BOTTOM_CTA.primaryTo}>
              {OPSFLOW_BOTTOM_CTA.primaryLabel}
            </Link>
            <Link className="btn btn-secondary" to={OPSFLOW_BOTTOM_CTA.secondaryTo}>
              {OPSFLOW_BOTTOM_CTA.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
