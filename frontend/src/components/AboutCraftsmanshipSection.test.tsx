import { render, screen, within } from "@testing-library/react";
import AboutCraftsmanshipSection from "./AboutCraftsmanshipSection";
import {
  ABOUT_CRAFTSMANSHIP_COPY_START_CLASS,
  ABOUT_CRAFTSMANSHIP_COPY_START_TEST_ID,
  ABOUT_CRAFTSMANSHIP_HEADING_CLASS,
  ABOUT_CRAFTSMANSHIP_REMOVED_STAT,
  ABOUT_CRAFTSMANSHIP_RULE_CLASS,
  ABOUT_CRAFTSMANSHIP_RULE_TEST_IDS,
  ABOUT_CRAFTSMANSHIP_SECTION_CLASS,
  ABOUT_CRAFTSMANSHIP_STAT_COUNT,
  ABOUT_CRAFTSMANSHIP_YEARS_STAT,
  ABOUT_FOUNDER_PHOTO_ALT,
  ABOUT_FOUNDER_PHOTO_HEIGHT_PX,
  ABOUT_FOUNDER_PHOTO_SRC,
  ABOUT_FOUNDER_PHOTO_WRAP_CLASS,
  ABOUT_FOUNDER_PHOTO_WIDTH_PX,
  ABOUT_FOUNDER_QUOTE,
  ABOUT_FOUNDER_QUOTE_ATTRIBUTION_CLASS,
  ABOUT_FOUNDER_QUOTE_CLASS,
  ABOUT_FOUNDER_QUOTE_TEXT_CLASS,
} from "../lib/aboutCraftsmanshipContent";
import { STITCH_COPY } from "../lib/stitchDesign";

describe("AboutCraftsmanshipSection", () => {
  it("renders copy vertically centered against the Stitch portrait, one stat, and quote overlay", () => {
    render(<AboutCraftsmanshipSection />);

    expect(screen.getByTestId("about-craftsmanship-section")).toHaveClass(ABOUT_CRAFTSMANSHIP_SECTION_CLASS);
    expect(screen.getByTestId(ABOUT_CRAFTSMANSHIP_RULE_TEST_IDS.top)).toHaveClass(ABOUT_CRAFTSMANSHIP_RULE_CLASS);

    const copyStart = screen.getByTestId(ABOUT_CRAFTSMANSHIP_COPY_START_TEST_ID);
    expect(copyStart).toHaveClass(ABOUT_CRAFTSMANSHIP_COPY_START_CLASS);
    expect(within(copyStart).getByRole("heading", { name: STITCH_COPY.about.visionTitle })).toHaveClass(
      ABOUT_CRAFTSMANSHIP_HEADING_CLASS,
    );
    expect(within(copyStart).getByText(STITCH_COPY.about.visionBody)).toBeInTheDocument();

    const stats = within(copyStart).getAllByTestId("about-craftsmanship-stat");
    expect(stats).toHaveLength(ABOUT_CRAFTSMANSHIP_STAT_COUNT);
    expect(within(stats[0]!).getByText(ABOUT_CRAFTSMANSHIP_YEARS_STAT.value)).toBeInTheDocument();
    expect(screen.queryByText(ABOUT_CRAFTSMANSHIP_REMOVED_STAT.value)).not.toBeInTheDocument();

    expect(screen.queryByTestId("about-founder-quote-cover")).not.toBeInTheDocument();

    const quote = screen.getByTestId("about-founder-quote");
    expect(quote).toHaveClass(ABOUT_FOUNDER_QUOTE_CLASS);
    expect(within(quote).getByText(ABOUT_FOUNDER_QUOTE.text)).toHaveClass(ABOUT_FOUNDER_QUOTE_TEXT_CLASS);
    expect(within(quote).getByText(ABOUT_FOUNDER_QUOTE.attribution)).toHaveClass(ABOUT_FOUNDER_QUOTE_ATTRIBUTION_CLASS);

    expect(screen.getByTestId("about-founder-photo")).toHaveAttribute("src", ABOUT_FOUNDER_PHOTO_SRC);
    expect(screen.getByTestId("about-founder-photo")).toHaveAttribute("alt", ABOUT_FOUNDER_PHOTO_ALT);
    expect(screen.getByTestId("about-founder-photo-wrap")).toHaveClass(ABOUT_FOUNDER_PHOTO_WRAP_CLASS);
    expect(screen.getByTestId("about-founder-photo")).toHaveAttribute("width", String(ABOUT_FOUNDER_PHOTO_WIDTH_PX));
    expect(screen.getByTestId("about-founder-photo")).toHaveAttribute("height", String(ABOUT_FOUNDER_PHOTO_HEIGHT_PX));
  });
});
