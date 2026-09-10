import { TRUSTTAP_DISPLAY } from "../../lib/trustTapPageDesign";
import { TRUSTTAP_HOW_IT_WORKS } from "../../lib/trustTapPageContent";
import {
  TRUSTTAP_SECTION_CLASS,
  TRUSTTAP_SECTION_INNER_CLASS,
  TRUSTTAP_STEP_CLASS,
  TRUSTTAP_STEPS_GRID_CLASS,
} from "../../lib/trustTapPageLayout";
import TrustTapSectionHeader from "./TrustTapSectionHeader";

export default function TrustTapHowItWorksSection() {
  const copy = TRUSTTAP_HOW_IT_WORKS;

  return (
    <section
      className={`${TRUSTTAP_SECTION_CLASS} reveal-on-scroll`}
      data-testid="trusttap-how-it-works"
      id="trusttap-how-it-works"
      aria-labelledby="trusttap-how-title"
    >
      <div className={TRUSTTAP_SECTION_INNER_CLASS}>
        <TrustTapSectionHeader
          kicker={copy.kicker}
          title={copy.title}
          titleId="trusttap-how-title"
          action={<p className="trusttap-how-note">{TRUSTTAP_DISPLAY.howItWorksNote}</p>}
        />
        <div className={TRUSTTAP_STEPS_GRID_CLASS}>
          {copy.steps.map((step, index) => (
            <article key={step.index} className={TRUSTTAP_STEP_CLASS}>
              <p className="trusttap-step-index">{step.index}</p>
              <span className="trusttap-step-badge" aria-hidden="true">
                {index + 1}
              </span>
              <h3 className="trusttap-step-title">{step.title}</h3>
              <p className="trusttap-step-body">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
