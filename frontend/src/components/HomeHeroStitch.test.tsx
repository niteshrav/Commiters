import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeHeroStitch from "./HomeHeroStitch";
import { HOME_IMAGE_FULL_COLOR_CLASS } from "../lib/homeImagePresentation";
import { HOME_PRIMARY_SURFACE_CLASS } from "../lib/homePrimarySurface";
import { HOME_PAGE_ASSETS } from "../lib/homePageContent";
import { ROUTES } from "../lib/routes";

describe("HomeHeroStitch", () => {
  it("renders a full-color hero photo without grayscale tone classes", () => {
    render(
      <MemoryRouter>
        <HomeHeroStitch />
      </MemoryRouter>,
    );

    const hero = screen.getByTestId("stitch-home-hero");
    expect(hero).toHaveClass(HOME_PRIMARY_SURFACE_CLASS);
    expect(screen.queryByTestId("home-sprint-card")).not.toBeInTheDocument();

    const visual = screen.getByTestId("stitch-home-hero-visual");
    expect(visual).not.toHaveClass("stitch-home-hero-visual--tone");

    const heroImage = screen.getByTestId("home-hero-visual");
    expect(visual).toContainElement(heroImage);
    expect(heroImage).toHaveAttribute("src", HOME_PAGE_ASSETS.heroMonitor);
    expect(heroImage).toHaveClass("stitch-home-hero-photo", HOME_IMAGE_FULL_COLOR_CLASS);
    expect(heroImage).not.toHaveClass("home-image-tone");
    expect(screen.getByRole("link", { name: /Our Work/i })).toHaveAttribute("href", ROUTES.caseStudies);
  });
});
