import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import MultiRoleCrmCaseStudyPage from "./MultiRoleCrmCaseStudyPage";
import { MULTI_ROLE_CRM_CASE_STUDY_COPY, MULTI_ROLE_CRM_LIVE_URL } from "../lib/multiRoleCrmCaseStudyContent";
import { ROUTES } from "../lib/routes";

describe("MultiRoleCrmCaseStudyPage", () => {
  it("follows the demo text arrangement with CRM copy", () => {
    render(
      <MemoryRouter>
        <MultiRoleCrmCaseStudyPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Closer to the customer." })).toBeInTheDocument();
    expect(screen.getByText(MULTI_ROLE_CRM_CASE_STUDY_COPY.subheadline)).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: "Policy-Gated RAG Engine" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Discuss a similar idea/i })[0]).toHaveAttribute("href", ROUTES.contact);
    expect(screen.getAllByRole("link", { name: /Explore the project/i })[0]).toHaveAttribute("href", MULTI_ROLE_CRM_LIVE_URL);
    expect(screen.getAllByRole("link", { name: /Live Demo/i })[0]).toHaveAttribute("href", MULTI_ROLE_CRM_LIVE_URL);
    expect(screen.getByRole("heading", { name: "Problem" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: "Solution" })[0]).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "USP of the project" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tech stack used" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Outcome" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Live demo" })).toBeInTheDocument();
  });
});
