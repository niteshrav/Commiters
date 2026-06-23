import { render, screen } from "@testing-library/react";
import JoinUsIntroSection from "./JoinUsIntroSection";
import { JOIN_US_PAGE_COPY } from "../lib/joinUsPageContent";

describe("JoinUsIntroSection", () => {
  it("renders the Stitch Join Us intro band", () => {
    render(<JoinUsIntroSection />);

    expect(screen.getByTestId("join-us-intro-section")).toBeInTheDocument();
    expect(screen.getByText(JOIN_US_PAGE_COPY.intro.kicker)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: JOIN_US_PAGE_COPY.intro.title })).toBeInTheDocument();
    expect(screen.getByText(JOIN_US_PAGE_COPY.intro.subtext)).toBeInTheDocument();
  });
});
