import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PortfolioProjectCard from "./PortfolioProjectCard";
import { HOME_PORTFOLIO_PROJECTS } from "../lib/siteTrustContent";

describe("PortfolioProjectCard", () => {
  it("renders a visual header, tech stack line, and CTA from portfolio data", () => {
    const project = HOME_PORTFOLIO_PROJECTS[1];
    render(
      <MemoryRouter>
        <PortfolioProjectCard project={project} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: project.title })).toBeInTheDocument();
    expect(screen.getByText(project.techStack)).toHaveClass("home-portfolio-tech");
    expect(screen.getByText(project.tag)).toHaveClass("portfolio-tag--on-visual");
    expect(document.querySelector(".home-portfolio-visual--navy")).toBeTruthy();
    expect(screen.getByRole("link", { name: project.ctaLabel })).toHaveAttribute("href", "/contact");
  });
});
