import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeBottomCta from "./HomeBottomCta";
import { HOME_BOTTOM_CTA_SECTION_CLASS } from "../lib/homeBottomCtaLayout";
import { HOME_PAGE_COPY } from "../lib/homePageContent";
import { ROUTES } from "../lib/routes";

describe("HomeBottomCta", () => {
  it("renders dark-band CTA copy and contact link", () => {
    render(
      <MemoryRouter>
        <HomeBottomCta />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("home-ready-cta")).toHaveClass(HOME_BOTTOM_CTA_SECTION_CLASS);
    expect(screen.getByRole("heading", { name: HOME_PAGE_COPY.bottomCta.title })).toBeInTheDocument();
    expect(screen.getByText(HOME_PAGE_COPY.bottomCta.subtext)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: HOME_PAGE_COPY.bottomCta.button })).toHaveAttribute("href", ROUTES.contact);
    expect(screen.getByRole("link", { name: HOME_PAGE_COPY.bottomCta.button })).toHaveClass("btn", "btn-primary");
    expect(screen.getByText(HOME_PAGE_COPY.bottomCta.subtext)).toHaveTextContent(/powered by Commiters\./i);
    expect(screen.getByText(HOME_PAGE_COPY.bottomCta.subtext)).not.toHaveTextContent(/engineering/i);
  });
});
