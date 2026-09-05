import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import {
  WEB_APPLICATIONS_CTA_LABEL,
  WEB_APPLICATIONS_CAPABILITIES,
  WEB_APPLICATIONS_FORM,
  WEB_APPLICATIONS_HERO,
  WEB_APPLICATIONS_SEO,
  WEB_APPLICATIONS_STACK,
} from "./webApplicationsPageContent";

describe("webApplicationsPageContent", () => {
  it("defines SEO metadata for the B2B web application page", () => {
    expect(WEB_APPLICATIONS_SEO.path).toBe(ROUTES.webApplications);
    expect(WEB_APPLICATIONS_SEO.path).toBe("/services/b2b-web-applications");
    expect(WEB_APPLICATIONS_SEO.title).toMatch(/B2B Web Applications/i);
    expect(WEB_APPLICATIONS_SEO.description).toMatch(/operational/i);
  });

  it("uses the high-margin operational systems hero copy", () => {
    expect(WEB_APPLICATIONS_HERO.eyebrow).toBe("B2B OPERATIONAL WEB SYSTEMS");
    expect(WEB_APPLICATIONS_HERO.headline).toBe("High-Margin Operational Web Systems & Support Portals.");
    expect(WEB_APPLICATIONS_HERO.subheadline).toBe(
      "We ship high-performance operations platforms and client support portals on Vite, Express, MongoDB, and GCP Serverless — built for teams that need reliability without a bloated stack.",
    );
    expect(WEB_APPLICATIONS_CTA_LABEL).toBe("Request Project Estimate");
  });

  it("lists operational capabilities, the Vite/Express/Mongo stack, and an estimate form", () => {
    expect(WEB_APPLICATIONS_CAPABILITIES.map((card) => card.title)).toEqual([
      "Operational Web Systems",
      "Client Support Portals",
      "Role-Based Access & APIs",
      "Cloud-Native Delivery",
    ]);
    expect(WEB_APPLICATIONS_CAPABILITIES.every((card) => card.body.trim().length > 24)).toBe(true);
    expect(WEB_APPLICATIONS_STACK.map((item) => item.label)).toEqual([
      "Vite",
      "Express",
      "MongoDB",
      "Node.js",
      "GCP Serverless",
    ]);
    expect(WEB_APPLICATIONS_FORM.title).toBe("Request a project estimate");
    expect(WEB_APPLICATIONS_FORM.submitLabel).toBe(WEB_APPLICATIONS_CTA_LABEL);
    expect(WEB_APPLICATIONS_FORM.serviceNeeded).toBe("B2B Web Applications");
  });
});
