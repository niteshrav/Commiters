import { describe, expect, it } from "vitest";
import { SERVICE_CARD_IMAGE_BY_GRID_ID, resolveServiceCardImage, serviceCardImageForDetail, serviceCardImageForGridId } from "./serviceCardImages";

describe("serviceCardImages", () => {
  it("maps every grid id to a public asset", () => {
    expect(Object.keys(SERVICE_CARD_IMAGE_BY_GRID_ID)).toHaveLength(7);
    for (const src of Object.values(SERVICE_CARD_IMAGE_BY_GRID_ID)) {
      expect(src.startsWith("/assets/services/")).toBe(true);
    }
  });

  it("resolves website development by grid id and slug", () => {
    expect(resolveServiceCardImage({ gridId: "website-development", title: "Website Development" }).src).toBe(
      "/assets/services/website-development.jpg",
    );
    expect(serviceCardImageForDetail("website-development").src).toBe("/assets/services/website-development.jpg");
  });

  it("resolves web applications catalog slug to the web-applications art", () => {
    expect(serviceCardImageForDetail("web-application-development").src).toBe(
      "/assets/services/web-applications.jpg",
    );
    expect(serviceCardImageForGridId("web-application-development", "Web Application Development").src).toBe(
      "/assets/services/web-applications.jpg",
    );
    expect(serviceCardImageForGridId("mobile-app-development", "Mobile App Development").src).toBe(
      "/assets/services/mobile-applications.jpg",
    );
  });

  it("maps Full-Lifecycle Engineering Services pages to the shared service photos", () => {
    expect(serviceCardImageForDetail("e-commerce-development").src).toBe(
      "/assets/services/e-commerce-development.jpg",
    );
    expect(serviceCardImageForDetail("mobile-app-development").src).toBe(
      "/assets/services/mobile-applications.jpg",
    );
    expect(serviceCardImageForDetail("mvp-development").src).toBe("/assets/services/mvp-development.jpg");
    expect(serviceCardImageForDetail("automation-tools").src).toBe("/assets/services/automation-tools.jpg");
    expect(serviceCardImageForDetail("web-application-development").src).toBe(
      "/assets/services/web-applications.jpg",
    );
    expect(serviceCardImageForGridId("automation-tools", "Connect Your Tools & Automate Repetitive Back-Office Tasks").src).toBe(
      "/assets/services/automation-tools.jpg",
    );
  });
});
