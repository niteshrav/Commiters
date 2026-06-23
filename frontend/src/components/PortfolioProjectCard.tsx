import React from "react";
import { Link } from "react-router-dom";
import type { PortfolioProject } from "../lib/siteTrustContent";

type Props = { project: PortfolioProject };

export default function PortfolioProjectCard({ project }: Props) {
  const Cta = project.external ? (
    <a
      className="quote-link typography-link home-portfolio-cta"
      href={project.ctaHref}
      target="_blank"
      rel="noopener noreferrer"
    >
      {project.ctaLabel}
    </a>
  ) : (
    <Link className="quote-link typography-link home-portfolio-cta" to={project.ctaHref}>
      {project.ctaLabel}
    </Link>
  );

  return (
    <article className="card home-portfolio-card home-portfolio-card--visual" data-testid="portfolio-project-card">
      <div className={`home-portfolio-visual home-portfolio-visual--${project.visualVariant}`} aria-hidden>
        <span className="portfolio-tag portfolio-tag--on-visual">{project.tag}</span>
        <div className="home-portfolio-mockup">
          <div className="home-portfolio-mockup-bar" />
          <div className="home-portfolio-mockup-body" />
        </div>
      </div>
      <div className="home-portfolio-body">
        <h3 className="home-portfolio-title">{project.title}</h3>
        <p className="home-portfolio-tech">{project.techStack}</p>
        <p className="muted">{project.description}</p>
        {Cta}
      </div>
    </article>
  );
}
