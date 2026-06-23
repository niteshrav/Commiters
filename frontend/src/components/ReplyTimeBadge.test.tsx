import { render, screen } from "@testing-library/react";
import ReplyTimeBadge from "./ReplyTimeBadge";

describe("ReplyTimeBadge", () => {
  it("shows the visual 4-hour reply promise", () => {
    render(<ReplyTimeBadge />);
    expect(screen.getByTestId("reply-time-badge")).toHaveClass("reply-time-badge");
    expect(screen.getByText(/Usually replies within 4 hours/i)).toBeInTheDocument();
  });
});
