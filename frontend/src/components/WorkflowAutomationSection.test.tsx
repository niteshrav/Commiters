import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import WorkflowAutomationSection from "./WorkflowAutomationSection";
import { AI_OPERATIONAL_AUDIT_PERSONAL_EMAIL_ERROR } from "../lib/aiOperationalAuditLeadGate";
import {
  WORKFLOW_AUTOMATION_CTA_LABEL,
  WORKFLOW_AUTOMATION_FORM,
  WORKFLOW_AUTOMATION_HERO,
  WORKFLOW_AUTOMATION_PIPELINE,
  WORKFLOW_AUTOMATION_SOLUTIONS,
} from "../lib/workflowAutomationPageContent";
import { ROUTES } from "../lib/routes";

const createLead = vi.fn();
const navigate = vi.fn();

vi.mock("../lib/api", () => ({
  createLead: (...args: unknown[]) => createLead(...args),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

describe("WorkflowAutomationSection", () => {
  beforeEach(() => {
    createLead.mockReset();
    createLead.mockResolvedValue({ ok: true });
    navigate.mockReset();
  });

  it("renders hero, solutions, pipeline diagram, and audit booking form", () => {
    render(
      <MemoryRouter>
        <WorkflowAutomationSection />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("workflow-automation-section")).toBeInTheDocument();
    expect(screen.getByText(WORKFLOW_AUTOMATION_HERO.eyebrow)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: WORKFLOW_AUTOMATION_HERO.headline, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(WORKFLOW_AUTOMATION_HERO.subheadline)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: WORKFLOW_AUTOMATION_CTA_LABEL })).toHaveAttribute("href", "#workflow-audit");

    const solutions = screen.getByTestId("workflow-automation-solutions");
    expect(solutions).toHaveClass("wflow-solutions");
    for (const card of WORKFLOW_AUTOMATION_SOLUTIONS) {
      expect(screen.getByRole("heading", { name: card.title, level: 2 })).toBeInTheDocument();
      expect(screen.getByText(card.body)).toBeInTheDocument();
    }

    const pipeline = screen.getByTestId("workflow-automation-pipeline");
    expect(pipeline).toHaveClass("wflow-pipeline");
    expect(
      within(pipeline)
        .getAllByRole("listitem")
        .map((item) => item.textContent?.replace(/\s+/g, " ").trim()),
    ).toEqual(WORKFLOW_AUTOMATION_PIPELINE.map((step) => step.title));

    expect(screen.getByRole("heading", { name: WORKFLOW_AUTOMATION_FORM.title, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: WORKFLOW_AUTOMATION_FORM.auditLinkLabel })).toHaveAttribute(
      "href",
      ROUTES.aiOperationalAudit,
    );
    expect(screen.getByLabelText(WORKFLOW_AUTOMATION_FORM.nameLabel)).toBeRequired();
    expect(screen.getByLabelText(WORKFLOW_AUTOMATION_FORM.emailLabel)).toHaveAttribute(
      "placeholder",
      WORKFLOW_AUTOMATION_FORM.emailPlaceholder,
    );
    expect(screen.getByLabelText(WORKFLOW_AUTOMATION_FORM.companyLabel)).toBeRequired();
    expect(screen.getByLabelText(WORKFLOW_AUTOMATION_FORM.bottleneckLabel)).toBeRequired();
    expect(screen.getByRole("button", { name: WORKFLOW_AUTOMATION_FORM.submitLabel })).toBeInTheDocument();
  });

  it("blocks personal email domains before submitting", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <WorkflowAutomationSection />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(WORKFLOW_AUTOMATION_FORM.nameLabel), "Nitesh");
    await user.type(screen.getByLabelText(WORKFLOW_AUTOMATION_FORM.emailLabel), "ops@gmail.com");
    await user.type(screen.getByLabelText(WORKFLOW_AUTOMATION_FORM.companyLabel), "Commiters");
    await user.type(screen.getByLabelText(WORKFLOW_AUTOMATION_FORM.bottleneckLabel), "Copy-pasting invoices into Tally");
    await user.click(screen.getByRole("button", { name: WORKFLOW_AUTOMATION_FORM.submitLabel }));

    expect(screen.getByRole("alert")).toHaveTextContent(AI_OPERATIONAL_AUDIT_PERSONAL_EMAIL_ERROR);
    expect(createLead).not.toHaveBeenCalled();
  });

  it("submits a valid audit booking and routes to thank you", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <WorkflowAutomationSection />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(WORKFLOW_AUTOMATION_FORM.nameLabel), "Nitesh Rav");
    await user.type(screen.getByLabelText(WORKFLOW_AUTOMATION_FORM.emailLabel), "hello@commiters.com");
    await user.type(screen.getByLabelText(WORKFLOW_AUTOMATION_FORM.companyLabel), "Commiters Softwares");
    await user.type(
      screen.getByLabelText(WORKFLOW_AUTOMATION_FORM.bottleneckLabel),
      "WhatsApp order updates are sent by hand every evening.",
    );
    await user.click(screen.getByRole("button", { name: WORKFLOW_AUTOMATION_FORM.submitLabel }));

    expect(createLead).toHaveBeenCalledWith({
      name: "Nitesh Rav",
      email: "hello@commiters.com",
      serviceNeeded: "AI Operational Audit (2-Week Blueprint)",
      budgetRange: WORKFLOW_AUTOMATION_FORM.budgetRange,
      timeline: "2-week diagnostic",
      message: expect.stringContaining("WhatsApp order updates are sent by hand every evening."),
    });
    expect(navigate).toHaveBeenCalledWith(ROUTES.thankYou, { state: { submissionView: "client" } });
  });
});
