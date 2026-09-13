import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ThankYouPage from "./ThankYouPage";
import { COMMITERS_HEADER_LOGO_ALT } from "../lib/siteBrand";
import { THANK_YOU_PAGE_COPY } from "../lib/thankYouPageContent";
import { THANK_YOU_PAGE_CLASS } from "../lib/thankYouPageLayout";

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
    expect(screen.queryByTestId("page-hero-premium")).not.toBeInTheDocument();
    expect(screen.queryByTestId("section-figure-wave")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: THANK_YOU_PAGE_COPY.title })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Client View/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Candidate View/i })).not.toBeInTheDocument();
  });

  it("does not render a brand logo in the thank-you content block", () => {
    render(
      <MemoryRouter>
        <ThankYouPage />
      </MemoryRouter>,
    );

    const content = screen.getByTestId("thank-you-content");
    expect(within(content).queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByTestId("thank-you-infrastructure")).not.toBeInTheDocument();
    expect(screen.queryByRole("img", { name: COMMITERS_HEADER_LOGO_ALT })).not.toBeInTheDocument();
    expect(screen.queryByText(THANK_YOU_PAGE_COPY.infrastructureLabel)).not.toBeInTheDocument();
  });
});
