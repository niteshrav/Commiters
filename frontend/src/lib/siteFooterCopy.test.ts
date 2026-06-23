import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import { buildWhatsAppUrl } from "./siteContact";
import {
  SITE_FOOTER_CONNECT_LINKS,
  SITE_FOOTER_COPY,
  SITE_FOOTER_CONNECT_LINK_LABELS,
  SITE_FOOTER_CONTACT_NAV_COLUMNS,
  SITE_FOOTER_LEGAL_LINK_LABELS,
  SITE_FOOTER_NAVIGATION_LINK_LABELS,
  SITE_FOOTER_PRIMARY_NAV_LINK_LABELS,
  SITE_FOOTER_SITEMAP_LINK_LABELS,
  SITE_FOOTER_SOCIAL_LINK_LABELS,
  SITE_FOOTER_TAGLINE,
  resolveSiteFooterNavColumns,
} from "./siteFooterCopy";
import { SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL, SITE_MEDIUM_URL } from "./siteLinks";

describe("siteFooterCopy", () => {
  it("matches Stitch preview footer copyright with the services-page tagline", () => {
    expect(SITE_FOOTER_COPY.copyrightLine1).toBe("© 2026 Commiters Softwares.");
    expect(SITE_FOOTER_COPY.copyrightLine2).toBe(SITE_FOOTER_TAGLINE);
    expect(SITE_FOOTER_COPY.copyrightLine2).toBe(
      "Engineering Precision for world-class digital products.",
    );
  });

  it("lists Navigation, Social, and Legal columns from the Stitch screenshot", () => {
    expect(SITE_FOOTER_COPY.navColumns.map((column) => column.heading)).toEqual([
      "NAVIGATION",
      "SOCIAL",
      "LEGAL",
    ]);

    const navigation = SITE_FOOTER_COPY.navColumns[0];
    expect(navigation.links.map((link) => link.label)).toEqual([...SITE_FOOTER_NAVIGATION_LINK_LABELS]);
    expect(SITE_FOOTER_NAVIGATION_LINK_LABELS).toEqual([...SITE_FOOTER_PRIMARY_NAV_LINK_LABELS]);
    expect(navigation.links.map((link) => ("to" in link ? link.to : null))).toEqual([
      ROUTES.home,
      ROUTES.about,
      ROUTES.caseStudies,
      ROUTES.technicalLedger,
      ROUTES.services,
      ROUTES.joinUs,
      ROUTES.contact,
    ]);

    const social = SITE_FOOTER_COPY.navColumns[1];
    expect(social.links.map((link) => link.label)).toEqual([...SITE_FOOTER_SOCIAL_LINK_LABELS]);
    expect(SITE_FOOTER_SOCIAL_LINK_LABELS).not.toContain("GitHub");
    expect(SITE_FOOTER_SOCIAL_LINK_LABELS).not.toContain("X");

    const legal = SITE_FOOTER_COPY.navColumns[2];
    expect(legal.links.map((link) => link.label)).toEqual([...SITE_FOOTER_LEGAL_LINK_LABELS]);
    expect(legal.links[0].to).toBe(ROUTES.privacyPolicy);
    expect(legal.links[1].to).toBe(ROUTES.terms);
  });

  it("orders social links LinkedIn, WhatsApp, Instagram, and Medium without X", () => {
    expect(SITE_FOOTER_CONNECT_LINKS.map((link) => link.label)).toEqual([
      "LinkedIn",
      "WhatsApp",
      "Instagram",
      "Medium",
    ]);
    expect(SITE_FOOTER_SOCIAL_LINK_LABELS).not.toContain("X");
    expect(SITE_FOOTER_CONNECT_LINKS[0].href).toBe(SITE_LINKEDIN_URL);
    expect(SITE_FOOTER_CONNECT_LINKS[1].href).toBe(buildWhatsAppUrl());
    expect(SITE_FOOTER_CONNECT_LINKS[2].href).toBe(SITE_INSTAGRAM_URL);
    expect(SITE_FOOTER_CONNECT_LINKS[3].href).toBe(SITE_MEDIUM_URL);
  });

  it("lists Sitemap, Connect, and Legal columns on the contact page footer", () => {
    expect(SITE_FOOTER_CONTACT_NAV_COLUMNS.map((column) => column.heading)).toEqual([
      "SITEMAP",
      "CONNECT",
      "LEGAL",
    ]);

    const sitemap = SITE_FOOTER_CONTACT_NAV_COLUMNS[0];
    expect(sitemap.links.map((link) => link.label)).toEqual([...SITE_FOOTER_SITEMAP_LINK_LABELS]);
    expect(sitemap.links[6].to).toBe(ROUTES.contact);

    const connect = SITE_FOOTER_CONTACT_NAV_COLUMNS[1];
    expect(connect.links.map((link) => link.label)).toEqual([...SITE_FOOTER_CONNECT_LINK_LABELS]);
    expect(SITE_FOOTER_CONNECT_LINK_LABELS).not.toContain("GitHub");

    const legal = SITE_FOOTER_CONTACT_NAV_COLUMNS[2];
    expect(legal.links.map((link) => link.label)).toEqual([...SITE_FOOTER_LEGAL_LINK_LABELS]);
  });

  it("resolves contact footer columns on contact and cookie policy routes", () => {
    expect(resolveSiteFooterNavColumns(ROUTES.home)).toBe(SITE_FOOTER_COPY.navColumns);
    expect(resolveSiteFooterNavColumns(ROUTES.contact)).toBe(SITE_FOOTER_CONTACT_NAV_COLUMNS);
    expect(resolveSiteFooterNavColumns(ROUTES.cookiePolicy)).toBe(SITE_FOOTER_CONTACT_NAV_COLUMNS);
  });
});
