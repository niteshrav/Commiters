import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import { buildDiscoveryCallCalendarUrl, buildWhatsAppUrl } from "./siteContact";
import {
  SITE_FOOTER_BOTTOM_LEGAL_LINK_LABELS,
  SITE_FOOTER_CAREERS_HIRING_BADGE,
  SITE_FOOTER_COMPANY_NAV_LINK_LABELS,
  SITE_FOOTER_CONNECT_LINKS,
  SITE_FOOTER_COPY,
  SITE_FOOTER_MAX_LINKS_PER_COLUMN,
  SITE_FOOTER_OPSFLOW_PARSER_BADGE,
  SITE_FOOTER_PRODUCTS_NAV_LINK_LABELS,
  SITE_FOOTER_RESOURCES_LINK_LABELS,
  SITE_FOOTER_SOCIAL_LINK_LABELS,
  SITE_FOOTER_TAGLINE,
  SITE_FOOTER_TRUSTTAP_PRODUCT_BADGE,
  resolveSiteFooterNavColumns,
} from "./siteFooterCopy";
import { SITE_GITHUB_URL, SITE_LINKEDIN_URL } from "./siteLinks";

describe("siteFooterCopy", () => {
  it("matches the Option 1 brand tagline and legal copyright line", () => {
    expect(SITE_FOOTER_COPY.brandTagline).toBe(SITE_FOOTER_TAGLINE);
    expect(SITE_FOOTER_COPY.brandTagline).toBe(
      "Engineering precision for world-class digital products and scalable enterprise architectures.",
    );
    expect(SITE_FOOTER_COPY.copyrightLine1).toBe("Copyright 2026 © Commiters Softwares. All Rights Reserved.");
  });

  it("lists three footer navigation columns for products, company, and resources", () => {
    expect(SITE_FOOTER_COPY.navColumns.map((column) => column.heading)).toEqual([
      "Products & Solutions",
      "Company",
      "Resources & Contact",
    ]);
    expect(SITE_FOOTER_COPY.navColumns.map((column) => column.id)).toEqual(["products", "company", "resources"]);
    expect(SITE_FOOTER_COPY.navColumns[0].links.map((link) => link.label)).toEqual([
      ...SITE_FOOTER_PRODUCTS_NAV_LINK_LABELS,
    ]);
    expect(SITE_FOOTER_COPY.navColumns[1].links.map((link) => link.label)).toEqual([
      ...SITE_FOOTER_COMPANY_NAV_LINK_LABELS,
    ]);
    expect(SITE_FOOTER_COPY.navColumns[2].links.map((link) => link.label)).toEqual([
      ...SITE_FOOTER_RESOURCES_LINK_LABELS,
    ]);
    for (const column of SITE_FOOTER_COPY.navColumns) {
      expect(column.links.length).toBeLessThanOrEqual(SITE_FOOTER_MAX_LINKS_PER_COLUMN);
    }
    const opsFlow = SITE_FOOTER_COPY.navColumns[0].links.find((link) => link.label === "OpsFlow AI");
    expect(opsFlow?.kind === "internal" ? opsFlow.to : undefined).toBe(ROUTES.opsFlow);
    expect(opsFlow?.kind === "internal" ? opsFlow.badge : undefined).toBe(SITE_FOOTER_OPSFLOW_PARSER_BADGE);
    const trustTap = SITE_FOOTER_COPY.navColumns[0].links.find((link) => link.label === "TrustTap");
    expect(trustTap?.kind === "internal" ? trustTap.to : undefined).toBe(ROUTES.trustTap);
    expect(trustTap?.kind === "internal" ? trustTap.badge : undefined).toBe(SITE_FOOTER_TRUSTTAP_PRODUCT_BADGE);
    const customWeb = SITE_FOOTER_COPY.navColumns[0].links.find((link) => link.label === "Custom Web Applications");
    expect(customWeb?.kind === "internal" ? customWeb.to : undefined).toBe(ROUTES.webApplications);
    const aiIntegrations = SITE_FOOTER_COPY.navColumns[0].links.find((link) => link.label === "AI Integrations");
    expect(aiIntegrations?.kind === "internal" ? aiIntegrations.to : undefined).toBe("/services/ai-integration");
    const aboutUs = SITE_FOOTER_COPY.navColumns[1].links.find((link) => link.label === "About Us");
    expect(aboutUs?.kind === "internal" ? aboutUs.to : undefined).toBe(ROUTES.about);
    const corePillars = SITE_FOOTER_COPY.navColumns[1].links.find((link) => link.label === "Core Pillars");
    expect(corePillars?.kind === "internal" ? corePillars.to : undefined).toBe(`${ROUTES.home}#core-pillars`);
    const howWeWork = SITE_FOOTER_COPY.navColumns[1].links.find((link) => link.label === "How We Work");
    expect(howWeWork?.kind === "internal" ? howWeWork.to : undefined).toBe(`${ROUTES.about}#how-we-work`);
    const caseStudies = SITE_FOOTER_COPY.navColumns[1].links.find((link) => link.label === "Case Studies / Work");
    expect(caseStudies?.kind === "internal" ? caseStudies.to : undefined).toBe(ROUTES.caseStudies);
    const careers = SITE_FOOTER_COPY.navColumns[1].links.find((link) => link.label === "Careers");
    expect(careers?.kind === "internal" ? careers.badge : undefined).toBe(SITE_FOOTER_CAREERS_HIRING_BADGE);
    const blogInsights = SITE_FOOTER_COPY.navColumns[2].links.find((link) => link.label === "Blog & Insights");
    expect(blogInsights?.kind === "internal" ? blogInsights.to : undefined).toBe(ROUTES.technicalLedger);
    const contactUs = SITE_FOOTER_COPY.navColumns[2].links.find((link) => link.label === "Contact Us");
    expect(contactUs?.kind === "internal" ? contactUs.to : undefined).toBe(ROUTES.contact);
    const bookConsultation = SITE_FOOTER_COPY.navColumns[2].links.find((link) => link.label === "Book Consultation");
    expect(bookConsultation?.kind === "external" ? bookConsultation.href : undefined).toBe(buildDiscoveryCallCalendarUrl());
    expect(SITE_FOOTER_COPY.bottomLegalLinks.map((link) => link.label)).toEqual([
      ...SITE_FOOTER_BOTTOM_LEGAL_LINK_LABELS,
    ]);
    expect(SITE_FOOTER_COPY.bottomLegalLinks.find((link) => link.label === "Site Map" && link.kind === "internal")?.to).toBe(
      ROUTES.sitemap,
    );
  });

  it("orders brand-column social links LinkedIn, WhatsApp, and GitHub", () => {
    expect(SITE_FOOTER_CONNECT_LINKS.map((link) => link.label)).toEqual(["LinkedIn", "WhatsApp", "GitHub"]);
    expect(SITE_FOOTER_SOCIAL_LINK_LABELS).not.toContain("X");
    expect(SITE_FOOTER_SOCIAL_LINK_LABELS).not.toContain("Instagram");
    expect(SITE_FOOTER_SOCIAL_LINK_LABELS).not.toContain("Medium");
    expect(SITE_FOOTER_CONNECT_LINKS[0].href).toBe(SITE_LINKEDIN_URL);
    expect(SITE_FOOTER_CONNECT_LINKS[1].href).toBe(buildWhatsAppUrl());
    expect(SITE_FOOTER_CONNECT_LINKS[2].href).toBe(SITE_GITHUB_URL);
  });

  it("uses the same footer links on every route", () => {
    expect(resolveSiteFooterNavColumns(ROUTES.home)).toBe(SITE_FOOTER_COPY.navColumns);
    expect(resolveSiteFooterNavColumns(ROUTES.contact)).toBe(SITE_FOOTER_COPY.navColumns);
  });
});
