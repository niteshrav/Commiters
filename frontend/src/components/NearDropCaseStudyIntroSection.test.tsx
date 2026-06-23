import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NEARDROP_CASE_STUDY_COPY } from "../lib/neardropCaseStudyContent";
import NearDropCaseStudyIntroSection from "./NearDropCaseStudyIntroSection";

describe("NearDropCaseStudyIntroSection", () => {
  it("renders the centered brand-architecture intro with inline stack cards", () => {
    render(<NearDropCaseStudyIntroSection />);

    const intro = screen.getByTestId("neardrop-case-study-intro");
    expect(intro).toHaveClass("neardrop-case-study-intro");
    expect(intro.querySelector(".neardrop-case-study-kicker-dot")).toBeTruthy();
    expect(within(intro).getByText(NEARDROP_CASE_STUDY_COPY.kicker)).toBeInTheDocument();

    expect(
      within(intro).getByRole("heading", {
        level: 1,
        name: `${NEARDROP_CASE_STUDY_COPY.titleLead}${NEARDROP_CASE_STUDY_COPY.titleAccent} ${NEARDROP_CASE_STUDY_COPY.titleTrail}`,
      }),
    ).toBeInTheDocument();
    expect(intro.querySelector(".neardrop-case-study-title-accent")).toHaveTextContent(
      NEARDROP_CASE_STUDY_COPY.titleAccent,
    );
    expect(within(intro).getByText(NEARDROP_CASE_STUDY_COPY.description)).toBeInTheDocument();

    const stack = within(intro).getByTestId("neardrop-case-study-intro-stack");
    expect(stack.querySelectorAll(".neardrop-case-study-intro-stack-item")).toHaveLength(3);
    expect(within(stack).getByText("ARCHITECTURE")).toBeInTheDocument();
    expect(within(stack).getByText("DATABASE")).toBeInTheDocument();
    expect(within(stack).getByText("BACKEND")).toBeInTheDocument();
    expect(within(stack).getByText("Next.js")).toBeInTheDocument();
    expect(within(stack).getByText("PostgreSQL")).toBeInTheDocument();
    expect(within(stack).getByText("Node.js")).toBeInTheDocument();
    expect(screen.queryByTestId("neardrop-case-study-core-stack")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "CORE STACK" })).not.toBeInTheDocument();
  });
});
