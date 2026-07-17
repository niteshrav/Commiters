import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import JoinUsPage from "./JoinUsPage";
import { JOIN_US_PAGE_COPY } from "../lib/joinUsPageContent";
import { JOIN_US_POSITION_OPTIONS } from "../lib/joinUsPositions";

describe("JoinUsPage", () => {
  it("matches the Apply page structure, sidebar, and application form", () => {
    render(
      <MemoryRouter>
        <JoinUsPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("join-us-page")).toBeInTheDocument();
    expect(screen.getByTestId("join-us-intro-section")).toBeInTheDocument();
    expect(screen.getByTestId("join-us-layout")).toBeInTheDocument();
    expect(screen.getByTestId("join-us-sidebar-panel")).toBeInTheDocument();
    expect(screen.getByTestId("join-us-precision-card")).toBeInTheDocument();
    expect(screen.getByTestId("join-us-application-form")).toBeInTheDocument();
    expect(screen.getByTestId("join-us-visual-panel-image")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(JOIN_US_PAGE_COPY.fields.coverLetterPlaceholder)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit Application/i })).toBeInTheDocument();

    expect(screen.getByText(JOIN_US_PAGE_COPY.intro.kicker)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: JOIN_US_PAGE_COPY.intro.title, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(JOIN_US_PAGE_COPY.intro.subtext)).toBeInTheDocument();
    expect(screen.getByText(JOIN_US_PAGE_COPY.sidebar.applicationsEmailNote)).toBeInTheDocument();

    const layout = screen.getByTestId("join-us-layout");
    expect(layout).toContainElement(screen.getByTestId("join-us-sidebar-panel"));
    expect(layout).toContainElement(screen.getByTestId("join-us-application-form"));

    expect(screen.getByTestId("join-us-form-section-personal")).toBeInTheDocument();
    expect(screen.getByTestId("join-us-form-section-digital")).toBeInTheDocument();
    expect(screen.getByTestId("join-us-form-section-credentials")).toBeInTheDocument();
    expect(screen.getByTestId("join-us-form-section-core")).toBeInTheDocument();
    expect(screen.getByLabelText(JOIN_US_PAGE_COPY.fields.positionLabel)).toBeInTheDocument();
    for (const position of JOIN_US_POSITION_OPTIONS) {
      expect(screen.getByRole("option", { name: position })).toBeInTheDocument();
    }
  });
});
