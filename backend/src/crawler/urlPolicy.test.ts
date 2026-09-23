import { describe, expect, it } from "vitest";
import { classifyLink, normalizeUrl, isSameHostname } from "./urlPolicy";

describe("urlPolicy", () => {
  it("removes fragments, default ports, tracking params, and trailing slashes", () => {
    expect(normalizeUrl("https://Example.com:443/about/?utm_source=x&gclid=1#section")).toBe(
      "https://example.com/about",
    );
  });

  it("rejects credentials and non-http schemes", () => {
    expect(normalizeUrl("https://user:pass@example.com/")).toBeNull();
    expect(normalizeUrl("ftp://example.com/file")).toBeNull();
    expect(normalizeUrl("javascript:alert(1)")).toBeNull();
  });

  it("treats duplicate normalized URLs as the same", () => {
    const a = normalizeUrl("https://example.com/path/?fbclid=abc#top");
    const b = normalizeUrl("https://EXAMPLE.com/path");
    expect(a).toBe(b);
  });

  it("same-site matches hostname only, not subdomains", () => {
    expect(isSameHostname("https://example.com/a", "https://example.com/b")).toBe(true);
    expect(isSameHostname("https://example.com/", "https://blog.example.com/")).toBe(false);
  });

  it("classifies internal vs external links", () => {
    expect(classifyLink("/about", "https://example.com/", "https://example.com/")).toEqual({
      kind: "internal",
      url: "https://example.com/about",
    });
    expect(classifyLink("https://other.test/", "https://example.com/", "https://example.com/").kind).toBe("external");
    expect(classifyLink("mailto:hi@example.com", "https://example.com/", "https://example.com/").kind).toBe("ignored");
  });
});
