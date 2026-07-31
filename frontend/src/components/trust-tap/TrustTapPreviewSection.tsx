import { TRUSTTAP_PREVIEW } from "../../lib/trustTapPageContent";
import {
  TRUSTTAP_PREVIEW_FRAME_CLASS,
  TRUSTTAP_PREVIEW_GRID_CLASS,
  TRUSTTAP_SECTION_CLASS,
  TRUSTTAP_SECTION_INNER_CLASS,
} from "../../lib/trustTapPageLayout";
import TrustTapSectionHeader from "./TrustTapSectionHeader";

export default function TrustTapPreviewSection() {
  const copy = TRUSTTAP_PREVIEW;

  return (
    <section
      className={`${TRUSTTAP_SECTION_CLASS} reveal-on-scroll`}
      data-testid="trusttap-preview"
      aria-labelledby="trusttap-preview-title"
    >
      <div className={TRUSTTAP_SECTION_INNER_CLASS}>
        <TrustTapSectionHeader
          kicker={copy.kicker}
          title={copy.title}
          titleId="trusttap-preview-title"
          subtext={copy.subtext}
        />
        <div className={TRUSTTAP_PREVIEW_GRID_CLASS}>
          {copy.shots.map((shot) => (
            <figure key={shot.id} className={TRUSTTAP_PREVIEW_FRAME_CLASS}>
              <img className="trusttap-preview-image" src={shot.src} alt={shot.alt} loading="lazy" decoding="async" />
              <figcaption className="trusttap-preview-caption">{shot.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
