import { useState } from "react";
import {
  ABOUT_CRAFTSMANSHIP_BODY_CLASS,
  ABOUT_CRAFTSMANSHIP_COPY_CLASS,
  ABOUT_CRAFTSMANSHIP_COPY_START_CLASS,
  ABOUT_CRAFTSMANSHIP_COPY_START_TEST_ID,
  ABOUT_CRAFTSMANSHIP_GRID_CLASS,
  ABOUT_CRAFTSMANSHIP_HEADING_CLASS,
  ABOUT_CRAFTSMANSHIP_INNER_CLASS,
  ABOUT_CRAFTSMANSHIP_RULE_BOTTOM_CLASS,
  ABOUT_CRAFTSMANSHIP_RULE_CLASS,
  ABOUT_CRAFTSMANSHIP_RULE_TEST_IDS,
  ABOUT_CRAFTSMANSHIP_SECTION_CLASS,
  ABOUT_CRAFTSMANSHIP_STAT_CLASS,
  ABOUT_CRAFTSMANSHIP_STAT_LABEL_CLASS,
  ABOUT_CRAFTSMANSHIP_STAT_VALUE_CLASS,
  ABOUT_CRAFTSMANSHIP_STATS,
  ABOUT_CRAFTSMANSHIP_VISUAL_CLASS,
  ABOUT_FOUNDER_PHOTO_ALT,
  ABOUT_FOUNDER_PHOTO_HEIGHT_PX,
  ABOUT_FOUNDER_PHOTO_PLACEHOLDER_CLASS,
  ABOUT_FOUNDER_PHOTO_SRC,
  ABOUT_FOUNDER_PHOTO_WRAP_CLASS,
  ABOUT_FOUNDER_PHOTO_WIDTH_PX,
  ABOUT_FOUNDER_QUOTE,
  ABOUT_FOUNDER_QUOTE_ATTRIBUTION_CLASS,
  ABOUT_FOUNDER_QUOTE_CLASS,
  ABOUT_FOUNDER_QUOTE_TEXT_CLASS,
} from "../lib/aboutCraftsmanshipContent";
import { useAboutContent } from "../lib/cms/hooks";

function FounderPhotoPlaceholder({ photoSrc }: { photoSrc?: string }) {
  const [useFallback, setUseFallback] = useState(false);
  const src = photoSrc || ABOUT_FOUNDER_PHOTO_SRC;

  if (useFallback) {
    return (
      <div
        className={`${ABOUT_FOUNDER_PHOTO_PLACEHOLDER_CLASS} about-founder-photo-placeholder--fallback`}
        data-testid="about-founder-photo-placeholder"
        aria-label="Founder portrait placeholder"
      />
    );
  }

  return (
    <img
      className="about-founder-photo"
      src={src}
      alt={ABOUT_FOUNDER_PHOTO_ALT}
      width={ABOUT_FOUNDER_PHOTO_WIDTH_PX}
      height={ABOUT_FOUNDER_PHOTO_HEIGHT_PX}
      loading="lazy"
      decoding="async"
      data-testid="about-founder-photo"
      onError={() => setUseFallback(true)}
    />
  );
}

export default function AboutCraftsmanshipSection() {
  const about = useAboutContent();
  const stats =
    about.statistics?.length
      ? about.statistics.map((stat) => ({
          value: stat?.value ?? "",
          label: stat?.label ?? "",
          valueClassName: ABOUT_CRAFTSMANSHIP_STAT_VALUE_CLASS,
        }))
      : ABOUT_CRAFTSMANSHIP_STATS;

  return (
    <section
      className={`${ABOUT_CRAFTSMANSHIP_SECTION_CLASS} reveal-on-scroll`}
      data-testid="about-craftsmanship-section"
      aria-labelledby="about-craftsmanship-title"
    >
      <hr className={ABOUT_CRAFTSMANSHIP_RULE_CLASS} data-testid={ABOUT_CRAFTSMANSHIP_RULE_TEST_IDS.top} />
      <div className={ABOUT_CRAFTSMANSHIP_INNER_CLASS} data-testid="about-craftsmanship-inner">
        <div className={ABOUT_CRAFTSMANSHIP_GRID_CLASS}>
          <div className={ABOUT_CRAFTSMANSHIP_COPY_CLASS}>
            <div
              className={ABOUT_CRAFTSMANSHIP_COPY_START_CLASS}
              data-testid={ABOUT_CRAFTSMANSHIP_COPY_START_TEST_ID}
            >
              <h2 id="about-craftsmanship-title" className={ABOUT_CRAFTSMANSHIP_HEADING_CLASS}>
                {about.visionTitle}
              </h2>
              <p className={ABOUT_CRAFTSMANSHIP_BODY_CLASS}>{about.visionBody}</p>
              <div className="about-craftsmanship-stats" data-testid="about-craftsmanship-stats">
                {stats.map((stat) => (
                  <div key={stat.label} className={ABOUT_CRAFTSMANSHIP_STAT_CLASS} data-testid="about-craftsmanship-stat">
                    <p className={stat.valueClassName}>{stat.value}</p>
                    <p className={ABOUT_CRAFTSMANSHIP_STAT_LABEL_CLASS}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={ABOUT_CRAFTSMANSHIP_VISUAL_CLASS}>
            <div className={ABOUT_FOUNDER_PHOTO_WRAP_CLASS} data-testid="about-founder-photo-wrap">
              <FounderPhotoPlaceholder photoSrc={about.founderImage} />
            </div>
            <aside className={ABOUT_FOUNDER_QUOTE_CLASS} data-testid="about-founder-quote" aria-label="Founder quote">
              <p className={ABOUT_FOUNDER_QUOTE_TEXT_CLASS}>{ABOUT_FOUNDER_QUOTE.text}</p>
              <p className={ABOUT_FOUNDER_QUOTE_ATTRIBUTION_CLASS}>{ABOUT_FOUNDER_QUOTE.attribution}</p>
            </aside>
          </div>
        </div>
      </div>
      <hr
        className={`${ABOUT_CRAFTSMANSHIP_RULE_CLASS} ${ABOUT_CRAFTSMANSHIP_RULE_BOTTOM_CLASS}`}
        data-testid={ABOUT_CRAFTSMANSHIP_RULE_TEST_IDS.bottom}
      />
    </section>
  );
}
