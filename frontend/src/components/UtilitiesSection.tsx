import { Link } from "react-router-dom";
import { FROSTED_GLASS_CLASS_NAME } from "../lib/frostedGlass";
import { ROUTES } from "../lib/routes";
import { UTILITIES_DISPLAY } from "../lib/utilitiesPageDesign";
import { UTILITIES_BANNER, UTILITIES_HERO, UTILITIES_TOOLS } from "../lib/utilitiesPageContent";
import {
  UTILITIES_BANNER_CLASS,
  UTILITIES_EYEBROW_CLASS,
  UTILITIES_HEADLINE_CLASS,
  UTILITIES_HERO_CHIPS_CLASS,
  UTILITIES_HERO_CLASS,
  UTILITIES_HERO_COPY_CLASS,
  UTILITIES_HERO_VISUAL_CLASS,
  UTILITIES_INNER_CLASS,
  UTILITIES_SECTION_CLASS,
  UTILITIES_SUBHEAD_CLASS,
  UTILITIES_TOOL_CARD_CLASS,
  UTILITIES_TOOLS_GRID_CLASS,
} from "../lib/utilitiesPageLayout";
import {
  IconBolt,
  IconCheckCircle,
  IconClock,
  IconCloud,
  IconDocument,
  IconShieldCheck,
  IconUsers,
} from "./icons";

function ChipIcon({ id }: { id: string }) {
  if (id === "secure") return <IconShieldCheck width={18} height={18} />;
  if (id === "real") return <IconCheckCircle width={18} height={18} />;
  return <IconBolt width={18} height={18} />;
}

function WhyIcon({ id }: { id: string }) {
  if (id === "hours") return <IconClock width={20} height={20} />;
  if (id === "grade") return <IconShieldCheck width={20} height={20} />;
  if (id === "experts") return <IconUsers width={20} height={20} />;
  return <IconBolt width={20} height={20} />;
}

function HeroVisual() {
  return (
    <div className={UTILITIES_HERO_VISUAL_CLASS} aria-hidden="true">
      <p className="utilities-float utilities-float--note">{UTILITIES_DISPLAY.floats[0].title}</p>
      <div className="utilities-hero-card">
        <p>
          <IconCloud width={18} height={18} />
          Business Utilities
        </p>
        <ul>
          {UTILITIES_DISPLAY.heroChecks.map((item) => (
            <li key={item}>
              <IconCheckCircle width={14} height={14} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="utilities-flow">
        <span>PDF</span>
        <i />
        <span>Excel</span>
      </div>
      <p className="utilities-float utilities-float--gst">
        <IconDocument width={16} height={16} />
        {UTILITIES_DISPLAY.floats[2].title}
      </p>
      <p className="utilities-float utilities-float--cloud">
        <IconCloud width={16} height={16} />
        <span>
          <strong>{UTILITIES_DISPLAY.floats[1].title}</strong>
          {UTILITIES_DISPLAY.floats[1].body}
        </span>
      </p>
    </div>
  );
}

export default function UtilitiesSection() {
  return (
    <section className={UTILITIES_SECTION_CLASS} data-testid="utilities-section">
      <div className={UTILITIES_INNER_CLASS}>
        <div className={UTILITIES_HERO_CLASS}>
          <div className={UTILITIES_HERO_COPY_CLASS}>
            <p className={UTILITIES_EYEBROW_CLASS}>
              <IconCloud width={16} height={16} />
              {UTILITIES_HERO.eyebrow}
            </p>
            <h1 className={UTILITIES_HEADLINE_CLASS}>
              <span className="utilities-headline-lead">{UTILITIES_DISPLAY.headlineLead}</span>{" "}
              <span className="utilities-headline-accent">{UTILITIES_DISPLAY.headlineAccent}</span>
            </h1>
            <p className={UTILITIES_SUBHEAD_CLASS}>{UTILITIES_HERO.subtitle}</p>
            <ul className={UTILITIES_HERO_CHIPS_CLASS}>
              {UTILITIES_DISPLAY.chips.map((chip) => (
                <li key={chip.id}>
                  <ChipIcon id={chip.id} />
                  <span>
                    <strong>{chip.title}</strong>
                    {chip.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <HeroVisual />
        </div>

        <div className="utilities-explore">
          <h2 className="utilities-explore-title">{UTILITIES_DISPLAY.toolsHeading}</h2>
          <p className="utilities-explore-lead">{UTILITIES_DISPLAY.toolsLead}</p>
          <ul className={UTILITIES_TOOLS_GRID_CLASS} data-testid="utilities-tools">
            {UTILITIES_TOOLS.map((tool) => (
              <li
                key={tool.id}
                id={tool.id}
                className={`${UTILITIES_TOOL_CARD_CLASS} ${FROSTED_GLASS_CLASS_NAME} utilities-tool-card--${tool.availability}`}
              >
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
                <ul className="utilities-tool-extras" aria-hidden>
                  {UTILITIES_DISPLAY.toolExtras[tool.id as keyof typeof UTILITIES_DISPLAY.toolExtras].map((item) => (
                    <li key={item}>
                      <IconCheckCircle width={14} height={14} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="utilities-tool-visual" aria-hidden>
                  {tool.availability === "live" ? (
                    <div className="utilities-flow utilities-flow--card">
                      <span>PDF</span>
                      <i />
                      <span>XLSX</span>
                    </div>
                  ) : (
                    <div className="utilities-gst-sheet">GST</div>
                  )}
                </div>
                <Link
                  className={tool.availability === "live" ? "btn btn-primary" : "btn btn-secondary"}
                  to={tool.to}
                >
                  {tool.ctaLabel}
                  <span aria-hidden="true"> {UTILITIES_DISPLAY.ctaArrow}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="utilities-why">
          <h2>{UTILITIES_DISPLAY.whyHeading}</h2>
          <ul>
            {UTILITIES_DISPLAY.why.map((item) => (
              <li key={item.id}>
                <span className={`utilities-why-icon utilities-why-icon--${item.id}`} aria-hidden>
                  <WhyIcon id={item.id} />
                </span>
                <strong>{item.title}</strong>
                <span>{item.body}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className={`${UTILITIES_BANNER_CLASS} ${FROSTED_GLASS_CLASS_NAME}`} data-testid="utilities-banner">
          <div className="utilities-banner-copy">
            <p className="utilities-banner-kicker">{UTILITIES_DISPLAY.bannerKicker}</p>
            <h2>{UTILITIES_BANNER.title}</h2>
            <p className="utilities-banner-lead">{UTILITIES_DISPLAY.bannerLead}</p>
            <div className="utilities-banner-actions">
              <Link className="btn btn-primary" to={UTILITIES_BANNER.ctaTo}>
                {UTILITIES_BANNER.ctaLabel}
                <span aria-hidden="true"> {UTILITIES_DISPLAY.ctaArrow}</span>
              </Link>
              <Link className="btn btn-secondary" to={ROUTES.caseStudies}>
                {UTILITIES_DISPLAY.workLabel}
              </Link>
            </div>
          </div>
          <div className="utilities-banner-visual" aria-hidden>
            <span />
            <span />
            <span />
            <span />
            <p>{UTILITIES_DISPLAY.bannerNote}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
