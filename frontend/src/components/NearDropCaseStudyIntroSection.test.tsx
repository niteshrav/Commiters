import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { NEARDROP_CASE_STUDY_COPY } from "../lib/neardropCaseStudyContent";
import { ROUTES } from "../lib/routes";
import { SITE_GITHUB_URL } from "../lib/siteLinks";
import NearDropCaseStudyIntroSection from "./NearDropCaseStudyIntroSection";

describe("NearDropCaseStudyIntroSection", () => {
  it("renders the split hero with tech chips and device mockup", () => {
    render(
      <MemoryRouter>
        <NearDropCaseStudyIntroSection />
      </MemoryRouter>,
    );

    const intro = screen.getByTestId("neardrop-case-study-intro");
    expect(intro).toHaveClass("neardrop-case-study-intro");
    expect(within(intro).getByText(NEARDROP_CASE_STUDY_COPY.kicker)).toBeInTheDocument();
    expect(
      within(intro).getByRole("heading", {
        level: 1,
        name: `${NEARDROP_CASE_STUDY_COPY.titleLead}${NEARDROP_CASE_STUDY_COPY.titleAccent}${NEARDROP_CASE_STUDY_COPY.titleTrail}`,
      }),
    ).toBeInTheDocument();
    expect(intro.querySelector(".neardrop-case-study-title-accent")).toHaveTextContent(
      NEARDROP_CASE_STUDY_COPY.titleAccent,
    );
    expect(within(intro).getByText(NEARDROP_CASE_STUDY_COPY.description)).toBeInTheDocument();
    const stack = within(intro).getByTestId("neardrop-case-study-intro-stack");
    expect(within(stack).getByText("React")).toBeInTheDocument();
    expect(within(stack).getByText("WebSockets")).toBeInTheDocument();
    expect(within(intro).getByRole("link", { name: /View Project/i })).toHaveAttribute("href", ROUTES.contact);
    expect(within(intro).getByRole("link", { name: /Source Code/i })).toHaveAttribute("href", SITE_GITHUB_URL);
    expect(within(intro).getByRole("img", { name: NEARDROP_CASE_STUDY_COPY.heroImage.alt })).toHaveAttribute(
      "src",
      NEARDROP_CASE_STUDY_COPY.heroImage.src,
    );
    expect(screen.queryByTestId("neardrop-case-study-core-stack")).not.toBeInTheDocument();
  });
});
