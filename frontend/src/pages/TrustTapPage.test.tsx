import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import TrustTapPage from "./TrustTapPage";
import {
  TRUSTTAP_BOTTOM_CTA,
  TRUSTTAP_FEATURES,
  TRUSTTAP_HERO,
  TRUSTTAP_HERO_SHOWCASE,
  TRUSTTAP_HOW_IT_WORKS,
  TRUSTTAP_LIVE_URL,
  TRUSTTAP_PORTAL_BANNER,
  TRUSTTAP_SEO,
} from "../lib/trustTapPageContent";
import { TRUSTTAP_PORTAL_BANNER_CLASS, TRUSTTAP_SECTION_SHELL_CLASS } from "../lib/trustTapPageLayout";

describe("TrustTapPage", () => {
  it("renders the minimal high-converting product sections", () => {
    render(
      <MemoryRouter>
        <TrustTapPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("trusttap-page")).not.toHaveAttribute("data-manual-hash-scroll");
    expect(document.title).toBe(TRUSTTAP_SEO.title);
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute("content", TRUSTTAP_SEO.description);

    expect(screen.getByTestId("trusttap-hero")).toHaveAttribute("id", "product-overview");
    expect(screen.getByTestId("trusttap-hero").className).not.toMatch(/scroll-mt-/);
    expect(screen.getByRole("heading", { level: 1, name: TRUSTTAP_HERO.title })).toBeInTheDocument();
    expect(screen.getByText(TRUSTTAP_HERO.tagline)).toBeInTheDocument();
    expect(screen.getByTestId("brand-hero-eyebrow")).toHaveTextContent(TRUSTTAP_HERO.kicker);
    for (const chip of TRUSTTAP_HERO.chips) {
      expect(screen.getByText(chip.label)).toBeInTheDocument();
    }
    expect(screen.getByTestId("trusttap-hero-showcase")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: TRUSTTAP_HERO_SHOWCASE.image.alt })).toHaveAttribute(
      "src",
      TRUSTTAP_HERO_SHOWCASE.image.src,
    );

    for (const feature of TRUSTTAP_FEATURES.items) {
      expect(screen.getByRole("heading", { name: feature.title })).toBeInTheDocument();
      expect(screen.getByText(feature.body)).toBeInTheDocument();
    }

    const deployLinks = screen.getAllByRole("link", { name: /Deploy trustTap/i });
    expect(deployLinks.length).toBeGreaterThanOrEqual(2);
    for (const link of deployLinks) {
      expect(link).toHaveAttribute("href", TRUSTTAP_HERO.primaryHref);
    }

    const portalCta = screen.getByRole("link", { name: TRUSTTAP_HERO.secondaryLabel });
    expect(portalCta).toHaveAttribute("href", TRUSTTAP_LIVE_URL);
    expect(portalCta).toHaveAttribute("target", "_blank");
    expect(portalCta).toHaveAttribute("rel", "noopener noreferrer");

    expect(screen.getByRole("heading", { name: TRUSTTAP_HOW_IT_WORKS.title })).toBeInTheDocument();
    for (const step of TRUSTTAP_HOW_IT_WORKS.steps) {
      expect(screen.getByRole("heading", { name: step.title })).toBeInTheDocument();
      expect(screen.getByText(step.body)).toBeInTheDocument();
    }

    const banner = screen.getByTestId("trusttap-portal-banner");
    expect(banner).toHaveClass(...TRUSTTAP_PORTAL_BANNER_CLASS.split(" "));
    expect(within(banner).getByRole("heading", { name: TRUSTTAP_PORTAL_BANNER.title })).toBeInTheDocument();
    expect(within(banner).getByText(TRUSTTAP_PORTAL_BANNER.subtext)).toBeInTheDocument();
    const bannerCta = within(banner).getByRole("link", { name: TRUSTTAP_PORTAL_BANNER.ctaLabel });
    expect(bannerCta).toHaveAttribute("href", TRUSTTAP_LIVE_URL);
    expect(bannerCta).toHaveAttribute("target", "_blank");

    const howItWorks = screen.getByTestId("trusttap-how-it-works");
    const bottomCta = screen.getByTestId("trusttap-bottom-cta");
    expect(howItWorks.compareDocumentPosition(banner) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(banner.compareDocumentPosition(bottomCta) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    expect(screen.getByRole("heading", { name: TRUSTTAP_BOTTOM_CTA.title })).toBeInTheDocument();
    const bottomPortal = screen.getByRole("link", { name: TRUSTTAP_BOTTOM_CTA.secondaryLabel });
    expect(bottomPortal).toHaveAttribute("href", TRUSTTAP_LIVE_URL);
    expect(bottomPortal).toHaveAttribute("target", "_blank");

    const features = screen.getByTestId("trusttap-features");
    expect(features).toHaveClass(...TRUSTTAP_SECTION_SHELL_CLASS.split(" "));
    expect(features).toHaveAttribute("id", "core-pillars");
    expect(features.className).not.toMatch(/scroll-mt-/);
    expect(howItWorks).toHaveClass(...TRUSTTAP_SECTION_SHELL_CLASS.split(" "));
    expect(howItWorks).toHaveAttribute("id", "how-it-works");
    expect(howItWorks.className).not.toMatch(/scroll-mt-/);
    expect(document.getElementById("hospitality")).toBeTruthy();
    expect(document.getElementById("features")).toBeTruthy();
    expect(document.getElementById("trusttap-how-it-works")).toBeTruthy();
    expect(screen.queryByTestId("trusttap-benefits")).not.toBeInTheDocument();
    expect(screen.queryByTestId("trusttap-faq")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Launch admin" })).not.toBeInTheDocument();
    expect(screen.queryByText(/ground verification|field inspection|logistics/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/trusttap\.commiters\.com/i)).not.toBeInTheDocument();
  });
});
