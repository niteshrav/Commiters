import { IconCheckCircle } from "./icons";
import type { TermsPageBlock, TermsPageSection } from "../lib/termsPageContent";
import {
  TERMS_CHECKLIST_CLASS,
  TERMS_CHECKLIST_ICON_CLASS,
  TERMS_CHECKLIST_ITEM_CLASS,
  TERMS_DIVIDER_CLASS,
  TERMS_HIGHLIGHT_CLASS,
  TERMS_PARAGRAPH_CLASS,
  TERMS_SECTION_ACCENT_CLASS,
  TERMS_SECTION_CLASS,
  TERMS_SECTION_CONTENT_CLASS,
  TERMS_SECTION_HEADING_CLASS,
  TERMS_SECTION_INDEX_CLASS,
  TERMS_SECTION_SHELL_CLASS,
  TERMS_SECTION_TITLE_CLASS,
  TERMS_SECTIONS_CLASS,
} from "../lib/termsPageLayout";
import TermsEnterpriseCta from "./TermsEnterpriseCta";

type Props = {
  sections: readonly TermsPageSection[];
};

function renderBlock(block: TermsPageBlock, key: string) {
  if (block.kind === "paragraph") {
    return (
      <p key={key} className={TERMS_PARAGRAPH_CLASS}>
        {block.text}
      </p>
    );
  }

  if (block.kind === "checklist") {
    return (
      <ul key={key} className={TERMS_CHECKLIST_CLASS}>
        {block.items.map((item) => (
          <li key={item} className={TERMS_CHECKLIST_ITEM_CLASS}>
            <span className={TERMS_CHECKLIST_ICON_CLASS}>
              <IconCheckCircle />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div key={key} className={TERMS_HIGHLIGHT_CLASS}>
      <p>{block.text}</p>
    </div>
  );
}

export default function TermsPageSections({ sections }: Props) {
  return (
    <div className={TERMS_SECTIONS_CLASS} data-testid="terms-sections">
      {sections.map((section, index) => (
        <div key={section.number} className={TERMS_SECTION_SHELL_CLASS} data-testid={`terms-section-shell-${section.number}`}>
          {index > 0 ? <hr className={TERMS_DIVIDER_CLASS} aria-hidden /> : null}
          <article
            className={TERMS_SECTION_CLASS}
            data-testid={`terms-section-${section.number}`}
            aria-labelledby={`terms-section-${section.number}-title`}
          >
            <div className={TERMS_SECTION_HEADING_CLASS}>
              <span
                className={`${TERMS_SECTION_ACCENT_CLASS} terms-section-accent--${section.accent}`}
                aria-hidden
              />
              <span className={`${TERMS_SECTION_INDEX_CLASS} terms-section-index--${section.accent}`}>
                {section.number}
              </span>
              <h2 id={`terms-section-${section.number}-title`} className={TERMS_SECTION_TITLE_CLASS}>
                {section.title}
              </h2>
            </div>

            <div className={TERMS_SECTION_CONTENT_CLASS}>
              {section.blocks.map((block, blockIndex) => renderBlock(block, `${section.number}-${blockIndex}`))}
            </div>
          </article>
        </div>
      ))}

      <hr className={TERMS_DIVIDER_CLASS} aria-hidden />
      <TermsEnterpriseCta />
    </div>
  );
}
