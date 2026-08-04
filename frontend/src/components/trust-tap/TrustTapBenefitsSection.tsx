import { IconCheckCircle } from "../icons";
import { TRUSTTAP_BENEFITS } from "../../lib/trustTapPageContent";
import {
  TRUSTTAP_BENEFITS_LIST_CLASS,
  TRUSTTAP_SECTION_CLASS,
  TRUSTTAP_SECTION_INNER_CLASS,
} from "../../lib/trustTapPageLayout";
import TrustTapSectionHeader from "./TrustTapSectionHeader";

export default function TrustTapBenefitsSection() {
  const copy = TRUSTTAP_BENEFITS;

  return (
    <section
      className={`${TRUSTTAP_SECTION_CLASS} reveal-on-scroll`}
      data-testid="trusttap-benefits"
      aria-labelledby="trusttap-benefits-title"
    >
      <div className={TRUSTTAP_SECTION_INNER_CLASS}>
        <TrustTapSectionHeader kicker={copy.kicker} title={copy.title} titleId="trusttap-benefits-title" />
        <ul className={TRUSTTAP_BENEFITS_LIST_CLASS}>
          {copy.items.map((item) => (
            <li key={item}>
              <IconCheckCircle width={22} height={22} aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
