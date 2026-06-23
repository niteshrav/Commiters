import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ServicesBottomCta from "./ServicesBottomCta";
import {
  SERVICES_BOTTOM_CTA_SECTION_CLASS,
  SERVICES_BOTTOM_CTA_SEPARATOR_TEST_ID,
  SERVICES_BOTTOM_CTA_SUBTEXT_CLASS,
  SERVICES_BOTTOM_CTA_TITLE_CLASS,
} from "../lib/servicesPageBottomLayout";
import {
  SERVICES_BOTTOM_CTA,
  SERVICES_REJECTED_BOTTOM_CTA_SUBTEXT,
} from "../lib/servicesPageBottomContent";

describe("ServicesBottomCta", () => {
  it("renders the Stitch services CTA with the requested subtext and actions", () => {
    render(
      <MemoryRouter>
        <ServicesBottomCta />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("services-bottom-cta")).toHaveClass(SERVICES_BOTTOM_CTA_SECTION_CLASS);
    expect(screen.getByRole("heading", { name: SERVICES_BOTTOM_CTA.title })).toHaveClass(
      SERVICES_BOTTOM_CTA_TITLE_CLASS,
    );
    expect(screen.getByText(SERVICES_BOTTOM_CTA.subtext)).toHaveClass(SERVICES_BOTTOM_CTA_SUBTEXT_CLASS);
    expect(screen.queryByText(SERVICES_REJECTED_BOTTOM_CTA_SUBTEXT)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: SERVICES_BOTTOM_CTA.primaryLabel })).toHaveAttribute(
      "href",
      SERVICES_BOTTOM_CTA.primaryHref,
    );
    expect(screen.queryByRole("link", { name: /tech stack|our stack/i })).not.toBeInTheDocument();
    expect(screen.getByTestId(SERVICES_BOTTOM_CTA_SEPARATOR_TEST_ID)).toBeInTheDocument();
  });
});
