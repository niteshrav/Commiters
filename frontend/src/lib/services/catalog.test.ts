import { describe, expect, it } from "vitest";
import {
  SERVICE_SLUGS,
  buildServiceDetailPath,
  getServiceByGridId,
  getServiceBySlug,
} from "./index";

describe("services catalog", () => {
  it("lists all service slugs for dynamic routing", () => {
    expect(SERVICE_SLUGS).toEqual([
      "website-development",
      "web-application-development",
      "mobile-app-development",
      "ai-integration",
      "mvp-development",
      "automation-tools",
    ]);
  });

  it("resolves services by slug and grid id", () => {
    expect(getServiceBySlug("website-development")?.title).toBe("Website Development");
    expect(getServiceByGridId("web-applications")?.slug).toBe("web-application-development");
    expect(buildServiceDetailPath("mvp-development")).toBe("/services/mvp-development");
  });

  it("includes at least ten FAQs per service", () => {
    for (const slug of SERVICE_SLUGS) {
      const service = getServiceBySlug(slug);
      expect(service?.faqs.length).toBeGreaterThanOrEqual(10);
    }
  });
});
