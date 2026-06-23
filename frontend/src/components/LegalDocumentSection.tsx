import type { LegalDocumentBlock, LegalDocumentSectionContent } from "../lib/legalDocumentContent";
import {
  LEGAL_BODY_CLASS,
  LEGAL_DOCUMENT_INNER_CLASS,
  LEGAL_DOCUMENT_SECTION_CLASS,
  LEGAL_DOCUMENT_SURFACE_CLASS,
  LEGAL_HEADING_CLASS,
  LEGAL_LIST_CLASS,
} from "../lib/legalPageLayout";

type Props = {
  intro: string;
  sections: readonly LegalDocumentSectionContent[];
  contactEmailDisplay: string;
  contactEmailHref: string;
};

function renderBlock(
  block: LegalDocumentBlock,
  key: string,
  contactEmailDisplay: string,
  contactEmailHref: string,
) {
  if (block.kind === "paragraph") {
    return (
      <p key={key} className={LEGAL_BODY_CLASS}>
        {block.text}
      </p>
    );
  }

  if (block.kind === "list") {
    return (
      <ul key={key} className={LEGAL_LIST_CLASS}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <p key={key} className={LEGAL_BODY_CLASS}>
      {block.textBefore}
      <a href={contactEmailHref}>{contactEmailDisplay}</a>
      {block.textAfter ?? null}
    </p>
  );
}

export default function LegalDocumentSection({ intro, sections, contactEmailDisplay, contactEmailHref }: Props) {
  return (
    <section className={LEGAL_DOCUMENT_SECTION_CLASS} data-testid="legal-document-section">
      <div className={LEGAL_DOCUMENT_INNER_CLASS} data-testid="legal-document-inner">
        <div className={LEGAL_DOCUMENT_SURFACE_CLASS} data-testid="legal-document-surface">
          <p className={`${LEGAL_BODY_CLASS} legal-intro-paragraph`}>{intro}</p>

          {sections.map((section) => (
            <article key={section.id} aria-labelledby={`legal-section-${section.id}`}>
              <h2 id={`legal-section-${section.id}`} className={LEGAL_HEADING_CLASS}>
                {section.heading}
              </h2>
              {section.blocks.map((block, index) =>
                renderBlock(block, `${section.id}-${index}`, contactEmailDisplay, contactEmailHref),
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
