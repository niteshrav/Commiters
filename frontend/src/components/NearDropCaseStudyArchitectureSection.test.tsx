import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NEARDROP_CASE_STUDY_COPY } from "../lib/neardropCaseStudyContent";
import NearDropCaseStudyArchitectureSection from "./NearDropCaseStudyArchitectureSection";

describe("NearDropCaseStudyArchitectureSection", () => {
  it("renders the four-pillar technical architecture grid", () => {
    render(<NearDropCaseStudyArchitectureSection />);

    const architecture = screen.getByTestId("neardrop-case-study-architecture");
    expect(architecture).toHaveClass("neardrop-case-study-architecture");
    expect(within(architecture).getByText("TECHNICAL ARCHITECTURE")).toBeInTheDocument();
    expect(
      within(architecture).getByRole("heading", { level: 2, name: "Engineering for Scalability" }),
    ).toBeInTheDocument();
    expect(within(architecture).getByText(/high-frequency data exchanges/i)).toBeInTheDocument();
    expect(within(architecture).getByRole("heading", { name: "Modern Frontend" })).toBeInTheDocument();
    expect(within(architecture).getByRole("heading", { name: "Scalable Backend" })).toBeInTheDocument();
    expect(within(architecture).getByRole("heading", { name: "Reliable Storage" })).toBeInTheDocument();
    expect(within(architecture).getByRole("heading", { name: "Real-time Sync" })).toBeInTheDocument();
    expect(within(architecture).getByText(/React-based UI/i)).toBeInTheDocument();
    expect(within(architecture).getByText(/Node.js microservices/i)).toBeInTheDocument();
    expect(within(architecture).getByText(/PostgreSQL for robust data integrity/i)).toBeInTheDocument();
    expect(within(architecture).getByText(/WebSockets for instant updates/i)).toBeInTheDocument();
    expect(architecture.querySelectorAll(".neardrop-case-study-architecture-item")).toHaveLength(4);
  });
});
