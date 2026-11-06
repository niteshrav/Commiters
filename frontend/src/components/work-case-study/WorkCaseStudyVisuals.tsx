import Reveal from "../motion/Reveal";
import type { WorkStudyVisual } from "../../lib/workCaseStudyVisuals";
import { WORK_CASE_STUDY_VISUALS } from "../../lib/workCaseStudyVisuals";

function Pipeline({ visual }: { visual: WorkStudyVisual["pipeline"] }) {
  return (
    <section className="wcs-section wcs-visuals" data-testid="work-case-study-pipeline">
      <div className="wcs-wrap">
        <div className="wcs-kicker">{visual.kicker}</div>
        <h2>{visual.title}</h2>
        <p className="wcs-lead">{visual.lead}</p>
        <ol className="wcs-pipeline">
          {visual.steps.map((step, index) => (
            <Reveal key={step.id}>
              <li className="wcs-pipeline-step">
                <span className="wcs-pipeline-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.label}</h3>
                <p>{step.detail}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Bars({ visual }: { visual: NonNullable<WorkStudyVisual["bars"]> }) {
  return (
    <section className="wcs-section soft wcs-visuals" data-testid="work-case-study-chart">
      <div className="wcs-wrap">
        <div className="wcs-kicker">{visual.kicker}</div>
        <h2>{visual.title}</h2>
        <p className="wcs-lead">{visual.lead}</p>
        <div className="wcs-bars" role="img" aria-label={visual.caption}>
          {visual.items.map((item) => (
            <div className="wcs-bar" key={item.id}>
              <div className="wcs-bar-meta">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
              <div className="wcs-bar-track">
                <span className="wcs-bar-fill" style={{ width: `${item.share}%` }} />
              </div>
            </div>
          ))}
          <p className="wcs-caption">{visual.caption}</p>
        </div>
      </div>
    </section>
  );
}

function Tiles({ visual }: { visual: NonNullable<WorkStudyVisual["tiles"]> }) {
  return (
    <section className="wcs-section soft wcs-visuals" data-testid="work-case-study-tiles">
      <div className="wcs-wrap">
        <div className="wcs-kicker">{visual.kicker}</div>
        <h2>{visual.title}</h2>
        <p className="wcs-lead">{visual.lead}</p>
        <div className="wcs-tiles">
          {visual.items.map((item) => (
            <Reveal key={item.id}>
              <article className="wcs-tile">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lanes({ visual }: { visual: NonNullable<WorkStudyVisual["lanes"]> }) {
  return (
    <section className="wcs-section soft wcs-visuals" data-testid="work-case-study-lanes">
      <div className="wcs-wrap">
        <div className="wcs-kicker">{visual.kicker}</div>
        <h2>{visual.title}</h2>
        <p className="wcs-lead">{visual.lead}</p>
        <div className="wcs-lanes">
          {visual.items.map((item) => (
            <Reveal key={item.id}>
              <article className="wcs-lane">
                <h3>{item.label}</h3>
                <p>{item.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Table({ visual }: { visual: NonNullable<WorkStudyVisual["table"]> }) {
  return (
    <section className="wcs-section wcs-visuals" data-testid="work-case-study-table">
      <div className="wcs-wrap">
        <div className="wcs-kicker">{visual.kicker}</div>
        <h2>{visual.title}</h2>
        <p className="wcs-lead">{visual.lead}</p>
        <div className="wcs-table-wrap">
          <table className="wcs-table">
            <thead>
              <tr>
                {visual.columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visual.rows.map((row) => (
                <tr key={row.id}>
                  {row.cells.map((cell, index) => (
                    <td key={`${row.id}-${index}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default function WorkCaseStudyVisuals({ studyId }: { studyId: string }) {
  const visual = WORK_CASE_STUDY_VISUALS[studyId];
  if (!visual) return null;

  return (
    <>
      <Pipeline visual={visual.pipeline} />
      {visual.table ? <Table visual={visual.table} /> : null}
      {visual.lanes ? <Lanes visual={visual.lanes} /> : null}
      {visual.bars ? <Bars visual={visual.bars} /> : null}
      {visual.tiles ? <Tiles visual={visual.tiles} /> : null}
    </>
  );
}
