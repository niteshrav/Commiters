import { describe, expect, it } from "vitest";
import { mapTechnicalLedgerArticle } from "./technicalLedgerArticles";

describe("technicalLedgerArticles", () => {
  it("maps API article records into card-friendly article objects", () => {
    const mapped = mapTechnicalLedgerArticle({
      id: "abc123",
      category: "ENGINEERING",
      title: "Sample Article",
      summary: "Summary text.",
      href: "https://medium.com/@erniteshrav/sample-article",
      imageSrc: "/assets/home/home-hero-monitor.png",
      imageAlt: "Cover image",
      source: "medium",
      publishedAt: "2026-06-17T06:31:59.855Z",
    });

    expect(mapped).toEqual({
      id: "abc123",
      category: "ENGINEERING",
      title: "Sample Article",
      summary: "Summary text.",
      href: "https://medium.com/@erniteshrav/sample-article",
      image: {
        src: "/assets/home/home-hero-monitor.png",
        alt: "Cover image",
      },
    });
  });
});
