import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import NextSaasCaseStudyPage from "./NextSaasCaseStudyPage";

describe("NextSaasCaseStudyPage", () => {
  it("follows the demo text arrangement with live BrowseMyVacation data", () => {
    render(
      <MemoryRouter>
        <NextSaasCaseStudyPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Closer to the right trip." })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Explore the project/i })[0]).toHaveAttribute(
      "href",
      "https://browsemyvacations.com/",
    );
    const images = screen.getAllByRole("img");
    expect(images.map((image) => image.getAttribute("src"))).not.toContain("/assets/case-studies/browse-my-vacation-hero.png");
    expect(screen.getByRole("heading", { name: "Problem" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Solution" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "USP of the project" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tech stack used" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Outcome" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Live demo" })).toBeInTheDocument();
  });
});
