import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TrustTapPage from "./TrustTapPage";
import {
  TRUSTTAP_BENEFITS,
  TRUSTTAP_FEATURES,
  TRUSTTAP_FAQ,
  TRUSTTAP_HERO,
  TRUSTTAP_HERO_SHOWCASE,
  TRUSTTAP_SEO,
} from "../lib/trustTapPageContent";

describe("TrustTapPage", () => {
  it("renders product sections, CTAs, and SEO title", () => {
    render(
      <MemoryRouter>
        <TrustTapPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("trusttap-page")).toBeInTheDocument();
    expect(document.title).toBe(TRUSTTAP_SEO.title);
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute("content", TRUSTTAP_SEO.description);

    expect(
      screen.getByRole("heading", {
        name: new RegExp(`${TRUSTTAP_HERO.titleLead}\\s*${TRUSTTAP_HERO.titleAccent}`, "i"),
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(TRUSTTAP_HERO.tagline)).toBeInTheDocument();
    expect(screen.getByTestId("trusttap-hero-showcase")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: TRUSTTAP_HERO_SHOWCASE.image.alt })).toHaveAttribute(
      "src",
      TRUSTTAP_HERO_SHOWCASE.image.src,
    );

    for (const feature of TRUSTTAP_FEATURES.items) {
      expect(screen.getByRole("heading", { name: feature.title })).toBeInTheDocument();
    }

    for (const benefit of TRUSTTAP_BENEFITS.items) {
      expect(screen.getByRole("heading", { name: benefit.title })).toBeInTheDocument();
      expect(screen.getByText(benefit.body)).toBeInTheDocument();
    }

    const primaryLinks = screen.getAllByRole("link", { name: TRUSTTAP_HERO.primaryLabel });
    expect(primaryLinks.length).toBeGreaterThanOrEqual(1);
    for (const link of primaryLinks) {
      expect(link).toHaveAttribute("href", TRUSTTAP_HERO.primaryHref);
    }
    const secondaryLinks = screen.getAllByRole("link", { name: TRUSTTAP_HERO.secondaryLabel });
    expect(secondaryLinks.length).toBeGreaterThanOrEqual(1);
    for (const link of secondaryLinks) {
      expect(link).toHaveAttribute("href", TRUSTTAP_HERO.secondaryHref);
    }

    expect(screen.getByTestId("trusttap-faq")).toHaveAttribute("id", "trusttap-faq");
    expect(screen.getByText(TRUSTTAP_FAQ.subtext)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Launch admin" })).not.toBeInTheDocument();
  });
});
