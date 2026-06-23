import { render, screen, within } from "@testing-library/react";
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

describe("HomeBuiltForScale", () => {
  it("renders mockup two-column layout with white surface, image left, copy right", () => {
    render(<HomeBuiltForScale />);

    const section = screen.getByTestId("home-built-for-scale");
    expect(section).toHaveClass("home-built-for-scale", HOME_PRIMARY_SURFACE_CLASS);

    const grid = within(section).getByTestId("home-built-for-scale-grid");
    expect(grid).toHaveClass(BUILT_FOR_SCALE_GRID_CLASS);

    const media = within(grid).getByTestId("home-built-for-scale-media");
    const copy = within(grid).getByTestId("home-built-for-scale-copy");
    expect(media.compareDocumentPosition(copy) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    const image = within(media).getByTestId("home-built-for-scale-image");
    expect(image).toHaveClass(HOME_IMAGE_FULL_COLOR_CLASS);
    expect(image).not.toHaveClass("home-image-tone");
    expect(image).toHaveAttribute("src", HOME_PAGE_ASSETS.serverRacks);
    expect(image).toHaveAttribute("width", String(BUILT_FOR_SCALE_IMAGE_WIDTH));
    expect(image).toHaveAttribute("height", String(BUILT_FOR_SCALE_IMAGE_HEIGHT));
    expect(image).toHaveAttribute("sizes", BUILT_FOR_SCALE_IMAGE_SIZES);
  });

  it("matches mockup heading, body, and three blue checkmark features", () => {
    render(<HomeBuiltForScale />);

    const { builtForScale } = HOME_PAGE_COPY;
    expect(screen.getByRole("heading", { name: builtForScale.title })).toHaveClass("home-built-for-scale-title");
    expect(screen.getByText(builtForScale.body)).toHaveClass("home-built-for-scale-lead");

    expect(screen.getAllByTestId("home-scale-feature")).toHaveLength(BUILT_FOR_SCALE_FEATURE_COUNT);
    expect(screen.getByText("Cloud-Native Architecture")).toBeInTheDocument();
    expect(screen.getByText("Seamless integration with AWS, Azure, or GCP for infinite scalability.")).toBeInTheDocument();
    expect(screen.getByText("Security by Design")).toBeInTheDocument();
    expect(screen.getByText("End-to-end encryption and strict compliance adherence from day one.")).toBeInTheDocument();
    expect(screen.getByText("Performance Optimization")).toBeInTheDocument();
    expect(screen.getByText("Micro-optimizations to ensure lightning-fast user experiences.")).toBeInTheDocument();
    expect(screen.getAllByTestId("home-scale-feature-icon")).toHaveLength(BUILT_FOR_SCALE_FEATURE_COUNT);
  });
});
