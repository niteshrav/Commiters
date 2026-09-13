import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import { findInPageServicesHashTarget, isServicesPath } from "./servicesHashScroll";

describe("servicesHashScroll", () => {
  it("only intercepts hash clicks that already belong to the Services page", () => {
    expect(isServicesPath(ROUTES.services)).toBe(true);
    expect(isServicesPath(ROUTES.home)).toBe(false);

    document.body.innerHTML = '<section id="governed-ai"></section>';
    expect(findInPageServicesHashTarget(`${ROUTES.services}#governed-ai`, ROUTES.home)).toBeNull();
    expect(findInPageServicesHashTarget(`${ROUTES.audit}`, ROUTES.services)).toBeNull();
    expect(findInPageServicesHashTarget(`${ROUTES.services}#governed-ai`, ROUTES.services)?.id).toBe("governed-ai");
    document.body.innerHTML = "";
  });
});
