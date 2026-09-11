import { ROUTES } from "./routes";
import { SITE_FOOTER_CONNECT_LINKS } from "./siteFooterCopy";
import {
  ABOUT_MEGA_CARDS,
  OPSFLOW_MEGA_CARDS,
  SERVICE_MEGA_CARDS,
  TRUSTTAP_MEGA_CARDS,
  WORK_MEGA_CARDS,
  type NavDropdownLink,
} from "./navSections";

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

function toMobileNavChildren(cards: readonly NavDropdownLink[]): MobileNavDrawerChildLink[] {
  return cards.map((card) => ({
    id: card.id,
    label: card.label,
    to: card.to,
    description: card.description,
  }));
}

export const MOBILE_NAV_SERVICE_LINKS: readonly MobileNavDrawerChildLink[] = toMobileNavChildren(SERVICE_MEGA_CARDS);
export const MOBILE_NAV_ABOUT_LINKS: readonly MobileNavDrawerChildLink[] = toMobileNavChildren(ABOUT_MEGA_CARDS);
export const MOBILE_NAV_WORK_LINKS: readonly MobileNavDrawerChildLink[] = toMobileNavChildren(WORK_MEGA_CARDS);
export const MOBILE_NAV_TRUSTTAP_LINKS: readonly MobileNavDrawerChildLink[] = toMobileNavChildren(TRUSTTAP_MEGA_CARDS);
export const MOBILE_NAV_OPSFLOW_LINKS: readonly MobileNavDrawerChildLink[] = toMobileNavChildren(OPSFLOW_MEGA_CARDS);

export const MOBILE_NAV_DRAWER_ITEMS: readonly MobileNavDrawerItem[] = [
  { id: "services", label: "Services", expandable: true, children: MOBILE_NAV_SERVICE_LINKS },
  { id: "about", label: "About", expandable: true, children: MOBILE_NAV_ABOUT_LINKS },
  { id: "work", label: "Work", expandable: true, children: MOBILE_NAV_WORK_LINKS },
  { id: "trusttap", label: "TrustTap", expandable: true, children: MOBILE_NAV_TRUSTTAP_LINKS },
  { id: "opsflow", label: "OpsFlow AI", expandable: true, children: MOBILE_NAV_OPSFLOW_LINKS },
  { id: "contact", label: "Contact", to: ROUTES.contact },
  { id: "careers", label: "Careers", to: ROUTES.openPositions },
];

export const MOBILE_NAV_DRAWER_PRIMARY_LABELS = MOBILE_NAV_DRAWER_ITEMS.map((item) => item.label);

export const MOBILE_NAV_DRAWER_SOCIAL_LINKS = SITE_FOOTER_CONNECT_LINKS;
