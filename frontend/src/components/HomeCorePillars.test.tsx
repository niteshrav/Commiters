import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeCorePillars from "./HomeCorePillars";
import { HOME_CORE_PILLARS_SURFACE_CLASS } from "../lib/homeCorePillarsSurface";
import { HOME_PAGE_COPY } from "../lib/homePageContent";
import { QUALITY_FIRST_ICON_TEST_ID } from "../lib/qualityFirstIcon";

describe("HomeCorePillars", () => {
  it("renders a single bordered card with shield icon for quality-first engineering", () => {
    render(
      <MemoryRouter>
        <HomeCorePillars />
      </MemoryRouter>,
    );

    const section = screen.getByTestId("home-core-pillars");
    expect(section).toHaveClass(HOME_CORE_PILLARS_SURFACE_CLASS);
    const card = within(section).getByTestId("home-pillars-card");
    expect(card).toHaveClass("home-pillars-card", "stitch-surface-card");
    expect(within(card).getByTestId(QUALITY_FIRST_ICON_TEST_ID)).toBeInTheDocument();
    expect(within(card).queryByTestId("quality-microscope-icon")).not.toBeInTheDocument();
    expect(within(card).getByRole("heading", { name: HOME_PAGE_COPY.corePillars.quality.title })).toBeInTheDocument();
    expect(within(card).getByText(HOME_PAGE_COPY.corePillars.founderLed.body)).toBeInTheDocument();
  });

  it("renders client deliverable metrics from home page copy", () => {
    render(
      <MemoryRouter>
        <HomeCorePillars />
      </MemoryRouter>,
    );

    const card = screen.getByTestId("home-pillars-card");
    for (const metric of HOME_PAGE_COPY.corePillars.quality.metrics) {
      expect(within(card).getByText(metric.value)).toBeInTheDocument();
      expect(within(card).getByText(metric.label)).toBeInTheDocument();
    }
  });
});
