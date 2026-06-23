import { render, screen } from "@testing-library/react";
import LegalIntroSection from "./LegalIntroSection";
import {
  LEGAL_INTRO_INNER_CLASS,
  LEGAL_INTRO_KICKER_CLASS,
  LEGAL_INTRO_META_CLASS,
  LEGAL_INTRO_SECTION_CLASS,
  LEGAL_INTRO_TITLE_CLASS,
} from "../lib/legalPageLayout";

describe("LegalIntroSection", () => {
  it("renders the Stitch legal intro title and effective date with dedicated typography classes", () => {
    render(
      <LegalIntroSection
        title="Terms of Service"
        effectiveDateLabel="Effective Date:"
        effectiveDate="April 15, 2026"
      />,
    );

    const inner = screen.getByTestId("legal-intro-inner");
    expect(screen.getByTestId("legal-intro-section")).toHaveClass(LEGAL_INTRO_SECTION_CLASS);
    expect(inner).toHaveClass(LEGAL_INTRO_INNER_CLASS);
    expect(inner).not.toHaveClass("container");
    expect(screen.queryByTestId("page-hero-premium")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Terms of Service" })).toHaveClass(LEGAL_INTRO_TITLE_CLASS);
    const effectiveDate = screen.getByText("April 15, 2026");
    expect(effectiveDate.closest("p")).toHaveClass(LEGAL_INTRO_META_CLASS);
    expect(screen.getByText("Effective Date:")).toBeInTheDocument();
  });

  it("renders the Stitch LEGAL kicker when provided", () => {
    render(
      <LegalIntroSection
        kicker="LEGAL"
        title="Terms of Service"
        effectiveDateLabel="Effective Date:"
        effectiveDate="April 15, 2026"
      />,
    );

    expect(screen.getByText("LEGAL")).toHaveClass(LEGAL_INTRO_KICKER_CLASS);
  });
});
