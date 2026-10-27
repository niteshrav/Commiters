import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import { findInPageTrustTapHashTarget, isTrustTapPath } from "./trustTapHashScroll";

describe("trustTapHashScroll", () => {
  it("only intercepts hash clicks that already belong to the trustTap page", () => {
    expect(isTrustTapPath(ROUTES.trustTap)).toBe(true);
    expect(isTrustTapPath(ROUTES.trustTapShort)).toBe(true);
    expect(isTrustTapPath(ROUTES.trustTapLegacy)).toBe(true);
    expect(isTrustTapPath(ROUTES.trustTapShortLegacy)).toBe(true);
    expect(isTrustTapPath(ROUTES.home)).toBe(false);

    document.body.innerHTML = '<section id="core-pillars"></section>';
    expect(findInPageTrustTapHashTarget(`${ROUTES.trustTapShort}#core-pillars`, ROUTES.home)).toBeNull();
    expect(findInPageTrustTapHashTarget(`${ROUTES.trustTapShort}#core-pillars`, ROUTES.trustTap)?.id).toBe("core-pillars");
    document.body.innerHTML = "";
  });
});
