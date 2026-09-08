import type { ComponentType, SVGProps } from "react";
import { Link } from "react-router-dom";
import { IconBrowserWindow, IconDevicePhone, IconRocket, IconShoppingBag } from "./icons";
import { FROSTED_GLASS_CLASS_NAME } from "../lib/frostedGlass";
import {
  SERVICES_OVERVIEW_CAPABILITIES,
  SERVICES_OVERVIEW_CAPABILITIES_SUBTEXT,
  SERVICES_OVERVIEW_CAPABILITIES_TITLE,
  type ServicesOverviewCapabilityIcon,
} from "../lib/servicesOverviewPageContent";
import {
  SERVICES_OVERVIEW_CAPABILITIES_GRID_CLASS,
  SERVICES_OVERVIEW_CAPABILITIES_SECTION_CLASS,
  SERVICES_OVERVIEW_CAPABILITY_CARD_CLASS,
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
      className={`${SERVICES_OVERVIEW_CAPABILITIES_SECTION_CLASS} reveal-on-scroll`}
      aria-labelledby="services-capabilities-title"
    >
      <h2 id="services-capabilities-title">{SERVICES_OVERVIEW_CAPABILITIES_TITLE}</h2>
      <p className="services-overview-capabilities-subtext">{SERVICES_OVERVIEW_CAPABILITIES_SUBTEXT}</p>
      <div className={SERVICES_OVERVIEW_CAPABILITIES_GRID_CLASS} data-testid="services-core-capabilities">
        {SERVICES_OVERVIEW_CAPABILITIES.map((capability) => {
          const Icon = CAPABILITY_ICONS[capability.icon];
          return (
            <article
              key={capability.id}
              id={capability.id}
              className={`${SERVICES_OVERVIEW_CAPABILITY_CARD_CLASS} ${FROSTED_GLASS_CLASS_NAME}`}
              data-testid="services-capability-card"
            >
              <span className="services-overview-offering-tag">{capability.badge}</span>
              <span className="services-overview-capability-icon" aria-hidden>
                <Icon />
              </span>
              <h3>
                <Link to={capability.to}>{capability.title}</Link>
              </h3>
              <p>{capability.subtext}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
