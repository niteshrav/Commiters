import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import PrivacyPolicyPage from "./PrivacyPolicyPage";
import { ROUTES } from "../lib/routes";
import { PRIVACY_CONTENT_COLUMN_CLASS } from "../lib/privacyPageLayout";
import { SITE_HORIZONTAL_RULE_CLASS } from "../lib/siteHorizontalRule";
import { PRIVACY_PAGE_COPY, PRIVACY_POLICY_SECTIONS } from "../lib/privacyPageContent";
import { SITE_FOOTER_COPY, SITE_FOOTER_TAGLINE } from "../lib/siteFooterCopy";
import { COMMITERS_HEADER_LOGO_ALT } from "../lib/siteBrand";

describe("PrivacyPolicyPage", () => {
  it("renders the Stitch privacy policy layout from the screenshot", () => {
    render(
      <MemoryRouter>
        <PrivacyPolicyPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("privacy-page")).toBeInTheDocument();
    const contentColumn = screen.getByTestId("privacy-policy-content");
    expect(contentColumn).toHaveClass(PRIVACY_CONTENT_COLUMN_CLASS);
    expect(screen.getByTestId("privacy-policy-intro")).toBeInTheDocument();
    expect(screen.getByTestId("privacy-policy-sections")).toBeInTheDocument();
    expect(contentColumn).toContainElement(screen.getByTestId("privacy-policy-intro"));
    expect(contentColumn).toContainElement(screen.getByTestId("privacy-policy-sections"));
    expect(screen.queryByTestId("legal-intro-section")).not.toBeInTheDocument();
    expect(screen.queryByTestId("legal-document-section")).not.toBeInTheDocument();
    expect(screen.queryByTestId("page-hero-premium")).not.toBeInTheDocument();
    expect(screen.queryByTestId("section-figure-wave")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: PRIVACY_PAGE_COPY.title })).toBeInTheDocument();
    expect(screen.getByText(`${PRIVACY_PAGE_COPY.lastUpdatedLabel} ${PRIVACY_PAGE_COPY.lastUpdatedDate}`)).toBeInTheDocument();
    expect(screen.getByText(PRIVACY_PAGE_COPY.introBold)).toBeInTheDocument();

    for (const section of PRIVACY_POLICY_SECTIONS) {
      expect(screen.getByRole("heading", { name: section.title })).toBeInTheDocument();
    }

    expect(screen.getByText("IDENTITY DATA")).toBeInTheDocument();
    expect(screen.getByText("Direct interactions via project inquiry forms.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Usage & Purpose" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Contract Performance" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Cookies" })).toBeInTheDocument();
    expect(screen.getByText(/If you disable or refuse cookies/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Your Rights" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Contact DPO/i })).toBeInTheDocument();
    expect(screen.getByText(`${PRIVACY_PAGE_COPY.lastUpdatedLabel} April 15, 2026`)).toBeInTheDocument();
    const dividers = contentColumn.querySelectorAll(`.${SITE_HORIZONTAL_RULE_CLASS}`);
    expect(dividers).toHaveLength(5);
    for (const divider of dividers) {
      expect(divider.tagName).toBe("HR");
    }
  });

  it("uses the same footer top border as the header bottom border on the privacy route", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.privacyPolicy]}>
        <App />
      </MemoryRouter>,
    );

    const banner = screen.getByRole("banner");
    const footer = screen.getByRole("contentinfo");
    expect(banner).toHaveClass("header-light");
    expect(footer).toHaveClass("footer--stitch");
  });

  it("keeps the home header and footer logo with copyright when routed through the site shell", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.privacyPolicy]}>
        <App />
      </MemoryRouter>,
    );

    const banner = screen.getByRole("banner");
    expect(within(banner).getByRole("img", { name: COMMITERS_HEADER_LOGO_ALT })).toBeInTheDocument();
    expect(screen.getByTestId("privacy-page")).toBeInTheDocument();

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
