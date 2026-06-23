import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import AiSummarizerCaseStudyPage from "./AiSummarizerCaseStudyPage";
import { AI_SUMMARIZER_CASE_STUDY_COPY } from "../lib/aiSummarizerCaseStudyContent";

describe("AiSummarizerCaseStudyPage", () => {
  it("renders the introduction, architecture, tech stack, and execution strategy sections", () => {
    render(
      <MemoryRouter>
        <AiSummarizerCaseStudyPage />
      </MemoryRouter>,
    );

    const page = screen.getByTestId("ai-summarizer-case-study-page");
    expect(page).toBeInTheDocument();
    expect(page).toHaveClass("ai-summarizer-case-study-page");

    const intro = screen.getByTestId("ai-summarizer-case-study-intro");
    expect(within(intro).getByText(AI_SUMMARIZER_CASE_STUDY_COPY.kicker)).toBeInTheDocument();
    expect(within(intro).getByRole("heading", { level: 1, name: AI_SUMMARIZER_CASE_STUDY_COPY.title })).toBeInTheDocument();
    expect(within(intro).getByRole("img", { name: AI_SUMMARIZER_CASE_STUDY_COPY.heroImage.alt })).toBeInTheDocument();

    const architecture = screen.getByTestId("ai-summarizer-case-study-architecture");
    expect(within(architecture).getByRole("heading", { name: "Core Architecture" })).toBeInTheDocument();

    const techStack = screen.getByTestId("ai-summarizer-case-study-tech-stack");
    expect(within(techStack).getByRole("heading", { name: "The Tech Stack" })).toBeInTheDocument();
    expect(within(techStack).getByText(/multi-modal generative AI pipelines/i)).toBeInTheDocument();
    expect(within(techStack).getByText("Python 3.11")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "VIEW DOCUMENTATION" })).not.toBeInTheDocument();

    const execution = screen.getByTestId("ai-summarizer-case-study-execution");
    expect(execution).toHaveClass("ai-summarizer-case-study-execution-section");
    expect(execution).not.toHaveClass("band-breakout");
    expect(within(execution).getByRole("heading", { name: "Execution Strategy" })).toBeInTheDocument();
    expect(within(execution).getByText("Data Tokenization")).toBeInTheDocument();
    expect(within(execution).getByText("Latency Chaining")).toBeInTheDocument();
    expect(within(execution).getByText("Output Validation")).toBeInTheDocument();
    expect(within(execution).getByText(/semantic chunks without losing context/i)).toBeInTheDocument();

    expect(intro.compareDocumentPosition(architecture) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(architecture.compareDocumentPosition(techStack) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(techStack.compareDocumentPosition(execution) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
