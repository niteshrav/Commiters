import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import AiSummarizerCaseStudyPage from "./AiSummarizerCaseStudyPage";
import { AI_SUMMARIZER_CASE_STUDY_COPY } from "../lib/aiSummarizerCaseStudyContent";

describe("AiSummarizerCaseStudyPage", () => {
  it("follows the demo text arrangement with AI Summarizer copy", () => {
    render(
      <MemoryRouter>
        <AiSummarizerCaseStudyPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Closer to the decision." })).toBeInTheDocument();
    expect(screen.getByText(AI_SUMMARIZER_CASE_STUDY_COPY.description)).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: "Ingestion & Processing" })[0]).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Problem" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Solution" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "USP of the project" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tech stack used" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Outcome" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Live demo" })).not.toBeInTheDocument();
  });
});
