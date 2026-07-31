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
        <h1 className="hero-title typography-display">Page not found</h1>
        <p className="muted hero-subtext--premium">The page you are looking for does not exist or may have moved.</p>
        <div className="hero-actions">
          <Link className="btn btn-primary btn-hero-primary" to={ROUTES.home}>
            Go to Home
          </Link>
        </div>
      </PageHeroImmersive>
      <div className="section-figure-host section-figure-host--tight">
        <SectionFigure pattern="constellation" />
      </div>
    </>
  );
}
