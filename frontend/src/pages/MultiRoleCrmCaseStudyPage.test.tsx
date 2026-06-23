import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import MultiRoleCrmCaseStudyPage from "./MultiRoleCrmCaseStudyPage";
import { MULTI_ROLE_CRM_CASE_STUDY_COPY } from "../lib/multiRoleCrmCaseStudyContent";
import { ROUTES } from "../lib/routes";

describe("MultiRoleCrmCaseStudyPage", () => {
  it("renders the centered grid intro and enterprise AI deep-dive sections", () => {
    render(
      <MemoryRouter>
        <MultiRoleCrmCaseStudyPage />
      </MemoryRouter>,
    );

    const page = screen.getByTestId("multi-role-crm-case-study-page");
    expect(page).toBeInTheDocument();
    expect(page).toHaveClass("multi-role-crm-case-study-page");

    const intro = screen.getByTestId("multi-role-crm-case-study-intro");
    expect(intro).toHaveClass("multi-role-crm-case-study-intro", "band-breakout");
    expect(within(intro).getByText(MULTI_ROLE_CRM_CASE_STUDY_COPY.kicker)).toBeInTheDocument();
    expect(within(intro).getByRole("heading", { level: 1, name: "AI-Powered Multi-Role CRM" })).toBeInTheDocument();
    expect(intro.querySelector(".multi-role-crm-case-study-intro-stage")).toBeTruthy();
    const heroImage = within(intro).getByRole("img", { name: MULTI_ROLE_CRM_CASE_STUDY_COPY.heroImage.alt });
    expect(heroImage).toHaveAttribute("src", MULTI_ROLE_CRM_CASE_STUDY_COPY.heroImage.src);
    expect(heroImage).toHaveAttribute("width", "512");
    expect(heroImage).toHaveAttribute("height", "503");
    expect(screen.queryByRole("link", { name: /Live Demo/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Technical Docs" })).not.toBeInTheDocument();

    const vision = screen.getByTestId("multi-role-crm-case-study-vision");
    expect(intro.compareDocumentPosition(vision) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(vision.querySelector(".multi-role-crm-case-study-vision-layout")).toBeTruthy();
    expect(within(vision).getByRole("heading", { name: "The Vision" })).toBeInTheDocument();
    expect(within(vision).getByText(/Retrieval-Augmented Generation/i)).toBeInTheDocument();
    expect(within(vision).getByText("Challenge")).toBeInTheDocument();
    expect(within(vision).getByText("Solution")).toBeInTheDocument();
    expect(within(vision).getByText(/Fragmented data access/i)).toBeInTheDocument();
    expect(within(vision).getByText(/institutional knowledge/i)).toBeInTheDocument();

    const techStack = within(vision).getByTestId("multi-role-crm-case-study-tech-stack");
    expect(screen.queryByRole("heading", { name: "Tech Stack" })).not.toBeInTheDocument();
    expect(within(techStack).getByText("React")).toBeInTheDocument();
    expect(within(techStack).getByText("PostgreSQL")).toBeInTheDocument();
    expect(within(techStack).getByText("Node.js")).toBeInTheDocument();
    expect(within(techStack).getByText("Generative AI")).toBeInTheDocument();
    expect(within(techStack).getByText("Frontend")).toBeInTheDocument();
    expect(within(techStack).getByText("LLM & RAG Integration")).toBeInTheDocument();
    expect(techStack.querySelector(".multi-role-crm-case-study-tech-stack-item--highlight")).toBeTruthy();
    expect(techStack.querySelectorAll(".multi-role-crm-case-study-tech-stack-item--wide")).toHaveLength(2);

    const architecture = screen.getByTestId("multi-role-crm-case-study-architecture");
    expect(vision.compareDocumentPosition(architecture) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(architecture.querySelector(".multi-role-crm-case-study-architecture-header")).toBeTruthy();
    expect(within(architecture).getByRole("heading", { name: "Architectural Excellence" })).toBeInTheDocument();
    expect(within(architecture).getByText(/high-density enterprise/i)).toBeInTheDocument();
    expect(within(architecture).getByLabelText("Enterprise Security")).toBeInTheDocument();
    expect(within(architecture).getByLabelText("Cloud-Native Scale")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Core Features" })).not.toBeInTheDocument();

    const features = within(architecture).getByTestId("multi-role-crm-case-study-features");
    expect(features).toHaveClass("multi-role-crm-case-study-feature-grid");
    expect(within(features).getByRole("heading", { name: "Multi-role RBAC" })).toBeInTheDocument();
    expect(within(features).getByRole("heading", { name: "RAG Chatbot" })).toBeInTheDocument();
    expect(within(features).getByRole("heading", { name: "Real-time Sync" })).toBeInTheDocument();
    expect(within(features).getByRole("heading", { name: "Smart Analytics" })).toBeInTheDocument();
    expect(within(features).getByText(/WebSocket-driven query updates/i)).toBeInTheDocument();

    const cta = screen.getByTestId("multi-role-crm-case-study-bottom-cta");
    expect(within(cta).getByRole("heading", { name: "Ready to build?" })).toBeInTheDocument();
    expect(within(cta).getByText(/enterprise-grade AI/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Get Started" })).toHaveAttribute("href", ROUTES.contact);
    expect(within(cta).queryByRole("img", { name: /Commiters/i })).not.toBeInTheDocument();
    expect(screen.queryByText("Join 50+ companies scaling with AI")).not.toBeInTheDocument();
  });
});
