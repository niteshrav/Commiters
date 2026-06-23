import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ThankYouPage from "./ThankYouPage";
import { COMMITERS_HEADER_LOGO_ALT, COMMITERS_HEADER_LOGO_SRC } from "../lib/siteBrand";
import { THANK_YOU_PAGE_COPY } from "../lib/thankYouPageContent";
import {
  THANK_YOU_INFRASTRUCTURE_LOGO_CLASS,
  THANK_YOU_PAGE_CLASS,
} from "../lib/thankYouPageLayout";

describe("ThankYouPage", () => {
  it("renders the Stitch submission received layout without the legacy premium hero", () => {
    render(
      <MemoryRouter>
        <ThankYouPage />
      </MemoryRouter>,
    );

    const page = screen.getByTestId("thank-you-page");
    expect(page).toHaveClass(THANK_YOU_PAGE_CLASS);
    expect(screen.getByTestId("thank-you-content")).toBeInTheDocument();
    expect(screen.getByTestId("thank-you-infrastructure")).toBeInTheDocument();
    expect(screen.queryByTestId("page-hero-premium")).not.toBeInTheDocument();
    expect(screen.queryByTestId("section-figure-wave")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: THANK_YOU_PAGE_COPY.title })).toBeInTheDocument();
    expect(screen.getByText(THANK_YOU_PAGE_COPY.infrastructureLabel)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Client View/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Candidate View/i })).not.toBeInTheDocument();
  });

  it("shows the colourful Commiters logo in the infrastructure band", () => {
    render(
      <MemoryRouter>
        <ThankYouPage />
      </MemoryRouter>,
    );

    const logo = within(screen.getByTestId("thank-you-infrastructure")).getByRole("img", {
      name: COMMITERS_HEADER_LOGO_ALT,
    });
    expect(logo).toHaveAttribute("src", COMMITERS_HEADER_LOGO_SRC);
    expect(logo).toHaveClass(THANK_YOU_INFRASTRUCTURE_LOGO_CLASS);
  });
});
