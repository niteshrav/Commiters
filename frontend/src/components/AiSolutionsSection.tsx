import { Link } from "react-router-dom";
import {
  AI_SOLUTIONS_BOTTOM_CTA,
  AI_SOLUTIONS_CTA_LABEL,
  AI_SOLUTIONS_HERO,
  AI_SOLUTIONS_OFFERINGS,
  AI_SOLUTIONS_STACK,
} from "../lib/aiSolutionsPageContent";
import {
  AISOL_CARD_CLASS,
  AISOL_CARDS_CLASS,
  AISOL_CTA_CLASS,
  AISOL_EYEBROW_CLASS,
  AISOL_HEADLINE_CLASS,
  AISOL_HERO_CLASS,
  AISOL_INNER_CLASS,
  AISOL_SECTION_CLASS,
  AISOL_STACK_CLASS,
  AISOL_SUBHEAD_CLASS,
} from "../lib/aiSolutionsPageLayout";
import { resolveTechIconUrl } from "../lib/homeTechStack";

export default function AiSolutionsSection() {
  return (
    <section className={AISOL_SECTION_CLASS} data-testid="ai-solutions-section">
      <div className={AISOL_INNER_CLASS}>
        <div className={AISOL_HERO_CLASS}>
          <p className={AISOL_EYEBROW_CLASS}>{AI_SOLUTIONS_HERO.eyebrow}</p>
          <h1 className={AISOL_HEADLINE_CLASS}>{AI_SOLUTIONS_HERO.headline}</h1>
          <p className={AISOL_SUBHEAD_CLASS}>{AI_SOLUTIONS_HERO.subheadline}</p>
          <a className="btn btn-primary aisol-hero-cta" href="#ai-offerings">
            {AI_SOLUTIONS_CTA_LABEL}
          </a>
        </div>

        <ul id="ai-offerings" className={AISOL_CARDS_CLASS} data-testid="ai-solutions-offerings">
          {AI_SOLUTIONS_OFFERINGS.map((card) => (
            <li key={card.id} className={AISOL_CARD_CLASS}>
              <h2>{card.title}</h2>
              <p>{card.body}</p>
            </li>
          ))}
        </ul>

        <div className={AISOL_STACK_CLASS} data-testid="ai-solutions-stack">
          <p className="aisol-stack-label">Technology & Cloud Stack</p>
          <ul className="aisol-stack-list">
            {AI_SOLUTIONS_STACK.map((item) => (
              <li key={item.id} className="aisol-stack-badge">
                <img src={resolveTechIconUrl({ slug: item.slug, alt: item.label })} alt="" />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={AISOL_CTA_CLASS}>
          <h2>{AI_SOLUTIONS_BOTTOM_CTA.headline}</h2>
          <Link className="btn btn-primary" to={AI_SOLUTIONS_BOTTOM_CTA.to}>
            {AI_SOLUTIONS_BOTTOM_CTA.buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
