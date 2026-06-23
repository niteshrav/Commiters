import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import TermsPage from "./TermsPage";
import { COMMITERS_HEADER_LOGO_ALT } from "../lib/siteBrand";
import { ROUTES } from "../lib/routes";
import { SITE_FOOTER_COPY, SITE_FOOTER_TAGLINE } from "../lib/siteFooterCopy";
import { TERMS_PAGE_COPY, TERMS_PAGE_SECTION_TITLES } from "../lib/termsPageContent";
import { STITCH_COPY } from "../lib/stitchDesign";

describe("TermsPage", () => {
  it("renders the Stitch terms of service layout from the document", () => {
    render(
      <MemoryRouter>
        <TermsPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("terms-page")).toBeInTheDocument();
    expect(screen.getByTestId("terms-intro")).toBeInTheDocument();
    expect(screen.getByTestId("terms-sections")).toBeInTheDocument();
    expect(screen.queryByTestId("legal-intro-section")).not.toBeInTheDocument();
    expect(screen.queryByTestId("legal-document-section")).not.toBeInTheDocument();
    expect(screen.queryByTestId("page-hero-premium")).not.toBeInTheDocument();
    expect(screen.queryByTestId("section-figure-wave")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: TERMS_PAGE_COPY.title })).toBeInTheDocument();
    expect(screen.getByText(`${TERMS_PAGE_COPY.lastUpdatedLabel} ${TERMS_PAGE_COPY.lastUpdatedDate}`)).toBeInTheDocument();
    expect(TERMS_PAGE_COPY.lastUpdatedDate).toBe(STITCH_COPY.privacy.lastUpdatedDate);

    for (const title of TERMS_PAGE_SECTION_TITLES) {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    }

    expect(screen.getByText(/Master Service Agreement \(MSA\)/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Contact Support/i })).toHaveAttribute("href", ROUTES.contact);
  });

  it("keeps the home header and footer logo with copyright when routed through the site shell", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.terms]}>
        <App />
      </MemoryRouter>,
    );

    const banner = screen.getByRole("banner");
    expect(within(banner).getByRole("img", { name: COMMITERS_HEADER_LOGO_ALT })).toBeInTheDocument();
    expect(within(banner).getByRole("link", { name: COMMITERS_HEADER_LOGO_ALT })).toHaveAttribute("href", ROUTES.home);
    expect(within(banner).getByTestId("nav-start-project-cta")).toHaveTextContent("Start Project");

    const copyrightCell = screen.getByTestId("footer-copyright-cell");
    expect(within(copyrightCell).getByText(SITE_FOOTER_COPY.copyrightLine1)).toHaveTextContent(
      "© 2026 Commiters Softwares.",
    );
    expect(within(copyrightCell).getByText(SITE_FOOTER_TAGLINE)).toHaveTextContent(
      "Engineering Precision for world-class digital products.",
    );
    expect(screen.getByTestId("footer-logo-cell").querySelector(".brand-logo--footer")).toBeTruthy();
  });
});
