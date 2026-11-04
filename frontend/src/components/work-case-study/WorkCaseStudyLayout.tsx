import { Link } from "react-router-dom";
import Reveal from "../motion/Reveal";
import { resolveTechIconUrl } from "../../lib/homeTechStack";
import { withSiteCloudTheme } from "../../lib/homeCloudTheme";
import { ROUTES } from "../../lib/routes";
import {
  WORK_CASE_STUDY_FINAL_CTA,
  WORK_CASE_STUDY_SECTIONS,
  type WorkCaseStudy,
  type WorkCaseStudyCta,
} from "../../lib/workCaseStudy";
import { relatedWorkCaseStudies } from "../../lib/workCaseStudyProjects";
import "../../styles/workCaseStudy.css";

function CtaLink({ cta, className }: { cta: WorkCaseStudyCta; className: string }) {
  if (cta.kind === "external") {
    return (
      <a className={className} href={cta.href} target="_blank" rel="noopener noreferrer">
        {cta.label} ↗
      </a>
    );
  }
  if (cta.to.startsWith("#")) {
    return (
      <a className={className} href={cta.to}>
        {cta.label} ↓
      </a>
    );
  }
  return (
    <Link className={className} to={cta.to}>
      {cta.label} ↗
    </Link>
  );
}

function BrowserFrame({ src, srcSet, alt }: { src: string; srcSet?: string; alt: string }) {
  return (
    <div className="wcs-browser">
      <div className="wcs-browser-bar" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <img src={src} srcSet={srcSet} alt={alt} />
    </div>
  );
}

export default function WorkCaseStudyLayout({ study }: { study: WorkCaseStudy }) {
  const related = relatedWorkCaseStudies(study);

  return (
    <article
      className={withSiteCloudTheme("work-case-study", study.pageClass, study.extraPageClass)}
      data-testid={study.pageTestId}
    >
      <section className="wcs-hero" data-testid="work-case-study-hero">
        <div className="wcs-wrap wcs-hero-grid">
          <div>
            <div className="wcs-kicker">{study.kicker}</div>
            <h1>{study.headline}</h1>
            <p className="wcs-hero-desc">{study.lead}</p>
            <div className="wcs-actions">
              <CtaLink cta={study.exploreCta} className="wcs-btn primary" />
              <CtaLink cta={study.discussCta} className="wcs-btn secondary" />
            </div>
            <dl className="wcs-hero-facts">
              {study.heroFacts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Reveal>
            <BrowserFrame src={study.heroImage.src} srcSet={study.heroImage.srcSet} alt={study.heroImage.alt} />
          </Reveal>
        </div>
      </section>

      <section className="wcs-section" id="wcs-overview" data-testid="work-case-study-overview">
        <div className="wcs-wrap wcs-overview">
          <div>
            <div className="wcs-kicker">{WORK_CASE_STUDY_SECTIONS.overview.kicker}</div>
            <h2>{WORK_CASE_STUDY_SECTIONS.overview.title}</h2>
            <p className="wcs-lead">{study.overview.lead}</p>
          </div>
          <dl className="wcs-facts">
            {study.overview.items.map((field) => (
              <div className="wcs-fact" key={field.label}>
                <dt>{field.label}</dt>
                <dd>{field.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wcs-section soft" data-testid="work-case-study-problem">
        <div className="wcs-wrap wcs-split">
          <article>
            <div className="wcs-kicker">{WORK_CASE_STUDY_SECTIONS.problem.kicker}</div>
            <h2>{WORK_CASE_STUDY_SECTIONS.problem.title}</h2>
            <p className="wcs-lead">{study.problem.lead}</p>
            {study.problem.items.length > 0 ? (
              <div className="wcs-grid one">
                {study.problem.items.map((item) => (
                  <Reveal key={item.id}>
                    <article className="wcs-card">
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            ) : null}
          </article>
          <article data-testid="work-case-study-solution">
            <div className="wcs-kicker">{WORK_CASE_STUDY_SECTIONS.solution.kicker}</div>
            <h2>{WORK_CASE_STUDY_SECTIONS.solution.title}</h2>
            <p className="wcs-lead">{study.solution.lead}</p>
            {study.solution.items.length > 0 ? (
              <div className="wcs-grid one">
                {study.solution.items.map((item) => (
                  <Reveal key={item.id}>
                    <article className="wcs-card">
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            ) : null}
          </article>
        </div>
      </section>

      <section className="wcs-section" data-testid="work-case-study-usp">
        <div className="wcs-wrap">
          <div className="wcs-kicker">{WORK_CASE_STUDY_SECTIONS.usp.kicker}</div>
          <h2>{WORK_CASE_STUDY_SECTIONS.usp.title}</h2>
          <p className="wcs-lead">{study.usp.lead}</p>
          <div className="wcs-grid">
            {study.usp.items.map((item) => (
              <Reveal key={item.id}>
                <article className="wcs-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wcs-section" data-testid="work-case-study-showcase">
        <div className="wcs-wrap">
          <div className="wcs-kicker">{WORK_CASE_STUDY_SECTIONS.journey.kicker}</div>
          <h2>{WORK_CASE_STUDY_SECTIONS.journey.title}</h2>
          <p className="wcs-lead">{study.journey.lead}</p>
          <div className="wcs-grid two wcs-journey">
            {study.journey.items.map((image) => (
              <Reveal key={`${image.src}-${image.title ?? image.alt}`}>
                <figure className="wcs-card">
                  <BrowserFrame src={image.src} srcSet={image.srcSet} alt={image.alt} />
                  <figcaption>
                    {image.title ? <h3>{image.title}</h3> : null}
                    {image.body ? <p>{image.body}</p> : null}
                    {image.caption ? <span className="wcs-caption">{image.caption}</span> : null}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wcs-section soft" data-testid="work-case-study-features">
        <div className="wcs-wrap">
          <div className="wcs-kicker">{WORK_CASE_STUDY_SECTIONS.details.kicker}</div>
          <h2>{WORK_CASE_STUDY_SECTIONS.details.title}</h2>
          <p className="wcs-lead">{study.details.lead}</p>
          <div className="wcs-grid">
            {study.details.items.map((item) => (
              <Reveal key={item.id}>
                <article className="wcs-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wcs-section" data-testid="work-case-study-workflow">
        <div className="wcs-wrap">
          <div className="wcs-kicker">{WORK_CASE_STUDY_SECTIONS.flow.kicker}</div>
          <h2>{WORK_CASE_STUDY_SECTIONS.flow.title}</h2>
          <p className="wcs-lead">{study.flow.lead}</p>
          <div className="wcs-steps">
            {study.flow.items.map((item, index) => (
              <Reveal key={item.id}>
                <article className="wcs-step">
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wcs-section soft" data-testid="work-case-study-stack">
        <div className="wcs-wrap">
          <div className="wcs-kicker">{WORK_CASE_STUDY_SECTIONS.stack.kicker}</div>
          <h2>{WORK_CASE_STUDY_SECTIONS.stack.title}</h2>
          <p className="wcs-lead">{study.stack.lead}</p>
          <div className="wcs-stack">
            {study.stack.items.map((item) => (
              <article className="wcs-stack-item" key={item.id}>
                {item.logo ? <img src={resolveTechIconUrl(item.logo)} alt="" /> : null}
                <div>
                  <small>{item.group}</small>
                  <h3>{item.title}</h3>
                  {item.body ? <p>{item.body}</p> : null}
                </div>
              </article>
            ))}
          </div>
          {study.stack.note ? <p className="wcs-note">{study.stack.note}</p> : null}
        </div>
      </section>

      <section className="wcs-section" data-testid="work-case-study-outcomes">
        <div className="wcs-wrap">
          <div className="wcs-kicker">{WORK_CASE_STUDY_SECTIONS.outcome.kicker}</div>
          <h2>{WORK_CASE_STUDY_SECTIONS.outcome.title}</h2>
          <p className="wcs-lead">{study.outcome.lead}</p>
          <div className="wcs-grid">
            {study.outcome.items.map((item) => (
              <Reveal key={item.id}>
                <article className="wcs-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {study.liveDemo ? (
        <section className="wcs-section soft" data-testid="work-case-study-live">
          <div className="wcs-wrap">
            <div className="wcs-kicker">{WORK_CASE_STUDY_SECTIONS.live.kicker}</div>
            <h2>{WORK_CASE_STUDY_SECTIONS.live.title}</h2>
            <p className="wcs-lead">Open the public URL used by this case study.</p>
            <div className="wcs-actions" style={{ marginTop: 22 }}>
              <CtaLink cta={study.liveDemo} className="wcs-btn primary" />
            </div>
          </div>
        </section>
      ) : null}

      <section className="wcs-section" data-testid="work-case-study-related">
        <div className="wcs-wrap">
          <div className="wcs-kicker">Related work</div>
          <h2>More work in a similar direction.</h2>
          <div className="wcs-related">
            {related.map((item) => (
              <Link key={item.id} to={item.route}>
                <img src={item.heroImage.src} alt="" />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.lead}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="wcs-section wcs-final" data-testid="work-case-study-cta">
        <div className="wcs-wrap">
          <h2>{WORK_CASE_STUDY_FINAL_CTA.title}</h2>
          <p className="wcs-lead">{WORK_CASE_STUDY_FINAL_CTA.body}</p>
          <div className="wcs-actions">
            <Link className="wcs-btn primary" to={ROUTES.contact}>
              {WORK_CASE_STUDY_FINAL_CTA.primaryLabel} ↗
            </Link>
            <Link className="wcs-btn secondary" to={ROUTES.caseStudies}>
              {WORK_CASE_STUDY_FINAL_CTA.secondaryLabel} ↗
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
