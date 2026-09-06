import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createLead } from "../lib/api";
import { sanitizeNameInput } from "../lib/contactValidation";
import { FROSTED_GLASS_CLASS_NAME } from "../lib/frostedGlass";
import { ROUTES } from "../lib/routes";
import { validateServicesOverviewLead } from "../lib/servicesOverviewLeadGate";
import {
  SERVICES_OVERVIEW_INQUIRY,
  SERVICES_OVERVIEW_INQUIRY_ANCHOR,
  SERVICES_OVERVIEW_INQUIRY_INTERESTS,
  type ServicesOverviewInquiryInterest,
} from "../lib/servicesOverviewPageContent";
import {
  SERVICES_OVERVIEW_FIELD_CLASS,
  SERVICES_OVERVIEW_INQUIRY_FORM_CLASS,
  SERVICES_OVERVIEW_INQUIRY_SECTION_CLASS,
} from "../lib/servicesOverviewPageLayout";

export default function ServicesOverviewInquiry() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [interest, setInterest] = useState<ServicesOverviewInquiryInterest>(SERVICES_OVERVIEW_INQUIRY_INTERESTS[0]);
  const [details, setDetails] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const result = validateServicesOverviewLead({ name, email, company, interest, details });
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
        serviceNeeded: result.payload.serviceNeeded,
        timeline: result.payload.timeline,
        message: `Company: ${result.payload.company}\nInterest: ${result.payload.interest}\n\n${result.payload.details}`,
      });
      navigate(ROUTES.thankYou, { state: { submissionView: "client" } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      className={`${SERVICES_OVERVIEW_INQUIRY_SECTION_CLASS} reveal-on-scroll`}
      aria-labelledby="services-overview-inquiry-title"
    >
      <form
        id={SERVICES_OVERVIEW_INQUIRY_ANCHOR}
        className={`${SERVICES_OVERVIEW_INQUIRY_FORM_CLASS} ${FROSTED_GLASS_CLASS_NAME}`}
        onSubmit={onSubmit}
        data-testid="services-overview-inquiry"
        aria-label={SERVICES_OVERVIEW_INQUIRY.title}
      >
        <h2 id="services-overview-inquiry-title">{SERVICES_OVERVIEW_INQUIRY.title}</h2>
        <p>{SERVICES_OVERVIEW_INQUIRY.subtext}</p>
        <div className={SERVICES_OVERVIEW_FIELD_CLASS}>
          <label htmlFor="services-overview-name">{SERVICES_OVERVIEW_INQUIRY.nameLabel}</label>
          <input
            id="services-overview-name"
            value={name}
            onChange={(event) => setName(sanitizeNameInput(event.target.value))}
            placeholder={SERVICES_OVERVIEW_INQUIRY.namePlaceholder}
            autoComplete="name"
            required
          />
        </div>
        <div className={SERVICES_OVERVIEW_FIELD_CLASS}>
          <label htmlFor="services-overview-email">{SERVICES_OVERVIEW_INQUIRY.emailLabel}</label>
          <input
            id="services-overview-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={SERVICES_OVERVIEW_INQUIRY.emailPlaceholder}
            autoComplete="email"
            required
          />
        </div>
        <div className={SERVICES_OVERVIEW_FIELD_CLASS}>
          <label htmlFor="services-overview-company">{SERVICES_OVERVIEW_INQUIRY.companyLabel}</label>
          <input
            id="services-overview-company"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder={SERVICES_OVERVIEW_INQUIRY.companyPlaceholder}
            autoComplete="organization"
            required
          />
        </div>
        <div className={SERVICES_OVERVIEW_FIELD_CLASS}>
          <label htmlFor="services-overview-interest">{SERVICES_OVERVIEW_INQUIRY.interestLabel}</label>
          <select
            id="services-overview-interest"
            value={interest}
            onChange={(event) => setInterest(event.target.value as ServicesOverviewInquiryInterest)}
            required
          >
            {SERVICES_OVERVIEW_INQUIRY_INTERESTS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className={SERVICES_OVERVIEW_FIELD_CLASS}>
          <label htmlFor="services-overview-details">{SERVICES_OVERVIEW_INQUIRY.detailsLabel}</label>
          <textarea
            id="services-overview-details"
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            placeholder={SERVICES_OVERVIEW_INQUIRY.detailsPlaceholder}
            rows={4}
            required
          />
        </div>
        {error ? <p role="alert">{error}</p> : null}
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {SERVICES_OVERVIEW_INQUIRY.submitLabel}
        </button>
      </form>
    </section>
  );
}
