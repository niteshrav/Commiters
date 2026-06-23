import { CONTACT_SECTION_SEPARATOR_CLASS, CONTACT_SECTION_SEPARATOR_TEST_ID } from "../lib/contactSectionLayout";

export default function ContactSectionSeparator() {
  return (
    <hr
      className={`contact-section-separator band-breakout ${CONTACT_SECTION_SEPARATOR_CLASS}`}
      data-testid={CONTACT_SECTION_SEPARATOR_TEST_ID}
    />
  );
}
