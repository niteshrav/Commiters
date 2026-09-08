import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { createLead } from "../lib/api";
import {
  HOME_LEAD_MAGNET_COPY,
  HOME_LEAD_MAGNET_LAYOUT,
  HOME_LEAD_MAGNET_SECTION_ID,
  HOME_LEAD_MAGNET_TEST_ID,
  type HomeLeadMagnetFeatureTone,
} from "../lib/homeLeadMagnetContent";
import { validateHomeLeadMagnetEmail } from "../lib/homeLeadMagnetLeadGate";
import {
  IconArrowRight,
  IconBolt,
  IconChartLine,
  IconClock,
  IconCloudUpload,
  IconDatabase,
} from "./icons";

const FEATURE_ICONS = {
  blue: IconDatabase,
  green: IconChartLine,
  purple: IconBolt,
} as const satisfies Record<HomeLeadMagnetFeatureTone, typeof IconDatabase>;

export default function HomeLeadMagnetSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateHomeLeadMagnetEmail(email);
    if (!result.ok) {
      setError(result.error);
      setSubmitted(false);
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      await createLead(result.payload);
      setSubmitted(true);
      setEmail("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const { visual } = HOME_LEAD_MAGNET_COPY;

  return (
    <section
      id={HOME_LEAD_MAGNET_SECTION_ID}
      className={HOME_LEAD_MAGNET_LAYOUT.sectionClass}
      data-testid={HOME_LEAD_MAGNET_TEST_ID}
      aria-labelledby="home-lead-magnet-title"
    >
      <div className={HOME_LEAD_MAGNET_LAYOUT.innerClass}>
        <div className={HOME_LEAD_MAGNET_LAYOUT.offerClass}>
          <p className={HOME_LEAD_MAGNET_LAYOUT.badgeClass}>
            <IconClock width={14} height={14} aria-hidden />
            {HOME_LEAD_MAGNET_COPY.badge}
          </p>
          <h2 id="home-lead-magnet-title" className="home-lead-magnet-title">
            {HOME_LEAD_MAGNET_COPY.titleLead}
            <span className="home-lead-magnet-title-accent">{HOME_LEAD_MAGNET_COPY.titleAccent}</span>
          </h2>
          <p className="home-lead-magnet-description">{HOME_LEAD_MAGNET_COPY.description}</p>

          <div className={HOME_LEAD_MAGNET_LAYOUT.featuresClass} data-testid="home-lead-magnet-features">
            {HOME_LEAD_MAGNET_COPY.features.map((feature) => {
              const Icon = FEATURE_ICONS[feature.tone];
              return (
                <article
                  key={feature.title}
                  className={`home-lead-magnet-feature-card home-lead-magnet-feature-card--${feature.tone}`}
                  data-testid="home-lead-magnet-feature"
                >
                  <span
                    className={`home-lead-magnet-feature-card-icon home-lead-magnet-feature-card-icon--${feature.tone}`}
                    aria-hidden
                  >
                    <Icon width={18} height={18} />
                  </span>
                  <div className="home-lead-magnet-feature-card-copy">
                    <strong className="home-lead-magnet-feature-card-title">{feature.title}</strong>
                    <p className="home-lead-magnet-feature-card-body">{feature.description}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="home-lead-magnet-actions" data-testid="home-lead-magnet-actions">
            <Link className="btn btn-primary home-lead-magnet-primary" to={HOME_LEAD_MAGNET_COPY.ctaPrimaryTo}>
              {HOME_LEAD_MAGNET_COPY.ctaPrimary}
              <IconArrowRight width={18} height={18} aria-hidden />
            </Link>
            <a className="btn btn-secondary home-lead-magnet-secondary" href="#home-lead-magnet-card">
              {HOME_LEAD_MAGNET_COPY.ctaDemo}
            </a>
          </div>
        </div>

        <div className={HOME_LEAD_MAGNET_LAYOUT.visualClass} data-testid="home-lead-magnet-visual">
          <div className="home-lead-magnet-visual-orbit" aria-hidden="true">
            {HOME_LEAD_MAGNET_COPY.documentTypes.map((label, index) => (
              <span
                key={label}
                className={`home-lead-magnet-doc-pill home-lead-magnet-doc-pill--${index + 1}`}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="home-lead-magnet-upload-panel">
            <span className="home-lead-magnet-upload-icon" aria-hidden>
              <IconCloudUpload width={32} height={32} />
            </span>
            <p className="home-lead-magnet-upload-title">{visual.uploadTitle}</p>
            <p className="home-lead-magnet-upload-subtitle">{visual.uploadSubtitle}</p>
            <Link className="btn btn-primary home-lead-magnet-upload-cta" to={HOME_LEAD_MAGNET_COPY.ctaPrimaryTo}>
              {visual.uploadCta}
              <IconArrowRight width={16} height={16} aria-hidden />
            </Link>
            <p className="home-lead-magnet-upload-note">{visual.uploadNote}</p>
          </div>

          <div className="home-lead-magnet-output-card" data-testid="home-lead-magnet-output">
            <span className="home-lead-magnet-output-icon" aria-hidden>
              <IconChartLine width={18} height={18} />
            </span>
            <span className="home-lead-magnet-output-label">{visual.outputLabel}</span>
          </div>
        </div>
      </div>

      <div
        className={HOME_LEAD_MAGNET_LAYOUT.formCardClass}
        id="home-lead-magnet-card"
        data-testid="home-lead-magnet-card"
      >
        {submitted ? (
          <div className="home-lead-magnet-success" role="status">
            <p className="home-lead-magnet-success-body">{HOME_LEAD_MAGNET_COPY.successMessage}</p>
          </div>
        ) : (
          <form className={HOME_LEAD_MAGNET_LAYOUT.formClass} onSubmit={handleSubmit} noValidate>
            <h3 className={HOME_LEAD_MAGNET_LAYOUT.formTitleClass}>{HOME_LEAD_MAGNET_COPY.formTitle}</h3>
            <p className={HOME_LEAD_MAGNET_LAYOUT.formSubtitleClass}>{HOME_LEAD_MAGNET_COPY.formSubtitle}</p>
            <div className="home-lead-magnet-form-row">
              <label className="visually-hidden" htmlFor="home-lead-magnet-email">
                {HOME_LEAD_MAGNET_COPY.emailLabel}
              </label>
              <input
                id="home-lead-magnet-email"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={HOME_LEAD_MAGNET_COPY.emailPlaceholder}
              />
              <button className="btn btn-primary" type="submit" disabled={submitting}>
                {HOME_LEAD_MAGNET_COPY.submitLabel}
              </button>
            </div>
            {error ? (
              <p className="home-lead-magnet-error" role="alert">
                {error}
              </p>
            ) : null}
            <p className="home-lead-magnet-microcopy">{HOME_LEAD_MAGNET_COPY.microcopy}</p>
          </form>
        )}
      </div>

    </section>
  );
}
