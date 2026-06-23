import { render, screen } from "@testing-library/react";
import FounderAvailabilityBadge from "./FounderAvailabilityBadge";

describe("FounderAvailabilityBadge", () => {
  it("shows reply-time promise and timezone", () => {
    render(<FounderAvailabilityBadge />);
    expect(screen.getByTestId("founder-availability-badge")).toHaveTextContent(/Replies in 4hrs/i);
    expect(screen.getByText(/IST · UTC\+5:30/i)).toBeInTheDocument();
  });
});
