import { Link } from "react-router-dom";
import type { StitchServiceCard } from "../lib/stitchPageContent";
import { serviceCardImageForGridId } from "../lib/serviceCardImages";
import {
  SERVICE_CARD_ACTION_CLASS,
  SERVICE_CARD_BODY_CLASS,
  SERVICE_CARD_CLASS,
  SERVICE_CARD_COPY_CLASS,
  SERVICE_CARD_LAYOUT_CLASS,
  SERVICE_CARD_LINK_WRAP_CLASS,
  SERVICE_CARD_MEDIA_CLASS,
  SERVICE_CARD_SPAN_CLASS,
  SERVICE_CARD_TITLE_CLASS,
} from "../lib/servicesGridLayout";

type Props = { service: StitchServiceCard };

export default function ServiceOfferCard({ service }: Props) {
  const { href, label } = service.hoverAction;
  const isExternal = href.startsWith("http");
  const image = serviceCardImageForGridId(service.id, service.title);

  const cardClassName = [
    "card",
    SERVICE_CARD_CLASS,
    SERVICE_CARD_SPAN_CLASS[1],
    SERVICE_CARD_LAYOUT_CLASS.standard,
  ].join(" ");

  const body = (
    <>
      <div className={SERVICE_CARD_MEDIA_CLASS}>
        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
      </div>
      <div className={SERVICE_CARD_BODY_CLASS}>
        <h2 className={SERVICE_CARD_TITLE_CLASS}>{service.title}</h2>
        <p className={`muted ${SERVICE_CARD_COPY_CLASS}`}>{service.description}</p>
        <span className={SERVICE_CARD_ACTION_CLASS}>
          {label}
          <span aria-hidden> →</span>
        </span>
      </div>
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
