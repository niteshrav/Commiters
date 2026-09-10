import type { AiSummarizerArchitectureIcon } from "../lib/aiSummarizerCaseStudyContent";
import { AI_SUMMARIZER_CASE_STUDY_COPY } from "../lib/aiSummarizerCaseStudyContent";
import {
  AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_CARD_BODY_CLASS,
  AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_CARD_CLASS,
  AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_CARD_TITLE_CLASS,
  AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_GRID_CLASS,
  AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_HEADING_CLASS,
  AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_ICON_CLASS,
  AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_SECTION_CLASS,
} from "../lib/aiSummarizerCaseStudyLayout";
import { IconGauge, IconLayers, IconShieldCheck } from "./icons";

function ArchitectureIcon({ icon }: { icon: AiSummarizerArchitectureIcon }) {
  const props = { width: 18, height: 18, "aria-hidden": true as const };

  switch (icon) {
    case "layers":
      return <IconLayers {...props} />;
    case "shield":
      return <IconShieldCheck {...props} />;
    case "gauge":
      return <IconGauge {...props} />;
  }
}

export default function AiSummarizerCaseStudyArchitectureSection() {
  const { architecture } = AI_SUMMARIZER_CASE_STUDY_COPY;

  return (
    <section
      className={`${AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_SECTION_CLASS} reveal-on-scroll`}
      data-testid="ai-summarizer-case-study-architecture"
      aria-labelledby="ai-summarizer-case-study-architecture-title"
    >
      <h2 id="ai-summarizer-case-study-architecture-title" className={AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_HEADING_CLASS}>
        {architecture.heading}
      </h2>
      <div className={AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_GRID_CLASS}>
        {architecture.cards.map((card) => (
          <article key={card.id} className={AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_CARD_CLASS}>
            <span className={AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_ICON_CLASS}>
              <ArchitectureIcon icon={card.icon} />
            </span>
            <h3 className={AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_CARD_TITLE_CLASS}>{card.title}</h3>
            <p className={AI_SUMMARIZER_CASE_STUDY_ARCHITECTURE_CARD_BODY_CLASS}>{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
