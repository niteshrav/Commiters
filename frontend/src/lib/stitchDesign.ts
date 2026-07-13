/** Google Stitch preview the site is aligned to (May 2026). */
export const STITCH_PROJECT_ID = "15498726935719082035" as const;
export const STITCH_PREVIEW_NODE_ID = "36209a9664dd425f8a56bb19e6841473" as const;
export const STITCH_PRIVACY_PREVIEW_NODE_ID = "2b804f684c5843eeb60b0458e7791889" as const;
export const STITCH_TERMS_PREVIEW_NODE_ID = "8ffb701bbc824415a7ea1b91e638e645" as const;
export const STITCH_JOIN_US_PREVIEW_NODE_ID = "2df09e96dafb4150b8425aa79f376b20" as const;
export const STITCH_TECHNICAL_LEDGER_PREVIEW_NODE_ID = "d3c0a8479fb44f93b19d93f99aba2971" as const;
export const STITCH_THANK_YOU_PREVIEW_NODE_ID = "cdffe3f786c0490b9a05b69a7a66416d" as const;

export const STITCH_PREVIEW_URL =
  `https://stitch.withgoogle.com/preview/${STITCH_PROJECT_ID}?node-id=${STITCH_PREVIEW_NODE_ID}&raw=1` as const;

export const STITCH_PRIVACY_PREVIEW_URL =
  `https://stitch.withgoogle.com/preview/${STITCH_PROJECT_ID}?node-id=${STITCH_PRIVACY_PREVIEW_NODE_ID}&raw=1` as const;

export const STITCH_TERMS_PREVIEW_URL =
  `https://stitch.withgoogle.com/preview/${STITCH_PROJECT_ID}?node-id=${STITCH_TERMS_PREVIEW_NODE_ID}&raw=1` as const;

export const STITCH_JOIN_US_PREVIEW_URL =
  `https://stitch.withgoogle.com/preview/${STITCH_PROJECT_ID}?node-id=${STITCH_JOIN_US_PREVIEW_NODE_ID}&raw=1` as const;

export const STITCH_TECHNICAL_LEDGER_PREVIEW_URL =
  `https://stitch.withgoogle.com/preview/${STITCH_PROJECT_ID}?node-id=${STITCH_TECHNICAL_LEDGER_PREVIEW_NODE_ID}&raw=1` as const;

export const STITCH_THANK_YOU_PREVIEW_URL =
  `https://stitch.withgoogle.com/preview/${STITCH_PROJECT_ID}?node-id=${STITCH_THANK_YOU_PREVIEW_NODE_ID}&raw=1` as const;

/** Copy and labels from Stitch preview screenshots. */
export const STITCH_COPY = {
  navCta: "Start Project",
  engineeringPrecision: "ENGINEERING PRECISION",
  home: {
    title: "Code Your Success",
    subtext:
      "We transform complex architectural challenges into scalable, production-ready systems. Founder-led engineering for high-stakes digital products.",
    ctaPrimary: "Start Your Project",
    ctaSecondary: "Meet Our Team",
    sprintLabel: "CURRENT SPRINT",
    sprintValue: "v2.4.0 Engine",
  },
  homeReadyCta: {
    title: "Ready to Build the Future?",
    subtext: "Join the ranks of high-performance companies powered by Commiters engineering.",
    button: "Start Your Project Cycle",
  },
  about: {
    title: "We build the invisible architecture that powers digital leaders.",
    subtext:
      "Commiters is a boutique engineering studio founded on the principle that code should be as elegant as it is robust. Led by Nitesh Rav, we translate complex business logic into scalable digital reality.",
    visionTitle: "A Vision of Craftsmanship",
    visionBody:
      "Founded by Nitesh Rav, Commiters emerged from a decade of high-stakes engineering in the global tech hubs. Nitesh noticed a gap between rapid development and long-term maintainability. He built this studio to prove that speed and precision aren't mutually exclusive.",
  },
  services: {
    kicker: "OUR EXPERTISE",
    title: "Engineering solutions for the modern web.",
    subtext:
      "We build high-performance digital products with surgical precision. From architectural design to deployment, we are your engineering partner.",
  },
  caseStudies: {
    kicker: "CASE STUDIES",
    title: "Engineering Precision for Digital Pioneers.",
    subtext:
      "We partner with founders to build products that define categories. From high-performance fintech dashboards to AI-orchestrated logistics.",
  },
  technicalLedger: {
    title: "Technical Ledger",
    subtext:
      "Engineering insights, architectural deep-dives, and the future of founder-led software.",
  },
  terms: {
    title: "Terms of Service",
    lastUpdatedLabel: "Last updated:",
    lastUpdatedDate: "April 15, 2026",
    enterpriseCta: {
      title: "Have Enterprise Questions?",
      description:
        "If you have questions regarding these terms or require a customized Master Service Agreement (MSA) for your enterprise project, please contact our support team.",
      buttonLabel: "Contact Support",
    },
  },
  contact: {
    title: "Let's build with engineering precision.",
    subtext:
      "We specialize in turning complex architectural challenges into clean, scalable software. Reach out to start a technical consultation.",
    formTitle: "Direct Inquiry",
    nameLabel: "Full Name",
    namePlaceholder: "John Doe",
    emailLabel: "Email Address",
    emailPlaceholder: "john@company.com",
    projectTypeLabel: "Project Type",
    messageLabel: "Brief Project Summary",
    messagePlaceholder: "How can we help you solve your engineering challenges?",
    submitButton: "Submit Inquiry",
  },
  thankYou: {
    title: "Submission Received",
    views: {
      client: {
        label: "Client View",
        body: "Thank you for reaching out. Our lead engineer will review your project requirements and get in touch within 4 business hours to discuss the next steps.",
      },
      candidate: {
        label: "Candidate View",
        body: "Your application to join the team has been received. We appreciate your interest in Commiters. Our team will review your credentials and reach out if there's a match.",
      },
    },
    backToHomeLabel: "Back to Home",
    projectLedgerLabel: "View Project Ledger",
    infrastructureLabel: "Official Infrastructure By",
  },
  joinUs: {
    kicker: "CAREERS AT COMMITERS",
    title: "Build the digital backbone of the future.",
    subtext:
      "We are looking for precision-driven engineers and designers to join our core team in Udaipur. Every line of code counts.",
    sections: {
      personal: { number: "01.", title: "Personal Information" },
      digital: { number: "02.", title: "Digital Footprint" },
      credentials: { number: "03.", title: "Credentials" },
      core: { number: "04.", title: "The Core" },
    },
    nameLabel: "Full Name",
    namePlaceholder: "John Doe",
    emailLabel: "Email Address",
    emailPlaceholder: "john@example.com",
    phoneLabel: "Phone Number",
    phonePlaceholder: "+91 00000 00000",
    positionLabel: "Position Applied For",
    linkedinLabel: "LinkedIn Profile",
    linkedinPlaceholder: "https://linkedin.com/in/username",
    portfolioLabel: "Portfolio / GitHub",
    portfolioPlaceholder: "https://github.com/username",
    resumeLabel: "Resume Upload",
    resumeHint: "Click to upload or drag and drop",
    resumeHelp: "PDF only, max 5MB",
    coverLetterLabel: "Cover Letter / Why Commiters?",
    coverLetterPlaceholder:
      "Tell us about a project where you prioritized precision over speed...",
    privacyDisclaimer:
      "By submitting, you agree to our recruitment privacy terms. We handle your data with the same precision we apply to our code.",
    submitButton: "Submit Application",
  },
  cookie: {
    kicker: "COMPLIANCE",
    title: "Cookie Policy",
    lastUpdatedLabel: "Last Updated:",
    lastUpdatedDate: "April 15, 2026",
    manageCta: {
      title: "How to manage cookies",
      description:
        "You can control and delete cookies through your browser settings. Blocking some cookies may impact your experience on our website.",
      buttonLabel: "Manage Cookie Preferences",
      privacyLinkLabel: "Read Privacy Policy",
    },
    disclaimer:
      "By continuing to use this website, you consent to our use of cookies as described in this policy. For questions, contact our data compliance team.",
    consentBanner: {
      title: "We value your privacy",
      description:
        "We use cookies to keep Commiters.com secure, remember your preferences, and understand how the site is used. You can accept all cookies or choose which optional categories to allow.",
      acceptAllLabel: "Accept All",
      essentialOnlyLabel: "Essential Only",
      manageLabel: "Manage Preferences",
      policyLinkLabel: "Cookie Policy",
    },
    preferencesPanel: {
      title: "Cookie Preferences",
      description:
        "Choose which optional cookies we may store. Strictly necessary cookies are always active because they keep the site secure and usable.",
      saveLabel: "Save Preferences",
      cancelLabel: "Cancel",
      necessaryStatusLabel: "Always active",
    },
  },
  accessibility: {
    skipLinkLabel: "Skip to main content",
    widgetLabel: "Accessibility options",
    panelTitle: "Accessibility Settings",
    panelDescription:
      "Adjust display and motion preferences to make Commiters.com easier to read and navigate. Your choices are saved on this device.",
    textSizeLabel: "Text size",
    textSizeOptions: {
      default: "Default",
      large: "Large",
      xlarge: "Extra large",
    },
    highContrastLabel: "High contrast",
    highContrastDescription: "Increase contrast between text, buttons, and backgrounds.",
    underlineLinksLabel: "Underline links",
    underlineLinksDescription: "Make text links easier to spot across the site.",
    reduceMotionLabel: "Reduce motion",
    reduceMotionDescription: "Minimize animations and smooth scrolling effects.",
    resetLabel: "Reset accessibility settings",
    closeLabel: "Close",
  },
  privacy: {
    title: "Privacy Policy",
    lastUpdatedLabel: "LAST UPDATED:",
    lastUpdatedDate: "April 15, 2026",
    introBeforeBold: "At ",
    introBold: "Commiters Softwares",
    introAfterBold:
      ", data protection and transparency are the pillars of our engineering philosophy. This policy outlines how we handle your digital footprint with surgical precision and absolute integrity.",
    dpoCta: {
      title: "Have specific privacy questions?",
      description:
        "Our Data Protection Officer is ready to assist with any inquiries regarding your personal data.",
      buttonLabel: "Contact DPO",
    },
  },
} as const;
