import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import { findInPageAboutHashTarget, isAboutPath } from "./aboutHashScroll";

describe("aboutHashScroll", () => {
  it("only intercepts hash clicks that already belong to the About page", () => {
    expect(isAboutPath(ROUTES.about)).toBe(true);
    expect(isAboutPath(ROUTES.home)).toBe(false);

    document.body.innerHTML = '<section id="our-values"></section>';
    expect(findInPageAboutHashTarget(`${ROUTES.about}#our-values`, ROUTES.home)).toBeNull();
    expect(findInPageAboutHashTarget(`${ROUTES.about}#our-values`, ROUTES.about)?.id).toBe("our-values");
    document.body.innerHTML = "";
  });
});
