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
  SERVICE_CARD_ACTION_CLASS,
  SERVICE_CARD_CLASS,
  SERVICE_CARD_COPY_CLASS,
  SERVICE_CARD_ICON_CLASS,
  SERVICE_CARD_LAYOUT_CLASS,
  SERVICE_CARD_LINK_WRAP_CLASS,
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

export default function ServiceOfferCard({ service }: Props) {
  const Icon = ICONS[service.icon];
  const { href, label } = service.hoverAction;
  const isExternal = href.startsWith("http");

  const cardClassName = [
    "card",
    SERVICE_CARD_CLASS,
    SERVICE_CARD_SPAN_CLASS[1],
    SERVICE_CARD_LAYOUT_CLASS.standard,
  ].join(" ");

  const body = (
    <>
      <span className={SERVICE_CARD_ICON_CLASS} aria-hidden>
        <Icon width={26} height={26} />
      </span>
      <h2 className={SERVICE_CARD_TITLE_CLASS}>{service.title}</h2>
      <p className={`muted ${SERVICE_CARD_COPY_CLASS}`}>{service.description}</p>
      <span className={SERVICE_CARD_ACTION_CLASS}>
        {label}
        <span aria-hidden> →</span>
      </span>
    </>
  );

  return (
    <article id={service.id} className={cardClassName} data-testid="stitch-service-card">
      {isExternal ? (
        <a className={SERVICE_CARD_LINK_WRAP_CLASS} href={href} target="_blank" rel="noopener noreferrer">
          {body}
        </a>
      ) : (
        <Link className={SERVICE_CARD_LINK_WRAP_CLASS} to={href}>
          {body}
        </Link>
      )}
    </article>
  );
}
