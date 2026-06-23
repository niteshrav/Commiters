import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AboutBottomCta from "./AboutBottomCta";
import { ABOUT_PAGE_COPY, ABOUT_REJECTED_CTA_SUBTEXT } from "../lib/aboutPageContent";

describe("AboutBottomCta", () => {
  it("renders the Stitch about CTA without the Q3 2024 acceptance line", () => {
    render(
      <MemoryRouter>
        <AboutBottomCta />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("about-bottom-cta")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: ABOUT_PAGE_COPY.bottomCta.title })).toBeInTheDocument();
    expect(screen.getByText(ABOUT_PAGE_COPY.bottomCta.subtext)).toBeInTheDocument();
    expect(screen.queryByText(ABOUT_REJECTED_CTA_SUBTEXT)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: ABOUT_PAGE_COPY.bottomCta.primaryLabel })).toHaveClass("btn", "btn-primary");
    expect(screen.getByRole("link", { name: ABOUT_PAGE_COPY.bottomCta.secondaryLabel })).toHaveClass("btn", "btn-secondary");
  });
});
