import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BackToTopButton from "./BackToTopButton";
import {
  BACK_TO_TOP_CLASS,
  BACK_TO_TOP_POSITION_CLASS,
  BACK_TO_TOP_TEST_ID,
  BACK_TO_TOP_VISIBLE_CLASS,
} from "../lib/backToTop";

describe("BackToTopButton", () => {
  it("stays hidden until the page is scrolled, then smooth-scrolls to the top", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });

    render(<BackToTopButton />);
    const button = screen.getByTestId(BACK_TO_TOP_TEST_ID);
    expect(button).not.toBeVisible();
    expect(button).toHaveClass(BACK_TO_TOP_CLASS, ...BACK_TO_TOP_POSITION_CLASS.split(" "));
    expect(button).not.toHaveClass(BACK_TO_TOP_VISIBLE_CLASS);

    Object.defineProperty(window, "scrollY", { configurable: true, value: 480 });
    fireEvent.scroll(window);
    expect(button).toBeVisible();
    expect(button).toHaveClass(BACK_TO_TOP_VISIBLE_CLASS);

    fireEvent.click(button);
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    scrollTo.mockRestore();
  });
});
