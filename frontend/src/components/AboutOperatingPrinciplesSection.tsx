import {
  IconLock,
  IconShieldCheck,
  IconLayers,
  IconWorkflow,
} from "./icons";
import { NAV_SECTION_ALIAS_CLASS } from "../lib/navSections";
import {
  ABOUT_OPERATING_PRINCIPLES,
  ABOUT_PAGE_COPY,
  ABOUT_SECTION_SCROLL_SHELL_CLASS,
  ABOUT_VALUES_HEADING_WRAP_CLASS,
  ABOUT_VALUES_ID,
  ABOUT_VALUES_KICKER_UTIL_CLASS,
  ABOUT_VALUES_TITLE_UTIL_CLASS,
  type AboutPrincipleIcon,
} from "../lib/aboutPageContent";
import {
  HOME_CLOUD_KICKER_CLASS,
  HOME_CLOUD_LEAD_CLASS,
  HOME_CLOUD_TITLE_ACCENT_CLASS,
  HOME_CLOUD_TITLE_CLASS,
} from "../lib/homeCloudTheme";

function PrincipleIcon({ icon }: { icon: AboutPrincipleIcon }) {
  const props = { width: 16, height: 16 };

  switch (icon) {
    case "mcp":
      return <IconWorkflow {...props} />;
    case "authority":
      return <IconShieldCheck {...props} />;
    case "spec":
      return <IconLayers {...props} />;
    case "async":
      return <IconLock {...props} />;
    default:
      return <IconWorkflow {...props} />;
  }
}

export default function AboutOperatingPrinciplesSection() {
  const { principles } = ABOUT_PAGE_COPY;

  return (
    <section
      id={ABOUT_VALUES_ID}
      className={`about-principles-section about-principles-section--values reveal-on-scroll ${ABOUT_SECTION_SCROLL_SHELL_CLASS}`}
      data-testid="about-principles-section"
      aria-labelledby="about-principles-title"
    >
      <span id="principles" className={NAV_SECTION_ALIAS_CLASS} />
      <div className="about-principles-inner">
        <div className={`${ABOUT_VALUES_HEADING_WRAP_CLASS} about-principles-intro`}>
          <header className="about-principles-header">
            <span className={`about-principles-kicker ${HOME_CLOUD_KICKER_CLASS} ${ABOUT_VALUES_KICKER_UTIL_CLASS}`}>
              {principles.kicker}
            </span>
            <h2 id="about-principles-title" className={`about-principles-title ${HOME_CLOUD_TITLE_CLASS} ${ABOUT_VALUES_TITLE_UTIL_CLASS}`}>
              {principles.titleLead}
              <span className={`about-principles-title-accent ${HOME_CLOUD_TITLE_ACCENT_CLASS}`}>
                {principles.titleAccent}
              </span>
            </h2>
            <p className={`about-principles-subtext ${HOME_CLOUD_LEAD_CLASS}`}>{principles.subtext}</p>
          </header>
        </div>

        <div className="about-principles-grid">
          {ABOUT_OPERATING_PRINCIPLES.map((principle) => (
            <article
              key={principle.id}
              className={`about-principle-card about-principle-card--${principle.tone}`}
              data-testid="about-principle-card"
            >
              <span className={`about-principle-icon about-principle-icon--${principle.tone}`} aria-hidden>
                <PrincipleIcon icon={principle.icon} />
              </span>
              <h3 className="about-principle-card-title">{principle.title}</h3>
              <p className="about-principle-card-body">{principle.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
