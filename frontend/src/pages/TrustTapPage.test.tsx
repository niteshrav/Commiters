import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TrustTapPage from "./TrustTapPage";
import {
  TRUSTTAP_ABOUT,
  TRUSTTAP_BENEFITS,
  TRUSTTAP_FEATURES,
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
    expect(screen.getByRole("img", { name: TRUSTTAP_HERO_SHOWCASE.livePreview.alt })).toHaveAttribute(
      "src",
      TRUSTTAP_HERO_SHOWCASE.livePreview.src,
    );
    expect(screen.getByText(TRUSTTAP_ABOUT.body)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: TRUSTTAP_ABOUT.illustration.alt })).toHaveAttribute(
      "src",
      TRUSTTAP_ABOUT.illustration.src,
    );

    for (const feature of TRUSTTAP_FEATURES.items) {
      expect(screen.getByRole("heading", { name: feature.title })).toBeInTheDocument();
    }

    for (const benefit of TRUSTTAP_BENEFITS.items) {
      expect(screen.getByText(benefit)).toBeInTheDocument();
    }

    expect(screen.getByRole("link", { name: TRUSTTAP_HERO.primaryLabel })).toHaveAttribute("href", TRUSTTAP_HERO.primaryHref);
    expect(screen.getByRole("link", { name: TRUSTTAP_HERO.secondaryLabel })).toHaveAttribute(
      "href",
      TRUSTTAP_HERO.secondaryHref,
    );

    expect(screen.getByTestId("trusttap-faq")).toBeInTheDocument();
    expect(screen.getByTestId("trusttap-preview")).toBeInTheDocument();
  });
});
