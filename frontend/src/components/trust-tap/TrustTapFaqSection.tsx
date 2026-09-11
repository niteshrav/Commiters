import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { IconChevronDown } from "../icons";
import { ROUTES } from "../../lib/routes";
import { TRUSTTAP_DISPLAY } from "../../lib/trustTapPageDesign";
import { TRUSTTAP_FAQ } from "../../lib/trustTapPageContent";
import { TRUSTTAP_FAQ_LIST_CLASS, TRUSTTAP_SECTION_CLASS, TRUSTTAP_SECTION_INNER_CLASS } from "../../lib/trustTapPageLayout";
import TrustTapSectionHeader from "./TrustTapSectionHeader";

export default function TrustTapFaqSection() {
  const copy = TRUSTTAP_FAQ;
  const [openId, setOpenId] = useState<string | null>(copy.items[0]?.id ?? null);

  const toggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  return (
    <section
      className={`${TRUSTTAP_SECTION_CLASS} trusttap-faq reveal-on-scroll`}
      data-testid="trusttap-faq"
      id="trusttap-faq"
      aria-labelledby="trusttap-faq-title"
    >
      <div className={TRUSTTAP_SECTION_INNER_CLASS}>
        <TrustTapSectionHeader
          kicker={copy.kicker}
          title={copy.title}
          titleId="trusttap-faq-title"
          subtext={copy.subtext}
          action={
            <Link className="btn btn-secondary trusttap-faq-all" to={ROUTES.faq}>
              {TRUSTTAP_DISPLAY.faqAllLabel}
            </Link>
          }
        />
        <ul className={`faq-accordion-list ${TRUSTTAP_FAQ_LIST_CLASS}`}>
          {copy.items.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `trusttap-faq-panel-${item.id}`;
            const triggerId = `trusttap-faq-trigger-${item.id}`;

            return (
              <li
                key={item.id}
                className={`faq-accordion-item${isOpen ? " faq-accordion-item--open" : ""}`}
                data-testid="trusttap-faq-item"
              >
                <button
                  type="button"
                  id={triggerId}
                  className="faq-accordion-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(item.id)}
                >
                  <span>{item.question}</span>
                  <IconChevronDown className="faq-accordion-chevron" width={20} height={20} aria-hidden />
                </button>
                <div id={panelId} className="faq-accordion-panel" role="region" aria-labelledby={triggerId}>
                  <p>{item.answer}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
