import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { NEARDROP_CASE_STUDY_COPY } from "../lib/neardropCaseStudyContent";
import { ROUTES } from "../lib/routes";
import { buildDiscoveryCallCalendarUrl } from "../lib/siteContact";
import NearDropCaseStudyBottomCta from "./NearDropCaseStudyBottomCta";

describe("NearDropCaseStudyBottomCta", () => {
  it("renders the enterprise-grade gradient CTA banner", () => {
    render(
      <MemoryRouter>
        <NearDropCaseStudyBottomCta />
      </MemoryRouter>,
    );

    const cta = screen.getByTestId("neardrop-case-study-bottom-cta");
    expect(cta).toHaveClass("neardrop-case-study-bottom-cta");
    expect(cta.querySelector(".neardrop-case-study-bottom-cta-panel")).toBeTruthy();

    expect(
      within(cta).getByRole("heading", { name: NEARDROP_CASE_STUDY_COPY.bottomCta.title }),
    ).toBeInTheDocument();
    expect(within(cta).getByText(NEARDROP_CASE_STUDY_COPY.bottomCta.subtext)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Need Precision Software?" })).not.toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Book a Consultation" })).toHaveAttribute(
      "href",
      buildDiscoveryCallCalendarUrl(),
    );
    expect(screen.getByRole("link", { name: "View Portfolio" })).toHaveAttribute("href", ROUTES.caseStudies);
  });
});
