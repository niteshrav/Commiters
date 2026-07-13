import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import SkipToMainLink from "./SkipToMainLink";
import { ACCESSIBILITY_MAIN_CONTENT_ID } from "../lib/accessibilityContent";

describe("SkipToMainLink", () => {
  it("focuses the main content landmark when activated", async () => {
    const user = userEvent.setup();
    render(
      <>
        <SkipToMainLink />
        <main id={ACCESSIBILITY_MAIN_CONTENT_ID} tabIndex={-1}>
          Main content
        </main>
      </>,
    );

    const main = screen.getByRole("main");
    const skipLink = screen.getByTestId("skip-to-main");

    await user.click(skipLink);
    expect(main).toHaveFocus();
  });
});
