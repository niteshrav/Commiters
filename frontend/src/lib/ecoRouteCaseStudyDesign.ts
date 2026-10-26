export const ECOROUTE_DISPLAY = {
  heroTagline: "Smarter Routes. Greener Fleets.",
  heroLead: "AI agents that analyze mobility data, flag bottlenecks, and recommend interventions.",
  heroChips: ["Congestion Hotspots", "Emissions Insights"] as const,
  metricsHeading: "Built to Move Smarter",
  architectureHeading: "Smart by Design",
  ctaTitle: "Ready to Move Smarter?",
  ctaSubtext: "Turn transportation data into congestion and emissions decisions.",
  metricFigures: {
    routes: "15",
    critical: "6",
    emissions: "740 kg/h",
  } as const,
  architecture: {
    geo: { title: "Transit Analyst", body: "Congestion and route insights" },
    rls: { title: "Policy Director", body: "Prioritized interventions" },
    ui: { title: "Root Coordinator", body: "Orchestrated recommendations" },
  } as const,
  features: {
    routing: "Congestion Detection",
    rls: "Policy Recommendations",
    dashboard: "Emissions Dashboards",
  } as const,
} as const;
