import { uniqueBrowseMyVacationGallery } from "../lib/browseMyVacationCaseStudyContent";
import { NEXTSAAS_CASE_STUDY_COPY } from "../lib/nextsaasCaseStudyContent";
import {
  BROWSE_MY_VACATION_CARD_CLASS,
  BROWSE_MY_VACATION_GALLERY_GRID_CLASS,
  BROWSE_MY_VACATION_GALLERY_IMAGE_CLASS,
  BROWSE_MY_VACATION_GALLERY_TESTID,
  BROWSE_MY_VACATION_GALLERY_TILE_CLASS,
  BROWSE_MY_VACATION_GALLERY_TILE_TESTID,
  BROWSE_MY_VACATION_SCOPE_PIPELINES_GRID_CLASS,
  NEXTSAAS_CASE_STUDY_DESCRIPTION_CLASS,
  NEXTSAAS_CASE_STUDY_INTRO_COPY_CLASS,
  NEXTSAAS_CASE_STUDY_INTRO_DECOR_CLASS,
  NEXTSAAS_CASE_STUDY_INTRO_SCOPE_PIPELINES_CLASS,
  NEXTSAAS_CASE_STUDY_INTRO_SECTION_CLASS,
  NEXTSAAS_CASE_STUDY_INTRO_SHELL_CLASS,
  NEXTSAAS_CASE_STUDY_KICKER_CLASS,
  NEXTSAAS_CASE_STUDY_PIPELINES_CARD_CLASS,
  NEXTSAAS_CASE_STUDY_PIPELINES_COPY_CLASS,
  NEXTSAAS_CASE_STUDY_PIPELINES_HEADING_CLASS,
  NEXTSAAS_CASE_STUDY_PIPELINES_LAYOUT_CLASS,
  NEXTSAAS_CASE_STUDY_PIPELINES_MEDIA_CLASS,
  NEXTSAAS_CASE_STUDY_PIPELINES_SUBHEADING_CLASS,
  NEXTSAAS_CASE_STUDY_SCOPE_CARD_CLASS,
  NEXTSAAS_CASE_STUDY_SCOPE_DESCRIPTION_CLASS,
  NEXTSAAS_CASE_STUDY_SCOPE_HEADING_CLASS,
  NEXTSAAS_CASE_STUDY_SCOPE_ICON_CLASS,
  NEXTSAAS_CASE_STUDY_SCOPE_INDICATOR_CLASS,
  NEXTSAAS_CASE_STUDY_SCOPE_ITEM_CLASS,
  NEXTSAAS_CASE_STUDY_SCOPE_LIST_CLASS,
  NEXTSAAS_CASE_STUDY_SCOPE_PIPELINES_GRID_CLASS,
  NEXTSAAS_CASE_STUDY_TITLE_CLASS,
} from "../lib/nextsaasCaseStudyLayout";
import { IconAirplane, IconGlobe } from "./icons";
import { NextSaasCaseStudyMetadataPanel } from "./NextSaasCaseStudyOutcomesSection";

export default function NextSaasCaseStudyIntroSection() {
  const { kicker, title, description, scope, pipelines } = NEXTSAAS_CASE_STUDY_COPY;
  const gallery = uniqueBrowseMyVacationGallery();

  return (
    <section
      className={`${NEXTSAAS_CASE_STUDY_INTRO_SECTION_CLASS} reveal-on-scroll`}
      data-testid="nextsaas-case-study-intro"
      aria-labelledby="nextsaas-case-study-title"
    >
      <span className={NEXTSAAS_CASE_STUDY_INTRO_DECOR_CLASS} aria-hidden>
        <IconAirplane width={28} height={28} />
      </span>
      <div className={NEXTSAAS_CASE_STUDY_INTRO_SHELL_CLASS}>
        <div className={NEXTSAAS_CASE_STUDY_INTRO_COPY_CLASS}>
          <p className={NEXTSAAS_CASE_STUDY_KICKER_CLASS}>{kicker}</p>
          <h1 id="nextsaas-case-study-title" className={NEXTSAAS_CASE_STUDY_TITLE_CLASS}>
            {title}
          </h1>
          <p className={NEXTSAAS_CASE_STUDY_DESCRIPTION_CLASS}>{description}</p>
        </div>
        <NextSaasCaseStudyMetadataPanel />
      </div>
      <div className={NEXTSAAS_CASE_STUDY_INTRO_SCOPE_PIPELINES_CLASS} data-testid="nextsaas-case-study-intro-scope-pipelines">
        <div className={`${NEXTSAAS_CASE_STUDY_SCOPE_PIPELINES_GRID_CLASS} ${BROWSE_MY_VACATION_SCOPE_PIPELINES_GRID_CLASS}`}>
          <article className={`${NEXTSAAS_CASE_STUDY_SCOPE_CARD_CLASS} ${BROWSE_MY_VACATION_CARD_CLASS}`}>
            <span className={NEXTSAAS_CASE_STUDY_SCOPE_ICON_CLASS} aria-hidden>
              <IconGlobe width={24} height={24} />
            </span>
            <h2 id="nextsaas-case-study-scope-title" className={NEXTSAAS_CASE_STUDY_SCOPE_HEADING_CLASS}>
              {scope.heading}
            </h2>
            <p className={NEXTSAAS_CASE_STUDY_SCOPE_DESCRIPTION_CLASS}>{scope.description}</p>
            <ul className={NEXTSAAS_CASE_STUDY_SCOPE_LIST_CLASS}>
              {scope.items.map((item) => (
                <li key={item} className={NEXTSAAS_CASE_STUDY_SCOPE_ITEM_CLASS}>
                  <span className={NEXTSAAS_CASE_STUDY_SCOPE_INDICATOR_CLASS} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article
            className={`${NEXTSAAS_CASE_STUDY_PIPELINES_CARD_CLASS} ${BROWSE_MY_VACATION_CARD_CLASS}`}
            aria-labelledby="nextsaas-case-study-pipelines-title"
          >
            <div className={NEXTSAAS_CASE_STUDY_PIPELINES_LAYOUT_CLASS}>
              <div className={NEXTSAAS_CASE_STUDY_PIPELINES_COPY_CLASS}>
                <h2 id="nextsaas-case-study-pipelines-title" className={NEXTSAAS_CASE_STUDY_PIPELINES_HEADING_CLASS}>
                  {pipelines.heading}
                </h2>
                <p className={NEXTSAAS_CASE_STUDY_PIPELINES_SUBHEADING_CLASS}>{pipelines.subheading}</p>
              </div>
              <div className={NEXTSAAS_CASE_STUDY_PIPELINES_MEDIA_CLASS}>
                <div
                  className={BROWSE_MY_VACATION_GALLERY_GRID_CLASS}
                  data-testid={BROWSE_MY_VACATION_GALLERY_TESTID}
                >
                  {gallery.map((item, index) => (
                    <div
                      key={item.src}
                      className={BROWSE_MY_VACATION_GALLERY_TILE_CLASS}
                      data-testid={BROWSE_MY_VACATION_GALLERY_TILE_TESTID}
                    >
                      <img
                        className={BROWSE_MY_VACATION_GALLERY_IMAGE_CLASS}
                        src={item.src}
                        srcSet={item.srcSet}
                        sizes={item.sizes}
                        alt={item.alt}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
