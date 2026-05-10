import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TermsPage from "./TermsPage";

describe("TermsPage", () => {
  it("uses the full Terms of Service heading on the page", () => {
    const { container } = render(
      <MemoryRouter>
        <TermsPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("page-hero-premium")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^Terms of Service$/i })).toBeInTheDocument();
    expect(container.querySelectorAll(".legal-heading").length).toBeGreaterThan(0);

    const termsMail = screen.getByRole("link", {
      name: /hello@commiters\.com,\s*commitersudaipur@gmail\.com/i,
    });
    expect(termsMail).toHaveAttribute("href", "mailto:hello@commiters.com,commitersudaipur@gmail.com");
  });
});
