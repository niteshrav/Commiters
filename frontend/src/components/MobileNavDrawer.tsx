import { useEffect, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { IconClose, IconGitHub, IconLinkedIn, IconWhatsApp } from "./icons";
import {
  MOBILE_NAV_BODY_LOCK_CLASS,
  MOBILE_NAV_CLOSE_BTN_TESTID,
  MOBILE_NAV_DRAWER_CLASS,
  MOBILE_NAV_DRAWER_COPYRIGHT,
  MOBILE_NAV_DRAWER_ITEMS,
  MOBILE_NAV_DRAWER_SOCIAL_LINKS,
  MOBILE_NAV_DRAWER_TESTID,
  MOBILE_NAV_OVERLAY_CLASS,
} from "../lib/mobileNavDrawer";

function DrawerSocialIcon({ label }: { label: string }) {
  const iconProps = { width: 16, height: 16, "aria-hidden": true as const };
  switch (label) {
    case "LinkedIn":
      return <IconLinkedIn {...iconProps} />;
    case "WhatsApp":
      return <IconWhatsApp {...iconProps} />;
    case "GitHub":
      return <IconGitHub {...iconProps} />;
    default:
      return null;
  }
}

type Props = {
  ctaLabel: string;
  ctaUrl: string;
  logoSrc: string;
  logoAlt: string;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>) => void;
  onClose: () => void;
};

export default function MobileNavDrawer({ ctaLabel, ctaUrl, logoSrc, logoAlt, onNavigate, onClose }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    document.body.classList.add(MOBILE_NAV_BODY_LOCK_CLASS);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.classList.remove(MOBILE_NAV_BODY_LOCK_CLASS);
      document.body.style.overflow = "unset";
    };
  }, []);

  return createPortal(
    <div
      className={`${MOBILE_NAV_OVERLAY_CLASS} ${MOBILE_NAV_DRAWER_CLASS}`}
      data-testid={MOBILE_NAV_DRAWER_TESTID}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="nav-mobile-drawer-header">
        <BrandLogo onNavigate={onNavigate} logoSrc={logoSrc} logoAlt={logoAlt} />
        <button
          type="button"
          className="nav-mobile-close-btn"
          data-testid={MOBILE_NAV_CLOSE_BTN_TESTID}
          aria-label="Close menu"
          onClick={onClose}
        >
          <IconClose width={22} height={22} />
        </button>
      </div>

      <nav className="nav-mobile-drawer-nav" aria-label="Mobile navigation links">
        {MOBILE_NAV_DRAWER_ITEMS.map((item) => {
          if ("children" in item) {
            const isOpen = expandedId === item.id;
            const panelId = `nav-mobile-drawer-panel-${item.id}`;
            return (
              <div key={item.id} className="nav-mobile-drawer-group" data-testid={`nav-mobile-drawer-group-${item.id}`}>
                <button
                  type="button"
                  className={[
                    "nav-mobile-drawer-link",
                    "nav-mobile-drawer-link--button",
                    isOpen ? "nav-mobile-drawer-link--open" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setExpandedId((current) => (current === item.id ? null : item.id))}
                >
                  {item.label}
                </button>
                {isOpen ? (
                  <div id={panelId} className="nav-mobile-drawer-subnav">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.id}
                        to={child.to}
                        className="nav-mobile-drawer-sublink nav-dropdown-link--stacked"
                        onClick={onNavigate}
                      >
                        <span className="nav-dropdown-link-label">{child.label}</span>
                        <span className="nav-dropdown-link-description">{child.description}</span>
                      </NavLink>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          }

          return (
            <NavLink
              key={item.id}
              to={item.to}
              className="nav-mobile-drawer-link"
              data-testid={`nav-mobile-drawer-link-${item.id}`}
              onClick={onNavigate}
            >
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="nav-mobile-drawer-footer">
        <Link className="btn btn-primary nav-mobile-cta" to={ctaUrl} onClick={onNavigate} data-testid="nav-start-project-cta-mobile">
          {ctaLabel}
        </Link>
        <div className="nav-mobile-socials" data-testid="nav-mobile-socials">
          {MOBILE_NAV_DRAWER_SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              className="nav-mobile-social-link"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              <DrawerSocialIcon label={link.label} />
            </a>
          ))}
        </div>
        <p className="nav-mobile-copyright">{MOBILE_NAV_DRAWER_COPYRIGHT}</p>
      </div>
    </div>,
    document.body,
  );
}
