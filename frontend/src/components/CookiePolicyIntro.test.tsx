import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CookiePolicyIntro from "./CookiePolicyIntro";
import { COOKIE_PAGE_COPY } from "../lib/cookiePageContent";
import {
  COOKIE_INTRO_INNER_CLASS,
  COOKIE_INTRO_KICKER_CLASS,
  COOKIE_INTRO_SECTION_CLASS,
  COOKIE_LAST_UPDATED_CLASS,
  COOKIE_TITLE_CLASS,
} from "../lib/cookiePageLayout";

describe("CookiePolicyIntro", () => {
  it("renders the compliance kicker, title, and last-updated line", () => {
    render(<CookiePolicyIntro />);

    expect(screen.getByTestId("cookie-policy-intro")).toHaveClass(COOKIE_INTRO_SECTION_CLASS);
    expect(screen.getByTestId("cookie-policy-intro-inner")).toHaveClass(COOKIE_INTRO_INNER_CLASS);
    expect(screen.getByText(COOKIE_PAGE_COPY.kicker)).toHaveClass(COOKIE_INTRO_KICKER_CLASS);
    expect(screen.getByRole("heading", { name: COOKIE_PAGE_COPY.title })).toHaveClass(COOKIE_TITLE_CLASS);
    expect(screen.getByText(`${COOKIE_PAGE_COPY.lastUpdatedLabel} ${COOKIE_PAGE_COPY.lastUpdatedDate}`)).toHaveClass(
      COOKIE_LAST_UPDATED_CLASS,
    );
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});
