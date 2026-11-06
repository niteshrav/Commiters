export type WorkStudyPipelineStep = {
  id: string;
  label: string;
  detail: string;
};

export type WorkStudyBar = {
  id: string;
  label: string;
  value: string;
  share: number;
};

export type WorkStudyTile = {
  id: string;
  value: string;
  label: string;
};

export type WorkStudyLane = {
  id: string;
  label: string;
  detail: string;
};

export type WorkStudyTable = {
  kicker: string;
  title: string;
  lead: string;
  columns: readonly string[];
  rows: readonly { id: string; cells: readonly string[] }[];
};

export type WorkStudyVisual = {
  pipeline: {
    kicker: string;
    title: string;
    lead: string;
    steps: readonly WorkStudyPipelineStep[];
  };
  bars?: {
    kicker: string;
    title: string;
    lead: string;
    caption: string;
    items: readonly WorkStudyBar[];
  };
  tiles?: {
    kicker: string;
    title: string;
    lead: string;
    items: readonly WorkStudyTile[];
  };
  lanes?: {
    kicker: string;
    title: string;
    lead: string;
    items: readonly WorkStudyLane[];
  };
  table?: WorkStudyTable;
};

export const WORK_CASE_STUDY_VISUALS: Record<string, WorkStudyVisual> = {
  "neardrop-mvp": {
    pipeline: {
      kicker: "Workflow",
      title: "The core journey, in one pass.",
      lead: "A concept presentation of how a visitor should move from discovery to a clear next step.",
      steps: [
        { id: "discover", label: "Discover", detail: "Start with a single destination and understand nearby options." },
        { id: "choose", label: "Choose", detail: "Review relevant details and make an informed selection." },
        { id: "continue", label: "Continue", detail: "Move forward with status and a usable next action." },
      ],
    },
    table: {
      kicker: "Journey record",
      title: "The presentation path, tabulated.",
      lead: "The same three steps documented in this study — not an unverified operations log.",
      columns: ["Step", "What the visitor should see"],
      rows: [
        { id: "discover", cells: ["Discover", "A single destination and nearby options."] },
        { id: "choose", cells: ["Choose", "Relevant details before a selection."] },
        { id: "continue", cells: ["Continue", "Status and a usable next action."] },
      ],
    },
  },
  "browse-my-vacation": {
    pipeline: {
      kicker: "Enquiry path",
      title: "From city search to a quote.",
      lead: "The live BrowseMyVacation path keeps discovery, package review, and enquiry in one journey.",
      steps: [
        { id: "search", label: "City-first search", detail: "Travelers start with a destination, not a forced date picker." },
        { id: "package", label: "Package review", detail: "Transparent pricing and View Details sit beside curated grids." },
        { id: "quote", label: "Customise & Quote", detail: "The enquiry stays inside the package flow." },
      ],
    },
    table: {
      kicker: "Live path",
      title: "Enquiry, as the product actually runs it.",
      lead: "Surfaces from browsemyvacations.com — city search, package grids, and Customise & Quote.",
      columns: ["Surface", "What it holds"],
      rows: [
        { id: "search", cells: ["City-first search", "Destination first — no forced date picker."] },
        { id: "package", cells: ["Package review", "Transparent pricing beside View Details."] },
        { id: "quote", cells: ["Customise & Quote", "The enquiry stays inside the package flow."] },
        { id: "scope", cells: ["Also in production", "Vacation Meter, MICE pages, and founder admin."] },
      ],
    },
  },
  commiters: {
    pipeline: {
      kicker: "Architecture",
      title: "A public site treated as a product.",
      lead: "Isolation, type-safe surfaces, and governed delivery—shown as stacked engineering layers.",
      steps: [
        { id: "spec", label: "Spec", detail: "Rigid component contracts before visual assembly." },
        { id: "surface", label: "Surface", detail: "Marketing, work, and product routes share one system." },
        { id: "govern", label: "Governance", detail: "Zero ambient authority across the public platform." },
      ],
    },
    tiles: {
      kicker: "Documented outcomes",
      title: "Performance held to a number.",
      lead: "Figures already recorded in this study—not projected marketing claims.",
      items: [
        { id: "lighthouse", value: "100/100", label: "Lighthouse Speed" },
        { id: "ttfb", value: "<150ms", label: "Time to first byte" },
      ],
    },
    table: {
      kicker: "Performance record",
      title: "Figures already on this study.",
      lead: "Lighthouse and TTFB as documented — not extrapolated traffic claims.",
      columns: ["Measure", "Recorded value"],
      rows: [
        { id: "lighthouse", cells: ["Lighthouse Speed", "100/100"] },
        { id: "ttfb", cells: ["Time to first byte", "<150ms"] },
        { id: "authority", cells: ["Ambient authority", "Zero across the public platform"] },
      ],
    },
    bars: {
      kicker: "Score on record",
      title: "Lighthouse, as shipped.",
      lead: "The 100/100 Lighthouse Speed figure already recorded for this site.",
      caption: "Documented Lighthouse Speed",
      items: [{ id: "lighthouse", label: "Lighthouse Speed", value: "100/100", share: 100 }],
    },
  },
  "ai-summarizer": {
    pipeline: {
      kicker: "Document pipeline",
      title: "Packets in. A brief out.",
      lead: "Governed ingestion reduces operational documents to schema-validated executive output.",
      steps: [
        { id: "ingest", label: "Streaming ingestion", detail: "Multi-page PDFs split into semantic chunks without losing table context." },
        { id: "invoke", label: "Policy-gated LLM", detail: "Calls stay inside authorized MCP sockets." },
        { id: "validate", label: "Schema validation", detail: "Structured JSON is cross-referenced against source text." },
        { id: "brief", label: "Executive brief", detail: "Reviewers receive a decision-ready summary, not another unread packet." },
      ],
    },
    table: {
      kicker: "Control points",
      title: "Where the packet is held.",
      lead: "Architecture from this study: ingestion, gated invocation, and schema validation.",
      columns: ["Stage", "Control"],
      rows: [
        { id: "ingest", cells: ["Streaming ingestion", "Multi-page PDFs split without losing table context."] },
        { id: "invoke", cells: ["Policy-gated LLM", "Calls stay inside authorized MCP sockets."] },
        { id: "validate", cells: ["Schema validation", "JSON is cross-referenced against source text."] },
        { id: "duration", cells: ["Documented duration", "4 weeks"] },
      ],
    },
    tiles: {
      kicker: "Study record",
      title: "What this engagement held.",
      lead: "Duration and stack already listed on the study — not projected throughput.",
      items: [
        { id: "duration", value: "4 wks", label: "Documented duration" },
        { id: "stack", value: "MCP", label: "Policy-gated sockets" },
        { id: "cloud", value: "Vertex AI", label: "Governed LLM runtime" },
      ],
    },
  },
  "multi-role-crm": {
    pipeline: {
      kicker: "Role flow",
      title: "Ask from authorized context only.",
      lead: "Session-scoped permissions decide which records appear before RAG answers a question.",
      steps: [
        { id: "sign-in", label: "Role sign-in", detail: "Admin, Manager, or Field Agent inherits a session." },
        { id: "scope", label: "Scoped records", detail: "The dashboard only shows work the role may see." },
        { id: "ask", label: "RAG answer", detail: "The chatbot replies from that authorized context." },
        { id: "sync", label: "Live sync", detail: "WebSockets keep the three roles aligned." },
      ],
    },
    lanes: {
      kicker: "Access model",
      title: "One CRM, three operating lanes.",
      lead: "Customer work is shared; authority is not. Each role stays inside its permissioned view.",
      items: [
        { id: "admin", label: "Admin", detail: "Full operational oversight of customer records and policy." },
        { id: "manager", label: "Manager", detail: "Team-level customer work and supervised AI answers." },
        { id: "field", label: "Field Agent", detail: "Assigned records and in-context assistance only." },
      ],
    },
    table: {
      kicker: "Permission record",
      title: "Three roles. One customer record.",
      lead: "Admin, Manager, and Field Agent as documented — authority is not shared equally.",
      columns: ["Role", "What the session may see"],
      rows: [
        { id: "admin", cells: ["Admin", "Full operational oversight of customer records and policy."] },
        { id: "manager", cells: ["Manager", "Team-level customer work and supervised AI answers."] },
        { id: "field", cells: ["Field Agent", "Assigned records and in-context assistance only."] },
      ],
    },
    tiles: {
      kicker: "Access model",
      title: "The operating surface.",
      lead: "Role count and live sync from this study — not invented conversion rates.",
      items: [
        { id: "roles", value: "3", label: "Operating roles" },
        { id: "sync", value: "Live", label: "WebSocket alignment" },
        { id: "rag", value: "RAG", label: "Answers from authorized context" },
      ],
    },
  },
  "prospectiq-ai": {
    pipeline: {
      kicker: "Decision support",
      title: "Five agents. One explanation.",
      lead: "Deterministic scoring remains the source of truth. Gemini explains it; it does not override it.",
      steps: [
        { id: "score", label: "Scoring engine", detail: "Lead score, EMI, capacity, and risk stay calculated—not guessed." },
        { id: "intel", label: "Prospect Intelligence", detail: "Intent and quality class for the underwriter." },
        { id: "repay", label: "Repayment Capacity", detail: "Affordability and suggested EMI in sequence." },
        { id: "loan", label: "Loan Recommendation", detail: "Eligible products and next-best action." },
        { id: "report", label: "Decision report", detail: "A human still reviews before any lending decision." },
      ],
    },
    table: {
      kicker: "Agent sequence",
      title: "Five specialists. One report.",
      lead: "The sequential ADK workflow on record. Gemini explains scores; it does not approve loans.",
      columns: ["Agent", "Responsibility"],
      rows: [
        { id: "intel", cells: ["Prospect Intelligence", "Intent and quality class for the underwriter."] },
        { id: "repay", cells: ["Repayment Capacity", "Affordability and suggested EMI."] },
        { id: "loan", cells: ["Loan Recommendation", "Eligible products and next-best action."] },
        { id: "underwrite", cells: ["Underwriting Assistant", "Risk context for human review."] },
        { id: "report", cells: ["Decision Report", "A downloadable brief — not an approval."] },
      ],
    },
    tiles: {
      kicker: "Safeguards on record",
      title: "Explain. Do not decide.",
      lead: "Agent count and underwriting rule from the published study.",
      items: [
        { id: "agents", value: "5", label: "Sequential ADK agents" },
        { id: "truth", value: "Deterministic", label: "Scoring remains the source of truth" },
        { id: "hitl", value: "HITL", label: "Human-in-the-loop underwriting" },
      ],
    },
  },
  "ecoroute-intelligence": {
    pipeline: {
      kicker: "Agent collaboration",
      title: "Mobility data, then a recommendation.",
      lead: "Specialist agents analyze routes, flag congestion, and produce policy options for planners.",
      steps: [
        { id: "analyst", label: "Transit Analyst", detail: "Congestion, speed, and emissions from the sample set." },
        { id: "policy", label: "Policy Director", detail: "Short-term interventions and longer-term infrastructure options." },
        { id: "root", label: "Root Coordinator", detail: "Aggregated dashboards and a planner-ready recommendation." },
      ],
    },
    bars: {
      kicker: "Prototype record",
      title: "The corridors that needed a decision.",
      lead: "Validated figures from the EcoRoute prototype—not extrapolated traffic forecasts.",
      caption: "Sample dataset on record",
      items: [
        { id: "routes", label: "Routes analyzed", value: "15", share: 100 },
        { id: "critical", label: "High-risk corridors", value: "6", share: 40 },
        { id: "peak", label: "Peak on ROUTE_9", value: "740 kg/h CO₂", share: 72 },
      ],
    },
    table: {
      kicker: "Prototype record",
      title: "The mobility sample, in figures.",
      lead: "Validated EcoRoute prototype numbers — 15 routes, 6 corridors, and the ROUTE_9 peak.",
      columns: ["Indicator", "Recorded value"],
      rows: [
        { id: "routes", cells: ["Routes analyzed", "15 sample traffic routes"] },
        { id: "critical", cells: ["Critical congestion routes", "6 high-risk corridors"] },
        { id: "peak", cells: ["Peak CO₂ emissions", "740 kg/hour on ROUTE_9"] },
      ],
    },
    tiles: {
      kicker: "Sample set",
      title: "What the prototype measured.",
      lead: "The same three figures already listed in this study.",
      items: [
        { id: "routes", value: "15", label: "Routes analyzed" },
        { id: "critical", value: "6", label: "High-risk corridors" },
        { id: "peak", value: "740 kg/h", label: "Peak CO₂ on ROUTE_9" },
      ],
    },
  },
};
