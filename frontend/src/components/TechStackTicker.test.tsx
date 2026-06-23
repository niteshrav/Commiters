import { render, screen, within } from "@testing-library/react";
import { TECH_LOCAL_ICONS } from "../lib/homeTechStack";
import TechStackTicker from "./TechStackTicker";

describe("TechStackTicker", () => {
  it("renders a viewport with an animated track and duplicated logo strip", () => {
    render(<TechStackTicker />);

    const root = screen.getByTestId("home-tech-ticker");
    expect(root.querySelector(".home-tech-ticker-track")).toBeTruthy();
    expect(root.querySelectorAll("img")).toHaveLength(34);
    expect(within(root).getAllByAltText("React")).toHaveLength(1);
  });

  it("loads bundled Cursor and Visual Studio logos in full color", () => {
    render(<TechStackTicker />);
    expect(screen.getByAltText("Cursor")).toHaveAttribute("src", TECH_LOCAL_ICONS.cursor);
    expect(screen.getByAltText("Visual Studio")).toHaveAttribute("src", TECH_LOCAL_ICONS.visualStudio);
    expect(screen.getByAltText("Cursor")).toHaveClass("home-tech-logo-img");
  });
});
