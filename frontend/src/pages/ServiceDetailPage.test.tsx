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

  it.each(["insurance-operations", "digital-marketing", "data-engineering"] as const)(
    "renders operations landing sections for %s",
    (slug) => {
      render(
        <MemoryRouter initialEntries={[buildServiceDetailPath(slug)]}>
          <Routes>
            <Route path={ROUTES.serviceDetail} element={<ServiceDetailPage />} />
          </Routes>
        </MemoryRouter>,
      );

      expect(screen.getByTestId("service-detail-page")).toHaveAttribute("data-service-slug", slug);
      expect(screen.getByTestId("service-detail-hero")).toBeInTheDocument();
      expect(screen.getByTestId("service-detail-problem")).toBeInTheDocument();
      expect(screen.getByTestId("service-detail-features")).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /Core Capabilities/i })).toBeInTheDocument();
      expect(screen.getByTestId("service-detail-process")).toBeInTheDocument();
      expect(screen.getByTestId("service-detail-faqs")).toBeInTheDocument();
      expect(screen.getByTestId("service-detail-final-cta")).toBeInTheDocument();
      expect(screen.queryByTestId("service-detail-testimonials")).not.toBeInTheDocument();
    },
  );

  it("sets SEO titles for the new operations landings", () => {
    expect(serviceDetailTitleForTests("insurance-operations")).toBe(
      "Insurance Operations Support for Agencies | Commiters",
    );
    expect(serviceDetailTitleForTests("digital-marketing")).toBe(
      "Digital Marketing & Conversion Funnels | Commiters",
    );
    expect(serviceDetailTitleForTests("data-engineering")).toBe(
      "Data Engineering & Automated Extraction | Commiters",
    );
  });
});
