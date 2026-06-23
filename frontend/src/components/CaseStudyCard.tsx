import { Link } from "react-router-dom";
import type { CaseStudyCard as CaseStudy } from "../lib/stitchPageContent";

type Props = { study: CaseStudy };

export default function CaseStudyCard({ study }: Props) {
  return (
    <article className="card stitch-case-card" data-testid="stitch-case-card">
      <div className="stitch-case-card-head">
        <span className="stitch-case-category">{study.category}</span>
        <Link className="stitch-case-link" to={study.href} aria-label={`Discuss ${study.title}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M7 17L17 7M17 7H9M17 7V15" />
          </svg>
        </Link>
      </div>
      <h3 className="stitch-case-title">{study.title}</h3>
      <div className="stitch-case-preview" aria-hidden>
        <div className="stitch-case-preview-sidebar" />
        <div className="stitch-case-preview-main">
          <span />
          <span />
          <span />
        </div>
      </div>
    </article>
  );
}
