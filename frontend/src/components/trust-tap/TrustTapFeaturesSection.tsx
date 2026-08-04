import { TRUSTTAP_FEATURES, trustTapFeatureIcon } from "../../lib/trustTapPageContent";
import {
  TRUSTTAP_FEATURE_CARD_CLASS,
  TRUSTTAP_FEATURES_GRID_CLASS,
  TRUSTTAP_SECTION_CLASS,
  TRUSTTAP_SECTION_INNER_CLASS,
} from "../../lib/trustTapPageLayout";
import TrustTapSectionHeader from "./TrustTapSectionHeader";

export default function TrustTapFeaturesSection() {
  const copy = TRUSTTAP_FEATURES;

  return (
    <section
      className={`${TRUSTTAP_SECTION_CLASS} reveal-on-scroll`}
      data-testid="trusttap-features"
      aria-labelledby="trusttap-features-title"
    >
      <div className={TRUSTTAP_SECTION_INNER_CLASS}>
        <TrustTapSectionHeader kicker={copy.kicker} title={copy.title} titleId="trusttap-features-title" />
        <div className={TRUSTTAP_FEATURES_GRID_CLASS}>
          {copy.items.map((feature) => {
            const Icon = trustTapFeatureIcon(feature.id);
            return (
              <article key={feature.id} className={TRUSTTAP_FEATURE_CARD_CLASS}>
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
