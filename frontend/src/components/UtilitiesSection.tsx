import { Link } from "react-router-dom";
import { FROSTED_GLASS_CLASS_NAME } from "../lib/frostedGlass";
import { UTILITIES_BANNER, UTILITIES_HERO, UTILITIES_TOOLS } from "../lib/utilitiesPageContent";
import {
  UTILITIES_BANNER_CLASS,
  UTILITIES_EYEBROW_CLASS,
  UTILITIES_HEADLINE_CLASS,
  UTILITIES_HERO_CLASS,
  UTILITIES_INNER_CLASS,
  UTILITIES_SECTION_CLASS,
  UTILITIES_SUBHEAD_CLASS,
  UTILITIES_TOOL_CARD_CLASS,
  UTILITIES_TOOLS_GRID_CLASS,
} from "../lib/utilitiesPageLayout";

export default function UtilitiesSection() {
  return (
    <section className={UTILITIES_SECTION_CLASS} data-testid="utilities-section">
      <div className={UTILITIES_INNER_CLASS}>
        <div className={UTILITIES_HERO_CLASS}>
          <p className={UTILITIES_EYEBROW_CLASS}>{UTILITIES_HERO.eyebrow}</p>
          <h1 className={UTILITIES_HEADLINE_CLASS}>{UTILITIES_HERO.title}</h1>
          <p className={UTILITIES_SUBHEAD_CLASS}>{UTILITIES_HERO.subtitle}</p>
        </div>

        <ul className={UTILITIES_TOOLS_GRID_CLASS} data-testid="utilities-tools">
          {UTILITIES_TOOLS.map((tool) => (
            <li key={tool.id} id={tool.id} className={`${UTILITIES_TOOL_CARD_CLASS} ${FROSTED_GLASS_CLASS_NAME}`}>
              {tool.availability === "request-access" ? (
                <span className="utilities-tool-badge" data-testid={`utilities-tool-badge-${tool.id}`}>
                  Request access
                </span>
              ) : (
                <span className="utilities-tool-badge utilities-tool-badge--live" data-testid={`utilities-tool-badge-${tool.id}`}>
                  Live now
                </span>
              )}
              <h2>{tool.title}</h2>
              <p>{tool.description}</p>
              <Link className="btn btn-primary" to={tool.to}>
                {tool.ctaLabel}
              </Link>
            </li>
          ))}
        </ul>

        <aside className={`${UTILITIES_BANNER_CLASS} ${FROSTED_GLASS_CLASS_NAME}`} data-testid="utilities-banner">
          <h2>{UTILITIES_BANNER.title}</h2>
          <Link className="btn btn-primary" to={UTILITIES_BANNER.ctaTo}>
            {UTILITIES_BANNER.ctaLabel}
          </Link>
        </aside>
      </div>
    </section>
  );
}
