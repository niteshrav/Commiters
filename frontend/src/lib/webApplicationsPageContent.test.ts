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
  it("defines SEO metadata for the spec-driven platform page", () => {
    expect(WEB_APPLICATIONS_SEO.path).toBe(ROUTES.webApplications);
    expect(WEB_APPLICATIONS_SEO.path).toBe("/services/spec-driven-full-stack-platforms");
    expect(WEB_APPLICATIONS_SEO.title).toMatch(/Spec-Driven Full-Stack Cloud Platforms/i);
    expect(WEB_APPLICATIONS_SEO.description).toMatch(/Vite, React, Express, and MongoDB/i);
  });

  it("uses the enterprise web engineering hero copy", () => {
    expect(WEB_APPLICATIONS_HERO.eyebrow).toBe("CLOUD PLATFORM ENGINEERING");
    expect(WEB_APPLICATIONS_HERO.headline).toBe("Spec-Driven Full-Stack Cloud Platforms");
    expect(WEB_APPLICATIONS_HERO.subheadline).toBe(
      "Scalable B2B portals, SaaS applications, and operational cloud systems built on Vite, React, Express, and MongoDB—engineered with rigid specifications and zero technical debt.",
    );
    expect(WEB_APPLICATIONS_CTA_LABEL).toBe("Request Platform Estimate");
  });

  it("lists spec-driven capabilities, stack badges, and a pre-selected platform form", () => {
    expect(WEB_APPLICATIONS_CAPABILITIES.map((card) => card.title)).toEqual([
      "High-Performance B2B Portals",
      "Declarative UI (A2UI Pattern)",
      "Database Security & RLS",
      "CI/CD Policy Enforcement",
    ]);
    expect(WEB_APPLICATIONS_CAPABILITIES.every((card) => card.body.trim().length > 24)).toBe(true);
    expect(WEB_APPLICATIONS_STACK.map((item) => item.label)).toEqual([
      "React",
      "Vite",
      "Tailwind CSS",
      "Express",
      "Node.js",
      "MongoDB/PostgreSQL",
      "MCP Sockets",
    ]);
    expect(WEB_APPLICATIONS_FORM.scopeLabel).toBe("What should we scope?");
    expect(WEB_APPLICATIONS_FORM.title).toBe("Request a project estimate");
    expect(WEB_APPLICATIONS_FORM.submitLabel).toBe(WEB_APPLICATIONS_CTA_LABEL);
    expect(WEB_APPLICATIONS_FORM.serviceNeeded).toBe("Spec-Driven Full-Stack Platforms");
  });
});
