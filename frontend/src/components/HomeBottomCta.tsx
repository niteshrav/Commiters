import { Link } from "react-router-dom";
import { HOME_PAGE_COPY } from "../lib/homePageContent";

export default function HomeBottomCta() {
  const { bottomCta } = HOME_PAGE_COPY;

  return (
    <section
      className="home-ready-cta band-breakout reveal-on-scroll"
      data-testid="home-ready-cta"
      aria-labelledby="home-ready-cta-title"
    >
      <div className="home-ready-cta-inner">
        <h2 id="home-ready-cta-title" className="home-ready-cta-title typography-section-title">
          {bottomCta.title}
        </h2>
        <p className="home-ready-cta-subtext typography-body">{bottomCta.subtext}</p>
        <Link className="btn btn-primary home-ready-cta-btn" to={bottomCta.buttonTo}>
          {bottomCta.button}
        </Link>
      </div>
    </section>
  );
}
