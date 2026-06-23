import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NEARDROP_CASE_STUDY_COPY } from "../lib/neardropCaseStudyContent";
import NearDropCaseStudyExecutionSection from "./NearDropCaseStudyExecutionSection";

describe("NearDropCaseStudyExecutionSection", () => {
  it("renders the precision execution process band with a split header and step cards", () => {
    render(<NearDropCaseStudyExecutionSection />);

    const section = screen.getByTestId("neardrop-case-study-execution");
    expect(section).toHaveClass("neardrop-case-study-execution-section");
    expect(section.querySelector(".neardrop-case-study-execution-layout")).toBeTruthy();

    const copy = section.querySelector(".neardrop-case-study-execution-copy");
    expect(copy).toBeTruthy();
    expect(within(section).getByText(NEARDROP_CASE_STUDY_COPY.execution.kicker)).toBeInTheDocument();
    expect(
      within(section).getByRole("heading", { name: NEARDROP_CASE_STUDY_COPY.execution.heading }),
    ).toBeInTheDocument();
    expect(within(section).getByText(NEARDROP_CASE_STUDY_COPY.execution.description)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "The Execution" })).not.toBeInTheDocument();

    const list = within(section).getByTestId("neardrop-case-study-execution-list");
    expect(list.querySelectorAll(".neardrop-case-study-execution-item")).toHaveLength(3);
    expect(within(list).getByText("01")).toBeInTheDocument();
    expect(within(list).getByText("03")).toBeInTheDocument();
    expect(within(list).getByRole("heading", { name: "Architectural Integrity" })).toBeInTheDocument();
    expect(within(list).getByRole("heading", { name: "Precision Engineering" })).toBeInTheDocument();
    expect(within(list).getByRole("heading", { name: "Security First" })).toBeInTheDocument();
    expect(within(list).getByText(/high-concurrency writes/i)).toBeInTheDocument();
    expect(within(list).getByText(/Multi-factor authentication/i)).toBeInTheDocument();
  });
});
