import type { ReactNode } from "react";
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
  action?: ReactNode;
};

export default function TrustTapSectionHeader({
  kicker,
  title,
  titleId,
  subtext,
  action,
}: TrustTapSectionHeaderProps) {
  return (
    <div className="trusttap-section-header">
      <div className="trusttap-section-header-copy">
        <p className={TRUSTTAP_KICKER_CLASS}>{kicker}</p>
        <h2 id={titleId} className={TRUSTTAP_SECTION_TITLE_CLASS}>
          {title}
        </h2>
        {subtext ? <p className={TRUSTTAP_SECTION_SUBTEXT_CLASS}>{subtext}</p> : null}
      </div>
      {action ? <div className="trusttap-section-header-action">{action}</div> : null}
    </div>
  );
}
