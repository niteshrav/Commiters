import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PrivacyPolicyDpoCta from "./PrivacyPolicyDpoCta";
import {
  PRIVACY_DPO_BUTTON_CLASS,
  PRIVACY_DPO_CTA_CLASS,
  PRIVACY_DPO_DESCRIPTION_CLASS,
  PRIVACY_DPO_TITLE_CLASS,
} from "../lib/privacyPageLayout";
import { PRIVACY_DPO_CTA } from "../lib/privacyPageContent";
import { ROUTES } from "../lib/routes";

describe("PrivacyPolicyDpoCta", () => {
  it("renders the Stitch DPO contact band with a contact link", () => {
    render(
      <MemoryRouter>
        <PrivacyPolicyDpoCta />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("privacy-policy-dpo-cta")).toHaveClass(PRIVACY_DPO_CTA_CLASS);
    expect(screen.getByRole("heading", { name: PRIVACY_DPO_CTA.title })).toHaveClass(PRIVACY_DPO_TITLE_CLASS);
    expect(screen.getByText(PRIVACY_DPO_CTA.description)).toHaveClass(PRIVACY_DPO_DESCRIPTION_CLASS);
    const link = screen.getByRole("link", { name: new RegExp(PRIVACY_DPO_CTA.buttonLabel, "i") });
    expect(link).toHaveClass(PRIVACY_DPO_BUTTON_CLASS);
    expect(link).toHaveAttribute("href", ROUTES.contact);
  });
});
