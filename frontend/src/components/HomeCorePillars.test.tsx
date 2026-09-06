import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeCorePillars from "./HomeCorePillars";
import { HOME_CORE_PILLARS_SURFACE_CLASS } from "../lib/homeCorePillarsSurface";
import { HOME_PAGE_COPY } from "../lib/homePageContent";
import { QUALITY_FIRST_ICON_TEST_ID } from "../lib/qualityFirstIcon";

describe("HomeCorePillars", () => {
  it("renders the four governance pillars in a single bordered card", () => {
    render(
      <MemoryRouter>
        <HomeCorePillars />
      </MemoryRouter>,
    );

    const section = screen.getByTestId("home-core-pillars");
    expect(section).toHaveClass(HOME_CORE_PILLARS_SURFACE_CLASS);
    expect(within(section).getByRole("heading", { name: HOME_PAGE_COPY.corePillars.title })).toBeInTheDocument();
    const card = within(section).getByTestId("home-pillars-card");
    expect(card).toHaveClass("home-pillars-card", "stitch-surface-card");
    expect(within(card).getByTestId("home-pillars-grid")).toBeInTheDocument();
    expect(within(card).getByTestId(QUALITY_FIRST_ICON_TEST_ID)).toBeInTheDocument();
    expect(within(card).queryByTestId("quality-microscope-icon")).not.toBeInTheDocument();

    const pillars = within(card).getAllByTestId("home-governance-pillar");
    expect(pillars).toHaveLength(HOME_PAGE_COPY.corePillars.items.length);
    for (const item of HOME_PAGE_COPY.corePillars.items) {
      expect(within(card).getByRole("heading", { name: item.title })).toBeInTheDocument();
      expect(within(card).getByText(item.body)).toBeInTheDocument();
    }
  });
});
