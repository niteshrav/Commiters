import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import {
  WEB_APPLICATIONS_CTA_LABEL,
  WEB_APPLICATIONS_CAPABILITIES,
  WEB_APPLICATIONS_FORM,
  WEB_APPLICATIONS_HERO,
  WEB_APPLICATIONS_SEO,
  WEB_APPLICATIONS_STANDARDS,
} from "./webApplicationsPageContent";

describe("webApplicationsPageContent", () => {
  it("defines SEO metadata for the custom web application page", () => {
    expect(WEB_APPLICATIONS_SEO.path).toBe(ROUTES.webApplications);
    expect(WEB_APPLICATIONS_SEO.path).toBe("/services/web-applications");
    expect(WEB_APPLICATIONS_SEO.title).toMatch(/Web Applications/i);
    expect(WEB_APPLICATIONS_SEO.description).toMatch(/Next\.js/i);
  });

  it("uses the full-stack platform engineering hero copy", () => {
    expect(WEB_APPLICATIONS_HERO.eyebrow).toBe("FULL-STACK PLATFORM ENGINEERING");
    expect(WEB_APPLICATIONS_HERO.headline).toBe("Scalable Custom Web Applications Built for High-Growth Operations");
    expect(WEB_APPLICATIONS_HERO.subheadline).toBe(
      "We engineer fast, secure, and modern Next.js/Node.js web applications tailored to your exact business requirements.",
    );
    expect(WEB_APPLICATIONS_CTA_LABEL).toBe("Discuss Your Application");
  });

  it("lists four capabilities, architecture standards, and a project form", () => {
    expect(WEB_APPLICATIONS_CAPABILITIES.map((card) => card.title)).toEqual([
      "High-Performance Next.js/React Frontends",
      "Robust Node.js/Python Microservices",
      "Enterprise Database Design",
      "Role-Based Security (RBAC) & APIs",
    ]);
    expect(WEB_APPLICATIONS_CAPABILITIES[0]?.body).toMatch(/SSR\/SSG/i);
    expect(WEB_APPLICATIONS_CAPABILITIES[1]?.body).toMatch(/Google Cloud Run/i);
    expect(WEB_APPLICATIONS_CAPABILITIES[2]?.body).toMatch(/PostgreSQL/i);
    expect(WEB_APPLICATIONS_CAPABILITIES[3]?.body).toMatch(/OAuth\/SSO/i);
    expect(WEB_APPLICATIONS_STANDARDS.map((item) => item.title)).toEqual([
      "99.9% Uptime",
      "CI/CD Automated Deployment",
      "Scalable Cloud-Native Engineering",
    ]);
    expect(WEB_APPLICATIONS_FORM.title).toBe("Start Your Web Application Project");
    expect(WEB_APPLICATIONS_FORM.submitLabel).toBe(WEB_APPLICATIONS_CTA_LABEL);
  });
});
