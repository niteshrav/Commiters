import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WorkflowAutomationPage from "./WorkflowAutomationPage";
import { WORKFLOW_AUTOMATION_HERO, WORKFLOW_AUTOMATION_SEO } from "../lib/workflowAutomationPageContent";

describe("WorkflowAutomationPage", () => {
  it("renders the workflow automation landing with product SEO", () => {
    render(
      <MemoryRouter>
        <WorkflowAutomationPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("workflow-automation-page")).toBeInTheDocument();
    expect(screen.getByTestId("workflow-automation-section")).toBeInTheDocument();
    expect(document.title).toBe(WORKFLOW_AUTOMATION_SEO.title);
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      WORKFLOW_AUTOMATION_SEO.description,
    );
    expect(screen.getByRole("heading", { name: WORKFLOW_AUTOMATION_HERO.headline, level: 1 })).toBeInTheDocument();
  });
});
