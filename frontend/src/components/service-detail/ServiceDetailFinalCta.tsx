import { Link } from "react-router-dom";
import Reveal from "../motion/Reveal";
import { NAV_CTA_LABEL, NAV_CTA_TO } from "../../lib/navSections";
import { ROUTES } from "../../lib/routes";

export default function ServiceDetailFinalCta() {
  return (
    <section className="svc-detail-final-cta" data-testid="service-detail-final-cta">
      <Reveal className="svc-detail-final-cta-inner">
        <h2>Let&apos;s Build Your Next Project</h2>
        <p>Share your goals and we&apos;ll respond with a technical proposal and realistic timeline.</p>
        <div className="svc-detail-hero-actions">
          <Link className="btn btn-primary svc-detail-btn" to={NAV_CTA_TO}>
            {NAV_CTA_LABEL}
          </Link>
          <Link className="btn btn-secondary svc-detail-btn" to={ROUTES.contact}>
            Contact Us
          </Link>
        </div>
        <p className="svc-detail-final-cta-faq">
          Questions about pricing or process?{" "}
          <Link to={ROUTES.faq}>Browse our FAQ</Link>
        </p>
      </Reveal>
    </section>
  );
}
