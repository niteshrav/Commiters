import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PrivacyPolicyPage from "./PrivacyPolicyPage";

describe("PrivacyPolicyPage", () => {
  it("uses the full Privacy Policy heading on the page", () => {
    const { container } = render(
      <MemoryRouter>
        <PrivacyPolicyPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("page-hero-premium")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^Privacy Policy$/i })).toBeInTheDocument();
    expect(container.querySelectorAll(".legal-heading").length).toBeGreaterThan(0);

    const privacyMail = screen.getAllByRole("link", {
      name: /hello@commiters\.com,\s*commitersudaipur@gmail\.com/i,
    });
    expect(privacyMail.length).toBeGreaterThanOrEqual(1);
    expect(privacyMail[0]).toHaveAttribute("href", "mailto:hello@commiters.com,commitersudaipur@gmail.com");
  });
});
