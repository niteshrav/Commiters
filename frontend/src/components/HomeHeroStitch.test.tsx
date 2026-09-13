import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeHeroStitch from "./HomeHeroStitch";
import { HOME_IMAGE_FULL_COLOR_CLASS } from "../lib/homeImagePresentation";
import {
  HOME_CLOUD_LEAD_CLASS,
  HOME_CLOUD_THEME_CLASS,
  HOME_CLOUD_TITLE_ACCENT_CLASS,
  HOME_CLOUD_TITLE_CLASS,
} from "../lib/homeCloudTheme";
import { BRAND_HERO_EYEBROW_TESTID, BRAND_HERO_EYEBROW_TEXT, BRAND_HERO_EYEBROW_WRAP_CLASS } from "../lib/siteBrandChrome";
import { HOME_PRIMARY_SURFACE_CLASS } from "../lib/homePrimarySurface";
import { HOME_PAGE_ASSETS, HOME_PAGE_COPY } from "../lib/homePageContent";
import { AI_OPERATIONAL_AUDIT_BOOKING_HREF, OPSFLOW_HERO_PAGE_HREF } from "../lib/routes";

describe("HomeHeroStitch", () => {
  it("renders a full-color hero photo without grayscale tone classes", () => {
    render(
      <MemoryRouter>
        <HomeHeroStitch />
      </MemoryRouter>,
    );

    const hero = screen.getByTestId("stitch-home-hero");
    expect(hero).toHaveClass(HOME_PRIMARY_SURFACE_CLASS, HOME_CLOUD_THEME_CLASS);
    expect(screen.getByTestId(BRAND_HERO_EYEBROW_TESTID)).toHaveClass(...BRAND_HERO_EYEBROW_WRAP_CLASS.split(" "));
    expect(screen.getByTestId(BRAND_HERO_EYEBROW_TESTID)).toHaveTextContent(BRAND_HERO_EYEBROW_TEXT);
    expect(screen.getByRole("heading", { name: HOME_PAGE_COPY.hero.title })).toHaveClass(HOME_CLOUD_TITLE_CLASS);
    expect(screen.getByText(HOME_PAGE_COPY.hero.titleAccent)).toHaveClass(HOME_CLOUD_TITLE_ACCENT_CLASS);
    expect(screen.getByText(HOME_PAGE_COPY.hero.subtext)).toHaveClass(HOME_CLOUD_LEAD_CLASS);
    expect(screen.queryByTestId("home-sprint-card")).not.toBeInTheDocument();

    const visual = screen.getByTestId("stitch-home-hero-visual");
    expect(visual).not.toHaveClass("stitch-home-hero-visual--tone");

    const heroImage = screen.getByTestId("home-hero-visual");
    expect(visual).toContainElement(heroImage);
    expect(heroImage).toHaveAttribute("src", HOME_PAGE_ASSETS.heroMonitor);
    expect(heroImage).toHaveClass("stitch-home-hero-photo", HOME_IMAGE_FULL_COLOR_CLASS);
    expect(heroImage).not.toHaveClass("home-image-tone");
    expect(screen.getByRole("link", { name: /Try OpsFlow AI/i })).toHaveAttribute(
      "href",
      OPSFLOW_HERO_PAGE_HREF,
    );
    expect(screen.getByRole("link", { name: /Book Operational Audit/i })).toHaveAttribute(
      "href",
      AI_OPERATIONAL_AUDIT_BOOKING_HREF,
    );
  });
});
