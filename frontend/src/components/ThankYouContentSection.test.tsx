import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ThankYouContentSection from "./ThankYouContentSection";
import { ROUTES } from "../lib/routes";
import { THANK_YOU_PAGE_COPY } from "../lib/thankYouPageContent";
import {
  THANK_YOU_ACTIONS_CLASS,
  THANK_YOU_CONTENT_CLASS,
  THANK_YOU_MESSAGE_CLASS,
  THANK_YOU_SUCCESS_ICON_CLASS,
  THANK_YOU_TITLE_CLASS,
} from "../lib/thankYouPageLayout";

describe("ThankYouContentSection", () => {
  it("shows the client message by default and hides the view toggle controls", () => {
    render(
      <MemoryRouter>
        <ThankYouContentSection />
      </MemoryRouter>,
    );

    const section = screen.getByTestId("thank-you-content");
    expect(section).toHaveClass(THANK_YOU_CONTENT_CLASS);
    expect(within(section).getByTestId(THANK_YOU_SUCCESS_ICON_CLASS)).toBeInTheDocument();
    expect(within(section).getByRole("heading", { level: 1, name: THANK_YOU_PAGE_COPY.title })).toHaveClass(
      THANK_YOU_TITLE_CLASS,
    );
    expect(within(section).getByText(THANK_YOU_PAGE_COPY.clientBody)).toHaveClass(THANK_YOU_MESSAGE_CLASS);
    expect(screen.queryByRole("button", { name: /Client View/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Candidate View/i })).not.toBeInTheDocument();
    expect(screen.queryByTestId("thank-you-view-toggle")).not.toBeInTheDocument();
  });

  it("shows the client message when a contact submission redirects here", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: ROUTES.thankYou, state: { submissionView: "client" } }]}>
        <ThankYouContentSection />
      </MemoryRouter>,
    );

    expect(screen.getByText(THANK_YOU_PAGE_COPY.clientBody)).toBeInTheDocument();
    expect(screen.queryByText(THANK_YOU_PAGE_COPY.candidateBody)).not.toBeInTheDocument();
  });

  it("shows the candidate message when a join-us application redirects here", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: ROUTES.thankYou, state: { submissionView: "candidate" } }]}>
        <ThankYouContentSection />
      </MemoryRouter>,
    );

    expect(screen.getByText(THANK_YOU_PAGE_COPY.candidateBody)).toBeInTheDocument();
    expect(screen.queryByText(THANK_YOU_PAGE_COPY.clientBody)).not.toBeInTheDocument();
  });

  it("exposes the Stitch primary and secondary actions", () => {
    render(
      <MemoryRouter>
        <ThankYouContentSection />
      </MemoryRouter>,
    );

    const actions = screen.getByTestId("thank-you-actions");
    expect(actions).toHaveClass(THANK_YOU_ACTIONS_CLASS);
    expect(within(actions).getByRole("link", { name: /Back to Home/i })).toHaveAttribute(
      "href",
      ROUTES.home,
    );
    expect(within(actions).getByRole("link", { name: /View Project Ledger/i })).toHaveAttribute(
      "href",
      ROUTES.caseStudies,
    );
  });
});
