import { Link } from "react-router-dom";
import { ABOUT_PAGE_COPY } from "../lib/aboutPageContent";

export default function AboutBottomCta() {
  const { bottomCta } = ABOUT_PAGE_COPY;

  return (
    <section
      className="about-bottom-cta reveal-on-scroll"
      data-testid="about-bottom-cta"
      aria-labelledby="about-bottom-cta-title"
    >
      <div className="about-bottom-cta-inner">
        <h2 id="about-bottom-cta-title" className="about-bottom-cta-title">
          {bottomCta.title}
        </h2>
        <p className="about-bottom-cta-subtext">{bottomCta.subtext}</p>
        <div className="about-bottom-cta-actions">
          <Link className="btn btn-primary about-bottom-cta-btn" to={bottomCta.primaryTo}>
            {bottomCta.primaryLabel}
          </Link>
          <Link className="btn btn-secondary about-bottom-cta-btn" to={bottomCta.secondaryTo}>
            {bottomCta.secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
