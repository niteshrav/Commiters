import { Link } from "react-router-dom";
import { IconArrowRight } from "./icons";
import {
  PRIVACY_DPO_BUTTON_CLASS,
  PRIVACY_DPO_CTA_CLASS,
  PRIVACY_DPO_DESCRIPTION_CLASS,
  PRIVACY_DPO_INNER_CLASS,
  PRIVACY_DPO_TITLE_CLASS,
} from "../lib/privacyPageLayout";
import { PRIVACY_DPO_CTA } from "../lib/privacyPageContent";

export default function PrivacyPolicyDpoCta() {
  return (
    <section className={PRIVACY_DPO_CTA_CLASS} data-testid="privacy-policy-dpo-cta" aria-labelledby="privacy-dpo-title">
      <div className={PRIVACY_DPO_INNER_CLASS}>
        <h2 id="privacy-dpo-title" className={PRIVACY_DPO_TITLE_CLASS}>
          {PRIVACY_DPO_CTA.title}
        </h2>
        <p className={PRIVACY_DPO_DESCRIPTION_CLASS}>{PRIVACY_DPO_CTA.description}</p>
        <Link to={PRIVACY_DPO_CTA.href} className={PRIVACY_DPO_BUTTON_CLASS}>
          <span>{PRIVACY_DPO_CTA.buttonLabel}</span>
          <IconArrowRight width={18} height={18} />
        </Link>
      </div>
    </section>
  );
}
