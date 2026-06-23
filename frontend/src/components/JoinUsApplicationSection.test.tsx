import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import JoinUsApplicationSection from "./JoinUsApplicationSection";
import { JOIN_US_PAGE_COPY } from "../lib/joinUsPageContent";
import { JOIN_US_POSITION_DEFAULT, JOIN_US_POSITION_OPTIONS } from "../lib/joinUsPositions";
import { ROUTES } from "../lib/routes";

const createJobApplication = vi.fn();
const navigate = vi.fn();

vi.mock("../lib/api", () => ({
  createJobApplication: (...args: unknown[]) => createJobApplication(...args),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

describe("JoinUsApplicationSection", () => {
  beforeEach(() => {
    createJobApplication.mockReset();
    createJobApplication.mockResolvedValue({ ok: true });
    navigate.mockReset();
  });

  it("renders the Stitch numbered application form with position dropdown", () => {
    render(
      <MemoryRouter>
        <JoinUsApplicationSection />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("join-us-form-section-personal")).toBeInTheDocument();
    expect(screen.getByTestId("join-us-form-section-digital")).toBeInTheDocument();
    expect(screen.getByTestId("join-us-form-section-credentials")).toBeInTheDocument();
    expect(screen.getByTestId("join-us-form-section-core")).toBeInTheDocument();
    expect(screen.getByText(JOIN_US_PAGE_COPY.sections.personal.number)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: JOIN_US_PAGE_COPY.sections.personal.title })).toBeInTheDocument();
    expect(screen.getByText(JOIN_US_PAGE_COPY.sections.digital.number)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: JOIN_US_PAGE_COPY.sections.digital.title })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: JOIN_US_PAGE_COPY.sections.credentials.title })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: JOIN_US_PAGE_COPY.sections.core.title })).toBeInTheDocument();
    expect(screen.getByLabelText(JOIN_US_PAGE_COPY.fields.nameLabel)).toHaveAttribute("placeholder", JOIN_US_PAGE_COPY.fields.namePlaceholder);
    expect(screen.getByLabelText(JOIN_US_PAGE_COPY.fields.phoneLabel)).toHaveAttribute("placeholder", JOIN_US_PAGE_COPY.fields.phonePlaceholder);
    for (const position of JOIN_US_POSITION_OPTIONS) {
      expect(screen.getByRole("option", { name: position })).toBeInTheDocument();
    }
    expect(screen.getByRole("option", { name: JOIN_US_POSITION_DEFAULT })).toBeInTheDocument();
    expect(screen.getByLabelText(JOIN_US_PAGE_COPY.fields.linkedinLabel)).toHaveAttribute(
      "placeholder",
      JOIN_US_PAGE_COPY.fields.linkedinPlaceholder,
    );
    const linkedinInput = screen.getByLabelText(JOIN_US_PAGE_COPY.fields.linkedinLabel);
    const portfolioInput = screen.getByLabelText(JOIN_US_PAGE_COPY.fields.portfolioLabel);
    expect(
      linkedinInput.compareDocumentPosition(portfolioInput) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(screen.getByTestId("join-us-form-section-digital")).not.toContainElement(
      screen.getByTestId("join-us-form-section-digital").querySelector(".join-us-form-row"),
    );
    const phoneInput = screen.getByLabelText(JOIN_US_PAGE_COPY.fields.phoneLabel);
    const positionSelect = screen.getByLabelText(JOIN_US_PAGE_COPY.fields.positionLabel);
    expect(
      phoneInput.compareDocumentPosition(positionSelect) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(phoneInput.closest(".join-us-form-field-short")).toBeTruthy();
    expect(positionSelect.closest(".join-us-form-field-short")).toBeTruthy();
    expect(screen.getByTestId("join-us-form-section-personal").querySelector(".join-us-form-row-short")).toBeNull();
    expect(screen.getByText(JOIN_US_PAGE_COPY.fields.resumeLabel)).toBeInTheDocument();
    expect(screen.getByText(JOIN_US_PAGE_COPY.fields.resumeHelp)).toBeInTheDocument();
    expect(screen.getByLabelText(JOIN_US_PAGE_COPY.fields.coverLetterLabel)).toHaveAttribute(
      "placeholder",
      JOIN_US_PAGE_COPY.fields.coverLetterPlaceholder,
    );
    expect(screen.getByText(JOIN_US_PAGE_COPY.privacyDisclaimer)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit Application/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit Application/i }).querySelector("svg")).toBeTruthy();
  });

  it("submits the application with Stitch form fields, resume PDF, and cover letter", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <JoinUsApplicationSection />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(JOIN_US_PAGE_COPY.fields.nameLabel), "Jane Doe");
    await user.type(screen.getByLabelText(JOIN_US_PAGE_COPY.fields.emailLabel), "jane@example.com");
    await user.type(screen.getByLabelText(JOIN_US_PAGE_COPY.fields.phoneLabel), "+91 98765 43210");
    await user.selectOptions(screen.getByLabelText(JOIN_US_PAGE_COPY.fields.positionLabel), "AI Engineer");
    await user.type(
      screen.getByLabelText(JOIN_US_PAGE_COPY.fields.linkedinLabel),
      "https://linkedin.com/in/jane",
    );
    await user.type(
      screen.getByLabelText(JOIN_US_PAGE_COPY.fields.portfolioLabel),
      "https://github.com/jane",
    );
    const resume = new File(["%PDF-1.4"], "jane-resume.pdf", { type: "application/pdf" });
    await user.upload(screen.getByTestId("join-us-resume-input"), resume);
    await user.type(
      screen.getByLabelText(JOIN_US_PAGE_COPY.fields.coverLetterLabel),
      "I build reliable systems and want to join Commiters.",
    );
    await user.click(screen.getByRole("button", { name: /Submit Application/i }));

    expect(createJobApplication).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Jane Doe",
        email: "jane@example.com",
        phone: "+91 98765 43210",
        positionAppliedFor: "AI Engineer",
        linkedinProfile: "https://linkedin.com/in/jane",
        portfolioGitHub: "https://github.com/jane",
        coverLetter: "I build reliable systems and want to join Commiters.",
        resumeFileName: "jane-resume.pdf",
        resumePdfBase64: expect.any(String),
      }),
    );
    expect(navigate).toHaveBeenCalledWith(ROUTES.thankYou, { state: { submissionView: "candidate" } });
  });
});
