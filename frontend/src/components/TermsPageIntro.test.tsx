import { render, screen } from "@testing-library/react";
import TermsPageIntro from "./TermsPageIntro";
import {
  TERMS_DIVIDER_CLASS,
  TERMS_INTRO_INNER_CLASS,
  TERMS_INTRO_SECTION_CLASS,
  TERMS_LAST_UPDATED_CLASS,
  TERMS_TITLE_CLASS,
} from "../lib/termsPageLayout";
import { TERMS_PAGE_COPY } from "../lib/termsPageContent";

describe("TermsPageIntro", () => {
  it("renders the terms title and last-updated line from the Stitch screenshot", () => {
    render(<TermsPageIntro />);

    expect(screen.getByTestId("terms-intro")).toHaveClass(TERMS_INTRO_SECTION_CLASS);
    expect(screen.getByTestId("terms-intro-inner")).toHaveClass(TERMS_INTRO_INNER_CLASS);
    expect(screen.queryByTestId("legal-intro-section")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: TERMS_PAGE_COPY.title })).toHaveClass(TERMS_TITLE_CLASS);
    expect(screen.getByText(`${TERMS_PAGE_COPY.lastUpdatedLabel} ${TERMS_PAGE_COPY.lastUpdatedDate}`)).toHaveClass(
      TERMS_LAST_UPDATED_CLASS,
    );
    expect(document.querySelector(`.${TERMS_DIVIDER_CLASS}`)).toBeTruthy();
  });
});
