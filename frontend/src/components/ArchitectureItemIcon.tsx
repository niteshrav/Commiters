import { IconBolt, IconCloud, IconCodeBracket, IconGlobe, IconShieldCheck, IconUsers } from "./icons";

export function ArchitectureItemIcon({ id, title }: { id: string; title: string }) {
  const key = `${id} ${title}`.toLowerCase();
  if (id === "geo" || key.includes("geo-spatial") || key.includes("geo-route")) {
    return <IconGlobe width={18} height={18} />;
  }
  if (id === "enrichment" || key.includes("enrich")) {
    return <IconBolt width={18} height={18} />;
  }
  if (id === "mcp" || key.includes("mcp") || key.includes("policy")) {
    return <IconShieldCheck width={18} height={18} />;
  }
  if (id === "vibe-diff" || key.includes("human") || key.includes("vibe")) {
    return <IconUsers width={18} height={18} />;
  }
  if (key.includes("frontend") || key.includes("code") || key.includes("ui")) {
    return <IconCodeBracket width={18} height={18} />;
  }
  if (key.includes("security") || key.includes("govern") || key.includes("rls")) {
    return <IconShieldCheck width={18} height={18} />;
  }
  return <IconCloud width={18} height={18} />;
}
