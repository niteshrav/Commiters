import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OpsFlowPage from "./OpsFlowPage";
import { OPSFLOW_HERO, OPSFLOW_SEO } from "../lib/opsFlowPageContent";

describe("OpsFlowPage", () => {
  it("renders the landing section with product SEO", () => {
    render(
      <MemoryRouter>
        <OpsFlowPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("opsflow-page")).toBeInTheDocument();
    expect(screen.getByTestId("opsflow-section")).toBeInTheDocument();
    expect(document.title).toBe(OPSFLOW_SEO.title);
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute("content", OPSFLOW_SEO.description);
    expect(screen.getByRole("heading", { name: OPSFLOW_HERO.headline, level: 1 })).toBeInTheDocument();
  });
});
