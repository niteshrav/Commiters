import { ROUTES } from "./routes";
import { SITE_FOOTER_CONNECT_LINKS } from "./siteFooterCopy";

export const MOBILE_NAV_DRAWER_TESTID = "nav-mobile-drawer" as const;
export const MOBILE_NAV_CLOSE_BTN_TESTID = "nav-mobile-close-btn" as const;
export const HEADER_MENU_BTN_TESTID = "header-menu-btn" as const;
export const MOBILE_NAV_OVERLAY_CLASS = "nav-mobile-overlay" as const;
export const MOBILE_NAV_DRAWER_CLASS = "nav-mobile-drawer" as const;
export const MOBILE_NAV_BODY_LOCK_CLASS = "nav-mobile-drawer-open" as const;
export const HEADER_DRAWER_OPEN_CLASS = "header--drawer-open" as const;

export const MOBILE_NAV_DRAWER_COPYRIGHT = "Copyright 2026 © Commiters Softwares" as const;

export type MobileNavDrawerChildLink = {
  id: string;
  label: string;
  to: string;
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

export const MOBILE_NAV_PRODUCT_LINKS = [
  { id: "opsflow", label: "OpsFlow AI", to: ROUTES.opsFlow },
  { id: "trusttap", label: "TrustTap", to: ROUTES.trustTap },
] as const satisfies readonly MobileNavDrawerChildLink[];

export const MOBILE_NAV_DRAWER_ITEMS = [
  { id: "products", label: "Products", expandable: true, children: MOBILE_NAV_PRODUCT_LINKS },
  { id: "services", label: "Services", to: ROUTES.services },
  { id: "work", label: "Work", to: ROUTES.caseStudies },
  { id: "about", label: "About", to: ROUTES.about },
  { id: "contact", label: "Contact", to: ROUTES.contact },
  { id: "careers", label: "Careers", to: ROUTES.openPositions },
] as const satisfies readonly MobileNavDrawerItem[];

export const MOBILE_NAV_DRAWER_PRIMARY_LABELS = MOBILE_NAV_DRAWER_ITEMS.map((item) => item.label);

export const MOBILE_NAV_DRAWER_SOCIAL_LINKS = SITE_FOOTER_CONNECT_LINKS;
