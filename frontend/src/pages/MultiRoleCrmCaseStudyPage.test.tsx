import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import MultiRoleCrmCaseStudyPage from "./MultiRoleCrmCaseStudyPage";
import { MULTI_ROLE_CRM_CASE_STUDY_COPY } from "../lib/multiRoleCrmCaseStudyContent";
import { ROUTES } from "../lib/routes";

describe("MultiRoleCrmCaseStudyPage", () => {
  it("renders the compact vision, architecture, impact, and CTA sections", () => {
    render(
      <MemoryRouter>
        <MultiRoleCrmCaseStudyPage />
      </MemoryRouter>,
    );

    const page = screen.getByTestId("multi-role-crm-case-study-page");
    expect(page).toBeInTheDocument();
    expect(page).toHaveClass("multi-role-crm-case-study-page");

    const intro = screen.getByTestId("multi-role-crm-case-study-intro");
    expect(intro).toHaveClass("multi-role-crm-case-study-intro");
    expect(within(intro).getByText("CASE STUDY: ENTERPRISE AI")).toBeInTheDocument();
    expect(within(intro).getByRole("heading", { level: 1, name: /AI-Powered/ })).toBeInTheDocument();
    expect(within(intro).getByText("Multi-Role CRM")).toBeInTheDocument();
    expect(within(intro).getByText("Intelligent Operations with RAG & LLMs.")).toBeInTheDocument();
    const heroImage = within(intro).getByRole("img", { name: MULTI_ROLE_CRM_CASE_STUDY_COPY.heroImage.alt });
    expect(heroImage).toHaveAttribute("src", MULTI_ROLE_CRM_CASE_STUDY_COPY.heroImage.src);
    expect(heroImage).toHaveAttribute("width", "512");
    expect(heroImage).toHaveAttribute("height", "503");
    expect(screen.queryByRole("link", { name: /Live Demo/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Technical Docs" })).not.toBeInTheDocument();

    const vision = screen.getByTestId("multi-role-crm-case-study-vision");
    expect(intro.compareDocumentPosition(vision) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(vision.querySelector(".multi-role-crm-case-study-vision-layout")).toBeTruthy();
    expect(within(vision).getByRole("heading", { level: 2, name: "The Vision" })).toBeInTheDocument();
    expect(within(vision).getByText(/LLM and RAG/i)).toBeInTheDocument();
    expect(within(vision).getByText("Challenge")).toBeInTheDocument();
    expect(within(vision).getByText("Solution")).toBeInTheDocument();
    expect(within(vision).getByText(/Fragmented data and slow support queries/i)).toBeInTheDocument();
    expect(within(vision).getByText(/RAG-powered answers/i)).toBeInTheDocument();

    const techStack = within(vision).getByTestId("multi-role-crm-case-study-tech-stack");
    expect(screen.queryByRole("heading", { name: "Tech Stack" })).not.toBeInTheDocument();
    expect(within(techStack).getByText("TECH STACK")).toBeInTheDocument();
    expect(within(techStack).getByText("React")).toBeInTheDocument();
    expect(within(techStack).getByText("PostgreSQL (RLS)")).toBeInTheDocument();
    expect(within(techStack).getByText("Node.js")).toBeInTheDocument();
    expect(within(techStack).getByText("MCP Sockets")).toBeInTheDocument();
    expect(within(techStack).getByText("Frontend")).toBeInTheDocument();
    expect(within(techStack).getByText("Generative AI")).toBeInTheDocument();
    expect(techStack.querySelector(".multi-role-crm-case-study-tech-stack-item--highlight")).toBeTruthy();
    expect(techStack.querySelectorAll(".multi-role-crm-case-study-tech-stack-item--wide")).toHaveLength(2);

    const architecture = screen.getByTestId("multi-role-crm-case-study-architecture");
    expect(vision.compareDocumentPosition(architecture) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(architecture.querySelector(".multi-role-crm-case-study-architecture-header")).toBeTruthy();
    expect(within(architecture).getByRole("heading", { name: "Architectural Excellence" })).toBeInTheDocument();
    expect(within(architecture).getByText(/enterprise environments/i)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Core Features" })).not.toBeInTheDocument();

    const features = within(architecture).getByTestId("multi-role-crm-case-study-features");
    expect(features).toHaveClass("multi-role-crm-case-study-feature-grid");
    expect(within(features).getByRole("heading", { name: "Multi-Role RBAC & RLS" })).toBeInTheDocument();
    expect(within(features).getByRole("heading", { name: "Policy-Gated RAG Engine" })).toBeInTheDocument();
    expect(within(features).getByRole("heading", { name: "Real-Time WebSockets" })).toBeInTheDocument();
    expect(within(features).getByRole("heading", { name: "Smart Analytics" })).toBeInTheDocument();
    expect(within(features).getByText(/Zero-latency sync/i)).toBeInTheDocument();

    const impact = screen.getByTestId("multi-role-crm-case-study-impact");
    expect(architecture.compareDocumentPosition(impact) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(within(impact).getByRole("heading", { name: "Delivered Impact" })).toBeInTheDocument();
    expect(within(impact).getByText("Secure Access")).toBeInTheDocument();
    expect(within(impact).getByText("Real-Time")).toBeInTheDocument();
    expect(within(impact).getByText("AI-Powered")).toBeInTheDocument();
    expect(within(impact).getByText("Role-Based")).toBeInTheDocument();

    const cta = screen.getByTestId("multi-role-crm-case-study-bottom-cta");
    expect(within(cta).getByRole("heading", { name: "Smarter Support. Stronger Security." })).toBeInTheDocument();
    expect(within(cta).getByText(/AI-driven insights/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View Full Case Study/i })).toHaveAttribute(
      "href",
      ROUTES.webApplications,
    );
    expect(within(cta).queryByRole("img", { name: /Commiters/i })).not.toBeInTheDocument();
    expect(screen.queryByText("Join 50+ companies scaling with AI")).not.toBeInTheDocument();
  });
});
