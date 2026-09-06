import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ServicesPage from "./ServicesPage";
import { BRAND_WATERMARK_TESTID } from "../lib/brandWatermark";
import { FROSTED_GLASS_CLASSES } from "../lib/frostedGlass";
import { ROUTES } from "../lib/routes";
import {
  SERVICES_OVERVIEW_CAPABILITIES,
  SERVICES_OVERVIEW_CAPABILITIES_SUBTEXT,
  SERVICES_OVERVIEW_CAPABILITIES_TITLE,
  SERVICES_OVERVIEW_HERO,
  SERVICES_OVERVIEW_INQUIRY,
  SERVICES_OVERVIEW_INQUIRY_ANCHOR,
  SERVICES_OVERVIEW_PRODUCTS_ANCHOR,
  SERVICES_OVERVIEW_INQUIRY_INTERESTS,
  SERVICES_OVERVIEW_LEGACY_TITLES,
  SERVICES_OVERVIEW_OFFERINGS,
  SERVICES_OVERVIEW_OFFERINGS_TITLE,
  SERVICES_OVERVIEW_PRODUCTS,
  SERVICES_OVERVIEW_PRODUCTS_TITLE,
  SERVICES_OVERVIEW_STANDARDS,
  SERVICES_OVERVIEW_STANDARDS_BANNER,
  SERVICES_OVERVIEW_STANDARDS_SUBTITLE,
  SERVICES_OVERVIEW_STANDARDS_TITLE,
} from "../lib/servicesOverviewPageContent";
import {
  SERVICES_OVERVIEW_CAPABILITIES_GRID_CLASS,
  SERVICES_OVERVIEW_CAPABILITY_CARD_CLASS,
  SERVICES_OVERVIEW_OFFERING_CARD_CLASS,
  SERVICES_OVERVIEW_OFFERING_FEATURED_CLASS,
  SERVICES_OVERVIEW_OFFERINGS_GRID_CLASS,
  SERVICES_OVERVIEW_PRODUCT_CARD_CLASS,
  SERVICES_OVERVIEW_PRODUCTS_GRID_CLASS,
  SERVICES_OVERVIEW_STANDARDS_GRID_CLASS,
} from "../lib/servicesOverviewPageLayout";

function renderPage() {
  return render(
    <MemoryRouter>
      <ServicesPage />
    </MemoryRouter>,
  );
}

describe("ServicesPage", () => {
  it("opens with the enterprise AI hero and dual product/audit CTAs", () => {
    renderPage();

    expect(screen.getByTestId("services-page")).toBeInTheDocument();
    expect(screen.getByTestId("services-overview-hero")).toBeInTheDocument();
    expect(within(screen.getByTestId("services-overview-hero")).getByTestId(BRAND_WATERMARK_TESTID)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: SERVICES_OVERVIEW_HERO.title, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(SERVICES_OVERVIEW_HERO.subtitle)).toBeInTheDocument();
    const hero = within(screen.getByTestId("services-overview-hero"));
    expect(hero.getByRole("link", { name: SERVICES_OVERVIEW_HERO.productsCtaLabel })).toHaveAttribute(
      "href",
      `${ROUTES.services}#${SERVICES_OVERVIEW_PRODUCTS_ANCHOR}`,
    );
    expect(hero.getByRole("link", { name: SERVICES_OVERVIEW_HERO.auditCtaLabel })).toHaveAttribute(
      "href",
      `${ROUTES.services}#${SERVICES_OVERVIEW_INQUIRY_ANCHOR}`,
    );
    expect(screen.queryByTestId("stitch-page-hero")).not.toBeInTheDocument();
  });

  it("leads with three frosted flagship operational solution cards", () => {
    renderPage();

    expect(screen.getByRole("heading", { name: SERVICES_OVERVIEW_OFFERINGS_TITLE, level: 2 })).toBeInTheDocument();
    const grid = screen.getByTestId("services-strategic-offerings");
    expect(grid).toHaveClass(SERVICES_OVERVIEW_OFFERINGS_GRID_CLASS);
    const cards = within(grid).getAllByTestId("services-offering-card");
    expect(cards).toHaveLength(3);
    expect(cards[0]).toHaveClass(SERVICES_OVERVIEW_OFFERING_CARD_CLASS);
    expect(cards[0]).toHaveClass(SERVICES_OVERVIEW_OFFERING_FEATURED_CLASS);

    for (const offering of SERVICES_OVERVIEW_OFFERINGS) {
      expect(within(grid).getByRole("heading", { name: offering.title, level: 3 })).toBeInTheDocument();
      expect(within(grid).getByText(offering.description)).toBeInTheDocument();
      expect(within(grid).getByText(offering.tag)).toBeInTheDocument();
      expect(within(grid).getByRole("link", { name: offering.ctaLabel })).toHaveAttribute("href", offering.to);
    }

    expect(screen.getByRole("heading", { name: SERVICES_OVERVIEW_STANDARDS_TITLE, level: 2 })).toBeInTheDocument();
    expect(screen.getByText(SERVICES_OVERVIEW_STANDARDS_SUBTITLE)).toBeInTheDocument();
    const standardsGrid = screen.getByTestId("services-governance-standards");
    expect(standardsGrid).toHaveClass(SERVICES_OVERVIEW_STANDARDS_GRID_CLASS);
    for (const standard of SERVICES_OVERVIEW_STANDARDS) {
      expect(within(standardsGrid).getByRole("heading", { name: standard.title, level: 3 })).toBeInTheDocument();
      expect(within(standardsGrid).getByText(standard.body)).toBeInTheDocument();
    }
    expect(within(standardsGrid).queryByTestId("services-governance-banner")).not.toBeInTheDocument();
    expect(within(standardsGrid).getAllByRole("heading", { level: 3 })).toHaveLength(4);
    expect(within(standardsGrid).getByRole("heading", { name: SERVICES_OVERVIEW_STANDARDS_BANNER.title, level: 3 })).toBeInTheDocument();
    expect(within(standardsGrid).getByText(SERVICES_OVERVIEW_STANDARDS_BANNER.body)).toBeInTheDocument();

    expect(screen.queryByRole("heading", { name: /Website Development/i })).not.toBeInTheDocument();
    expect(screen.queryAllByRole("link", { name: /View service/i })).toHaveLength(0);
    for (const legacy of SERVICES_OVERVIEW_LEGACY_TITLES) {
      expect(screen.queryByRole("heading", { name: legacy })).not.toBeInTheDocument();
    }
  });

  it("adds a four-card core engineering capabilities grid with badges and bullets", () => {
    renderPage();

    expect(screen.getByRole("heading", { name: SERVICES_OVERVIEW_CAPABILITIES_TITLE, level: 2 })).toBeInTheDocument();
    expect(screen.getByText(SERVICES_OVERVIEW_CAPABILITIES_SUBTEXT)).toBeInTheDocument();

    const grid = screen.getByTestId("services-core-capabilities");
    expect(grid).toHaveClass(SERVICES_OVERVIEW_CAPABILITIES_GRID_CLASS);
    const cards = within(grid).getAllByTestId("services-capability-card");
    expect(cards).toHaveLength(4);

    for (const capability of SERVICES_OVERVIEW_CAPABILITIES) {
      const card = cards.find((node) => node.id === capability.id);
      expect(card).toBeTruthy();
      expect(card).toHaveClass(SERVICES_OVERVIEW_CAPABILITY_CARD_CLASS);
      for (const frostClass of FROSTED_GLASS_CLASSES) {
        expect(card).toHaveClass(frostClass);
      }
      expect(within(card!).getByText(capability.badge)).toBeInTheDocument();
      expect(within(card!).getByRole("heading", { name: capability.title })).toBeInTheDocument();
      expect(within(card!).getByText(capability.subtext)).toBeInTheDocument();
      for (const bullet of capability.bullets) {
        expect(within(card!).getByText(bullet)).toBeInTheDocument();
      }
      expect(within(card!).getByRole("link", { name: capability.title })).toHaveAttribute("href", capability.to);
    }
  });

  it("uses frosted-glass cards for offerings and the two-column product showcase", () => {
    renderPage();

    const offerings = screen.getAllByTestId("services-offering-card");
    const productsGrid = screen.getByTestId("services-products-showcase");
    expect(productsGrid.closest("section")).toHaveAttribute("id", SERVICES_OVERVIEW_PRODUCTS_ANCHOR);
    expect(productsGrid).toHaveClass(SERVICES_OVERVIEW_PRODUCTS_GRID_CLASS);
    const products = within(productsGrid).getAllByTestId("services-product-card");
    expect(products).toHaveLength(2);

    for (const card of [...offerings, ...products]) {
      for (const frostClass of FROSTED_GLASS_CLASSES) {
        expect(card).toHaveClass(frostClass);
      }
    }

    expect(screen.getByRole("heading", { name: SERVICES_OVERVIEW_PRODUCTS_TITLE, level: 2 })).toBeInTheDocument();
    for (const product of SERVICES_OVERVIEW_PRODUCTS) {
      expect(within(productsGrid).getByRole("heading", { name: product.title })).toBeInTheDocument();
      expect(within(productsGrid).getByText(product.description)).toBeInTheDocument();
      expect(within(productsGrid).getByRole("link", { name: product.ctaLabel })).toHaveAttribute("href", product.to);
    }
    expect(products[0]).toHaveClass(SERVICES_OVERVIEW_PRODUCT_CARD_CLASS);
  });

  it("anchors the three strategic offerings for deep navigation", () => {
    const { container } = renderPage();

    for (const offering of SERVICES_OVERVIEW_OFFERINGS) {
      const anchor = container.querySelector(`#${offering.id}`);
      expect(anchor).toBeTruthy();
      expect(anchor).toHaveAttribute("data-testid", "services-offering-card");
    }
  });

  it("includes a four-track inquiry form defaulting to the 2-week audit", () => {
    renderPage();

    const form = screen.getByTestId("services-overview-inquiry");
    expect(form).toHaveAttribute("id", SERVICES_OVERVIEW_INQUIRY_ANCHOR);
    expect(screen.getByRole("heading", { name: SERVICES_OVERVIEW_INQUIRY.title, level: 2 })).toBeInTheDocument();
    expect(within(form).getByLabelText(SERVICES_OVERVIEW_INQUIRY.nameLabel)).toBeRequired();
    const interest = within(form).getByLabelText(SERVICES_OVERVIEW_INQUIRY.interestLabel);
    expect(interest).toBeRequired();
    expect(interest).toHaveValue(SERVICES_OVERVIEW_INQUIRY_INTERESTS[0]);
    for (const option of SERVICES_OVERVIEW_INQUIRY_INTERESTS) {
      expect(within(form).getByRole("option", { name: option })).toBeInTheDocument();
    }
    expect(within(form).getByRole("button", { name: SERVICES_OVERVIEW_INQUIRY.submitLabel })).toBeInTheDocument();
  });

  it("does not render the retired mosaic services grid", () => {
    renderPage();

    expect(screen.queryByTestId("stitch-services-grid")).not.toBeInTheDocument();
    expect(document.querySelector(".stitch-services-grid")).not.toBeInTheDocument();
    expect(screen.queryAllByTestId("stitch-service-card")).toHaveLength(0);
  });
});
