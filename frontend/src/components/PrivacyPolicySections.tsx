import { IconCheckCircle, IconHandshake, IconShieldCheck } from "./icons";
import PrivacyPolicyDpoCta from "./PrivacyPolicyDpoCta";
import type { PrivacyPolicyBlock, PrivacyPolicySection } from "../lib/privacyPageContent";
import {
  PRIVACY_CALLOUT_CLASS,
  PRIVACY_CHECKLIST_CLASS,
  PRIVACY_CHECKLIST_ICON_CLASS,
  PRIVACY_CHECKLIST_ITEM_CLASS,
  PRIVACY_DIVIDER_CLASS,
  PRIVACY_FEATURE_CARD_BODY_CLASS,
  PRIVACY_FEATURE_CARD_CLASS,
  PRIVACY_FEATURE_CARD_ICON_CLASS,
  PRIVACY_FEATURE_CARD_TITLE_CLASS,
  PRIVACY_FEATURE_GRID_CLASS,
  PRIVACY_PARAGRAPH_CLASS,
  PRIVACY_RIGHTS_BODY_CLASS,
  PRIVACY_RIGHTS_BULLET_CLASS,
  PRIVACY_RIGHTS_ITEM_CLASS,
  PRIVACY_RIGHTS_LIST_CLASS,
  PRIVACY_RIGHTS_TITLE_CLASS,
  PRIVACY_SECTION_CLASS,
  PRIVACY_SECTION_CONTENT_CLASS,
  PRIVACY_SECTION_HEADING_CLASS,
  PRIVACY_SECTION_INDEX_CLASS,
  PRIVACY_SECTION_SHELL_CLASS,
  PRIVACY_SECTIONS_CLASS,
  PRIVACY_SECTION_TITLE_CLASS,
  PRIVACY_SUBSECTION_BODY_CLASS,
  PRIVACY_SUBSECTION_CLASS,
  PRIVACY_SUBSECTION_LABEL_CLASS,
} from "../lib/privacyPageLayout";

type Props = {
  sections: readonly PrivacyPolicySection[];
};

function renderFeatureIcon(icon: "handshake" | "shield") {
  if (icon === "handshake") {
    return <IconHandshake width={24} height={24} />;
  }
  return <IconShieldCheck width={24} height={24} />;
}

function renderBlock(block: PrivacyPolicyBlock, key: string) {
  if (block.kind === "identity") {
    return (
      <div key={key} className={PRIVACY_SUBSECTION_CLASS}>
        <p className={PRIVACY_SUBSECTION_LABEL_CLASS}>{block.label}</p>
        <p className={PRIVACY_SUBSECTION_BODY_CLASS}>{block.description}</p>
        <ul className={PRIVACY_CHECKLIST_CLASS}>
          {block.items.map((item) => (
            <li key={item} className={PRIVACY_CHECKLIST_ITEM_CLASS}>
              <span className={PRIVACY_CHECKLIST_ICON_CLASS}>
                <IconCheckCircle />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (block.kind === "paragraph") {
    return (
      <p key={key} className={PRIVACY_PARAGRAPH_CLASS}>
        {block.text}
      </p>
    );
  }

  if (block.kind === "cards") {
    return (
      <div key={key} className={PRIVACY_FEATURE_GRID_CLASS}>
        {block.cards.map((card) => (
          <article key={card.title} className={PRIVACY_FEATURE_CARD_CLASS}>
            <span className={PRIVACY_FEATURE_CARD_ICON_CLASS}>{renderFeatureIcon(card.icon)}</span>
            <h3 className={PRIVACY_FEATURE_CARD_TITLE_CLASS}>{card.title}</h3>
            <p className={PRIVACY_FEATURE_CARD_BODY_CLASS}>{card.description}</p>
          </article>
        ))}
      </div>
    );
  }

  if (block.kind === "rights") {
    return (
      <ul key={key} className={PRIVACY_RIGHTS_LIST_CLASS}>
        {block.items.map((item) => (
          <li key={item.title} className={PRIVACY_RIGHTS_ITEM_CLASS}>
            <span className={PRIVACY_RIGHTS_BULLET_CLASS} aria-hidden />
            <div>
              <p className={PRIVACY_RIGHTS_TITLE_CLASS}>{item.title}</p>
              <p className={PRIVACY_RIGHTS_BODY_CLASS}>{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <blockquote key={key} className={PRIVACY_CALLOUT_CLASS}>
      <p>{block.text}</p>
    </blockquote>
  );
}

export default function PrivacyPolicySections({ sections }: Props) {
  return (
    <div className={PRIVACY_SECTIONS_CLASS} data-testid="privacy-policy-sections">
      {sections.map((section, index) => (
        <div key={section.number} className={PRIVACY_SECTION_SHELL_CLASS} data-testid={`privacy-policy-section-shell-${section.number}`}>
          {index > 0 ? <hr className={PRIVACY_DIVIDER_CLASS} aria-hidden /> : null}
          <article
            className={PRIVACY_SECTION_CLASS}
            data-testid={`privacy-policy-section-${section.number}`}
            aria-labelledby={`privacy-section-${section.number}-title`}
          >
            <div className={PRIVACY_SECTION_HEADING_CLASS}>
              <span className={PRIVACY_SECTION_INDEX_CLASS}>{section.number}</span>
              <h2 id={`privacy-section-${section.number}-title`} className={PRIVACY_SECTION_TITLE_CLASS}>
                {section.title}
              </h2>
            </div>

            <div className={PRIVACY_SECTION_CONTENT_CLASS}>
              {section.blocks.map((block, blockIndex) => renderBlock(block, `${section.number}-${blockIndex}`))}
            </div>
          </article>
        </div>
      ))}

      <hr className={PRIVACY_DIVIDER_CLASS} aria-hidden />
      <PrivacyPolicyDpoCta />
    </div>
  );
}
