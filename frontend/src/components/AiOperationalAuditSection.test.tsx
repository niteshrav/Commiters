import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AiOperationalAuditSection from "./AiOperationalAuditSection";
import { AI_OPERATIONAL_AUDIT_PERSONAL_EMAIL_ERROR } from "../lib/aiOperationalAuditLeadGate";
import {
  AI_OPERATIONAL_AUDIT_CTA_LABEL,
  AI_OPERATIONAL_AUDIT_DELIVERABLES,
  AI_OPERATIONAL_AUDIT_FORM,
  AI_OPERATIONAL_AUDIT_HERO,
  AI_OPERATIONAL_AUDIT_PRICING,
  AI_OPERATIONAL_AUDIT_PROCESS,
} from "../lib/aiOperationalAuditPageContent";
import { FROSTED_GLASS_CLASSES } from "../lib/frostedGlass";
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

describe("AiOperationalAuditSection", () => {
  beforeEach(() => {
    createLead.mockReset();
    createLead.mockResolvedValue({ ok: true });
    navigate.mockReset();
  });

  it("renders hero, pricing, three deliverable cards, two-week process, and booking form", () => {
    render(
      <MemoryRouter>
        <AiOperationalAuditSection />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("ai-operational-audit-section")).toBeInTheDocument();
    expect(screen.getByText(AI_OPERATIONAL_AUDIT_HERO.eyebrow)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: AI_OPERATIONAL_AUDIT_HERO.headline, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(AI_OPERATIONAL_AUDIT_HERO.subheadline)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: AI_OPERATIONAL_AUDIT_CTA_LABEL })).toHaveAttribute("href", "#audit-booking");

    const pricing = screen.getByTestId("audit-pricing");
    expect(pricing).toHaveClass(...FROSTED_GLASS_CLASSES);
    expect(screen.getByRole("heading", { name: AI_OPERATIONAL_AUDIT_PRICING.title, level: 2 })).toBeInTheDocument();
    expect(pricing).toHaveTextContent(AI_OPERATIONAL_AUDIT_PRICING.range);
    expect(pricing).toHaveTextContent(AI_OPERATIONAL_AUDIT_PRICING.summary);

    for (const card of AI_OPERATIONAL_AUDIT_DELIVERABLES) {
      expect(screen.getByRole("heading", { name: card.title, level: 2 })).toBeInTheDocument();
      expect(screen.getByText(card.body)).toBeInTheDocument();
    }
    expect(screen.getByTestId("audit-deliverables")).toHaveClass("audit-cards");

    for (const step of AI_OPERATIONAL_AUDIT_PROCESS) {
      expect(screen.getByText(step.week)).toBeInTheDocument();
      expect(screen.getByText(step.body)).toBeInTheDocument();
    }

    expect(screen.getByLabelText(AI_OPERATIONAL_AUDIT_FORM.nameLabel)).toBeRequired();
    expect(screen.getByLabelText(AI_OPERATIONAL_AUDIT_FORM.emailLabel)).toHaveAttribute(
      "placeholder",
      AI_OPERATIONAL_AUDIT_FORM.emailPlaceholder,
    );
    expect(screen.getByLabelText(AI_OPERATIONAL_AUDIT_FORM.companyLabel)).toBeRequired();
    expect(screen.getByLabelText(AI_OPERATIONAL_AUDIT_FORM.bottleneckLabel)).toBeRequired();
    expect(screen.getByRole("button", { name: AI_OPERATIONAL_AUDIT_FORM.submitLabel })).toBeInTheDocument();
  });

  it("blocks personal email domains before submitting", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AiOperationalAuditSection />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(AI_OPERATIONAL_AUDIT_FORM.nameLabel), "Nitesh");
    await user.type(screen.getByLabelText(AI_OPERATIONAL_AUDIT_FORM.emailLabel), "ops@gmail.com");
    await user.type(screen.getByLabelText(AI_OPERATIONAL_AUDIT_FORM.companyLabel), "Commiters");
    await user.type(screen.getByLabelText(AI_OPERATIONAL_AUDIT_FORM.bottleneckLabel), "Manual invoice matching");
    await user.click(screen.getByRole("button", { name: AI_OPERATIONAL_AUDIT_FORM.submitLabel }));

    expect(screen.getByRole("alert")).toHaveTextContent(AI_OPERATIONAL_AUDIT_PERSONAL_EMAIL_ERROR);
    expect(createLead).not.toHaveBeenCalled();
  });

  it("submits a valid booking and routes to thank you", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AiOperationalAuditSection />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(AI_OPERATIONAL_AUDIT_FORM.nameLabel), "Nitesh Rav");
    await user.type(screen.getByLabelText(AI_OPERATIONAL_AUDIT_FORM.emailLabel), "hello@commiters.com");
    await user.type(screen.getByLabelText(AI_OPERATIONAL_AUDIT_FORM.companyLabel), "Commiters Softwares");
    await user.type(
      screen.getByLabelText(AI_OPERATIONAL_AUDIT_FORM.bottleneckLabel),
      "GST invoice matching across three spreadsheets.",
    );
    await user.click(screen.getByRole("button", { name: AI_OPERATIONAL_AUDIT_FORM.submitLabel }));

    expect(createLead).toHaveBeenCalledWith({
      name: "Nitesh Rav",
      email: "hello@commiters.com",
      serviceNeeded: "AI Operational Audit",
      budgetRange: AI_OPERATIONAL_AUDIT_FORM.budgetRange,
      timeline: "2-week diagnostic",
      message: expect.stringContaining("GST invoice matching across three spreadsheets."),
    });
    expect(navigate).toHaveBeenCalledWith(ROUTES.thankYou, { state: { submissionView: "client" } });
  });
});
