import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WebApplicationsPage from "./WebApplicationsPage";
import { WEB_APPLICATIONS_HERO, WEB_APPLICATIONS_SEO } from "../lib/webApplicationsPageContent";

describe("WebApplicationsPage", () => {
  it("renders the custom web application landing with product SEO", () => {
    render(
      <MemoryRouter>
        <WebApplicationsPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("web-applications-page")).toBeInTheDocument();
    expect(screen.getByTestId("web-applications-section")).toBeInTheDocument();
    expect(document.title).toBe(WEB_APPLICATIONS_SEO.title);
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute("content", WEB_APPLICATIONS_SEO.description);
    expect(screen.getByRole("heading", { name: WEB_APPLICATIONS_HERO.headline, level: 1 })).toBeInTheDocument();
  });
});
