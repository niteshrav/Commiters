import { Link } from "react-router-dom";
import {
  IconAutomationSpark,
  IconBrowserWindow,
  IconDevicePhone,
  IconLayers,
  IconRobot,
  IconRocket,
  IconShoppingBag,
} from "./icons";
import type { StitchServiceCard } from "../lib/stitchPageContent";
import {
  SERVICE_CARD_BUTTON_CLASS,
  SERVICE_CARD_CLASS,
  SERVICE_CARD_COPY_CLASS,
  SERVICE_CARD_HOVER_ALWAYS_CLASS,
  SERVICE_CARD_HOVER_CLASS,
  SERVICE_CARD_ICON_CLASS,
  SERVICE_CARD_LAYOUT_CLASS,
  SERVICE_CARD_LINK_CLASS,
  SERVICE_CARD_MAIN_CLASS,
  SERVICE_CARD_SPAN_CLASS,
  SERVICE_CARD_TITLE_CLASS,
} from "../lib/servicesGridLayout";

const ICONS = {
  website: IconBrowserWindow,
  ai: IconRobot,
  webapp: IconLayers,
  mobile: IconDevicePhone,
  automation: IconAutomationSpark,
  mvp: IconRocket,
  ecommerce: IconShoppingBag,
} as const;

type Props = { service: StitchServiceCard };

function ServiceHoverAction({ service }: Props) {
  const { hoverAction } = service;
  const isExternal = hoverAction.href.startsWith("http");

  if (hoverAction.kind === "button") {
    if (isExternal) {
      return (
        <a className={`btn ${SERVICE_CARD_BUTTON_CLASS}`} href={hoverAction.href} target="_blank" rel="noopener noreferrer">
          {hoverAction.label}
        </a>
      );
    }
    return (
      <Link className={`btn ${SERVICE_CARD_BUTTON_CLASS}`} to={hoverAction.href}>
        {hoverAction.label}
      </Link>
    );
  }

  if (isExternal) {
    return (
      <a className={SERVICE_CARD_LINK_CLASS} href={hoverAction.href} target="_blank" rel="noopener noreferrer">
        {hoverAction.label} →
      </a>
    );
  }

  return (
    <Link className={SERVICE_CARD_LINK_CLASS} to={hoverAction.href}>
      {hoverAction.label} →
    </Link>
  );
}

export default function ServiceOfferCard({ service }: Props) {
  const Icon = ICONS[service.icon];
  const showActionAlways = service.actionVisibility === "always";
  const hoverClassName = [SERVICE_CARD_HOVER_CLASS, showActionAlways ? SERVICE_CARD_HOVER_ALWAYS_CLASS : ""]
    .filter(Boolean)
    .join(" ");
  const cardClassName = [
    "card",
    SERVICE_CARD_CLASS,
    SERVICE_CARD_SPAN_CLASS[service.gridSpan],
    SERVICE_CARD_LAYOUT_CLASS[service.layout],
  ]
    .filter(Boolean)
    .join(" ");

  const body = (
    <>
      <span className={SERVICE_CARD_ICON_CLASS} aria-hidden>
        <Icon width={22} height={22} />
      </span>
      <h2 className={SERVICE_CARD_TITLE_CLASS}>{service.title}</h2>
      <p className={`muted ${SERVICE_CARD_COPY_CLASS}`}>{service.description}</p>
    </>
  );

  return (
    <article id={service.id} className={cardClassName} data-testid="stitch-service-card">
      {service.layout === "split" ? (
        <>
          <div className={SERVICE_CARD_MAIN_CLASS}>{body}</div>
          <div className={hoverClassName}>
            <ServiceHoverAction service={service} />
          </div>
        </>
      ) : (
        <>
          {body}
          <div className={hoverClassName}>
            <ServiceHoverAction service={service} />
          </div>
        </>
      )}
    </article>
  );
}
