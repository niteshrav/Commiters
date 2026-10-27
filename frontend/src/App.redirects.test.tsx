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

  it("preserves section hashes when redirecting /prooflyn", () => {
    render(
      <MemoryRouter initialEntries={[`${ROUTES.trustTapShort}#how-it-works`]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("trusttap-page")).toBeInTheDocument();
    expect(document.getElementById("how-it-works")).toBe(screen.getByTestId("trusttap-how-it-works"));
  });

  it("redirects /prooflyn to the Prooflyn product page", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.trustTapShort]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("trusttap-page")).toBeInTheDocument();
  });

  it("redirects /products/trusttap and /trusttap to /products/prooflyn", () => {
    const { unmount } = render(
      <MemoryRouter initialEntries={[ROUTES.trustTapLegacy]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("trusttap-page")).toBeInTheDocument();
    unmount();

    render(
      <MemoryRouter initialEntries={[ROUTES.trustTapShortLegacy]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("trusttap-page")).toBeInTheDocument();
  });

  it("preserves section hashes when redirecting the legacy /trusttap URL", () => {
    render(
      <MemoryRouter initialEntries={[`${ROUTES.trustTapShortLegacy}#how-it-works`]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("trusttap-page")).toBeInTheDocument();
    expect(document.getElementById("how-it-works")).toBe(screen.getByTestId("trusttap-how-it-works"));
  });

  it("redirects the short governed AI URL to the dedicated landing page", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.aiSolutionsShort]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("ai-solutions-page")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: AI_SOLUTIONS_HERO.headline, level: 1 })).toBeInTheDocument();
  });

  it("redirects the short spec-driven URL to the dedicated landing page", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.webApplicationsShort]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("web-applications-page")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: WEB_APPLICATIONS_HERO.headline, level: 1 })).toBeInTheDocument();
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

  it("redirects the B2B web applications URL to the web application development page", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.webApplicationsB2bLegacy]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("service-detail-page")).toHaveAttribute(
      "data-service-slug",
      "web-application-development",
    );
    expect(screen.getByRole("heading", { name: /Web Application Development/i })).toBeInTheDocument();
    expect(screen.queryByTestId("web-applications-page")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: WEB_APPLICATIONS_HERO.headline, level: 1 })).not.toBeInTheDocument();
  });

  it("redirects /audit to the AI operational audit page", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.audit]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("ai-operational-audit-page")).toBeInTheDocument();
  });

  it("redirects /jobs to open positions", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.jobs]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("open-positions-page")).toBeInTheDocument();
  });

  it("preserves section hashes when redirecting /opsflow-ai", () => {
    render(
      <MemoryRouter initialEntries={[`${ROUTES.opsFlowAi}#sandbox`]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("opsflow-page")).toBeInTheDocument();
    expect(document.getElementById("sandbox")).toBe(screen.getByTestId("opsflow-panel"));
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
