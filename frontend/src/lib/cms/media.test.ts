import { describe, expect, it } from "vitest";
import { COMMITERS_FOOTER_LOGO_SRC, COMMITERS_HEADER_LOGO_SRC } from "../siteBrand";
import { footerBrandLogoSrc, resolveBrandLogoSrc, resolveCmsMediaUrl } from "./media";

describe("cms media", () => {
  it("resolves upload paths against the API base URL", () => {
    expect(resolveCmsMediaUrl("/uploads/logo.png")).toBe("http://localhost:4000/uploads/logo.png");
    expect(resolveCmsMediaUrl("https://cdn.example.com/logo.png")).toBe("https://cdn.example.com/logo.png");
    expect(resolveCmsMediaUrl("/brand/logo-horizontal.png")).toBe("/brand/logo-horizontal.png");
  });

  it("falls back to the bundled wordmark for placeholder CMS logos", () => {
    expect(resolveBrandLogoSrc("/assets/icons/favicon.svg")).toBe(COMMITERS_HEADER_LOGO_SRC);
    expect(resolveBrandLogoSrc("")).toBe(COMMITERS_HEADER_LOGO_SRC);
    expect(resolveBrandLogoSrc("/uploads/custom-logo.png")).toBe("http://localhost:4000/uploads/custom-logo.png");
  });

  it("uses the primary logo for the footer lockup", () => {
    expect(footerBrandLogoSrc()).toBe(COMMITERS_FOOTER_LOGO_SRC);
  });
});
