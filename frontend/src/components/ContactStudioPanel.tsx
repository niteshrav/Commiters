import { IconEnvelope, IconMapPin, IconPhone } from "./icons";
import { CONTACT_STUDIO } from "../lib/contactPageContent";
import { buildOfficeMapEmbedUrl, buildOfficeMapOpenUrl } from "../lib/officeMap";

export default function ContactStudioPanel() {
  return (
    <section className="card contact-studio-panel" data-testid="contact-studio-panel" aria-labelledby="contact-studio-title">
      <h2 id="contact-studio-title" className="contact-studio-title">
        {CONTACT_STUDIO.title}
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
          {CONTACT_STUDIO.addressLines.map((line) => (
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
        <a className="contact-studio-email" href={CONTACT_STUDIO.emailHref}>
          {CONTACT_STUDIO.email}
        </a>
      </div>

      <div className="contact-studio-detail">
        <span className="contact-studio-detail-icon contact-studio-detail-icon--phone" aria-hidden>
          <IconPhone width={18} height={18} />
        </span>
        <a className="contact-studio-phone" href={CONTACT_STUDIO.phoneHref}>
          {CONTACT_STUDIO.phone}
        </a>
      </div>

      <div className="contact-studio-map-wrap">
        <iframe
          title="Udaipur Engineering Studio location"
          className="contact-studio-map"
          src={buildOfficeMapEmbedUrl()}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}
