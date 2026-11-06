import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import NearDropCaseStudyPage from "./NearDropCaseStudyPage";
import { ROUTES } from "../lib/routes";
import { WORK_CASE_STUDY_FINAL_CTA } from "../lib/workCaseStudy";

describe("NearDropCaseStudyPage", () => {
  it("uses the NearDrop demo copy and section arrangement", () => {
    render(
      <MemoryRouter>
        <NearDropCaseStudyPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("neardrop-case-study-page")).toHaveClass("work-case-study");
    expect(screen.getByRole("heading", { level: 1, name: "A field product, presented with intent." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Project overview" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Problem" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Solution" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "USP of the project" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tech stack used" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Outcome" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: "Easy discovery" })[0]).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Live demo" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Read the study/i })).toHaveAttribute("href", "#wcs-overview");
    expect(screen.getAllByRole("link", { name: /Start a similar brief/i })[0]).toHaveAttribute("href", ROUTES.contact);
    expect(screen.getByRole("heading", { name: WORK_CASE_STUDY_FINAL_CTA.title })).toBeInTheDocument();
    expect(within(screen.getByTestId("work-case-study-related")).getByRole("link", { name: /BrowseMyVacation/i })).toHaveAttribute(
      "href",
      ROUTES.browseMyVacationCaseStudy,
    );
  });
});
