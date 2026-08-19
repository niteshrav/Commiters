import { TRUSTTAP_BENEFITS } from "../../lib/trustTapPageContent";
import {
  TRUSTTAP_BENEFITS_GRID_CLASS,
  TRUSTTAP_BENEFIT_CARD_CLASS,
  TRUSTTAP_SECTION_CLASS,
  TRUSTTAP_SECTION_INNER_CLASS,
} from "../../lib/trustTapPageLayout";
import TrustTapSectionHeader from "./TrustTapSectionHeader";

export default function TrustTapBenefitsSection() {
  const copy = TRUSTTAP_BENEFITS;

  return (
    <section
      id="trusttap-benefits"
      className={`${TRUSTTAP_SECTION_CLASS} reveal-on-scroll`}
      data-testid="trusttap-benefits"
      aria-labelledby="trusttap-benefits-title"
    >
      <div className={TRUSTTAP_SECTION_INNER_CLASS}>
        <TrustTapSectionHeader kicker={copy.kicker} title={copy.title} titleId="trusttap-benefits-title" />
        <div className={TRUSTTAP_BENEFITS_GRID_CLASS}>
          {copy.items.map((item) => (
            <article key={item.id} className={TRUSTTAP_BENEFIT_CARD_CLASS}>
              <h3 className="trusttap-benefit-title">{item.title}</h3>
              <p className="trusttap-benefit-body">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
