import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TermsPageSections from "./TermsPageSections";
import {
  TERMS_CHECKLIST_CLASS,
  TERMS_CHECKLIST_ICON_CLASS,
  TERMS_HIGHLIGHT_CLASS,
  TERMS_SECTION_CLASS,
  TERMS_SECTION_CONTENT_CLASS,
  TERMS_SECTION_INDEX_CLASS,
  TERMS_SECTION_TITLE_CLASS,
} from "../lib/termsPageLayout";
import { TERMS_PAGE_SECTIONS } from "../lib/termsPageContent";

describe("TermsPageSections", () => {
  it("renders numbered sections, checklist items, and the liability highlight from the document", () => {
    render(
      <MemoryRouter>
        <TermsPageSections sections={TERMS_PAGE_SECTIONS} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("terms-sections")).toBeInTheDocument();
    expect(screen.getByTestId("terms-section-01")).toHaveClass(TERMS_SECTION_CLASS);
    expect(screen.getByText("01")).toHaveClass(TERMS_SECTION_INDEX_CLASS, "terms-section-index--blue");
    expect(screen.getByRole("heading", { name: "Acceptance of Terms" })).toHaveClass(TERMS_SECTION_TITLE_CLASS);
    expect(document.querySelector(`.${TERMS_SECTION_CONTENT_CLASS}`)).toBeTruthy();
    expect(screen.getByText(/By accessing or using the services provided by Commiters Softwares/i)).toBeInTheDocument();
    expect(screen.getByText("Custom Web & Mobile Engineering")).toBeInTheDocument();
    expect(document.querySelector(`.${TERMS_CHECKLIST_CLASS}`)).toBeTruthy();
    expect(document.querySelectorAll(`.${TERMS_CHECKLIST_ICON_CLASS}`)).toHaveLength(3);
    expect(document.querySelector(`.${TERMS_HIGHLIGHT_CLASS}`)).toHaveTextContent(
      /To the maximum extent permitted by law/i,
    );
    expect(screen.getByRole("heading", { name: "Governing Law" })).toBeInTheDocument();
    expect(screen.getByTestId("terms-enterprise-cta")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Contact Support/i })).toHaveAttribute("href", "/contact");
  });
});
