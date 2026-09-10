import type { ComponentType, SVGProps } from "react";
import { Link } from "react-router-dom";
import { IconCodeBracket, IconDocument, IconLayers } from "./icons";
import { FROSTED_GLASS_CLASS_NAME } from "../lib/frostedGlass";
import { SERVICES_OVERVIEW_DISPLAY } from "../lib/servicesOverviewPageDesign";
import { SERVICES_OVERVIEW_OFFERINGS, SERVICES_OVERVIEW_OFFERINGS_TITLE } from "../lib/servicesOverviewPageContent";
import {
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

export default function ServicesStrategicOfferings() {
  return (
    <section
      className={`${SERVICES_OVERVIEW_OFFERINGS_SECTION_CLASS} reveal-on-scroll`}
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
              FROSTED_GLASS_CLASS_NAME,
              offering.featured ? SERVICES_OVERVIEW_OFFERING_FEATURED_CLASS : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <article key={offering.id} id={offering.id} className={className} data-testid="services-offering-card">
                <span className={SERVICES_OVERVIEW_OFFERING_TAG_CLASS}>{offering.tag}</span>
                {Icon ? (
                  <span className="services-overview-card-icon" aria-hidden="true">
                    <Icon />
                  </span>
                ) : null}
                <h3>{offering.title}</h3>
                <p>{offering.description}</p>
                <Link className="btn btn-primary" to={offering.to}>
                  {offering.ctaLabel}{" "}
                  <span aria-hidden="true">{SERVICES_OVERVIEW_DISPLAY.ctaArrow}</span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
