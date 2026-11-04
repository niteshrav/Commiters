import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ProspectIqCaseStudyPage from "./ProspectIqCaseStudyPage";
import { PROSPECTIQ_LIVE_URL, PROSPECT_IQ_CASE_STUDY_COPY } from "../lib/prospectIqCaseStudyContent";

describe("ProspectIqCaseStudyPage", () => {
  it("follows the demo text arrangement with ProspectIQ live prototype data", () => {
    render(
      <MemoryRouter>
        <ProspectIqCaseStudyPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Closer to the right lead." })).toBeInTheDocument();
    expect(screen.getByText(PROSPECT_IQ_CASE_STUDY_COPY.subtitle)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Explore the project/i })[0]).toHaveAttribute("href", PROSPECTIQ_LIVE_URL);
    expect(screen.getByRole("heading", { name: "Problem" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Solution" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "USP of the project" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tech stack used" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Outcome" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Live demo" })).toBeInTheDocument();
  });
});
