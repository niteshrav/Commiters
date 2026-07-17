import { Link } from "react-router-dom";
import Reveal from "../motion/Reveal";
import { ROUTES } from "../../lib/routes";
import { buildDiscoveryCallCalendarUrl } from "../../lib/siteContact";

export default function ServiceDetailFinalCta() {
  return (
    <section className="svc-detail-final-cta" data-testid="service-detail-final-cta">
      <Reveal className="svc-detail-final-cta-inner">
        <h2>Let&apos;s Build Your Next Project</h2>
        <p>Share your goals and we&apos;ll respond with a technical proposal and realistic timeline.</p>
        <div className="svc-detail-hero-actions">
          <a
            className="btn btn-primary svc-detail-btn"
            href={buildDiscoveryCallCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Free Consultation
          </a>
          <Link className="btn svc-detail-btn svc-detail-btn--outline" to={ROUTES.contact}>
            Contact Us
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
