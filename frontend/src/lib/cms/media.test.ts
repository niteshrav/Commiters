import { describe, expect, it } from "vitest";
import { COMMITERS_HEADER_LOGO_SRC } from "../siteBrand";
import { resolveBrandLogoSrc, resolveCmsMediaUrl } from "./media";

describe("cms media", () => {
  it("resolves upload paths against the API base URL", () => {
    expect(resolveCmsMediaUrl("/uploads/logo.png")).toBe("http://localhost:4000/uploads/logo.png");
    expect(resolveCmsMediaUrl("https://cdn.example.com/logo.png")).toBe("https://cdn.example.com/logo.png");
    expect(resolveCmsMediaUrl("/assets/commiters-header-logo.png")).toBe("/assets/commiters-header-logo.png");
  });

  it("falls back to the bundled wordmark for placeholder CMS logos", () => {
    expect(resolveBrandLogoSrc("/assets/icons/favicon.svg")).toBe(COMMITERS_HEADER_LOGO_SRC);
    expect(resolveBrandLogoSrc("")).toBe(COMMITERS_HEADER_LOGO_SRC);
    expect(resolveBrandLogoSrc("/uploads/custom-logo.png")).toBe("http://localhost:4000/uploads/custom-logo.png");
  });
});
