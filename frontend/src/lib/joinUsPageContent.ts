import { STITCH_COPY } from "./stitchDesign";
import { COMMITERS_EMAIL_SECONDARY } from "./siteContact";

export const JOIN_US_PAGE_ASSETS = {
  officePhoto: {
    src: "/assets/join-us/udaipur-office.jpg",
    alt: "Minimalist Commiters workspace in Udaipur with bright natural light, clean desks, and engineers focused on production software.",
  },
} as const;

export const JOIN_US_PAGE_COPY = {
  intro: {
    kicker: STITCH_COPY.joinUs.kicker,
    title: STITCH_COPY.joinUs.title,
    subtext: STITCH_COPY.joinUs.subtext,
  },
  sidebar: {
    title: "Precision First",
    body: "Our application process is designed to find those who value technical excellence and obsessive detail.",
    highlights: [
      {
        title: "Direct Review",
        body: "Human eyes review every submission. No automated filters.",
      },
      {
        title: "Fast Turnaround",
        body: "Expect a response within 48 business hours.",
      },
    ],
    applicationsEmailNote: `Applications are sent directly to ${COMMITERS_EMAIL_SECONDARY}`,
  },
  sections: STITCH_COPY.joinUs.sections,
  fields: {
    nameLabel: STITCH_COPY.joinUs.nameLabel,
    namePlaceholder: STITCH_COPY.joinUs.namePlaceholder,
    emailLabel: STITCH_COPY.joinUs.emailLabel,
    emailPlaceholder: STITCH_COPY.joinUs.emailPlaceholder,
    phoneLabel: STITCH_COPY.joinUs.phoneLabel,
    phonePlaceholder: STITCH_COPY.joinUs.phonePlaceholder,
    positionLabel: STITCH_COPY.joinUs.positionLabel,
    linkedinLabel: STITCH_COPY.joinUs.linkedinLabel,
    linkedinPlaceholder: STITCH_COPY.joinUs.linkedinPlaceholder,
    portfolioLabel: STITCH_COPY.joinUs.portfolioLabel,
    portfolioPlaceholder: STITCH_COPY.joinUs.portfolioPlaceholder,
    resumeLabel: STITCH_COPY.joinUs.resumeLabel,
    resumeHint: STITCH_COPY.joinUs.resumeHint,
    resumeHelp: STITCH_COPY.joinUs.resumeHelp,
    coverLetterLabel: STITCH_COPY.joinUs.coverLetterLabel,
    coverLetterPlaceholder: STITCH_COPY.joinUs.coverLetterPlaceholder,
  },
  privacyDisclaimer: STITCH_COPY.joinUs.privacyDisclaimer,
  submitButton: STITCH_COPY.joinUs.submitButton,
} as const;
