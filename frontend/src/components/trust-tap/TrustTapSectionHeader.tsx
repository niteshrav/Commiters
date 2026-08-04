import {
  TRUSTTAP_KICKER_CLASS,
  TRUSTTAP_SECTION_SUBTEXT_CLASS,
  TRUSTTAP_SECTION_TITLE_CLASS,
} from "../../lib/trustTapPageLayout";

type TrustTapSectionHeaderProps = {
  kicker: string;
  title: string;
  titleId: string;
  subtext?: string;
};

export default function TrustTapSectionHeader({ kicker, title, titleId, subtext }: TrustTapSectionHeaderProps) {
  return (
    <div className="trusttap-section-header">
      <p className={TRUSTTAP_KICKER_CLASS}>{kicker}</p>
      <h2 id={titleId} className={TRUSTTAP_SECTION_TITLE_CLASS}>
        {title}
      </h2>
      {subtext ? <p className={TRUSTTAP_SECTION_SUBTEXT_CLASS}>{subtext}</p> : null}
    </div>
  );
}
