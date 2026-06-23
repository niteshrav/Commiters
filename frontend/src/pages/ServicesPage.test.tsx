import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ServicesPage from "./ServicesPage";
import { SERVICES_EXPERTISE_SEPARATOR_TEST_ID } from "../lib/servicesIntroLayout";
import { STITCH_COPY } from "../lib/stitchDesign";

describe("ServicesPage", () => {
  it("opens with the Stitch OUR EXPERTISE intro and a separator before the grid", () => {
    render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("services-page")).toBeInTheDocument();
    expect(screen.getByTestId("services-expertise-section")).toBeInTheDocument();
    expect(screen.queryByTestId("stitch-page-hero")).not.toBeInTheDocument();
    expect(screen.getByText(STITCH_COPY.services.kicker)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: STITCH_COPY.services.title })).toBeInTheDocument();
    expect(screen.getByText(STITCH_COPY.services.subtext)).toBeInTheDocument();
    expect(screen.getByTestId(SERVICES_EXPERTISE_SEPARATOR_TEST_ID)).toBeInTheDocument();
  });

  it("shows a mosaic grid of six expertise cards with Stitch hover actions", () => {
    render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>,
    );

    const grid = screen.getByTestId("stitch-services-grid");
    const cards = within(grid).getAllByTestId("stitch-service-card");
    expect(cards).toHaveLength(6);
    expect(cards[0]).toHaveClass("stitch-service-card--span-2");
    expect(cards[1]).toHaveClass("stitch-service-card--span-1");
    expect(cards[5]).toHaveClass("stitch-service-card--span-3", "stitch-service-card--split");
    expect(screen.getByRole("heading", { name: /Website Development/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /AI Integration/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /case stud/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Inquire about Automation/i })).toBeInTheDocument();
  });

  it("renders the How We Work band and bottom CTA from the Stitch screenshot", () => {
    render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("services-how-we-work-section")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /How We Work/i })).toBeInTheDocument();
    expect(screen.getByTestId("services-bottom-cta")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Connect with us to discuss your project requirements and receive a technical proposal.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Book a Technical Call/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /tech stack|our stack/i })).not.toBeInTheDocument();
  });

  it("anchors each service section for deep navigation from the navbar", () => {
    const { container } = render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>,
    );

    for (const id of [
      "website-development",
      "web-applications",
      "mobile-applications",
      "mvp-development",
      "automation-tools",
      "ai-integration",
    ]) {
      const anchor = container.querySelector(`#${id}`);
      expect(anchor).toBeTruthy();
      expect(anchor).toHaveAttribute("data-testid", "stitch-service-card");
    }
  });

  it("does not double-nest a container inside the services grid band", () => {
    render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>,
    );

    const gridSection = screen.getByTestId("stitch-services-grid");
    expect(gridSection).toHaveClass("stitch-services-grid-section");
    expect(gridSection.querySelector(".container")).not.toBeInTheDocument();
    expect(gridSection.querySelector(".stitch-services-grid")).toBeInTheDocument();
  });
});
