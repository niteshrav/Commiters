import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AboutOperatingPrinciplesSection from "./AboutOperatingPrinciplesSection";
import { ABOUT_OPERATING_PRINCIPLES, ABOUT_PAGE_COPY } from "../lib/aboutPageContent";

describe("AboutOperatingPrinciplesSection", () => {
  it("renders compact value cards without process numbers", () => {
    render(
      <MemoryRouter>
        <AboutOperatingPrinciplesSection />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("about-principles-section")).toHaveAttribute("id", "our-values");
    expect(screen.getByTestId("about-principles-section")).toHaveClass("pt-16", "pb-16", "w-full");
    expect(screen.getByTestId("about-principles-section").className).not.toMatch(/scroll-mt-/);
    expect(document.getElementById("principles")).toBeTruthy();
    expect(screen.getByTestId("about-principles-section")).toBeInTheDocument();
    expect(screen.getByText(ABOUT_PAGE_COPY.principles.kicker)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /What We Stand For/i })).toBeInTheDocument();
    expect(screen.getByText(ABOUT_PAGE_COPY.principles.subtext)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /view all principles/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/view all principles/i)).not.toBeInTheDocument();

    const cards = screen.getAllByTestId("about-principle-card");
    expect(cards).toHaveLength(ABOUT_OPERATING_PRINCIPLES.length);
    ABOUT_OPERATING_PRINCIPLES.forEach((principle) => {
      expect(screen.getByRole("heading", { name: principle.title })).toBeInTheDocument();
      expect(screen.getByText(principle.body)).toBeInTheDocument();
    });
    expect(screen.queryByText("01")).not.toBeInTheDocument();
    expect(screen.queryByText("02")).not.toBeInTheDocument();
  });
});
