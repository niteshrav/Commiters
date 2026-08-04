import { TRUSTTAP_ABOUT } from "../../lib/trustTapPageContent";
import { TRUSTTAP_SECTION_CLASS, TRUSTTAP_SECTION_INNER_CLASS, TRUSTTAP_SECTION_MUTED_CLASS } from "../../lib/trustTapPageLayout";
import TrustTapSectionHeader from "./TrustTapSectionHeader";

export default function TrustTapAboutSection() {
  const copy = TRUSTTAP_ABOUT;

  return (
    <section
      className={`${TRUSTTAP_SECTION_CLASS} ${TRUSTTAP_SECTION_MUTED_CLASS} reveal-on-scroll`}
      data-testid="trusttap-about"
      aria-labelledby="trusttap-about-title"
    >
      <div className={TRUSTTAP_SECTION_INNER_CLASS}>
        <TrustTapSectionHeader kicker={copy.kicker} title={copy.title} titleId="trusttap-about-title" />
        <p className="trusttap-about-body">{copy.body}</p>
      </div>
    </section>
  );
}
