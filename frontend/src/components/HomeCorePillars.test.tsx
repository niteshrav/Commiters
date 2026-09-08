import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeCorePillars from "./HomeCorePillars";
import { HOME_CORE_PILLARS_SURFACE_CLASS, HOME_CORE_PILLARS_SURFACE_HEX } from "../lib/homeCorePillarsSurface";
import { HOME_PRIMARY_SURFACE_CLASS } from "../lib/homePrimarySurface";
import { HOME_PAGE_COPY } from "../lib/homePageContent";
import { QUALITY_FIRST_ICON_TEST_ID } from "../lib/qualityFirstIcon";

describe("HomeCorePillars", () => {
  it("renders the trust-band governance cards with arrow links", () => {
    render(
      <MemoryRouter>
        <HomeCorePillars />
      </MemoryRouter>,
    );

    const section = screen.getByTestId("home-core-pillars");
    expect(section).toHaveClass(HOME_CORE_PILLARS_SURFACE_CLASS, "home-core-pillars--trust", HOME_PRIMARY_SURFACE_CLASS);
    expect(section).toHaveStyle({ backgroundColor: HOME_CORE_PILLARS_SURFACE_HEX });
    expect(within(section).getByText(HOME_PAGE_COPY.corePillars.kicker)).toBeInTheDocument();
    expect(within(section).getByRole("heading", { name: HOME_PAGE_COPY.corePillars.title })).toBeInTheDocument();

    const grid = within(section).getByTestId("home-pillars-grid");
    expect(grid).toHaveClass("home-pillars-grid");
    expect(within(grid).getByTestId(QUALITY_FIRST_ICON_TEST_ID)).toBeInTheDocument();
    expect(within(grid).queryByTestId("quality-microscope-icon")).not.toBeInTheDocument();

    const pillars = within(grid).getAllByTestId("home-governance-pillar");
    expect(pillars).toHaveLength(HOME_PAGE_COPY.corePillars.items.length);
    for (const item of HOME_PAGE_COPY.corePillars.items) {
      expect(within(grid).getByRole("heading", { name: item.label })).toBeInTheDocument();
      expect(within(grid).getByText(item.summary)).toBeInTheDocument();
      expect(within(grid).getByRole("link", { name: `Learn about ${item.label}: ${item.title}` })).toHaveAttribute(
        "href",
        item.to,
      );
      expect(within(grid).getByRole("link", { name: `Learn about ${item.label}: ${item.title}` })).toHaveClass(
        `home-pillar-card-action--${item.tone}`,
      );
    }
  });
});
