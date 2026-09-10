import type { NearDropCaseStudyArchitectureItem } from "../lib/neardropCaseStudyContent";
import { NEARDROP_CASE_STUDY_COPY } from "../lib/neardropCaseStudyContent";
import {
  NEARDROP_CASE_STUDY_ARCHITECTURE_BODY_CLASS,
  NEARDROP_CASE_STUDY_ARCHITECTURE_GRID_CLASS,
  NEARDROP_CASE_STUDY_ARCHITECTURE_HEADING_CLASS,
  NEARDROP_CASE_STUDY_ARCHITECTURE_INNER_CLASS,
  NEARDROP_CASE_STUDY_ARCHITECTURE_ITEM_BODY_CLASS,
  NEARDROP_CASE_STUDY_ARCHITECTURE_ITEM_CLASS,
  NEARDROP_CASE_STUDY_ARCHITECTURE_ITEM_ICON_CLASS,
  NEARDROP_CASE_STUDY_ARCHITECTURE_ITEM_TITLE_CLASS,
  NEARDROP_CASE_STUDY_ARCHITECTURE_KICKER_CLASS,
  NEARDROP_CASE_STUDY_ARCHITECTURE_SECTION_CLASS,
} from "../lib/neardropCaseStudyLayout";
import { IconBrowserWindow, IconCodeBracket, IconDatabase, IconWorkflow } from "./icons";

function ArchitectureIcon({ icon }: { icon: NearDropCaseStudyArchitectureItem["icon"] }) {
  const props = { width: 22, height: 22 };
  if (icon === "backend") return <IconCodeBracket {...props} />;
  if (icon === "storage") return <IconDatabase {...props} />;
  if (icon === "sync") return <IconWorkflow {...props} />;
  return <IconBrowserWindow {...props} />;
}

export default function NearDropCaseStudyArchitectureSection() {
  const { architecture } = NEARDROP_CASE_STUDY_COPY;

  return (
    <section
      className={`${NEARDROP_CASE_STUDY_ARCHITECTURE_SECTION_CLASS} reveal-on-scroll`}
      data-testid="neardrop-case-study-architecture"
      aria-labelledby="neardrop-case-study-architecture-title"
    >
      <div className={NEARDROP_CASE_STUDY_ARCHITECTURE_INNER_CLASS}>
        <p className={NEARDROP_CASE_STUDY_ARCHITECTURE_KICKER_CLASS}>{architecture.kicker}</p>
        <h2 id="neardrop-case-study-architecture-title" className={NEARDROP_CASE_STUDY_ARCHITECTURE_HEADING_CLASS}>
          {architecture.heading}
        </h2>
        <p className={NEARDROP_CASE_STUDY_ARCHITECTURE_BODY_CLASS}>{architecture.description}</p>
        <div className={NEARDROP_CASE_STUDY_ARCHITECTURE_GRID_CLASS}>
          {architecture.items.map((item) => (
            <article key={item.id} className={NEARDROP_CASE_STUDY_ARCHITECTURE_ITEM_CLASS}>
              <span className={NEARDROP_CASE_STUDY_ARCHITECTURE_ITEM_ICON_CLASS} aria-hidden>
                <ArchitectureIcon icon={item.icon} />
              </span>
              <h3 className={NEARDROP_CASE_STUDY_ARCHITECTURE_ITEM_TITLE_CLASS}>{item.title}</h3>
              <p className={NEARDROP_CASE_STUDY_ARCHITECTURE_ITEM_BODY_CLASS}>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
