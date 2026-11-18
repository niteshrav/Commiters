import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ServiceDetailPage, { serviceDetailTitleForTests } from "./ServiceDetailPage";
import { AI_OPERATIONAL_AUDIT_BOOKING_HREF, ROUTES } from "../lib/routes";
import { serviceCardImageForDetail } from "../lib/serviceCardImages";
import { buildServiceDetailPath } from "../lib/services";

describe("ServiceDetailPage", () => {
  it("renders streamlined conversion sections for a known service slug", () => {
    render(
      <MemoryRouter initialEntries={[buildServiceDetailPath("website-development")]}>
        <Routes>
          <Route path={ROUTES.serviceDetail} element={<ServiceDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("service-detail-page")).toHaveAttribute("data-service-slug", "website-development");
    expect(screen.getByTestId("service-detail-hero")).toBeInTheDocument();
    expect(screen.getByTestId("service-detail-about")).toBeInTheDocument();
    expect(screen.getByTestId("service-detail-features")).toBeInTheDocument();
    expect(screen.getByTestId("service-detail-technologies")).toBeInTheDocument();
    expect(screen.queryByTestId("service-detail-process")).not.toBeInTheDocument();
    expect(screen.getByTestId("service-detail-plan")).toBeInTheDocument();
    expect(screen.getByTestId("service-detail-portfolio")).toBeInTheDocument();
    expect(screen.getByTestId("service-detail-final-cta")).toBeInTheDocument();
    expect(screen.queryByTestId("service-detail-testimonials")).not.toBeInTheDocument();
    expect(screen.queryByTestId("service-detail-faqs")).not.toBeInTheDocument();
    expect(screen.getByTestId("service-detail-hero-primary-cta")).toHaveTextContent("Book Operational Audit");
    expect(screen.getByTestId("service-detail-hero-primary-cta")).toHaveAttribute(
      "href",
      AI_OPERATIONAL_AUDIT_BOOKING_HREF,
    );
    expect(screen.getByRole("link", { name: /Request Quote/i })).toHaveAttribute("href", ROUTES.contact);
    expect(screen.getByRole("link", { name: /Browse our FAQ/i })).toHaveAttribute("href", ROUTES.faq);
  });

  it.each([
    "e-commerce-development",
    "web-application-development",
    "mobile-app-development",
    "mvp-development",
    "automation-tools",
  ] as const)("shows the catalog service photo on %s", (slug) => {
    const image = serviceCardImageForDetail(slug);
    render(
      <MemoryRouter initialEntries={[buildServiceDetailPath(slug)]}>
        <Routes>
          <Route path={ROUTES.serviceDetail} element={<ServiceDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    const photo = screen.getByRole("img", { name: image.alt });
    expect(photo).toHaveAttribute("src", image.src);
    expect(photo).toHaveClass("svc-detail-hero-image");
  });

  it("renders e-commerce service detail page", () => {
    render(
      <MemoryRouter initialEntries={[buildServiceDetailPath("e-commerce-development")]}>
        <Routes>
          <Route path={ROUTES.serviceDetail} element={<ServiceDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("service-detail-page")).toHaveAttribute("data-service-slug", "e-commerce-development");
    expect(screen.getByRole("heading", { name: /E-commerce Development/i })).toBeInTheDocument();
    expect(screen.queryByTestId("service-detail-portfolio")).not.toBeInTheDocument();
  });

  it("redirects unknown slugs to the 404 route", () => {
    render(
      <MemoryRouter initialEntries={[buildServiceDetailPath("unknown-service")]}>
        <Routes>
          <Route path={ROUTES.serviceDetail} element={<ServiceDetailPage />} />
          <Route path={ROUTES.notFound} element={<div data-testid="not-found-page" />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("not-found-page")).toBeInTheDocument();
  });

  it("sets an SEO-friendly document title", () => {
    expect(serviceDetailTitleForTests("web-application-development")).toBe(
      "Web Application Development Services | Commiters",
    );
  });

  it("renders the US P&C insurance landing with operations-first positioning", () => {
    render(
      <MemoryRouter initialEntries={[buildServiceDetailPath("insurance")]}>
        <Routes>
          <Route path={ROUTES.serviceDetail} element={<ServiceDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("US P&C AGENCY OPERATIONS & AI")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Back-Office & AI Operations for US Insurance Agencies." }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Free your licensed producers to bind more business/i)).toBeInTheDocument();
    expect(screen.getByTestId("service-detail-hero-primary-cta")).toHaveAttribute("href", ROUTES.contact);
    expect(screen.getByTestId("service-detail-hero-primary-cta")).toHaveTextContent("Book a Discovery Call");
    const exploreLinks = screen.getAllByRole("link", { name: "Explore Our Capabilities" });
    expect(exploreLinks.length).toBeGreaterThan(0);
    expect(exploreLinks.every((link) => link.getAttribute("href") === "#ins-desk")).toBe(true);

    const studio = screen.getByTestId("insurance-technology-studio");
    const desk = screen.getByTestId("insurance-desk");
    expect(studio.firstElementChild).toBe(desk);
    expect(screen.getByRole("heading", { name: "Agency operations, when you need the desk run" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "COI Issuance & Holder Updates" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Personal & Commercial Auto" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Homeowners & Commercial Property" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Commercial Lines & General Liability" })).toBeInTheDocument();
    expect(screen.queryByText(/IRDAI/i)).not.toBeInTheDocument();
    expect(screen.getByText(/non-licensed administrative servicing/i)).toBeInTheDocument();
    expect(screen.getByText("Same-Day COI Turnaround")).toBeInTheDocument();
    expect(screen.getByText("Dedicated Desk Coverage")).toBeInTheDocument();
    expect(screen.queryByText(/not Commiters client results/i)).not.toBeInTheDocument();
    expect(screen.queryByText("Total policies")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Which Agency Management Systems/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(serviceDetailTitleForTests("insurance")).toBe(
      "US P&C Insurance Agency Back-Office & AI Operations | Commiters",
    );
  });

  it("renders the digital marketing landing with working calls to action", () => {
    render(
      <MemoryRouter initialEntries={[buildServiceDetailPath("digital-marketing")]}>
        <Routes>
          <Route path={ROUTES.serviceDetail} element={<ServiceDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Digital Marketing & Conversion Funnels" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Request a Quote" }).every((link) => link.getAttribute("href") === ROUTES.contact)).toBe(true);
    expect(screen.getByRole("heading", { name: /Digital marketing that drives real business growth/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Search Engine Optimization (SEO)" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /From first click to loyal customer/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Awareness/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByText("Google Analytics 4").length).toBeGreaterThan(0);
    expect(screen.getByText("Ahrefs")).toBeInTheDocument();
    expect(screen.getByText(/not Commiters campaign results/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "What digital marketing services does Commiters offer?" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.getByRole("link", { name: "Book an Operational Audit" })).toHaveAttribute(
      "href",
      AI_OPERATIONAL_AUDIT_BOOKING_HREF,
    );
    expect(screen.queryByTestId("service-detail-plan")).not.toBeInTheDocument();
  });

  it("renders data engineering with the shared service page sections", () => {
    render(
      <MemoryRouter initialEntries={[buildServiceDetailPath("data-engineering")]}>
        <Routes>
          <Route path={ROUTES.serviceDetail} element={<ServiceDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Data Engineering" })).toBeInTheDocument();
    expect(screen.getByText("Engineering Data. Empowering Decisions.")).toBeInTheDocument();
    expect(screen.getByTestId("service-detail-about")).toBeInTheDocument();
    expect(screen.getByTestId("service-detail-problem")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Core Capabilities" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Data Pipeline Development" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "How We Work" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Technologies We Use" })).toBeInTheDocument();
    expect(screen.getByText("Apache Spark")).toBeInTheDocument();
    expect(screen.getByText("Snowflake")).toBeInTheDocument();
    expect(screen.getByTestId("service-detail-plan")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "What is Data Engineering?" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("service-detail-final-cta")).toBeInTheDocument();
  });

  it("sets SEO titles for the new operations landings", () => {
    expect(serviceDetailTitleForTests("digital-marketing")).toBe(
      "Digital Marketing & Conversion Funnels | Commiters",
    );
    expect(serviceDetailTitleForTests("data-engineering")).toBe("Data Engineering Services | Commiters");
  });
});
