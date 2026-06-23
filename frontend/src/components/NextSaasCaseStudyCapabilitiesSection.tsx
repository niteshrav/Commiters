import type { NextSaasCaseStudyCapability } from "../lib/nextsaasCaseStudyContent";
import { NEXTSAAS_CASE_STUDY_COPY } from "../lib/nextsaasCaseStudyContent";
import {
  NEXTSAAS_CASE_STUDY_CAPABILITIES_GRID_CLASS,
  NEXTSAAS_CASE_STUDY_CAPABILITIES_SECTION_CLASS,
  NEXTSAAS_CASE_STUDY_CAPABILITY_BODY_CLASS,
  NEXTSAAS_CASE_STUDY_CAPABILITY_CARD_CLASS,
  NEXTSAAS_CASE_STUDY_CAPABILITY_ICON_CLASS,
  NEXTSAAS_CASE_STUDY_CAPABILITY_LABEL_CLASS,
} from "../lib/nextsaasCaseStudyLayout";
import { IconClock, IconDevicePhone, IconGauge } from "./icons";

function CapabilityIcon({ icon }: { icon: NextSaasCaseStudyCapability["icon"] }) {
  if (icon === "cross-platform") return <IconDevicePhone width={28} height={28} />;
  if (icon === "regression") return <IconClock width={28} height={28} />;
  return <IconGauge width={28} height={28} />;
}

export default function NextSaasCaseStudyCapabilitiesSection() {
  const { capabilities } = NEXTSAAS_CASE_STUDY_COPY;

  return (
    <section className={NEXTSAAS_CASE_STUDY_CAPABILITIES_SECTION_CLASS} data-testid="nextsaas-case-study-capabilities">
      <div className={NEXTSAAS_CASE_STUDY_CAPABILITIES_GRID_CLASS}>
        {capabilities.items.map((capability) => (
          <article key={capability.id} className={NEXTSAAS_CASE_STUDY_CAPABILITY_CARD_CLASS}>
            <span className={NEXTSAAS_CASE_STUDY_CAPABILITY_ICON_CLASS} aria-hidden>
              <CapabilityIcon icon={capability.icon} />
            </span>
            <p className={NEXTSAAS_CASE_STUDY_CAPABILITY_LABEL_CLASS}>{capability.label}</p>
            <p className={NEXTSAAS_CASE_STUDY_CAPABILITY_BODY_CLASS}>{capability.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
