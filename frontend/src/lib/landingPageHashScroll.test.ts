import { describe, expect, it } from "vitest";
import {
  isServicesPath,
  landingPageHashExtraOffset,
  landingPageHashOffsetTop,
  measureLandingPageHeaderHeight,
  resolveLandingPageScrollAnchor,
  usesLandingPageHashScroll,
} from "./landingPageHashScroll";
import { ROUTES } from "./routes";

describe("landingPageHashScroll", () => {
  it("owns OpsFlow, trustTap, Services, and About landing hashes", () => {
    expect(usesLandingPageHashScroll(ROUTES.opsFlow)).toBe(true);
    expect(usesLandingPageHashScroll(ROUTES.opsFlowPlayground)).toBe(true);
    expect(usesLandingPageHashScroll(ROUTES.opsFlowAi)).toBe(true);
    expect(usesLandingPageHashScroll(ROUTES.trustTap)).toBe(true);
    expect(usesLandingPageHashScroll(ROUTES.trustTapShort)).toBe(true);
    expect(usesLandingPageHashScroll(ROUTES.services)).toBe(true);
    expect(usesLandingPageHashScroll(ROUTES.about)).toBe(true);
    expect(isServicesPath(ROUTES.services)).toBe(true);
    expect(usesLandingPageHashScroll(ROUTES.home)).toBe(false);
    expect(usesLandingPageHashScroll(ROUTES.aiOperationalAudit)).toBe(false);
  });

  it("subtracts the live header height plus extra clearance", () => {
    expect(measureLandingPageHeaderHeight(null)).toBe(80);
    expect(
      measureLandingPageHeaderHeight({
        getBoundingClientRect: () => ({ height: 96 }),
      }),
    ).toBe(96);
    expect(landingPageHashExtraOffset("our-values")).toBe(8);
    expect(landingPageHashExtraOffset("features")).toBe(8);
    expect(landingPageHashExtraOffset("delivery-journey")).toBe(8);
    expect(landingPageHashOffsetTop(640, 120, 96, 8)).toBe(656);
    expect(landingPageHashOffsetTop(40, 0, 96, 8)).toBe(0);
  });

  it("scrolls to the hero title, otherwise the section kicker, otherwise the heading", () => {
    document.body.innerHTML = `
      <section id="the-studio">
        <p class="about-intro-kicker">ENTERPRISE</p>
        <h1>Engineering High-Trust AI Products</h1>
      </section>
      <section id="our-values">
        <p class="about-principles-kicker">OUR VALUES</p>
        <h2>What We Stand For</h2>
      </section>
      <section id="features">
        <h2>Core Capabilities</h2>
      </section>
    `;

    expect(resolveLandingPageScrollAnchor(document.getElementById("the-studio")!).tagName).toBe("H1");
    expect(resolveLandingPageScrollAnchor(document.getElementById("our-values")!).className).toContain("kicker");
    expect(resolveLandingPageScrollAnchor(document.getElementById("features")!).textContent).toBe("Core Capabilities");

    document.body.innerHTML = "";
  });
});
