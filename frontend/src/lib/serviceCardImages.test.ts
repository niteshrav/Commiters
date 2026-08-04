import { describe, expect, it } from "vitest";
import { SERVICE_CARD_IMAGE_BY_GRID_ID, resolveServiceCardImage, serviceCardImageForDetail } from "./serviceCardImages";

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
  });
});
