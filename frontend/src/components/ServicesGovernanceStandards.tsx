import type { ComponentType, SVGProps } from "react";
import { IconLayers, IconLock, IconShieldCheck, IconUsers } from "./icons";
import { FROSTED_GLASS_CLASS_NAME } from "../lib/frostedGlass";
import {
  SERVICES_OVERVIEW_STANDARDS,
  SERVICES_OVERVIEW_STANDARDS_SUBTITLE,
  SERVICES_OVERVIEW_STANDARDS_TITLE,
} from "../lib/servicesOverviewPageContent";
import {
  SERVICES_OVERVIEW_STANDARD_CARD_CLASS,
  SERVICES_OVERVIEW_STANDARDS_GRID_CLASS,
  SERVICES_OVERVIEW_STANDARDS_SECTION_CLASS,
} from "../lib/servicesOverviewPageLayout";

const STANDARD_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "governed-mcp-integration": IconLayers,
  "two-tier-policy-gateways": IconShieldCheck,
  "zero-ambient-authority-rls": IconLock,
  "human-in-the-loop-vibe-diff": IconUsers,
};

export default function ServicesGovernanceStandards() {
  return (
    <section
      className={`${SERVICES_OVERVIEW_STANDARDS_SECTION_CLASS} reveal-on-scroll`}
      aria-labelledby="services-governance-standards-title"
    >
      <div className="services-overview-inner">
        <h2 id="services-governance-standards-title">{SERVICES_OVERVIEW_STANDARDS_TITLE}</h2>
        <p className="services-overview-standards-subtext">{SERVICES_OVERVIEW_STANDARDS_SUBTITLE}</p>
        <div className={SERVICES_OVERVIEW_STANDARDS_GRID_CLASS} data-testid="services-governance-standards">
          {SERVICES_OVERVIEW_STANDARDS.map((standard) => {
            const Icon = STANDARD_ICONS[standard.id];
            return (
              <article
                key={standard.id}
                id={standard.id}
                className={`${SERVICES_OVERVIEW_STANDARD_CARD_CLASS} ${FROSTED_GLASS_CLASS_NAME}`}
              >
                {Icon ? (
                  <span className="services-overview-card-icon" aria-hidden="true">
                    <Icon />
                  </span>
                ) : null}
                <h3>{standard.title}</h3>
                <p>{standard.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
