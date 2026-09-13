import type { ComponentType, SVGProps } from "react";
import { Link } from "react-router-dom";
import { IconBrowserWindow, IconDevicePhone, IconRocket, IconShoppingBag } from "./icons";
import { NAV_SECTION_ALIAS_CLASS } from "../lib/navSections";
import {
  SERVICES_OVERVIEW_CAPABILITIES,
  SERVICES_OVERVIEW_CAPABILITIES_ANCHOR,
  SERVICES_OVERVIEW_CAPABILITIES_SUBTEXT,
  SERVICES_OVERVIEW_CAPABILITIES_TITLE,
  type ServicesOverviewCapabilityIcon,
} from "../lib/servicesOverviewPageContent";
import {
  SERVICES_OVERVIEW_ANCHOR_CLASS,
  SERVICES_OVERVIEW_CAPABILITIES_GRID_CLASS,
  SERVICES_OVERVIEW_CAPABILITIES_SECTION_CLASS,
  SERVICES_OVERVIEW_CAPABILITY_CARD_CHROME_CLASS,
  SERVICES_OVERVIEW_CAPABILITY_CARD_CLASS,
  SERVICES_OVERVIEW_SECTION_SHELL_CLASS,
} from "../lib/servicesOverviewPageLayout";

const CAPABILITY_ICONS: Record<ServicesOverviewCapabilityIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  cart: IconShoppingBag,
  web: IconBrowserWindow,
  mobile: IconDevicePhone,
  mvp: IconRocket,
};

export default function ServicesCoreCapabilities() {
  return (
    <section
      id={SERVICES_OVERVIEW_CAPABILITIES_ANCHOR}
      className={`${SERVICES_OVERVIEW_CAPABILITIES_SECTION_CLASS} ${SERVICES_OVERVIEW_SECTION_SHELL_CLASS} reveal-on-scroll`}
      aria-labelledby="services-capabilities-title"
    >
      <div className="services-overview-inner">
        <div>
          <h2 id="services-capabilities-title">{SERVICES_OVERVIEW_CAPABILITIES_TITLE}</h2>
          <p className="services-overview-capabilities-subtext">{SERVICES_OVERVIEW_CAPABILITIES_SUBTEXT}</p>
        </div>
        <span id="web-mobile" className={`${NAV_SECTION_ALIAS_CLASS} ${SERVICES_OVERVIEW_ANCHOR_CLASS}`} />
        <span id="automation" className={`${NAV_SECTION_ALIAS_CLASS} ${SERVICES_OVERVIEW_ANCHOR_CLASS}`} />
        {SERVICES_OVERVIEW_CAPABILITIES.flatMap((capability) =>
          (capability.aliasIds ?? []).map((aliasId) => (
            <span key={aliasId} id={aliasId} className={`${NAV_SECTION_ALIAS_CLASS} ${SERVICES_OVERVIEW_ANCHOR_CLASS}`} />
          )),
        )}
        <div className={SERVICES_OVERVIEW_CAPABILITIES_GRID_CLASS} data-testid="services-core-capabilities">
          {SERVICES_OVERVIEW_CAPABILITIES.map((capability) => {
            const Icon = CAPABILITY_ICONS[capability.icon];
            return (
              <article
                key={capability.id}
                id={capability.id}
                className={`${SERVICES_OVERVIEW_CAPABILITY_CARD_CLASS} ${SERVICES_OVERVIEW_CAPABILITY_CARD_CHROME_CLASS} ${SERVICES_OVERVIEW_ANCHOR_CLASS}`}
                data-testid="services-capability-card"
              >
                <span className="services-overview-card-icon" aria-hidden>
                  <Icon />
                </span>
                <span className="services-overview-offering-tag">{capability.badge}</span>
                <h3>
                  <Link to={capability.to}>{capability.title}</Link>
                </h3>
                <p>{capability.subtext}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
