import { NEXTSAAS_CASE_STUDY_COPY } from "../lib/nextsaasCaseStudyContent";
import { resolveTechIconUrl } from "../lib/homeTechStack";
import {
  NEXTSAAS_CASE_STUDY_TECH_STACK_CELL_BODY_CLASS,
  NEXTSAAS_CASE_STUDY_TECH_STACK_CELL_CLASS,
  NEXTSAAS_CASE_STUDY_TECH_STACK_CELL_ICON_CLASS,
  NEXTSAAS_CASE_STUDY_TECH_STACK_CELL_LABEL_CLASS,
  NEXTSAAS_CASE_STUDY_TECH_STACK_CELL_TITLE_CLASS,
  NEXTSAAS_CASE_STUDY_TECH_STACK_COPY_CLASS,
  NEXTSAAS_CASE_STUDY_TECH_STACK_DESCRIPTION_CLASS,
  NEXTSAAS_CASE_STUDY_TECH_STACK_GRID_CLASS,
  NEXTSAAS_CASE_STUDY_TECH_STACK_HEADING_CLASS,
  NEXTSAAS_CASE_STUDY_TECH_STACK_LAYOUT_CLASS,
  NEXTSAAS_CASE_STUDY_TECH_STACK_LOGO_ICON_CLASS,
  NEXTSAAS_CASE_STUDY_TECH_STACK_LOGO_ITEM_CLASS,
  NEXTSAAS_CASE_STUDY_TECH_STACK_LOGOS_CLASS,
  NEXTSAAS_CASE_STUDY_TECH_STACK_SECTION_CLASS,
} from "../lib/nextsaasCaseStudyLayout";

export default function NextSaasCaseStudyTechStackSection() {
  const { techStack, coreStackLogos } = NEXTSAAS_CASE_STUDY_COPY;

  return (
    <section
      className={`${NEXTSAAS_CASE_STUDY_TECH_STACK_SECTION_CLASS} reveal-on-scroll`}
      data-testid="nextsaas-case-study-tech-stack"
      aria-labelledby="nextsaas-case-study-tech-stack-title"
    >
      <div className={NEXTSAAS_CASE_STUDY_TECH_STACK_LAYOUT_CLASS}>
        <div className={NEXTSAAS_CASE_STUDY_TECH_STACK_COPY_CLASS}>
          <h2 id="nextsaas-case-study-tech-stack-title" className={NEXTSAAS_CASE_STUDY_TECH_STACK_HEADING_CLASS}>
            {techStack.heading}
          </h2>
          <p className={NEXTSAAS_CASE_STUDY_TECH_STACK_DESCRIPTION_CLASS}>{techStack.description}</p>
          <ul className={NEXTSAAS_CASE_STUDY_TECH_STACK_LOGOS_CLASS} aria-label={coreStackLogos.heading}>
            {coreStackLogos.items.map((item) => (
              <li key={item.slug} className={NEXTSAAS_CASE_STUDY_TECH_STACK_LOGO_ITEM_CLASS}>
                <span className={NEXTSAAS_CASE_STUDY_TECH_STACK_LOGO_ICON_CLASS} aria-hidden>
                  <img
                    src={resolveTechIconUrl(item)}
                    alt={`${item.title} logo`}
                    width={24}
                    height={24}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span>
                  <strong>{item.title}</strong>
                  <span>{item.subtitle}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={NEXTSAAS_CASE_STUDY_TECH_STACK_GRID_CLASS}>
          {techStack.items.map((item) => (
            <article key={item.id} className={NEXTSAAS_CASE_STUDY_TECH_STACK_CELL_CLASS}>
              {item.slug ? (
                <span className={NEXTSAAS_CASE_STUDY_TECH_STACK_CELL_ICON_CLASS} aria-hidden>
                  <img
                    src={resolveTechIconUrl({ slug: item.slug, alt: item.title })}
                    alt=""
                    width={28}
                    height={28}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              ) : null}
              <p className={NEXTSAAS_CASE_STUDY_TECH_STACK_CELL_LABEL_CLASS}>{item.label}</p>
              <h3 className={NEXTSAAS_CASE_STUDY_TECH_STACK_CELL_TITLE_CLASS}>{item.title}</h3>
              <p className={NEXTSAAS_CASE_STUDY_TECH_STACK_CELL_BODY_CLASS}>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
