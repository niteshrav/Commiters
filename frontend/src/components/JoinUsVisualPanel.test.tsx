import { render, screen } from "@testing-library/react";
import JoinUsVisualPanel from "./JoinUsVisualPanel";

describe("JoinUsVisualPanel", () => {
  it("renders a blank right-side panel without an image", () => {
    render(<JoinUsVisualPanel />);

    expect(screen.getByTestId("join-us-visual-panel")).toBeInTheDocument();
    expect(screen.queryByTestId("join-us-visual-panel-image")).not.toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
