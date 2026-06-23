import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AboutPage from "./AboutPage";
import {
  ABOUT_CRAFTSMANSHIP_COPY_START_TEST_ID,
  ABOUT_CRAFTSMANSHIP_REMOVED_STAT,
  ABOUT_CRAFTSMANSHIP_RULE_TEST_IDS,
  ABOUT_CRAFTSMANSHIP_YEARS_STAT,
  ABOUT_FOUNDER_QUOTE,
} from "../lib/aboutCraftsmanshipContent";
import { ABOUT_PAGE_COPY, ABOUT_REJECTED_CTA_SUBTEXT } from "../lib/aboutPageContent";
import { STITCH_COPY } from "../lib/stitchDesign";

describe("AboutPage", () => {
  it("matches the Stitch about page structure, craftsmanship rules, and copy", () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("about-page")).toBeInTheDocument();
    expect(screen.getByTestId("about-intro-section")).toBeInTheDocument();
    expect(screen.getByTestId(ABOUT_CRAFTSMANSHIP_RULE_TEST_IDS.top)).toBeInTheDocument();
    expect(screen.getByTestId(ABOUT_CRAFTSMANSHIP_RULE_TEST_IDS.bottom)).toBeInTheDocument();
    expect(screen.getByTestId("about-craftsmanship-section")).toBeInTheDocument();
    expect(screen.getByTestId(ABOUT_CRAFTSMANSHIP_COPY_START_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId("about-principles-section")).toBeInTheDocument();
    expect(screen.getByTestId("about-bottom-cta")).toBeInTheDocument();

    expect(screen.getByText(STITCH_COPY.about.visionBody)).toBeInTheDocument();
    expect(screen.getByText(ABOUT_CRAFTSMANSHIP_YEARS_STAT.value)).toBeInTheDocument();
    expect(screen.queryByText(ABOUT_CRAFTSMANSHIP_REMOVED_STAT.value)).not.toBeInTheDocument();
    expect(screen.queryByTestId("about-founder-quote-cover")).not.toBeInTheDocument();
    expect(screen.getByTestId("about-founder-quote")).toHaveTextContent(ABOUT_FOUNDER_QUOTE.text);
    expect(screen.getByTestId("about-founder-quote")).toHaveTextContent(ABOUT_FOUNDER_QUOTE.attribution);

    expect(screen.getByRole("heading", { name: ABOUT_PAGE_COPY.principles.title })).toBeInTheDocument();
    expect(screen.queryByText(ABOUT_REJECTED_CTA_SUBTEXT)).not.toBeInTheDocument();
  });
});
