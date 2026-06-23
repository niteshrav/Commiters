import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { MULTI_ROLE_CRM_CASE_STUDY_COPY } from "../lib/multiRoleCrmCaseStudyContent";
import { ROUTES } from "../lib/routes";
import { COMMITERS_HEADER_LOGO_ALT } from "../lib/siteBrand";
import MultiRoleCrmCaseStudyBottomCta from "./MultiRoleCrmCaseStudyBottomCta";

describe("MultiRoleCrmCaseStudyBottomCta", () => {
  it("renders the bottom CTA without a Commiters logo or social proof copy", () => {
    render(
      <MemoryRouter>
        <MultiRoleCrmCaseStudyBottomCta />
      </MemoryRouter>,
    );

    const cta = screen.getByTestId("multi-role-crm-case-study-bottom-cta");
    expect(within(cta).getByRole("heading", { name: MULTI_ROLE_CRM_CASE_STUDY_COPY.bottomCta.title })).toBeInTheDocument();
    expect(within(cta).getByText(MULTI_ROLE_CRM_CASE_STUDY_COPY.bottomCta.subtext)).toBeInTheDocument();
    expect(within(cta).getByRole("link", { name: MULTI_ROLE_CRM_CASE_STUDY_COPY.bottomCta.primaryLabel })).toHaveAttribute(
      "href",
      ROUTES.contact,
    );

    expect(cta.querySelector(".multi-role-crm-case-study-bottom-cta-brand")).toBeNull();
    expect(screen.queryByRole("img", { name: COMMITERS_HEADER_LOGO_ALT })).not.toBeInTheDocument();
    expect(screen.queryByText("Join 50+ companies scaling with AI")).not.toBeInTheDocument();
  });
});
