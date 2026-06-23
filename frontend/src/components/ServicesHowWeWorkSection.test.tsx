import { render, screen, within } from "@testing-library/react";
import ServicesHowWeWorkSection from "./ServicesHowWeWorkSection";
import {
  SERVICES_HOW_WE_WORK_GRID_CLASS,
  SERVICES_HOW_WE_WORK_SECTION_CLASS,
  SERVICES_HOW_WE_WORK_SEPARATOR_CLASS,
  SERVICES_HOW_WE_WORK_SEPARATOR_TEST_ID,
  SERVICES_HOW_WE_WORK_STEP_CLASS,
  SERVICES_HOW_WE_WORK_TITLE_CLASS,
} from "../lib/servicesPageBottomLayout";
import { SERVICES_HOW_WE_WORK } from "../lib/servicesPageBottomContent";

describe("ServicesHowWeWorkSection", () => {
  it("renders the Stitch process band with four steps and a separator", () => {
    render(<ServicesHowWeWorkSection />);

    expect(screen.getByTestId("services-how-we-work-section")).toHaveClass(SERVICES_HOW_WE_WORK_SECTION_CLASS);
    expect(screen.getByRole("heading", { name: SERVICES_HOW_WE_WORK.title })).toHaveClass(
      SERVICES_HOW_WE_WORK_TITLE_CLASS,
    );
    expect(screen.getByText(SERVICES_HOW_WE_WORK.subtext)).toBeInTheDocument();

    const grid = screen.getByTestId("services-how-we-work-grid");
    expect(grid).toHaveClass(SERVICES_HOW_WE_WORK_GRID_CLASS);
    expect(within(grid).getAllByTestId("services-how-we-work-step")).toHaveLength(4);
    expect(within(grid).getAllByTestId("services-how-we-work-step")[0]).toHaveClass(
      SERVICES_HOW_WE_WORK_STEP_CLASS,
    );

    expect(screen.getByTestId(SERVICES_HOW_WE_WORK_SEPARATOR_TEST_ID)).toHaveClass(
      SERVICES_HOW_WE_WORK_SEPARATOR_CLASS,
    );
  });
});
