import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NEARDROP_CASE_STUDY_COPY } from "../lib/neardropCaseStudyContent";
import NearDropCaseStudyFunctionalExcellenceSection from "./NearDropCaseStudyFunctionalExcellenceSection";

describe("NearDropCaseStudyFunctionalExcellenceSection", () => {
  it("renders the functional excellence feature grid below the intro", () => {
    render(<NearDropCaseStudyFunctionalExcellenceSection />);

    const section = screen.getByTestId("neardrop-case-study-functional-excellence");
    expect(section).toHaveClass("neardrop-case-study-functional-excellence");
    expect(
      within(section).getByRole("heading", { name: NEARDROP_CASE_STUDY_COPY.functionalExcellence.heading }),
    ).toBeInTheDocument();
    expect(within(section).getByText(NEARDROP_CASE_STUDY_COPY.functionalExcellence.description)).toBeInTheDocument();
    expect(within(section).getByText(NEARDROP_CASE_STUDY_COPY.functionalExcellence.countLabel)).toBeInTheDocument();

    const grid = within(section).getByTestId("neardrop-case-study-functional-excellence-grid");
    expect(grid.querySelectorAll(".neardrop-case-study-feature-card")).toHaveLength(4);
    expect(grid.querySelector(".neardrop-case-study-feature-card--highlight")).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "Key Features" })).not.toBeInTheDocument();
    expect(within(section).queryByText("01")).not.toBeInTheDocument();

    expect(within(section).getByRole("heading", { name: "Role-Based Access Control" })).toBeInTheDocument();
    expect(within(section).getByRole("heading", { name: "Real-time Tracking" })).toBeInTheDocument();
    expect(within(section).getByRole("heading", { name: "Normalized Schema" })).toBeInTheDocument();
    expect(within(section).getByRole("heading", { name: "Driver-Merchant Coordination" })).toBeInTheDocument();
    expect(within(section).getByText(/Sub-second latency updates/i)).toBeInTheDocument();
    expect(within(section).getByText(/massive scale and complex relationship queries/i)).toBeInTheDocument();
  });
});
