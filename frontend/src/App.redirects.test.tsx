import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { AI_SOLUTIONS_HERO } from "./lib/aiSolutionsPageContent";
import { WEB_APPLICATIONS_HERO } from "./lib/webApplicationsPageContent";
import { ROUTES } from "./lib/routes";

describe("App service landing redirects", () => {
  it("redirects the legacy AI solutions URL to governed AI workflow systems", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.aiSolutionsLegacy]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("ai-solutions-page")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: AI_SOLUTIONS_HERO.headline, level: 1 })).toBeInTheDocument();
  });

  it("redirects /privacy to the privacy policy page", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.privacy]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("privacy-page")).toBeInTheDocument();
  });

  it("redirects /trusttap to the trustTap product page", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.trustTapShort]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("trusttap-page")).toBeInTheDocument();
  });

  it("redirects the pipeline engineering URL to governed AI workflow systems", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.aiSolutionsPipelineLegacy]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("ai-solutions-page")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: AI_SOLUTIONS_HERO.headline, level: 1 })).toBeInTheDocument();
  });

  it("redirects the B2B web applications URL to spec-driven platforms", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.webApplicationsB2bLegacy]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("web-applications-page")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: WEB_APPLICATIONS_HERO.headline, level: 1 })).toBeInTheDocument();
  });

  it("redirects /opsflow-ai to the OpsFlow playground", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.opsFlowAi]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("opsflow-page")).toBeInTheDocument();
  });

  it("redirects the legacy web applications URL to spec-driven platforms", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.webApplicationsLegacy]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("web-applications-page")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: WEB_APPLICATIONS_HERO.headline, level: 1 })).toBeInTheDocument();
  });
});
