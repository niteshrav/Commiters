import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SitemapPage from "./SitemapPage";
import { ROUTES } from "../lib/routes";
import { SITEMAP_PAGE_COPY, SITEMAP_XML_PATH, countSitemapLinks } from "../lib/sitemapPageContent";

describe("SitemapPage", () => {
  it("renders a professional sitemap with intro stats, grouped cards, and contact CTA", () => {
    render(
      <MemoryRouter>
        <SitemapPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("sitemap-page")).toBeInTheDocument();
    expect(screen.getByTestId("sitemap-intro-section")).toBeInTheDocument();
    expect(screen.getByText(SITEMAP_PAGE_COPY.kicker)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: SITEMAP_PAGE_COPY.title, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(SITEMAP_PAGE_COPY.subtext)).toBeInTheDocument();
    expect(screen.getByTestId("sitemap-meta-bar")).toHaveTextContent(String(countSitemapLinks()));

    const xmlLink = screen.getByRole("link", { name: SITEMAP_PAGE_COPY.xmlLabel });
    expect(xmlLink).toHaveAttribute("href", SITEMAP_XML_PATH);

    const companyGroup = screen.getByTestId("sitemap-group-company");
    expect(within(companyGroup).getByRole("heading", { name: "Company", level: 2 })).toBeInTheDocument();
    expect(within(companyGroup).getByRole("link", { name: /Home/i })).toHaveAttribute("href", ROUTES.home);
    expect(within(companyGroup).getByText("Engineering studio overview and featured work.")).toBeInTheDocument();

    const servicesGroup = screen.getByTestId("sitemap-group-services");
    expect(within(servicesGroup).getByRole("link", { name: /AI Operational Audits/ })).toHaveAttribute(
      "href",
      ROUTES.aiOperationalAudit,
    );

    const legalGroup = screen.getByTestId("sitemap-group-legal");
    expect(within(legalGroup).getByRole("link", { name: "Site Map" })).toHaveAttribute("href", ROUTES.sitemap);

    expect(screen.getByTestId("sitemap-bottom-section")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: SITEMAP_PAGE_COPY.bottomCtaLabel })).toHaveAttribute("href", ROUTES.contact);
  });
});
