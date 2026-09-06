import React from "react";
import { Link } from "react-router-dom";
import PageHeroImmersive from "../components/PageHeroImmersive";
import SectionFigure from "../components/SectionFigure";
import { usePageSeo } from "../hooks/usePageSeo";
import { ROUTES } from "../lib/routes";
import { notFoundPageSeo } from "../lib/sitePageSeo";

export default function NotFoundPage() {
  usePageSeo(notFoundPageSeo());

  return (
    <>
      <PageHeroImmersive centered>
        <h1 className="hero-title typography-display">Page Not Found</h1>
        <p className="muted hero-subtext--premium">
          The architectural route you are looking for does not exist or has been relocated.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary btn-hero-primary bg-primary text-white hover:bg-primary/90" to={ROUTES.home}>
            Return to Home
          </Link>
        </div>
      </PageHeroImmersive>
      <div className="section-figure-host section-figure-host--tight not-found-circuit">
        <SectionFigure pattern="constellation" />
      </div>
    </>
  );
}
