import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeBuiltForScale from "./HomeBuiltForScale";
import {
  BUILT_FOR_SCALE_FEATURE_COUNT,
  BUILT_FOR_SCALE_GRID_CLASS,
  BUILT_FOR_SCALE_IMAGE_HEIGHT,
  BUILT_FOR_SCALE_IMAGE_SIZES,
  BUILT_FOR_SCALE_IMAGE_WIDTH,
} from "../lib/homeBuiltForScaleLayout";
import { HOME_IMAGE_FULL_COLOR_CLASS } from "../lib/homeImagePresentation";
import { HOME_PRIMARY_SURFACE_CLASS } from "../lib/homePrimarySurface";
import { HOME_PAGE_ASSETS, HOME_PAGE_COPY } from "../lib/homePageContent";
import { ROUTES } from "../lib/routes";

describe("HomeBuiltForScale", () => {
  it("renders the cloud-built-right mockup with image badges and feature cards", () => {
    render(
      <MemoryRouter>
        <HomeBuiltForScale />
      </MemoryRouter>,
    );

    const section = screen.getByTestId("home-built-for-scale");
    expect(section).toHaveClass("home-built-for-scale", "home-built-for-scale--cloud", HOME_PRIMARY_SURFACE_CLASS);

    const grid = within(section).getByTestId("home-built-for-scale-grid");
    expect(grid).toHaveClass(BUILT_FOR_SCALE_GRID_CLASS);

    const media = within(grid).getByTestId("home-built-for-scale-media");
    const copy = within(grid).getByTestId("home-built-for-scale-copy");
    expect(media.compareDocumentPosition(copy) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    const image = within(media).getByTestId("home-built-for-scale-image");
    expect(image).toHaveClass(HOME_IMAGE_FULL_COLOR_CLASS);
    expect(image).toHaveAttribute("src", HOME_PAGE_ASSETS.serverRacks);
    expect(image).toHaveAttribute("sizes", BUILT_FOR_SCALE_IMAGE_SIZES);
    expect(image).toHaveAttribute("width", String(BUILT_FOR_SCALE_IMAGE_WIDTH));
    expect(image).toHaveAttribute("height", String(BUILT_FOR_SCALE_IMAGE_HEIGHT));
    expect(within(media).getByText("SCALABLE")).toBeInTheDocument();
    expect(within(media).getByText(HOME_PAGE_COPY.builtForScale.imageUptimeLabel)).toBeInTheDocument();

    const { builtForScale } = HOME_PAGE_COPY;
    expect(screen.getByText(builtForScale.kicker)).toHaveClass("home-built-for-scale-kicker");
    expect(screen.getByRole("heading", { name: /Cloud, Built Right/i })).toHaveClass("home-built-for-scale-title");
    expect(screen.getByText(builtForScale.body)).toHaveClass("home-built-for-scale-lead");

    const cards = within(copy).getAllByTestId("home-scale-feature");
    expect(cards).toHaveLength(BUILT_FOR_SCALE_FEATURE_COUNT);
    for (const feature of builtForScale.features) {
      expect(within(copy).getByText(feature.title)).toBeInTheDocument();
      expect(within(copy).getByText(feature.description)).toBeInTheDocument();
    }

    const actions = within(copy).getByTestId("home-built-for-scale-actions");
    expect(within(actions).getByRole("link", { name: builtForScale.ctaPrimary })).toHaveAttribute(
      "href",
      ROUTES.webApplications,
    );
    expect(within(actions).getByRole("link", { name: builtForScale.ctaSecondary })).toHaveAttribute(
      "href",
      ROUTES.services,
    );
  });
});
