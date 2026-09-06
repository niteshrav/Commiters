import { ROUTES } from "./routes";
import { SITE_FOOTER_CONNECT_LINKS } from "./siteFooterCopy";
import { SERVICE_MEGA_CARDS } from "./navSections";

export const MOBILE_NAV_DRAWER_TESTID = "nav-mobile-drawer" as const;
export const HEADER_MENU_BTN_TESTID = "header-menu-btn" as const;
export const MOBILE_NAV_OVERLAY_CLASS = "nav-mobile-overlay" as const;
export const MOBILE_NAV_DRAWER_CLASS = "nav-mobile-drawer" as const;
export const MOBILE_NAV_BODY_LOCK_CLASS = "nav-mobile-drawer-open" as const;
export const HEADER_DRAWER_OPEN_CLASS = "header--drawer-open" as const;
export const HEADER_MENU_OPEN_LABEL = "Open menu" as const;
export const HEADER_MENU_CLOSE_LABEL = "Close menu" as const;
export const SITE_HEADER_HEIGHT = "84px" as const;
export const SITE_HEADER_HEIGHT_MOBILE = "64px" as const;
export const MOBILE_NAV_SHEET_TOP = "var(--site-header-height)" as const;
export const MOBILE_NAV_DRAWER_WIDTH = "100%" as const;

export const MOBILE_NAV_DRAWER_COPYRIGHT = "Copyright 2026 © Commiters Softwares" as const;

export type MobileNavDrawerChildLink = {
  id: string;
  label: string;
  to: string;
  description: string;
};

export type MobileNavDrawerItem =
  | {
      id: string;
      label: string;
      to: string;
      expandable?: false;
    }
  | {
      id: string;
      label: string;
      expandable: true;
      children: readonly MobileNavDrawerChildLink[];
    };

export const MOBILE_NAV_SERVICE_LINKS: readonly MobileNavDrawerChildLink[] = SERVICE_MEGA_CARDS.map((card) => ({
  id: card.id,
  label: card.label,
  to: card.to,
  description: card.description,
}));

export const MOBILE_NAV_DRAWER_ITEMS: readonly MobileNavDrawerItem[] = [
  { id: "services", label: "Services", expandable: true, children: MOBILE_NAV_SERVICE_LINKS },
  { id: "about", label: "About", to: ROUTES.about },
  { id: "work", label: "Work", to: ROUTES.caseStudies },
  { id: "trusttap", label: "TrustTap", to: ROUTES.trustTap },
  { id: "opsflow", label: "OpsFlow AI", to: ROUTES.opsFlow },
  { id: "contact", label: "Contact", to: ROUTES.contact },
  { id: "careers", label: "Careers", to: ROUTES.openPositions },
];

export const MOBILE_NAV_DRAWER_PRIMARY_LABELS = MOBILE_NAV_DRAWER_ITEMS.map((item) => item.label);

export const MOBILE_NAV_DRAWER_SOCIAL_LINKS = SITE_FOOTER_CONNECT_LINKS;
