import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TerminalPage from "./TerminalPage";
import { TERMINAL_PRODUCT } from "../lib/studioProducts";

describe("TerminalPage", () => {
  it("presents Terminal as a Commiters product", () => {
    render(
      <MemoryRouter>
        <TerminalPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("terminal-product-page")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: TERMINAL_PRODUCT.headline })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Start a Terminal brief/i })[0]).toHaveAttribute("href", "/contact");
    expect(screen.getAllByRole("link", { name: /Live Demo/i })[0]).toHaveAttribute(
      "href",
      TERMINAL_PRODUCT.liveDemo.href,
    );
  });
});
