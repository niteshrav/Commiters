import { useRef, useState, type DragEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { IconCheckCircle, IconCloudUpload } from "./icons";
import { OPSFLOW_FILE_ACCEPT, validateOpsFlowLead, type OpsFlowExtractPayload } from "../lib/opsFlowLeadGate";
import { parseOpsFlowDocument } from "../lib/opsFlowParse";
import {
  OPSFLOW_CATEGORY_LABEL,
  OPSFLOW_CATEGORY_PLACEHOLDER,
  OPSFLOW_DOCUMENT_CATEGORIES,
  OPSFLOW_DROPZONE_HELP,
  OPSFLOW_DROPZONE_LABEL,
  OPSFLOW_ENGINEER_CTA_LABEL,
  OPSFLOW_HERO,
  OPSFLOW_PROCESSING_LABEL,
  OPSFLOW_SECURITY_FOOTER,
  OPSFLOW_SUBMIT_LABEL,
  OPSFLOW_SUCCESS_COPY,
  OPSFLOW_VALUE_CARDS,
  OPSFLOW_WORK_EMAIL_LABEL,
  OPSFLOW_WORK_EMAIL_PLACEHOLDER,
} from "../lib/opsFlowPageContent";
import {
  OPSFLOW_CARD_CLASS,
  OPSFLOW_CARDS_CLASS,
  OPSFLOW_DROPZONE_ACTIVE_CLASS,
  OPSFLOW_DROPZONE_CLASS,
  OPSFLOW_EYEBROW_CLASS,
  OPSFLOW_FIELD_CLASS,
  OPSFLOW_FORM_CLASS,
  OPSFLOW_HEADLINE_CLASS,
  OPSFLOW_HERO_CLASS,
  OPSFLOW_INNER_CLASS,
  OPSFLOW_PROGRESS_CLASS,
  OPSFLOW_SECTION_CLASS,
  OPSFLOW_SUBHEAD_CLASS,
  OPSFLOW_SUCCESS_CLASS,
  OPSFLOW_TRUST_CLASS,
} from "../lib/opsFlowPageLayout";
import { ROUTES } from "../lib/routes";

export type OpsFlowSectionProps = {
  onExtract?: (payload: OpsFlowExtractPayload) => Promise<void>;
};

export default function OpsFlowSection({ onExtract = parseOpsFlowDocument }: OpsFlowSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");

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
    setStatus("processing");

    try {
      await onExtract(result.payload);
      setStatus("success");
    } catch (extractError) {
      const message =
        extractError instanceof Error ? extractError.message : "Something went wrong. Please try again or use the Contact page.";
      setError(message);
      setStatus("idle");
    }
  }

  return (
    <section className={OPSFLOW_SECTION_CLASS} data-testid="opsflow-section" aria-labelledby="opsflow-headline">
      <div className={OPSFLOW_INNER_CLASS}>
        <div className={OPSFLOW_HERO_CLASS}>
          <p className={OPSFLOW_EYEBROW_CLASS}>{OPSFLOW_HERO.eyebrow}</p>
          <h1 id="opsflow-headline" className={OPSFLOW_HEADLINE_CLASS}>
            {OPSFLOW_HERO.headline}
          </h1>
          <p className={OPSFLOW_SUBHEAD_CLASS}>{OPSFLOW_HERO.subheadline}</p>
        </div>

        <ul className={OPSFLOW_CARDS_CLASS}>
          {OPSFLOW_VALUE_CARDS.map((card) => (
            <li key={card.id} className={OPSFLOW_CARD_CLASS}>
              <h2>{card.title}</h2>
              <p>{card.body}</p>
            </li>
          ))}
        </ul>

        {status === "success" ? (
          <p className={OPSFLOW_SUCCESS_CLASS} role="status">
            <IconCheckCircle width={20} height={20} />
            <span>
              {OPSFLOW_SUCCESS_COPY} '
              <Link to={ROUTES.contact}>{OPSFLOW_ENGINEER_CTA_LABEL}</Link>
              '.
            </span>
          </p>
        ) : (
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
              <IconCloudUpload width={28} height={28} />
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
        )}

        <p className={OPSFLOW_TRUST_CLASS}>{OPSFLOW_SECURITY_FOOTER}</p>
      </div>
    </section>
  );
}
