import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

describe("NotFoundPage", () => {
  it("renders a centered immersive hero with a home link", () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("page-hero-premium")).toBeInTheDocument();
    expect(screen.getByTestId("section-figure-constellation")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Page Not Found" })).toBeInTheDocument();
    expect(screen.getByText(/architectural route you are looking for does not exist/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Return to Home/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /Return to Home/i })).toHaveClass(
      "bg-primary",
      "text-white",
      "hover:bg-primary/90",
    );
    expect(document.querySelector(".not-found-circuit")).toBeTruthy();
  });
});
