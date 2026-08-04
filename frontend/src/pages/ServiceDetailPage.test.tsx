import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ServiceDetailPage, { serviceDetailTitleForTests } from "./ServiceDetailPage";
import { ROUTES } from "../lib/routes";
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
    expect(screen.getByRole("link", { name: /Get Free Consultation/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Request Quote/i })).toHaveAttribute("href", ROUTES.contact);
    expect(screen.getByRole("link", { name: /Browse our FAQ/i })).toHaveAttribute("href", ROUTES.faq);
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
});
