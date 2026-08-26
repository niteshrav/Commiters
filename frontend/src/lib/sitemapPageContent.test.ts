import { describe, expect, it } from "vitest";
import { countSitemapLinks, SITEMAP_PAGE_COPY, SITEMAP_XML_PATH } from "./sitemapPageContent";
import { ROUTES } from "./routes";

describe("sitemapPageContent", () => {
  it("lists distinct professional groups without duplicate footer columns", () => {
    expect(SITEMAP_PAGE_COPY.groups.map((group) => group.id)).toEqual([
      "company",
      "services",
      "work",
      "careers",
      "about",
      "legal",
      "local",
    ]);
    expect(SITEMAP_PAGE_COPY.groups.every((group) => group.description.trim().length > 0)).toBe(true);
  });

  it("counts every indexed link and exposes the XML sitemap path", () => {
    expect(countSitemapLinks()).toBeGreaterThan(20);
    expect(SITEMAP_XML_PATH).toBe("/sitemap.xml");
    expect(SITEMAP_PAGE_COPY.groups.find((group) => group.id === "legal")?.links.some((link) => link.to === ROUTES.sitemap)).toBe(
      true,
    );
  });
});
