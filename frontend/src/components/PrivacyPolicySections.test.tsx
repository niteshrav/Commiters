import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PrivacyPolicySections from "./PrivacyPolicySections";
import {
  PRIVACY_CALLOUT_CLASS,
  PRIVACY_CHECKLIST_CLASS,
  PRIVACY_FEATURE_CARD_CLASS,
  PRIVACY_FEATURE_GRID_CLASS,
  PRIVACY_PARAGRAPH_CLASS,
  PRIVACY_RIGHTS_LIST_CLASS,
  PRIVACY_SECTION_CLASS,
  PRIVACY_SECTION_INDEX_CLASS,
  PRIVACY_SECTION_SHELL_CLASS,
  PRIVACY_SECTION_TITLE_CLASS,
  PRIVACY_SUBSECTION_LABEL_CLASS,
} from "../lib/privacyPageLayout";
import { SITE_HORIZONTAL_RULE_CLASS } from "../lib/siteHorizontalRule";
import { PRIVACY_POLICY_SECTIONS } from "../lib/privacyPageContent";

describe("PrivacyPolicySections", () => {
  it("renders numbered sections with full-width separators outside the grid", () => {
    render(
      <MemoryRouter>
        <PrivacyPolicySections sections={PRIVACY_POLICY_SECTIONS} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("privacy-policy-sections")).toBeInTheDocument();
    expect(screen.getByTestId("privacy-policy-section-01")).toHaveClass(PRIVACY_SECTION_CLASS);
    expect(screen.getByTestId("privacy-policy-section-04")).toBeInTheDocument();
    expect(document.querySelectorAll(`.${PRIVACY_SECTION_SHELL_CLASS}`)).toHaveLength(4);
    expect(document.querySelectorAll(`.${SITE_HORIZONTAL_RULE_CLASS}`)).toHaveLength(4);

    const dividers = Array.from(document.querySelectorAll(`.${SITE_HORIZONTAL_RULE_CLASS}`));
    for (const divider of dividers) {
      expect(divider.parentElement).not.toHaveClass(PRIVACY_SECTION_CLASS);
    }

    expect(screen.getByText("01")).toHaveClass(PRIVACY_SECTION_INDEX_CLASS);
    expect(screen.getByRole("heading", { name: "Data Collection" })).toHaveClass(PRIVACY_SECTION_TITLE_CLASS);
    expect(screen.getByRole("heading", { name: "Your Rights" })).toBeInTheDocument();
    expect(screen.getByTestId("privacy-policy-dpo-cta")).toBeInTheDocument();
  });

  it("renders identity checklist items for section 01", () => {
    render(
      <MemoryRouter>
        <PrivacyPolicySections sections={PRIVACY_POLICY_SECTIONS} />
      </MemoryRouter>,
    );

    expect(screen.getByText("IDENTITY DATA")).toHaveClass(PRIVACY_SUBSECTION_LABEL_CLASS);
    expect(document.querySelector(`.${PRIVACY_CHECKLIST_CLASS}`)).toBeTruthy();
    expect(screen.getByText("Direct interactions via project inquiry forms.")).toBeInTheDocument();
  });

  it("renders usage purpose cards below the intro paragraph", () => {
    render(
      <MemoryRouter>
        <PrivacyPolicySections sections={PRIVACY_POLICY_SECTIONS} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/We process your personal data only when we have a legal basis/i)).toHaveClass(
      PRIVACY_PARAGRAPH_CLASS,
    );
    expect(document.querySelector(`.${PRIVACY_FEATURE_GRID_CLASS}`)).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Contract Performance" })).toBeInTheDocument();
    expect(document.querySelectorAll(`.${PRIVACY_FEATURE_CARD_CLASS}`)).toHaveLength(2);
  });

  it("renders your rights bullets and the DPO CTA below section 03", () => {
    render(
      <MemoryRouter>
        <PrivacyPolicySections sections={PRIVACY_POLICY_SECTIONS} />
      </MemoryRouter>,
    );

    expect(document.querySelector(`.${PRIVACY_RIGHTS_LIST_CLASS}`)).toBeTruthy();
    expect(screen.getByText("Right to Access")).toBeInTheDocument();
    expect(screen.getByText(/Request a copy of the personal data/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Contact DPO/i })).toBeInTheDocument();
  });
});
