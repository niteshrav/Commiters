import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UtilitiesPage from "./UtilitiesPage";
import { UTILITIES_BANNER, UTILITIES_HERO, UTILITIES_SEO, UTILITIES_TOOLS } from "../lib/utilitiesPageContent";

describe("UtilitiesPage", () => {
  it("renders the free utilities hub with SEO, tool cards, and audit banner", () => {
    render(
      <MemoryRouter>
        <UtilitiesPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("utilities-page")).toBeInTheDocument();
    expect(screen.getByTestId("utilities-section")).toBeInTheDocument();
    expect(document.title).toBe(UTILITIES_SEO.title);
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute("content", UTILITIES_SEO.description);
    expect(screen.getByText(UTILITIES_HERO.eyebrow)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: UTILITIES_HERO.title, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(UTILITIES_HERO.subtitle)).toBeInTheDocument();

    const tools = screen.getByTestId("utilities-tools");
    for (const tool of UTILITIES_TOOLS) {
      expect(within(tools).getByRole("heading", { name: tool.title, level: 2 })).toBeInTheDocument();
      expect(within(tools).getByText(tool.description)).toBeInTheDocument();
      expect(within(tools).getByRole("link", { name: tool.ctaLabel })).toHaveAttribute("href", tool.to);
    }

    const banner = screen.getByTestId("utilities-banner");
    expect(within(banner).getByRole("heading", { name: UTILITIES_BANNER.title, level: 2 })).toBeInTheDocument();
    expect(within(banner).getByRole("link", { name: UTILITIES_BANNER.ctaLabel })).toHaveAttribute(
      "href",
      UTILITIES_BANNER.ctaTo,
    );
  });
});
