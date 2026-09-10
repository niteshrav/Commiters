import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import {
  SITE_FOOTER_BOTTOM_LEGAL_LINK_LABELS,
  SITE_FOOTER_COMPANY_NAV_LINK_LABELS,
  SITE_FOOTER_CONNECT_LINKS,
  SITE_FOOTER_COPY,
  SITE_FOOTER_ENGINEERING_NAV_LINK_LABELS,
  SITE_FOOTER_FLAGSHIP_NAV_LINK_LABELS,
  SITE_FOOTER_MAX_LINKS_PER_COLUMN,
  SITE_FOOTER_SOCIAL_LINK_LABELS,
  SITE_FOOTER_TAGLINE,
  resolveSiteFooterNavColumns,
} from "./siteFooterCopy";
import { SITE_GITHUB_URL, SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL, SITE_MEDIUM_URL } from "./siteLinks";

describe("siteFooterCopy", () => {
  it("matches the brand tagline and legal copyright line", () => {
    expect(SITE_FOOTER_COPY.brandTagline).toBe(SITE_FOOTER_TAGLINE);
    expect(SITE_FOOTER_COPY.brandTagline).toBe("Commiters — Enterprise AI & Cloud Systems");
    expect(SITE_FOOTER_COPY.brandSubtext).toBe("Commit. Code. Connect.");
    expect(SITE_FOOTER_COPY.copyrightLine1).toBe("© Commiters Softwares. All rights reserved.");
  });

  it("lists three footer navigation columns for flagship AI, engineering, and company", () => {
    expect(SITE_FOOTER_COPY.navColumns.map((column) => column.heading)).toEqual([
      "Flagship Solutions & Products",
      "Full-Lifecycle Engineering Services",
      "Company",
    ]);
    expect(SITE_FOOTER_COPY.navColumns.map((column) => column.id)).toEqual(["flagship", "engineering", "company"]);
    expect(SITE_FOOTER_COPY.navColumns[0].links.map((link) => link.label)).toEqual([
      ...SITE_FOOTER_FLAGSHIP_NAV_LINK_LABELS,
    ]);
    expect(SITE_FOOTER_COPY.navColumns[1].links.map((link) => link.label)).toEqual([
      ...SITE_FOOTER_ENGINEERING_NAV_LINK_LABELS,
    ]);
    expect(SITE_FOOTER_COPY.navColumns[2].links.map((link) => link.label)).toEqual([
      ...SITE_FOOTER_COMPANY_NAV_LINK_LABELS,
    ]);
    for (const column of SITE_FOOTER_COPY.navColumns) {
      expect(column.links.length).toBeLessThanOrEqual(SITE_FOOTER_MAX_LINKS_PER_COLUMN);
    }

    const audits = SITE_FOOTER_COPY.navColumns[0].links.find((link) => link.label === "AI Operational Audits");
    expect(audits?.kind === "internal" ? audits.to : undefined).toBe(ROUTES.aiOperationalAudit);
    const governed = SITE_FOOTER_COPY.navColumns[0].links.find((link) => link.label === "Governed AI & Workflow Systems");
    expect(governed?.kind === "internal" ? governed.to : undefined).toBe(ROUTES.aiSolutions);
    const platforms = SITE_FOOTER_COPY.navColumns[0].links.find(
      (link) => link.label === "Spec-Driven Full-Stack Platforms",
    );
    expect(platforms?.kind === "internal" ? platforms.to : undefined).toBe(ROUTES.webApplications);
    const opsFlow = SITE_FOOTER_COPY.navColumns[0].links.find((link) => link.label === "OpsFlow AI");
    expect(opsFlow?.kind === "internal" ? opsFlow.to : undefined).toBe(ROUTES.opsFlowPlayground);
    const trustTap = SITE_FOOTER_COPY.navColumns[0].links.find((link) => link.label === "TrustTap");
    expect(trustTap?.kind === "internal" ? trustTap.to : undefined).toBe(ROUTES.trustTap);
    const utilities = SITE_FOOTER_COPY.navColumns[0].links.find((link) => link.label === "Free Business Utilities");
    expect(utilities?.kind === "internal" ? utilities.to : undefined).toBe(ROUTES.utilities);
    expect(SITE_FOOTER_COPY.navColumns[0].links.map((link) => link.label)).toContain("TrustTap");
    expect(SITE_FOOTER_COPY.navColumns[0].links.map((link) => link.label)).not.toContain("Custom AI Pipelines");

    const ecommerce = SITE_FOOTER_COPY.navColumns[1].links.find((link) => link.label === "Automated E-commerce Systems");
    expect(ecommerce?.kind === "internal" ? ecommerce.to : undefined).toBe("/services/e-commerce-development");
    const b2b = SITE_FOOTER_COPY.navColumns[1].links.find((link) => link.label === "B2B Web Applications");
    expect(b2b?.kind === "internal" ? b2b.to : undefined).toBe(ROUTES.webApplications);
    const mobile = SITE_FOOTER_COPY.navColumns[1].links.find((link) => link.label === "Mobile Application Development");
    expect(mobile?.kind === "internal" ? mobile.to : undefined).toBe("/services/mobile-app-development");
    const mvp = SITE_FOOTER_COPY.navColumns[1].links.find((link) => link.label === "Rapid SaaS MVP Development");
    expect(mvp?.kind === "internal" ? mvp.to : undefined).toBe("/services/mvp-development");
    const automation = SITE_FOOTER_COPY.navColumns[1].links.find(
      (link) => link.label === "Automation & Integration Tools",
    );
    expect(automation?.kind === "internal" ? automation.to : undefined).toBe("/services/automation-tools");
    const workflow = SITE_FOOTER_COPY.navColumns[1].links.find(
      (link) => link.label === "Workflow & Process Automation",
    );
    expect(workflow?.kind === "internal" ? workflow.to : undefined).toBe(ROUTES.workflowAutomation);

    const aboutUs = SITE_FOOTER_COPY.navColumns[2].links.find((link) => link.label === "About Us");
    expect(aboutUs?.kind === "internal" ? aboutUs.to : undefined).toBe(ROUTES.about);
    const clientWork = SITE_FOOTER_COPY.navColumns[2].links.find((link) => link.label === "Client Work");
    expect(clientWork?.kind === "internal" ? clientWork.to : undefined).toBe(ROUTES.caseStudies);
    const services = SITE_FOOTER_COPY.navColumns[2].links.find((link) => link.label === "Services");
    expect(services?.kind === "internal" ? services.to : undefined).toBe(ROUTES.services);
    const jobs = SITE_FOOTER_COPY.navColumns[2].links.find((link) => link.label === "Jobs");
    expect(jobs?.kind === "internal" ? jobs.to : undefined).toBe(ROUTES.openPositions);
    const faq = SITE_FOOTER_COPY.navColumns[2].links.find((link) => link.label === "FAQ");
    expect(faq?.kind === "internal" ? faq.to : undefined).toBe(ROUTES.faq);
    const blog = SITE_FOOTER_COPY.navColumns[2].links.find((link) => link.label === "Blog");
    expect(blog?.kind === "internal" ? blog.to : undefined).toBe(ROUTES.technicalLedger);
    const contact = SITE_FOOTER_COPY.navColumns[2].links.find((link) => link.label === "Contact");
    expect(contact?.kind === "internal" ? contact.to : undefined).toBe(ROUTES.contact);
    expect(SITE_FOOTER_COPY.navColumns[2].links.map((link) => link.label)).toEqual([
      "About Us",
      "Client Work",
      "Services",
      "Jobs",
      "FAQ",
      "Blog",
      "Contact",
    ]);

    expect(SITE_FOOTER_COPY.bottomLegalLinks.map((link) => link.label)).toEqual([
      ...SITE_FOOTER_BOTTOM_LEGAL_LINK_LABELS,
    ]);
    expect(SITE_FOOTER_COPY.bottomLegalLinks.find((link) => link.label === "Privacy" && link.kind === "internal")?.to).toBe(
      ROUTES.privacy,
    );
    expect(SITE_FOOTER_COPY.bottomLegalLinks.find((link) => link.label === "Terms" && link.kind === "internal")?.to).toBe(
      ROUTES.terms,
    );
  });

  it("orders brand-column social links LinkedIn, Instagram, Medium, and GitHub", () => {
    expect(SITE_FOOTER_CONNECT_LINKS.map((link) => link.label)).toEqual([
      "LinkedIn",
      "Instagram",
      "Medium",
      "GitHub",
    ]);
    expect(SITE_FOOTER_SOCIAL_LINK_LABELS).toEqual(["LinkedIn", "Instagram", "Medium", "GitHub"]);
    expect(SITE_FOOTER_SOCIAL_LINK_LABELS).not.toContain("Twitter");
    expect(SITE_FOOTER_CONNECT_LINKS[0].href).toBe(SITE_LINKEDIN_URL);
    expect(SITE_FOOTER_CONNECT_LINKS[1].href).toBe(SITE_INSTAGRAM_URL);
    expect(SITE_FOOTER_CONNECT_LINKS[2].href).toBe(SITE_MEDIUM_URL);
    expect(SITE_FOOTER_CONNECT_LINKS[3].href).toBe(SITE_GITHUB_URL);
  });

  it("uses the same footer links on every route", () => {
    expect(resolveSiteFooterNavColumns(ROUTES.home)).toBe(SITE_FOOTER_COPY.navColumns);
    expect(resolveSiteFooterNavColumns(ROUTES.contact)).toBe(SITE_FOOTER_COPY.navColumns);
  });
});
