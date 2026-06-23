import { render, screen } from "@testing-library/react";
import LegalDocumentSection from "./LegalDocumentSection";
import {
  LEGAL_BODY_CLASS,
  LEGAL_DOCUMENT_INNER_CLASS,
  LEGAL_DOCUMENT_SECTION_CLASS,
  LEGAL_DOCUMENT_SURFACE_CLASS,
  LEGAL_HEADING_CLASS,
} from "../lib/legalPageLayout";
import type { LegalDocumentSectionContent } from "../lib/legalDocumentContent";

const FIXTURE_SECTIONS: LegalDocumentSectionContent[] = [
  {
    id: "sample",
    heading: "Sample Section",
    blocks: [{ kind: "paragraph", text: "Sample legal paragraph copy." }],
  },
  {
    id: "contact",
    heading: "Contact",
    blocks: [{ kind: "contact", textBefore: "Email ", textAfter: "." }],
  },
];

describe("LegalDocumentSection", () => {
  it("renders the intro paragraph and legal sections inside the Stitch document surface", () => {
    render(
      <LegalDocumentSection
        intro="Sample legal intro copy."
        sections={FIXTURE_SECTIONS}
        contactEmailDisplay="hello@commiters.com, commitersudaipur@gmail.com"
        contactEmailHref="mailto:hello@commiters.com,commitersudaipur@gmail.com"
      />,
    );

    expect(screen.getByTestId("legal-document-section")).toHaveClass(LEGAL_DOCUMENT_SECTION_CLASS);
    expect(screen.getByTestId("legal-document-inner")).toHaveClass(LEGAL_DOCUMENT_INNER_CLASS);
    expect(screen.getByTestId("legal-document-surface")).toHaveClass(LEGAL_DOCUMENT_SURFACE_CLASS);
    expect(screen.getByText("Sample legal intro copy.")).toHaveClass(LEGAL_BODY_CLASS, "legal-intro-paragraph");

    for (const section of FIXTURE_SECTIONS) {
      expect(screen.getByRole("heading", { name: section.heading })).toHaveClass(LEGAL_HEADING_CLASS);
    }

    expect(screen.getByRole("link", { name: /hello@commiters\.com/i })).toHaveAttribute(
      "href",
      "mailto:hello@commiters.com,commitersudaipur@gmail.com",
    );
  });
});
