import type { ComponentType, SVGProps } from "react";
import { Link } from "react-router-dom";
import { IconCodeBracket, IconDocument, IconLayers } from "./icons";
import { FROSTED_GLASS_CLASS_NAME } from "../lib/frostedGlass";
import { SERVICES_OVERVIEW_DISPLAY } from "../lib/servicesOverviewPageDesign";
import { NAV_SECTION_ALIAS_CLASS } from "../lib/navSections";
import {
  SERVICES_OVERVIEW_OFFERINGS,
  SERVICES_OVERVIEW_OFFERINGS_ANCHOR,
  SERVICES_OVERVIEW_OFFERINGS_TITLE,
} from "../lib/servicesOverviewPageContent";
import {
  SERVICES_OVERVIEW_ANCHOR_CLASS,
  SERVICES_OVERVIEW_EQUAL_CARD_CLASS,
  SERVICES_OVERVIEW_OFFERING_CARD_CLASS,
  SERVICES_OVERVIEW_OFFERING_FEATURED_CLASS,
  SERVICES_OVERVIEW_OFFERING_TAG_CLASS,
  SERVICES_OVERVIEW_OFFERINGS_GRID_CLASS,
  SERVICES_OVERVIEW_OFFERINGS_SECTION_CLASS,
} from "../lib/servicesOverviewPageLayout";

const OFFERING_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "ai-operational-audits": IconDocument,
  "governed-ai-workflow-systems": IconLayers,
  "spec-driven-full-stack-platforms": IconCodeBracket,
};

const OFFERING_NAV_ALIASES: Partial<Record<string, string>> = {
  "governed-ai-workflow-systems": "governed-ai",
  "spec-driven-full-stack-platforms": "spec-driven",
};

export default function ServicesStrategicOfferings() {
  return (
    <section
      id={SERVICES_OVERVIEW_OFFERINGS_ANCHOR}
      className={`${SERVICES_OVERVIEW_OFFERINGS_SECTION_CLASS} ${SERVICES_OVERVIEW_ANCHOR_CLASS} reveal-on-scroll`}
      aria-labelledby="services-strategic-offerings-title"
    >
      <div className="services-overview-inner">
        <h2 id="services-strategic-offerings-title">{SERVICES_OVERVIEW_OFFERINGS_TITLE}</h2>
        <p className="services-overview-section-lead">{SERVICES_OVERVIEW_DISPLAY.offeringsLead}</p>
        <div className={SERVICES_OVERVIEW_OFFERINGS_GRID_CLASS} data-testid="services-strategic-offerings">
          {SERVICES_OVERVIEW_OFFERINGS.map((offering) => {
            const Icon = OFFERING_ICONS[offering.id];
            const className = [
              SERVICES_OVERVIEW_OFFERING_CARD_CLASS,
              SERVICES_OVERVIEW_EQUAL_CARD_CLASS,
              SERVICES_OVERVIEW_ANCHOR_CLASS,
              FROSTED_GLASS_CLASS_NAME,
              offering.featured ? SERVICES_OVERVIEW_OFFERING_FEATURED_CLASS : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <article key={offering.id} id={offering.id} className={className} data-testid="services-offering-card">
                {OFFERING_NAV_ALIASES[offering.id] ? (
                  <span
                    id={OFFERING_NAV_ALIASES[offering.id]}
                    className={`${NAV_SECTION_ALIAS_CLASS} ${SERVICES_OVERVIEW_ANCHOR_CLASS}`}
                  />
                ) : null}
                <span className={SERVICES_OVERVIEW_OFFERING_TAG_CLASS}>{offering.tag}</span>
                {Icon ? (
                  <span className="services-overview-card-icon" aria-hidden="true">
                    <Icon />
                  </span>
                ) : null}
                <h3>{offering.title}</h3>
                <p>{offering.description}</p>
                <Link className="btn btn-primary" to={offering.to}>
                  {offering.ctaLabel}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
