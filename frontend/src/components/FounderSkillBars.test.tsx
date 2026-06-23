import { render, screen } from "@testing-library/react";
import FounderSkillBars from "./FounderSkillBars";
import { FOUNDER_SKILL_BARS } from "../lib/siteTrustContent";

describe("FounderSkillBars", () => {
  it("renders labeled progress bars for core stack skills", () => {
    render(<FounderSkillBars skills={FOUNDER_SKILL_BARS} />);

    expect(screen.getByTestId("founder-skill-bars")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("95%")).toBeInTheDocument();
    expect(document.querySelectorAll(".founder-skill-bar-fill")).toHaveLength(4);
  });
});
