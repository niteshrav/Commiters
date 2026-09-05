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
  MOBILE_NAV_SERVICE_LINKS,
} from "./mobileNavDrawer";

describe("mobileNavDrawer", () => {
  it("lists primary drawer links with an expandable Services accordion", () => {
    expect(MOBILE_NAV_DRAWER_PRIMARY_LABELS).toEqual([
      "Services",
      "About",
      "Work",
      "TrustTap",
      "OpsFlow AI",
      "Contact",
      "Careers",
    ]);
    expect(MOBILE_NAV_SERVICE_LINKS.map((link) => ({ label: link.label, to: link.to, description: link.description }))).toEqual([
      {
        label: "AI Operational Audits",
        to: ROUTES.aiOperationalAudit,
        description: "2-week workflow diagnostics & custom automation prototypes.",
      },
      {
        label: "Custom AI Pipeline Engineering",
        to: ROUTES.aiSolutions,
        description: "Bespoke document parsing, LLM integrations & workflow automation.",
      },
      {
        label: "Full-Stack B2B Web Applications",
        to: ROUTES.webApplications,
        description: "High-performance web applications built on Vite, Express & React.",
      },
      {
        label: "Free Business Utilities",
        to: ROUTES.opsFlowPlayground,
        description: "Zero-code tools including OpsFlow AI PDF-to-Excel extraction.",
      },
    ]);
    const about = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "about");
    const work = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "work");
    const trusttap = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "trusttap");
    const opsflow = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "opsflow");
    const contact = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "contact");
    const careers = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "careers");
    expect(about && "to" in about ? about.to : undefined).toBe(ROUTES.about);
    expect(work && "to" in work ? work.to : undefined).toBe(ROUTES.caseStudies);
    expect(trusttap && "to" in trusttap ? trusttap.to : undefined).toBe(ROUTES.trustTap);
    expect(opsflow && "to" in opsflow ? opsflow.to : undefined).toBe(ROUTES.opsFlow);
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
