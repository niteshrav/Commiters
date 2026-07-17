import { Link } from "react-router-dom";
import { IconExternalLink } from "../icons";
import Reveal from "../motion/Reveal";
import type { ServiceDetail } from "../../lib/services/types";

type Props = { service: ServiceDetail };

export default function ServiceDetailPortfolio({ service }: Props) {
  if (service.portfolio.length === 0) return null;

  return (
    <section className="svc-detail-section" data-testid="service-detail-portfolio">
      <Reveal>
        <h2 className="svc-detail-section-title">Portfolio</h2>
        <div className="svc-detail-portfolio-grid">
          {service.portfolio.map((project) => {
            const content = (
              <>
                <p className="svc-detail-portfolio-tag">{project.tag}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="svc-detail-portfolio-link">
                  View project {project.external ? <IconExternalLink width={16} height={16} aria-hidden /> : "→"}
                </span>
              </>
            );

            if (project.external) {
              return (
                <a
                  key={project.title}
                  className="svc-detail-portfolio-card"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              );
            }

            return (
              <Link key={project.title} className="svc-detail-portfolio-card" to={project.href}>
                {content}
              </Link>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
