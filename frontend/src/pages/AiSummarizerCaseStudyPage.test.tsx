import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import AiSummarizerCaseStudyPage from "./AiSummarizerCaseStudyPage";
import { AI_SUMMARIZER_CASE_STUDY_COPY } from "../lib/aiSummarizerCaseStudyContent";
import { ROUTES } from "../lib/routes";

describe("AiSummarizerCaseStudyPage", () => {
  it("renders the compact introduction, architecture, tech stack, and CTA sections", () => {
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
    expect(within(intro).getByText("Document AI")).toBeInTheDocument();
    expect(within(intro).getByText("MCP", { exact: true })).toBeInTheDocument();
    expect(within(intro).getByText("Google Cloud", { exact: true })).toBeInTheDocument();
    expect(within(intro).getByText("DURATION")).toBeInTheDocument();
    expect(within(intro).getByText("STACK")).toBeInTheDocument();
    expect(within(intro).getByText("INDUSTRY")).toBeInTheDocument();

    const architecture = screen.getByTestId("ai-summarizer-case-study-architecture");
    expect(within(architecture).getByRole("heading", { name: "Core Architecture" })).toBeInTheDocument();
    expect(within(architecture).getByRole("heading", { name: "Ingestion & Processing" })).toBeInTheDocument();
    expect(within(architecture).getByRole("heading", { name: "Governance & Security" })).toBeInTheDocument();
    expect(within(architecture).getByRole("heading", { name: "Optimization" })).toBeInTheDocument();

    const techStack = screen.getByTestId("ai-summarizer-case-study-tech-stack");
    expect(within(techStack).getByRole("heading", { name: "Tech Stack" })).toBeInTheDocument();
    expect(within(techStack).getByText("Python 3.11")).toBeInTheDocument();
    expect(within(techStack).getByText("MCP Protocol")).toBeInTheDocument();
    expect(within(techStack).getByText("Google Cloud Run / Vertex AI")).toBeInTheDocument();
    expect(within(techStack).getByText("Pydantic / FastAPI")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "VIEW DOCUMENTATION" })).not.toBeInTheDocument();
    expect(screen.queryByTestId("ai-summarizer-case-study-execution")).not.toBeInTheDocument();

    const bottomCta = screen.getByTestId("ai-summarizer-case-study-bottom-cta");
    expect(within(bottomCta).getByRole("heading", { name: "Turning documents into trusted intelligence" })).toBeInTheDocument();
    expect(within(bottomCta).getByRole("link", { name: "View Full Case Study" })).toHaveAttribute(
      "href",
      ROUTES.aiSolutions,
    );

    expect(intro.compareDocumentPosition(architecture) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(architecture.compareDocumentPosition(techStack) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(techStack.compareDocumentPosition(bottomCta) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
