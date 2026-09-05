import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { AI_SOLUTIONS_HERO } from "./lib/aiSolutionsPageContent";
import { WEB_APPLICATIONS_HERO } from "./lib/webApplicationsPageContent";
import { ROUTES } from "./lib/routes";

describe("App service landing redirects", () => {
  it("redirects the legacy AI solutions URL to pipeline engineering", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.aiSolutionsLegacy]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("ai-solutions-page")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: AI_SOLUTIONS_HERO.headline, level: 1 })).toBeInTheDocument();
  });

  it("redirects the legacy web applications URL to B2B web applications", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.webApplicationsLegacy]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("web-applications-page")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: WEB_APPLICATIONS_HERO.headline, level: 1 })).toBeInTheDocument();
  });
});
