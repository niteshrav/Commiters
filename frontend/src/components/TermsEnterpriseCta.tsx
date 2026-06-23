import { Link } from "react-router-dom";
import { IconEnvelope } from "./icons";
import {
  TERMS_ENTERPRISE_BUTTON_CLASS,
  TERMS_ENTERPRISE_CTA_CLASS,
  TERMS_ENTERPRISE_DESCRIPTION_CLASS,
  TERMS_ENTERPRISE_INNER_CLASS,
  TERMS_ENTERPRISE_TITLE_CLASS,
} from "../lib/termsPageLayout";
import { TERMS_ENTERPRISE_CTA } from "../lib/termsPageContent";

export default function TermsEnterpriseCta() {
  return (
    <section className={TERMS_ENTERPRISE_CTA_CLASS} data-testid="terms-enterprise-cta" aria-labelledby="terms-enterprise-title">
      <div className={TERMS_ENTERPRISE_INNER_CLASS}>
        <h2 id="terms-enterprise-title" className={TERMS_ENTERPRISE_TITLE_CLASS}>
          {TERMS_ENTERPRISE_CTA.title}
        </h2>
        <p className={TERMS_ENTERPRISE_DESCRIPTION_CLASS}>{TERMS_ENTERPRISE_CTA.description}</p>
        <Link to={TERMS_ENTERPRISE_CTA.href} className={TERMS_ENTERPRISE_BUTTON_CLASS}>
          <IconEnvelope width={18} height={18} />
          <span>{TERMS_ENTERPRISE_CTA.buttonLabel}</span>
        </Link>
      </div>
    </section>
  );
}
