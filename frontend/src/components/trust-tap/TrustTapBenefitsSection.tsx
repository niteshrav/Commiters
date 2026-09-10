import { IconChartLine, IconCheckCircle, IconClock, IconMedal } from "../icons";
import { TRUSTTAP_DISPLAY } from "../../lib/trustTapPageDesign";
import { TRUSTTAP_BENEFITS } from "../../lib/trustTapPageContent";
import {
  TRUSTTAP_BENEFITS_GRID_CLASS,
  TRUSTTAP_BENEFIT_CARD_CLASS,
  TRUSTTAP_SECTION_CLASS,
  TRUSTTAP_SECTION_INNER_CLASS,
} from "../../lib/trustTapPageLayout";
import TrustTapSectionHeader from "./TrustTapSectionHeader";

const BENEFIT_ICONS = [IconCheckCircle, IconClock, IconChartLine] as const;

export default function TrustTapBenefitsSection() {
  const copy = TRUSTTAP_BENEFITS;

  return (
    <section
      id="enterprise"
      className={`${TRUSTTAP_SECTION_CLASS} reveal-on-scroll`}
      data-testid="trusttap-benefits"
      aria-labelledby="trusttap-benefits-title"
    >
      <div className={TRUSTTAP_SECTION_INNER_CLASS}>
        <TrustTapSectionHeader kicker={copy.kicker} title={copy.title} titleId="trusttap-benefits-title" />
        <div className={TRUSTTAP_BENEFITS_GRID_CLASS}>
          {copy.items.map((item, index) => {
            const Icon = BENEFIT_ICONS[index] ?? IconCheckCircle;
            return (
              <article key={item.id} className={TRUSTTAP_BENEFIT_CARD_CLASS}>
                <span className="trusttap-benefit-icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3 className="trusttap-benefit-title">{item.title}</h3>
                <p className="trusttap-benefit-body">{item.body}</p>
              </article>
            );
          })}
          <article className={`${TRUSTTAP_BENEFIT_CARD_CLASS} trusttap-benefit-card--display`} aria-hidden="true">
            <span className="trusttap-benefit-icon">
              <IconMedal />
            </span>
            <h3 className="trusttap-benefit-title">{TRUSTTAP_DISPLAY.extraBenefit.title}</h3>
            <p className="trusttap-benefit-body">{TRUSTTAP_DISPLAY.extraBenefit.body}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
