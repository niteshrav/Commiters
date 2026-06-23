import { IconWhatsApp } from "./icons";
import ContactStudioPanel from "./ContactStudioPanel";
import { STITCH_CONTACT_SIDEBAR } from "../lib/stitchPageContent";

function SidebarIcon({ variant }: { variant: "whatsapp" | "calendar" }) {
  if (variant === "whatsapp") {
    return (
      <span className="contact-sidebar-icon contact-sidebar-icon--whatsapp" aria-hidden>
        <IconWhatsApp width={18} height={18} />
      </span>
    );
  }

  return (
    <span className="contact-sidebar-icon contact-sidebar-icon--calendar" aria-hidden>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 11h18" />
      </svg>
    </span>
  );
}

export default function ContactSidebarCards() {
  return (
    <div className="contact-sidebar-cards" data-testid="contact-sidebar-cards">
      {STITCH_CONTACT_SIDEBAR.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className="card contact-sidebar-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SidebarIcon variant={item.iconVariant} />
          <div className="contact-sidebar-card-text">
            <span className="contact-sidebar-label">{item.label}</span>
            <strong>{item.title}</strong>
          </div>
          <svg
            className="contact-sidebar-external"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M7 17L17 7M17 7H9M17 7V15" />
          </svg>
        </a>
      ))}
      <ContactStudioPanel />
    </div>
  );
}
