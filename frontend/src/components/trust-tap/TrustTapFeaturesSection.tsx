import { NAV_SECTION_ALIAS_CLASS } from "../../lib/navSections";
import { TRUSTTAP_FEATURES, trustTapFeatureIcon } from "../../lib/trustTapPageContent";
import {
  TRUSTTAP_FEATURE_CARD_CLASS,
  TRUSTTAP_FEATURES_GRID_CLASS,
  TRUSTTAP_SECTION_CLASS,
  TRUSTTAP_SECTION_INNER_CLASS,
  TRUSTTAP_SECTION_SHELL_CLASS,
} from "../../lib/trustTapPageLayout";
import TrustTapSectionHeader from "./TrustTapSectionHeader";

export default function TrustTapFeaturesSection() {
  const copy = TRUSTTAP_FEATURES;

  return (
    <section
      id="core-pillars"
      className={`${TRUSTTAP_SECTION_CLASS} ${TRUSTTAP_SECTION_SHELL_CLASS} reveal-on-scroll`}
      data-testid="trusttap-features"
      aria-labelledby="trusttap-features-title"
    >
      <span id="hospitality" className={NAV_SECTION_ALIAS_CLASS} />
      <span id="features" className={NAV_SECTION_ALIAS_CLASS} />
      <div className={TRUSTTAP_SECTION_INNER_CLASS}>
        <TrustTapSectionHeader kicker={copy.kicker} title={copy.title} titleId="trusttap-features-title" />
        <div className={TRUSTTAP_FEATURES_GRID_CLASS}>
          {copy.items.map((feature) => {
            const Icon = trustTapFeatureIcon(feature.id);
            return (
              <article key={feature.id} className={TRUSTTAP_FEATURE_CARD_CLASS}>
                <p className="trusttap-feature-index" aria-hidden>
                  {feature.index}
                </p>
                <span className="trusttap-feature-icon" aria-hidden>
                  <Icon width={24} height={24} />
                </span>
                <h3 className="trusttap-feature-title">{feature.title}</h3>
                <p className="trusttap-feature-body">{feature.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
