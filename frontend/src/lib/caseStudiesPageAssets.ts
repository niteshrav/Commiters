export type CaseStudyImageAsset = {
  id: string;
  src: string;
  srcSet?: string;
  alt: string;
};

export const CASE_STUDY_GRID_IMAGE_PROJECT_IDS = [
  "commiters",
  "ai-summarizer",
  "multi-role-crm",
  "neardrop-mvp",
  "nextsaas",
] as const;

export const CASE_STUDY_IMAGE_ASSETS: CaseStudyImageAsset[] = [
  {
    id: "commiters",
    src: "/assets/case-studies/commiters.png",
    srcSet: "/assets/case-studies/commiters@2x.png 2x",
    alt: "Commiters digital architecture showcase with code and data visualizations",
  },
  {
    id: "ai-summarizer",
    src: "/assets/case-studies/ai-summarizer.png",
    srcSet: "/assets/case-studies/ai-summarizer@2x.png 2x",
    alt: "AI Summarizer generative AI landscape with a vertical blue light beam",
  },
  {
    id: "multi-role-crm",
    src: "/assets/case-studies/multi-role-crm.png",
    srcSet: "/assets/case-studies/multi-role-crm@2x.png 2x",
    alt: "Multi-Role CRM analytics dashboard with a blue network operations icon",
  },
  {
    id: "neardrop-mvp",
    src: "/assets/case-studies/neardrop-mvp.png",
    srcSet: "/assets/case-studies/neardrop-mvp@2x.png 2x",
    alt: "NearDrop MVP delivery map with teal location pins on a tablet",
  },
  {
    id: "nextsaas",
    src: "/assets/case-studies/nextsaas.png",
    srcSet: "/assets/case-studies/nextsaas@2x.png 2x",
    alt: "Colorful laptop displaying NextSaas automated pipeline analytics dashboards",
  },
] as const;

export function caseStudyHasImage(projectId: string): boolean {
  return CASE_STUDY_IMAGE_ASSETS.some((entry) => entry.id === projectId);
}

export function caseStudyImageSrc(projectId: string): string {
  const asset = CASE_STUDY_IMAGE_ASSETS.find((entry) => entry.id === projectId);
  if (!asset) throw new Error(`Missing case study image for ${projectId}`);
  return asset.src;
}

export function caseStudyImageSrcSet(projectId: string): string | undefined {
  const asset = CASE_STUDY_IMAGE_ASSETS.find((entry) => entry.id === projectId);
  if (!asset) throw new Error(`Missing case study image for ${projectId}`);
  return asset.srcSet;
}

export function caseStudyImageAlt(projectId: string): string {
  const asset = CASE_STUDY_IMAGE_ASSETS.find((entry) => entry.id === projectId);
  if (!asset) throw new Error(`Missing case study image for ${projectId}`);
  return asset.alt;
}
