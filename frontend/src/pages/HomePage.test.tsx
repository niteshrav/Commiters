import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";
import { HOME_PAGE_ASSETS, HOME_PAGE_COPY } from "../lib/homePageContent";
import { ROUTES } from "../lib/routes";
import { HOME_CORE_PILLARS_SURFACE_CLASS } from "../lib/homeCorePillarsSurface";
import { HOME_SECTION_SEPARATOR_CLASS, HOME_SECTION_SEPARATOR_IDS } from "../lib/homeSectionLayout";

describe("HomePage", () => {
  it("renders home sections with separators and built-for-scale before the dark CTA", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const page = screen.getByTestId("home-page");
    const childTestIds = Array.from(page.children).map((node) => node.getAttribute("data-testid"));

    expect(childTestIds).toEqual([
      "stitch-home-hero",
      HOME_SECTION_SEPARATOR_IDS.afterHero,
      "home-core-pillars",
      HOME_SECTION_SEPARATOR_IDS.afterPillars,
      "home-built-for-scale",
      HOME_SECTION_SEPARATOR_IDS.afterBuiltForScale,
      "home-ready-cta",
    ]);

    expect(screen.queryByTestId("home-sprint-card")).not.toBeInTheDocument();
    expect(screen.getByTestId(HOME_SECTION_SEPARATOR_IDS.afterHero)).toHaveClass(
      "home-section-separator",
      HOME_SECTION_SEPARATOR_CLASS,
    );
    expect(screen.getByTestId("home-core-pillars")).toHaveClass(HOME_CORE_PILLARS_SURFACE_CLASS);
  });

  it("matches hero copy and links without the sprint overlay card", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("engineering-precision-badge")).toHaveTextContent(/ENGINEERING PRECISION/i);
    expect(screen.getByRole("heading", { name: HOME_PAGE_COPY.hero.title })).toBeInTheDocument();
    expect(screen.getByTestId("home-hero-visual")).toHaveAttribute("src", HOME_PAGE_ASSETS.heroMonitor);
  });

  it("matches built-for-scale mockup with surface, image, body, and three features", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const hero = screen.getByTestId("stitch-home-hero");
    const scale = screen.getByTestId("home-built-for-scale");
    expect(hero).toHaveClass("home-primary-surface");
    expect(scale).toHaveClass("home-primary-surface");
    expect(within(scale).getByRole("heading", { name: HOME_PAGE_COPY.builtForScale.title })).toBeInTheDocument();
    expect(within(scale).getByText(HOME_PAGE_COPY.builtForScale.body)).toBeInTheDocument();
    expect(within(scale).getByText("Cloud-Native Architecture")).toBeInTheDocument();
    expect(within(scale).getAllByTestId("home-scale-feature")).toHaveLength(3);
    expect(within(scale).getByTestId("home-built-for-scale-image")).toHaveAttribute("src", HOME_PAGE_ASSETS.serverRacks);
  });

  it("links the hero to Our Work without a tech stack link", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.queryByRole("link", { name: /tech stack|our stack/i })).not.toBeInTheDocument();

    const heroActions = screen.getByTestId("hero-actions");
    expect(within(heroActions).getByRole("link", { name: /Our Work/i })).toHaveAttribute(
      "href",
      ROUTES.caseStudies,
    );
  });

  it("matches dark CTA copy without engineering in the subtext", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const cta = screen.getByTestId("home-ready-cta");
    expect(within(cta).getByText(HOME_PAGE_COPY.bottomCta.subtext)).toBeInTheDocument();
    expect(within(cta).getByText(HOME_PAGE_COPY.bottomCta.subtext)).not.toHaveTextContent(/engineering/i);
  });
});
