import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AiSolutionsSection from "./AiSolutionsSection";
import { AI_OPERATIONAL_AUDIT_PERSONAL_EMAIL_ERROR } from "../lib/aiOperationalAuditLeadGate";
import {
  AI_SOLUTIONS_CTA_LABEL,
  AI_SOLUTIONS_FORM,
  AI_SOLUTIONS_HERO,
  AI_SOLUTIONS_OFFERINGS,
  AI_SOLUTIONS_STACK,
} from "../lib/aiSolutionsPageContent";
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

describe("AiSolutionsSection", () => {
  beforeEach(() => {
    createLead.mockReset();
    createLead.mockResolvedValue({ ok: true });
    navigate.mockReset();
  });

  it("renders hero, three offering cards, stack badges, and a scoping form", () => {
    render(
      <MemoryRouter>
        <AiSolutionsSection />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("ai-solutions-section")).toBeInTheDocument();
    expect(screen.getByText(AI_SOLUTIONS_HERO.eyebrow)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: AI_SOLUTIONS_HERO.headline, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(AI_SOLUTIONS_HERO.subheadline)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: AI_SOLUTIONS_CTA_LABEL })).toHaveAttribute("href", "#pipeline-scoping");

    const offerings = screen.getByTestId("ai-solutions-offerings");
    expect(offerings).toHaveClass("aisol-cards");
    for (const card of AI_SOLUTIONS_OFFERINGS) {
      expect(screen.getByRole("heading", { name: card.title, level: 2 })).toBeInTheDocument();
      expect(screen.getByText(card.body)).toBeInTheDocument();
    }

    const stack = screen.getByTestId("ai-solutions-stack");
    for (const item of AI_SOLUTIONS_STACK) {
      expect(stack).toHaveTextContent(item.label);
    }

    expect(screen.getByRole("heading", { name: AI_SOLUTIONS_FORM.title, level: 2 })).toBeInTheDocument();
    expect(screen.getByLabelText(AI_SOLUTIONS_FORM.nameLabel)).toBeRequired();
    expect(screen.getByLabelText(AI_SOLUTIONS_FORM.projectLabel)).toBeRequired();
    expect(screen.getByRole("button", { name: AI_SOLUTIONS_FORM.submitLabel })).toBeInTheDocument();
  });

  it("blocks personal email domains before submitting", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AiSolutionsSection />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(AI_SOLUTIONS_FORM.nameLabel), "Nitesh");
    await user.type(screen.getByLabelText(AI_SOLUTIONS_FORM.emailLabel), "ops@gmail.com");
    await user.type(screen.getByLabelText(AI_SOLUTIONS_FORM.companyLabel), "Commiters");
    await user.type(screen.getByLabelText(AI_SOLUTIONS_FORM.projectLabel), "GST invoice extraction");
    await user.click(screen.getByRole("button", { name: AI_SOLUTIONS_FORM.submitLabel }));

    expect(screen.getByRole("alert")).toHaveTextContent(AI_OPERATIONAL_AUDIT_PERSONAL_EMAIL_ERROR);
    expect(createLead).not.toHaveBeenCalled();
  });

  it("submits a valid scoping request and routes to thank you", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AiSolutionsSection />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(AI_SOLUTIONS_FORM.nameLabel), "Nitesh Rav");
    await user.type(screen.getByLabelText(AI_SOLUTIONS_FORM.emailLabel), "hello@commiters.com");
    await user.type(screen.getByLabelText(AI_SOLUTIONS_FORM.companyLabel), "Commiters Softwares");
    await user.type(screen.getByLabelText(AI_SOLUTIONS_FORM.projectLabel), "PAN and GST invoice parsing into Mongo.");
    await user.click(screen.getByRole("button", { name: AI_SOLUTIONS_FORM.submitLabel }));

    expect(createLead).toHaveBeenCalledWith({
      name: "Nitesh Rav",
      email: "hello@commiters.com",
      serviceNeeded: "Custom AI Pipeline Engineering",
      message: expect.stringContaining("PAN and GST invoice parsing into Mongo."),
    });
    expect(navigate).toHaveBeenCalledWith(ROUTES.thankYou, { state: { submissionView: "client" } });
  });
});
