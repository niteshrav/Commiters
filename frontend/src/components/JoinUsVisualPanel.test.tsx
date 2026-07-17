import { render, screen } from "@testing-library/react";
import JoinUsVisualPanel from "./JoinUsVisualPanel";
import { JOIN_US_PAGE_COPY } from "../lib/joinUsPageContent";

describe("JoinUsVisualPanel", () => {
  it("renders the Apply sidebar with precision card, highlights, and office image", () => {
    render(<JoinUsVisualPanel />);

    expect(screen.getByTestId("join-us-sidebar-panel")).toBeInTheDocument();
    expect(screen.getByTestId("join-us-precision-card")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: JOIN_US_PAGE_COPY.sidebar.title, level: 2 })).toBeInTheDocument();
    expect(screen.getByText(JOIN_US_PAGE_COPY.sidebar.body)).toBeInTheDocument();
    expect(screen.getByText(JOIN_US_PAGE_COPY.sidebar.highlights[0].title)).toBeInTheDocument();
    expect(screen.getByText(JOIN_US_PAGE_COPY.sidebar.highlights[1].title)).toBeInTheDocument();
    expect(screen.getByText(JOIN_US_PAGE_COPY.sidebar.applicationsEmailNote)).toBeInTheDocument();
    expect(screen.getByTestId("join-us-visual-panel-image")).toBeInTheDocument();
  });
});
