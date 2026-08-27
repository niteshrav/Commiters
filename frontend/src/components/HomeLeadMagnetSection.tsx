import { FormEvent, useState } from "react";
import { createLead } from "../lib/api";
import { HOME_LEAD_MAGNET_COPY, HOME_LEAD_MAGNET_LAYOUT, HOME_LEAD_MAGNET_TEST_ID } from "../lib/homeLeadMagnetContent";
import { validateHomeLeadMagnetEmail } from "../lib/homeLeadMagnetLeadGate";
import { IconCheckCircle } from "./icons";

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

  return (
    <section
      className={HOME_LEAD_MAGNET_LAYOUT.sectionClass}
      data-testid={HOME_LEAD_MAGNET_TEST_ID}
      aria-labelledby="home-lead-magnet-title"
    >
      <div className={HOME_LEAD_MAGNET_LAYOUT.innerClass}>
        <div className={HOME_LEAD_MAGNET_LAYOUT.offerClass}>
          <p className={HOME_LEAD_MAGNET_LAYOUT.badgeClass}>{HOME_LEAD_MAGNET_COPY.badge}</p>
          <h2 id="home-lead-magnet-title" className="home-lead-magnet-title">
            {HOME_LEAD_MAGNET_COPY.title}
          </h2>
          <p className="home-lead-magnet-description">{HOME_LEAD_MAGNET_COPY.description}</p>
          <ul className={HOME_LEAD_MAGNET_LAYOUT.featuresClass} data-testid="home-lead-magnet-features">
            {HOME_LEAD_MAGNET_COPY.features.map((feature) => (
              <li key={feature.title} className="home-lead-magnet-feature">
                <span className="home-lead-magnet-feature-icon" aria-hidden>
                  <IconCheckCircle width={22} height={22} />
                </span>
                <div>
                  <strong className="home-lead-magnet-feature-title">{feature.title}</strong>
                  <p className="home-lead-magnet-feature-body">{feature.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={HOME_LEAD_MAGNET_LAYOUT.formCardClass} data-testid="home-lead-magnet-card">
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
      </div>
    </section>
  );
}
