import { afterEach, describe, expect, it, vi } from "vitest";
import { createFetchPage } from "./httpClient";

describe("httpClient", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("follows redirects and rejects a redirect to a private IP", async () => {
    const fetchMock = vi.fn(async (url: string) => {
      if (String(url) === "https://example.com/") {
        return {
          status: 302,
          headers: { get: (name: string) => (name.toLowerCase() === "location" ? "https://internal.example/" : null) },
            text: async (): Promise<string> => "",
          };
        }
        return {
          status: 200,
          headers: { get: () => "text/html" },
          text: async (): Promise<string> => "<html></html>",
      };
    });
    vi.stubGlobal("fetch", fetchMock);

    const lookup = vi.fn(async (hostname: string) => {
      if (hostname === "internal.example") return { address: "10.0.0.5", family: 4 };
      return { address: "93.184.216.34", family: 4 };
    });

    const fetchPage = createFetchPage(lookup);
    await expect(fetchPage("https://example.com/", 2000)).rejects.toThrow(/private/);
  });

  it("returns the final HTML document after a safe redirect", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => {
        if (String(url) === "https://example.com/") {
          return {
            status: 301,
            headers: { get: (name: string) => (name.toLowerCase() === "location" ? "https://example.com/home" : null) },
              text: async (): Promise<string> => "",
            };
          }
          return {
            status: 200,
            headers: { get: () => "text/html; charset=utf-8" },
            text: async (): Promise<string> => "<html><title>Home</title></html>",
        };
      }),
    );

    const fetchPage = createFetchPage(async () => ({ address: "93.184.216.34", family: 4 }));
    const result = await fetchPage("https://example.com/", 2000);
    expect(result.finalUrl).toBe("https://example.com/home");
    expect(result.status).toBe(200);
    expect(result.body).toContain("Home");
  });
});
