export const ECOROUTE_DISPLAY = {
  heroTagline: "Smarter Routes. Greener Fleets.",
  heroLead: "Real-time fleet intelligence for efficient, low-emission logistics.",
  heroChips: ["Optimized Route", "Lower Emissions"] as const,
  metricsHeading: "Built to Move Smarter",
  architectureHeading: "Smart by Design",
  ctaTitle: "Ready to Move Smarter?",
  ctaSubtext: "Build efficient logistics with real-time intelligence.",
  metricFigures: {
    emissions: "24%",
    latency: "<100ms",
    uptime: "99.99%",
  } as const,
  architecture: {
    geo: { title: "Geo-Route Engine", body: "Faster route decisions" },
    rls: { title: "Secure Fleet Access", body: "Safe, isolated data" },
    ui: { title: "Live Fleet UI", body: "Real-time tracking" },
  } as const,
  features: {
    routing: "Adaptive Routing",
    rls: "Session-Safe Data",
    dashboard: "60fps Fleet View",
  } as const,
} as const;
