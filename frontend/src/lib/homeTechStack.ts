/**
 * Simple Icons SVGs via jsDelivr (npm/simple-icons). Brand marks belong to their owners.
 * Cursor and Visual Studio use bundled SVGs (no reliable Simple Icons slug for VS on CDN).
 */
export type TechLogoDef = {
  slug: string;
  alt: string;
  /** Bundled or absolute icon URL when CDN slug is missing or incorrect */
  iconSrc?: string;
};

export const TECH_LOCAL_ICONS = {
  cursor: "/assets/tech/cursor.svg",
  visualStudio: "/assets/tech/visual-studio.svg",
} as const;

export const HOME_TECH_STACK_ROWS: TechLogoDef[][] = [
  [
    { slug: "react", alt: "React" },
    { slug: "nextdotjs", alt: "Next.js" },
    { slug: "nodedotjs", alt: "Node.js" },
    { slug: "typescript", alt: "TypeScript" },
    { slug: "python", alt: "Python" },
    { slug: "openjdk", alt: "Java" },
    { slug: "postgresql", alt: "PostgreSQL" },
  ],
  [
    { slug: "expo", alt: "React Native" },
    { slug: "openai", alt: "OpenAI" },
    { slug: "langchain", alt: "LangChain" },
    { slug: "vercel", alt: "Vercel" },
    { slug: "googlecloud", alt: "Google Cloud" },
    { slug: "google", alt: "Google ADK" },
  ],
  [
    { slug: "cursor", alt: "Cursor", iconSrc: TECH_LOCAL_ICONS.cursor },
    { slug: "anthropic", alt: "Claude" },
    { slug: "googlechrome", alt: "Antigravity" },
    { slug: "visualstudio", alt: "Visual Studio", iconSrc: TECH_LOCAL_ICONS.visualStudio },
  ],
];

export const HOME_TECH_STACK_ITEMS: TechLogoDef[] = HOME_TECH_STACK_ROWS.flat();

export const SIMPLE_ICONS_SVG_BASE = "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons";

export function resolveTechIconUrl(tech: TechLogoDef): string {
  if (tech.iconSrc) return tech.iconSrc;
  return `${SIMPLE_ICONS_SVG_BASE}/${tech.slug}.svg`;
}
