export type CaseStudyImageAsset = {
  id: string;
  src: string;
  srcSet?: string;
  alt: string;
};

export const CASE_STUDY_GRID_IMAGE_PROJECT_IDS = [
  "opsflow",
  "governed-ai",
  "commiters",
  "neardrop-mvp",
  "prospectiq-ai",
  "ecoroute-intelligence",
  "ai-summarizer",
  "multi-role-crm",
  "browse-my-vacation",
] as const;

export const CASE_STUDY_IMAGE_ASSETS: CaseStudyImageAsset[] = [
  {
    id: "opsflow",
    src: "/assets/case-studies/ai-summarizer.png",
    srcSet: "/assets/case-studies/ai-summarizer.png 1x, /assets/case-studies/ai-summarizer@2x.png 2x",
    alt: "OpsFlow AI PDF ingestion engine converting unstructured documents into structured datasets",
  },
  {
    id: "governed-ai",
    src: "/assets/case-studies/work-governed-ai.png",
    srcSet: "/assets/case-studies/work-governed-ai.png 1x, /assets/case-studies/work-governed-ai@2x.png 2x",
    alt: "Governed enterprise AI policy gateway with MCP nodes and human-in-the-loop approval",
  },
  {
    id: "commiters",
    src: "/assets/case-studies/work-commiters.png",
    srcSet: "/assets/case-studies/work-commiters.png 1x, /assets/case-studies/work-commiters@2x.png 2x",
    alt: "Commiters spec-driven cloud website on a high-performance engineering console",
  },
  {
    id: "neardrop-mvp",
    src: "/assets/case-studies/work-neardrop.png",
    srcSet: "/assets/case-studies/work-neardrop.png 1x, /assets/case-studies/work-neardrop@2x.png 2x",
    alt: "NearDrop field logistics van with real-time GPS geofencing and live tracking pins",
  },
  {
    id: "prospectiq-ai",
    src: "/assets/case-studies/work-prospectiq.png",
    srcSet: "/assets/case-studies/work-prospectiq.png 1x, /assets/case-studies/work-prospectiq@2x.png 2x",
    alt: "ProspectIQ AI holographic B2B contact cards and governed lead-intelligence pipeline",
  },
  {
    id: "ecoroute-intelligence",
    src: "/assets/case-studies/work-ecoroute.png",
    srcSet: "/assets/case-studies/work-ecoroute.png 1x, /assets/case-studies/work-ecoroute@2x.png 2x",
    alt: "EcoRoute Intelligence green fleet routes with live emissions heatmap overlay",
  },
  {
    id: "ai-summarizer",
    src: "/assets/case-studies/work-ai-summarizer.png",
    srcSet: "/assets/case-studies/work-ai-summarizer.png 1x, /assets/case-studies/work-ai-summarizer@2x.png 2x",
    alt: "AI Summarizer turning document pages into a governed executive brief",
  },
  {
    id: "multi-role-crm",
    src: "/assets/case-studies/work-multi-role-crm.png",
    srcSet: "/assets/case-studies/work-multi-role-crm.png 1x, /assets/case-studies/work-multi-role-crm@2x.png 2x",
    alt: "Multi-role CRM operator screens with an AI chatbot co-pilot",
  },
  {
    id: "browse-my-vacation",
    src: "/assets/case-studies/work-browse-my-vacation.png",
    srcSet: "/assets/case-studies/work-browse-my-vacation.png 1x, /assets/case-studies/work-browse-my-vacation@2x.png 2x",
    alt: "BrowseMyVacation Rajasthan travel booking experience with Lake Palace scenery",
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

/** Hint responsive loading so retina Work cards pick the @2x asset. */
export function caseStudyImageSizes(projectId: string, layout: "horizontal" | "stacked"): string {
  if (projectId === "opsflow" || projectId === "commiters") {
    return "(min-width: 1024px) 540px, (min-width: 768px) 46vw, 92vw";
  }
  return layout === "horizontal" ? "(min-width: 768px) 420px, 92vw" : "(min-width: 768px) 360px, 92vw";
}
