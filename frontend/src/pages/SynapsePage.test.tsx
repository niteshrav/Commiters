import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SynapsePage from "./SynapsePage";
import { SYNAPSE_PRODUCT } from "../lib/studioProducts";

describe("SynapsePage", () => {
  it("presents Synapse as a Commiters product", () => {
    render(
      <MemoryRouter>
        <SynapsePage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("synapse-product-page")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: SYNAPSE_PRODUCT.headline })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Start a Synapse brief/i })[0]).toHaveAttribute("href", "/contact");
    expect(screen.getAllByRole("link", { name: /Live Demo/i })[0]).toHaveAttribute(
      "href",
      SYNAPSE_PRODUCT.liveDemo.href,
    );
  });
});
