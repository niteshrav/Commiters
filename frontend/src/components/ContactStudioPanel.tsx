import { IconEnvelope, IconMapPin, IconPhone } from "./icons";
import { useContactStudioContent } from "../lib/cms/hooks";
import { buildOfficeMapEmbedUrl, buildOfficeMapOpenUrl } from "../lib/officeMap";

export default function ContactStudioPanel() {
  const studio = useContactStudioContent();
  const mapEmbedUrl = studio.mapEmbedUrl || buildOfficeMapEmbedUrl();

  return (
    <section className="card contact-studio-panel" data-testid="contact-studio-panel" aria-labelledby="contact-studio-title">
      <h2 id="contact-studio-title" className="contact-studio-title">
        {studio.title}
      </h2>

      <div className="contact-studio-detail">
        <span className="contact-studio-detail-icon contact-studio-detail-icon--location" aria-hidden>
          <IconMapPin width={18} height={18} />
        </span>
        <a
          className="contact-studio-address"
          href={buildOfficeMapOpenUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          {studio.addressLines.map((line) => (
            <span key={line} className="contact-studio-address-line">
              {line}
            </span>
          ))}
        </a>
      </div>

      <div className="contact-studio-detail">
        <span className="contact-studio-detail-icon contact-studio-detail-icon--email" aria-hidden>
          <IconEnvelope width={18} height={18} />
        </span>
        <a className="contact-studio-email" href={studio.emailHref}>
          {studio.email}
        </a>
      </div>

      <div className="contact-studio-detail">
        <span className="contact-studio-detail-icon contact-studio-detail-icon--phone" aria-hidden>
          <IconPhone width={18} height={18} />
        </span>
        <a className="contact-studio-phone" href={studio.phoneHref}>
          {studio.phone}
        </a>
      </div>

      <div className="contact-studio-map-wrap">
        <iframe
          title="Udaipur Engineering Studio location"
          className="contact-studio-map"
          src={mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}
