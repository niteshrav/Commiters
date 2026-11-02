import { ROUTES } from "./routes";
import { buildWhatsAppUrl } from "./siteContact";
import {
  PLANNER_ERRORS,
  PLANNER_HINTS,
  PLANNER_STEPS,
  PLANNER_TECH,
  PLANNER_THEMES,
  PLANNER_TIMELINES,
  PLANNER_TYPES,
  type PlannerListKind,
  type PlannerTypeId,
} from "./homePlannerData";

export type PlannerState = {
  step: number;
  type: PlannerTypeId | "";
  customName: string;
  extras: Record<PlannerListKind, string[]>;
  answers: Record<string, string>;
  features: string[];
  tech: string;
  theme: string;
  pages: string[];
  integrations: string[];
  timeline: string;
};

export const EMPTY_PLANNER_STATE: PlannerState = {
  step: 0,
  type: "",
  customName: "",
  extras: { features: [], pages: [], integrations: [] },
  answers: {},
  features: [],
  tech: "",
  theme: "",
  pages: [],
  integrations: [],
  timeline: "",
};

type OptionItem = { id: string; label: string; note?: string };

export function plannerType(id: string | "") {
  if (!id || !(id in PLANNER_TYPES)) return null;
  return PLANNER_TYPES[id as PlannerTypeId];
}

export function byId<T extends { id: string }>(list: readonly T[], id: string): T | null {
  return list.find((item) => item.id === id) ?? null;
}

function selectedLabels(list: readonly OptionItem[], ids: string[]): string[] {
  return list.filter((item) => ids.includes(item.id)).map((item) => item.label);
}

export function stepName(state: PlannerState, index: number): string {
  const type = plannerType(state.type);
  if (PLANNER_STEPS[index]?.id === "pages" && type) return type.pagesName;
  return PLANNER_STEPS[index]?.label ?? "";
}

export function answerLabels(state: PlannerState): { question: string; answer: string }[] {
  const type = plannerType(state.type);
  if (!type) return [];
  return type.questions
    .map((q) => {
      const opt = byId(q.options, state.answers[q.id] ?? "");
      return opt ? { question: q.label, answer: opt.label } : null;
    })
    .filter((item): item is { question: string; answer: string } => Boolean(item));
}

export function projectLabel(state: PlannerState): string {
  const type = plannerType(state.type);
  if (!type) return "Project";
  if (state.type === "custom") return state.customName.trim() || "Custom";
  return type.label;
}

export function listLabels(state: PlannerState, kind: PlannerListKind): string[] {
  const type = plannerType(state.type);
  const source = type ? type[kind] : [];
  const selected = type ? selectedLabels(source, state[kind]) : [];
  return selected.concat(state.extras[kind]);
}

export function focusText(state: PlannerState): string {
  const type = plannerType(state.type);
  if (!type) return "Choose a project type to start the blueprint.";
  const answers = answerLabels(state).map((item) => item.answer);
  const features = listLabels(state, "features").slice(0, 3);
  const featureLine = features.length
    ? `First emphasis: ${features.join(", ")}.`
    : "Feature priority will be confirmed during consultation.";
  const theme = byId(PLANNER_THEMES, state.theme);
  const timeline = byId(PLANNER_TIMELINES, state.timeline);
  const lead = state.type === "custom" && state.customName.trim()
    ? `Custom project: ${state.customName.trim()}.`
    : type.lead;
  return [
    lead,
    `Context: ${answers.join(" · ") || "to be confirmed"}.`,
    featureLine,
    `Visual direction: ${theme ? theme.label : "to be confirmed"}.`,
    `Timing: ${timeline ? timeline.label : "to be confirmed"}.`,
  ].join(" ");
}

function sectionItems(labels: string[]): string[] {
  return labels.length ? labels : ["To be confirmed during consultation"];
}

export function blueprintSections(state: PlannerState): { title: string; items: string[] }[] {
  const type = plannerType(state.type);
  const answers = answerLabels(state);
  const tech = byId(PLANNER_TECH, state.tech);
  const theme = byId(PLANNER_THEMES, state.theme);
  const timeline = byId(PLANNER_TIMELINES, state.timeline);
  return [
    { title: "Project details", items: sectionItems(answers.map((item) => `${item.question}: ${item.answer}`)) },
    { title: "Features", items: sectionItems(listLabels(state, "features")) },
    { title: "Technology", items: sectionItems(tech ? [tech.label] : []) },
    { title: "Design theme", items: sectionItems(theme ? [theme.label] : []) },
    { title: type ? type.pagesName : "Pages", items: sectionItems(listLabels(state, "pages")) },
    { title: "Integrations", items: sectionItems(listLabels(state, "integrations")) },
    { title: "Timeline", items: sectionItems(timeline ? [timeline.label] : []) },
  ];
}

export function blueprintPlain(state: PlannerState): string {
  const lines = [`${projectLabel(state)} blueprint`, focusText(state), ""];
  blueprintSections(state).forEach((sec) => {
    lines.push(sec.title);
    sec.items.forEach((item) => lines.push(`- ${item}`));
    lines.push("");
  });
  return lines.join("\n");
}

export function enquiryText(state: PlannerState): string {
  if (!plannerType(state.type)) {
    return "Hello Commiters,\n\nI would like to enquire about a project.";
  }
  return [
    "Hello Commiters,",
    "",
    `I would like to enquire about a ${projectLabel(state)} project.`,
    "",
    blueprintPlain(state),
  ].join("\n");
}

export function plannerWhatsAppHref(state: PlannerState): string {
  const text = enquiryText(state);
  const message = text.length > 1500 ? `${text.slice(0, 1500).trim()}\n...` : text;
  return buildWhatsAppUrl(message);
}

export function plannerContactTo(): string {
  return ROUTES.contact;
}

export function stepValid(state: PlannerState, index: number): boolean {
  const id = PLANNER_STEPS[index]?.id;
  const type = plannerType(state.type);
  if (id === "type") return Boolean(state.type) && (state.type !== "custom" || Boolean(state.customName.trim()));
  if (id === "questions") return Boolean(type) && type.questions.every((q) => state.answers[q.id]);
  if (id === "tech") return Boolean(state.tech);
  if (id === "theme") return Boolean(state.theme);
  if (id === "timeline") return Boolean(state.timeline);
  return true;
}

export function stepError(state: PlannerState): string {
  if (PLANNER_STEPS[state.step]?.id === "type" && state.type === "custom") {
    return "Enter a project name to continue.";
  }
  const id = PLANNER_STEPS[state.step]?.id ?? "";
  return PLANNER_ERRORS[id as keyof typeof PLANNER_ERRORS] || "Complete this step to continue.";
}

export function hintText(state: PlannerState): string {
  const id = PLANNER_STEPS[state.step]?.id;
  const type = plannerType(state.type);
  if (id === "pages" && type) return type.pagesHint;
  return (id && PLANNER_HINTS[id as keyof typeof PLANNER_HINTS]) || "";
}

export function stageTitle(state: PlannerState): string {
  const type = plannerType(state.type);
  const id = PLANNER_STEPS[state.step]?.id;
  const map: Record<string, string> = {
    type: "Select the project type",
    questions: "Confirm the project details",
    features: "Which capabilities should be prioritised?",
    tech: "Select a technology preference",
    theme: "Select a visual direction",
    pages: type ? type.pagesTitle : "What should the first version include?",
    integrations: "Select the required integrations",
    timeline: "Select a preferred timeline",
    blueprint: "Project blueprint",
  };
  return map[id ?? ""] ?? "";
}

export function summaryValue(labels: string[]): string {
  if (!labels.length) return "Not selected";
  if (labels.length <= 3) return labels.join(", ");
  return `${labels.slice(0, 3).join(", ")} +${labels.length - 3}`;
}

export function summaryRows(state: PlannerState): [string, string][] {
  const type = plannerType(state.type);
  const answers = answerLabels(state).map((item) => item.answer);
  const tech = byId(PLANNER_TECH, state.tech);
  const theme = byId(PLANNER_THEMES, state.theme);
  const timeline = byId(PLANNER_TIMELINES, state.timeline);
  return [
    ["Project", type ? projectLabel(state) : "Not selected"],
    ["Details", summaryValue(answers)],
    ["Features", summaryValue(listLabels(state, "features"))],
    ["Technology", tech ? tech.label : "Not selected"],
    ["Theme", theme ? theme.label : "Not selected"],
    [type ? type.pagesName : "Pages", summaryValue(listLabels(state, "pages"))],
    ["Integrations", summaryValue(listLabels(state, "integrations"))],
    ["Timing", timeline ? timeline.label : "Not selected"],
  ];
}

function pdfText(value: string): string {
  return String(value)
    .replace(/\u2014/g, "-")
    .replace(/\u2013/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\u00B7/g, "|")
    .replace(/[^\x20-\x7E]/g, " ");
}

function pdfEscape(value: string): string {
  return pdfText(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function pdfLines(state: PlannerState): { text: string; size: number; gap: number }[] {
  const date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const lines: { text: string; size: number; gap: number }[] = [
    { text: "COMMITERS", size: 11, gap: 16 },
    { text: "Project blueprint", size: 18, gap: 18 },
    { text: `${projectLabel(state)}  |  ${date}`, size: 11, gap: 18 },
    { text: focusText(state), size: 11, gap: 18 },
  ];
  blueprintSections(state).forEach((sec) => {
    lines.push({ text: sec.title, size: 13, gap: 15 });
    sec.items.forEach((item) => lines.push({ text: `- ${item}`, size: 11, gap: 15 }));
    lines.push({ text: "", size: 11, gap: 6 });
  });
  lines.push({ text: "This blueprint prepares a conversation. It does not confirm scope.", size: 10, gap: 14 });
  lines.push({ text: "hello@commiters.com", size: 11, gap: 14 });
  return lines;
}

function wrapPdfLines(lines: { text: string; size: number; gap: number }[]) {
  const wrapped: { text: string; size: number; gap: number }[] = [];
  lines.forEach((line) => {
    const size = line.size || 11;
    const text = pdfText(line.text || " ");
    const max = size >= 16 ? 46 : 86;
    const words = text.split(/\s+/).filter(Boolean);
    if (!words.length) {
      wrapped.push({ text: " ", size, gap: line.gap || 8 });
      return;
    }
    let current = "";
    words.forEach((word) => {
      const next = current ? `${current} ${word}` : word;
      if (next.length > max && current) {
        wrapped.push({ text: current, size, gap: size + 4 });
        current = word;
      } else current = next;
    });
    wrapped.push({ text: current, size, gap: line.gap || size + 5 });
  });
  return wrapped;
}

function buildPdfBytes(state: PlannerState): Uint8Array {
  const wrapped = wrapPdfLines(pdfLines(state));
  const pages: { text: string; size: number; y: number }[][] = [];
  let bucket: { text: string; size: number; y: number }[] = [];
  let y = 742;
  wrapped.forEach((item) => {
    if (y - item.gap < 54 && bucket.length) {
      pages.push(bucket);
      bucket = [];
      y = 742;
    }
    bucket.push({ text: item.text, size: item.size, y });
    y -= item.gap;
  });
  if (!bucket.length) bucket.push({ text: "Project blueprint", size: 18, y: 742 });
  pages.push(bucket);

  let nextId = 1;
  const fontId = nextId++;
  const pagesId = nextId++;
  const catalogId = nextId++;
  const contentIds = pages.map(() => nextId++);
  const pageIds = pages.map(() => nextId++);
  const bodies: string[] = [];
  bodies[fontId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
  bodies[pagesId] = `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>`;
  bodies[catalogId] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
  pages.forEach((items, index) => {
    const stream =
      items
        .map((item) => `BT /F1 ${item.size} Tf 54 ${item.y} Td (${pdfEscape(item.text)}) Tj ET`)
        .join("\n") + "\n";
    bodies[contentIds[index]] = `<< /Length ${stream.length} >>\nstream\n${stream}endstream`;
    bodies[pageIds[index]] =
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 612 792] /Contents ${contentIds[index]} 0 R /Resources << /Font << /F1 ${fontId} 0 R >> >> >>`;
  });

  let out = "%PDF-1.4\n";
  const offsets = [0];
  for (let i = 1; i < bodies.length; i += 1) {
    offsets[i] = out.length;
    out += `${i} 0 obj\n${bodies[i]}\nendobj\n`;
  }
  const xref = out.length;
  out += `xref\n0 ${bodies.length}\n`;
  out += "0000000000 65535 f \n";
  for (let i = 1; i < bodies.length; i += 1) {
    out += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  out += `trailer << /Size ${bodies.length} /Root ${catalogId} 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new TextEncoder().encode(out);
}

export function downloadPlannerPdf(state: PlannerState): void {
  const safe = projectLabel(state).replace(/[^A-Za-z0-9]+/g, "-");
  const blob = new Blob([buildPdfBytes(state)], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Commiters-${safe}-Blueprint.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function toggleId(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

export function resetForType(state: PlannerState, id: PlannerTypeId): PlannerState {
  if (state.type === id) return { ...state, type: id, step: 0 };
  return {
    ...state,
    type: id,
    step: 0,
    answers: {},
    features: [],
    pages: [],
    integrations: [],
  };
}
