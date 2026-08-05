import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TestimonialsPage from "./TestimonialsPage";
import { BROWSE_MY_VACATION_TESTIMONIAL } from "../lib/testimonialsPageContent";

describe("TestimonialsPage", () => {
  it("renders the BrowseMyVacation testimonial", () => {
    render(
      <MemoryRouter>
        <TestimonialsPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("testimonials-page")).toBeInTheDocument();
    expect(screen.getByTestId("testimonial-card-featured")).toBeInTheDocument();
    const featured = screen.getByTestId("testimonial-card-featured");
    expect(within(featured).getByText(BROWSE_MY_VACATION_TESTIMONIAL.quote)).toBeInTheDocument();
    expect(within(featured).getByText("Rahul Kumawat")).toBeInTheDocument();
    expect(within(featured).getByText(/Founder \/ Product Lead, BrowseMyVacation/i)).toBeInTheDocument();
    expect(screen.queryByText(/Arjun Kumar/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Sarah Reynolds/i)).not.toBeInTheDocument();
  });
});
