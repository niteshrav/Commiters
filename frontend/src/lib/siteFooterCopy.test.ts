import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import { buildWhatsAppUrl } from "./siteContact";
import {
  SITE_FOOTER_BOTTOM_LEGAL_LINK_LABELS,
  SITE_FOOTER_CONNECT_LINKS,
  SITE_FOOTER_COPY,
  SITE_FOOTER_PRIMARY_NAV_LINK_LABELS,
  SITE_FOOTER_RESOURCES_LINK_LABELS,
  SITE_FOOTER_SOCIAL_LINK_LABELS,
  SITE_FOOTER_TAGLINE,
  resolveSiteFooterNavColumns,
} from "./siteFooterCopy";
import { SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL, SITE_MEDIUM_URL } from "./siteLinks";

describe("siteFooterCopy", () => {
  it("matches the merged footer brand tagline and copyright copy", () => {
    expect(SITE_FOOTER_COPY.brandTagline).toBe(SITE_FOOTER_TAGLINE);
    expect(SITE_FOOTER_COPY.copyrightLine1).toBe("Copyright 2026 (C) Commiters. All Rights Reserved.");
  });

  it("lists primary and resources navigation columns without a social column", () => {
    expect(SITE_FOOTER_COPY.navColumns.map((column) => column.heading)).toEqual(["PRIMARY", "RESOURCES"]);
    expect(SITE_FOOTER_COPY.navColumns[0].links.map((link) => link.label)).toEqual([
      ...SITE_FOOTER_PRIMARY_NAV_LINK_LABELS,
    ]);
    expect(SITE_FOOTER_COPY.navColumns[1].links.map((link) => link.label)).toEqual([
      ...SITE_FOOTER_RESOURCES_LINK_LABELS,
    ]);
    expect(SITE_FOOTER_COPY.navColumns[0].links[0].to).toBe(`${ROUTES.about}#principles`);
    expect(SITE_FOOTER_COPY.navColumns[0].links.find((link) => link.label === "Product")?.to).toBe(ROUTES.trustTap);
    expect(SITE_FOOTER_COPY.bottomLegalLinks.map((link) => link.label)).toEqual([
      ...SITE_FOOTER_BOTTOM_LEGAL_LINK_LABELS,
    ]);
  });

  it("orders social links LinkedIn, WhatsApp, Instagram, and Medium", () => {
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

  it("uses the same footer links on every route", () => {
    expect(resolveSiteFooterNavColumns(ROUTES.home)).toBe(SITE_FOOTER_COPY.navColumns);
    expect(resolveSiteFooterNavColumns(ROUTES.contact)).toBe(SITE_FOOTER_COPY.navColumns);
  });
});
