import { describe, expect, it } from "vitest";
import {
  SERVICE_SLUGS,
  buildServiceDetailPath,
  getServiceByGridId,
  getServiceBySlug,
  resolveServiceDetailHref,
} from "./index";

describe("services catalog", () => {
  it("lists all service slugs for dynamic routing", () => {
    expect(SERVICE_SLUGS).toEqual([
      "website-development",
      "web-application-development",
      "mobile-app-development",
      "e-commerce-development",
      "ai-integration",
      "mvp-development",
      "automation-tools",
    ]);
  });

  it("resolves detail hrefs from cms ids, icons, and titles", () => {
    expect(resolveServiceDetailHref({ icon: "ecommerce" })).toBe("/services/e-commerce-development");
    expect(resolveServiceDetailHref({ title: "E-commerce Development" })).toBe("/services/e-commerce-development");
    expect(resolveServiceDetailHref({ id: "web-applications" })).toBe("/services/web-application-development");
    expect(getServiceBySlug("website-development")?.title).toBe("Website Development");
    expect(getServiceByGridId("web-applications")?.slug).toBe("web-application-development");
    expect(buildServiceDetailPath("mvp-development")).toBe("/services/mvp-development");
  });

  it("includes timeline and pricing for engagement planning", () => {
    for (const slug of SERVICE_SLUGS) {
      const service = getServiceBySlug(slug);
      expect(service?.timeline.length).toBeGreaterThan(0);
      expect(service?.pricing.length).toBeGreaterThanOrEqual(3);
    }
  });
});
