import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import { SITE_FOOTER_CONNECT_LINKS } from "./siteFooterCopy";
import { SITE_GITHUB_URL, SITE_LINKEDIN_URL } from "./siteLinks";
import { buildWhatsAppUrl } from "./siteContact";
import {
  MOBILE_NAV_DRAWER_COPYRIGHT,
  MOBILE_NAV_DRAWER_ITEMS,
  MOBILE_NAV_DRAWER_PRIMARY_LABELS,
  MOBILE_NAV_DRAWER_SOCIAL_LINKS,
  MOBILE_NAV_PRODUCT_LINKS,
} from "./mobileNavDrawer";

describe("mobileNavDrawer", () => {
  it("lists primary drawer links with expandable Products and Contact/Careers", () => {
    expect(MOBILE_NAV_DRAWER_PRIMARY_LABELS).toEqual([
      "Products",
      "Services",
      "Work",
      "About",
      "Contact",
      "Careers",
    ]);
    expect(MOBILE_NAV_PRODUCT_LINKS.map((link) => ({ label: link.label, to: link.to }))).toEqual([
      { label: "OpsFlow AI", to: ROUTES.opsFlow },
      { label: "TrustTap", to: ROUTES.trustTap },
    ]);
    const services = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "services");
    const work = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "work");
    const about = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "about");
    const contact = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "contact");
    const careers = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "careers");
    expect(services && "to" in services ? services.to : undefined).toBe(ROUTES.services);
    expect(work && "to" in work ? work.to : undefined).toBe(ROUTES.caseStudies);
    expect(about && "to" in about ? about.to : undefined).toBe(ROUTES.about);
    expect(contact && "to" in contact ? contact.to : undefined).toBe(ROUTES.contact);
    expect(careers && "to" in careers ? careers.to : undefined).toBe(ROUTES.openPositions);
  });

  it("pins drawer socials to LinkedIn, WhatsApp, and GitHub", () => {
    expect(MOBILE_NAV_DRAWER_SOCIAL_LINKS).toBe(SITE_FOOTER_CONNECT_LINKS);
    expect(MOBILE_NAV_DRAWER_SOCIAL_LINKS.map((link) => link.label)).toEqual(["LinkedIn", "WhatsApp", "GitHub"]);
    expect(MOBILE_NAV_DRAWER_SOCIAL_LINKS[0].href).toBe(SITE_LINKEDIN_URL);
    expect(MOBILE_NAV_DRAWER_SOCIAL_LINKS[1].href).toBe(buildWhatsAppUrl());
    expect(MOBILE_NAV_DRAWER_SOCIAL_LINKS[2].href).toBe(SITE_GITHUB_URL);
  });

  it("uses the short legal copyright line in the drawer footer", () => {
    expect(MOBILE_NAV_DRAWER_COPYRIGHT).toBe("Copyright 2026 © Commiters Softwares");
  });
});
