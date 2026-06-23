export type ServiceSectionMeta = {
  sectionId: string;
  index: string;
  kicker: string;
  title: string;
  titleAccent: string;
};

export const SERVICE_PAGE_SECTIONS: ServiceSectionMeta[] = [
  {
    sectionId: "website-development",
    index: "01",
    kicker: "WEBSITE DEVELOPMENT",
    title: "Fast, beautiful websites that",
    titleAccent: "convert",
  },
  {
    sectionId: "web-applications",
    index: "02",
    kicker: "WEB APPLICATIONS",
    title: "Custom web apps built to",
    titleAccent: "scale",
  },
  {
    sectionId: "mobile-applications",
    index: "03",
    kicker: "MOBILE APPLICATIONS",
    title: "One codebase, two platforms,",
    titleAccent: "zero compromise",
  },
  {
    sectionId: "automation-tools",
    index: "04",
    kicker: "AUTOMATION TOOLS",
    title: "Workflows that eliminate",
    titleAccent: "manual work",
  },
  {
    sectionId: "ai-integration",
    index: "05",
    kicker: "AI INTEGRATION",
    title: "LLMs wired the right way —",
    titleAccent: "production-ready",
  },
  {
    sectionId: "mvp-development",
    index: "06",
    kicker: "MVP DEVELOPMENT",
    title: "Ship your MVP in",
    titleAccent: "weeks",
  },
];

export function serviceSectionMeta(sectionId: string): ServiceSectionMeta | undefined {
  return SERVICE_PAGE_SECTIONS.find((s) => s.sectionId === sectionId);
}
