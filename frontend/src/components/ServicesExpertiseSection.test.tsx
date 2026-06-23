import { render, screen } from "@testing-library/react";
import ServicesExpertiseSection from "./ServicesExpertiseSection";
import {
  SERVICES_EXPERTISE_BODY_CLASS,
  SERVICES_EXPERTISE_INNER_CLASS,
  SERVICES_EXPERTISE_KICKER_CLASS,
  SERVICES_EXPERTISE_SECTION_CLASS,
  SERVICES_EXPERTISE_SEPARATOR_CLASS,
  SERVICES_EXPERTISE_SEPARATOR_TEST_ID,
  SERVICES_EXPERTISE_TITLE_CLASS,
} from "../lib/servicesIntroLayout";
import { STITCH_COPY } from "../lib/stitchDesign";

describe("ServicesExpertiseSection", () => {
  it("renders the Stitch OUR EXPERTISE intro aligned with the header logo inset", () => {
    render(<ServicesExpertiseSection />);

    const inner = screen.getByTestId("services-expertise-inner");
    expect(screen.getByTestId("services-expertise-section")).toHaveClass(SERVICES_EXPERTISE_SECTION_CLASS);
    expect(inner).toHaveClass(SERVICES_EXPERTISE_INNER_CLASS);
    expect(inner).not.toHaveClass("container");
    expect(screen.getByText(STITCH_COPY.services.kicker)).toHaveClass(SERVICES_EXPERTISE_KICKER_CLASS);
    expect(screen.getByRole("heading", { name: STITCH_COPY.services.title })).toHaveClass(
      SERVICES_EXPERTISE_TITLE_CLASS,
    );
    expect(screen.getByText(STITCH_COPY.services.subtext)).toHaveClass(SERVICES_EXPERTISE_BODY_CLASS);
  });

  it("places a contained separator between the intro copy and the services grid", () => {
    render(<ServicesExpertiseSection />);

    const separator = screen.getByTestId(SERVICES_EXPERTISE_SEPARATOR_TEST_ID);
    expect(separator).toHaveClass(SERVICES_EXPERTISE_SEPARATOR_CLASS);
    expect(separator.tagName).toBe("HR");
  });
});
