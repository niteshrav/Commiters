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
    src: "/assets/case-studies/ai-summarizer-execution-visual.png",
    srcSet: "/assets/case-studies/ai-summarizer-execution-visual@2x.png 2x",
    alt: "OpsFlow AI PDF ingestion engine converting unstructured documents into structured datasets",
  },
  {
    id: "governed-ai",
    src: "/assets/case-studies/multi-role-crm.png",
    srcSet: "/assets/case-studies/multi-role-crm@2x.png 2x",
    alt: "Governed enterprise AI pipeline with policy-gated invocation and row-level security",
  },
  {
    id: "commiters",
    src: "/assets/case-studies/commiters@2x.png",
    srcSet: "/assets/case-studies/commiters.png 1x, /assets/case-studies/commiters@2x.png 2x",
    alt: "Commiters digital architecture showcase with code and data visualizations",
  },
  {
    id: "neardrop-mvp",
    src: "/assets/case-studies/neardrop-mvp.png",
    srcSet: "/assets/case-studies/neardrop-mvp@2x.png 2x",
    alt: "NearDrop MVP delivery map with teal location pins on a tablet",
  },
  {
    id: "prospectiq-ai",
    src: "/assets/case-studies/prospectiq-ai.png",
    srcSet: "/assets/case-studies/prospectiq-ai@2x.png 2x",
    alt: "ProspectIQ AI governed B2B prospecting dashboard with lead enrichment workflows",
  },
  {
    id: "ecoroute-intelligence",
    src: "/assets/case-studies/ecoroute-intelligence.png",
    srcSet: "/assets/case-studies/ecoroute-intelligence@2x.png 2x",
    alt: "EcoRoute Intelligence fleet routing map with live telemetry and emissions analytics",
  },
  {
    id: "ai-summarizer",
    src: "/assets/case-studies/ai-summarizer-hero.png",
    srcSet: "/assets/case-studies/ai-summarizer-hero@2x.png 2x",
    alt: "AI Summarizer governed document ingestion pipeline with executive summary output",
  },
  {
    id: "multi-role-crm",
    src: "/assets/case-studies/multi-role-crm-hero.png",
    srcSet: "/assets/case-studies/multi-role-crm-hero@2x.png 2x",
    alt: "Multi-role CRM dashboard with AI chatbot workflows and operator views",
  },
  {
    id: "browse-my-vacation",
    src: "/assets/case-studies/browse-my-vacation-hero.png",
    srcSet: "/assets/case-studies/browse-my-vacation-hero@2x.png 2x",
    alt: "BrowseMyVacation travel platform with curated Rajasthan packages and quote flows",
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
