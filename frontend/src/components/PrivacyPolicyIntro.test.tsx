import { render, screen } from "@testing-library/react";
import PrivacyPolicyIntro from "./PrivacyPolicyIntro";
import {
  PRIVACY_ACCENT_LINE_CLASS,
  PRIVACY_INTRO_BODY_CLASS,
  PRIVACY_INTRO_INNER_CLASS,
  PRIVACY_INTRO_SECTION_CLASS,
  PRIVACY_LAST_UPDATED_CLASS,
  PRIVACY_TITLE_CLASS,
} from "../lib/privacyPageLayout";
import { SITE_HORIZONTAL_RULE_CLASS } from "../lib/siteHorizontalRule";
import { PRIVACY_PAGE_COPY } from "../lib/privacyPageContent";

describe("PrivacyPolicyIntro", () => {
  it("renders the Stitch privacy hero with last updated line and accent bar", () => {
    render(<PrivacyPolicyIntro />);

    expect(screen.getByTestId("privacy-policy-intro")).toHaveClass(PRIVACY_INTRO_SECTION_CLASS);
    expect(screen.getByTestId("privacy-policy-intro-inner")).toHaveClass(PRIVACY_INTRO_INNER_CLASS);
    expect(screen.queryByTestId("legal-intro-section")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: PRIVACY_PAGE_COPY.title })).toHaveClass(PRIVACY_TITLE_CLASS);
    expect(screen.getByText(`${PRIVACY_PAGE_COPY.lastUpdatedLabel} ${PRIVACY_PAGE_COPY.lastUpdatedDate}`)).toHaveClass(
      PRIVACY_LAST_UPDATED_CLASS,
    );
    expect(document.querySelector(`.${PRIVACY_ACCENT_LINE_CLASS}`)).toBeTruthy();
    const introBody = document.querySelector(`.${PRIVACY_INTRO_BODY_CLASS}`);
    expect(introBody).toHaveTextContent(PRIVACY_PAGE_COPY.intro);
    expect(screen.getByText(PRIVACY_PAGE_COPY.introBold)).toHaveProperty("tagName", "STRONG");
    expect(document.querySelector(`.${SITE_HORIZONTAL_RULE_CLASS}`)).toBeTruthy();
  });
});
