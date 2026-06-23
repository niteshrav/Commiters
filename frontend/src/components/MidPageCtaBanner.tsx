import { Link } from "react-router-dom";
import { ROUTES } from "../lib/routes";

export default function MidPageCtaBanner() {
  return (
    <section className="section section--navy-band" data-testid="services-mid-cta">
      <div className="mid-page-cta container">
        <h2 className="mid-page-cta__title">Not sure which service fits?</h2>
        <p className="mid-page-cta__copy">Tell us what you&apos;re building — we&apos;ll recommend the right scope.</p>
        <Link className="btn btn-primary" to={ROUTES.contact}>
          Let&apos;s Talk →
        </Link>
      </div>
    </section>
  );
}
