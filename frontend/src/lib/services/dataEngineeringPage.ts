import type { ServiceFeature } from "./types";

export const DATA_ENGINEERING_FEATURES: ServiceFeature[] = [
  {
    title: "Data Pipeline Development",
    description: "ETL, ELT, and streaming jobs that run without a manual handoff.",
    icon: "automation",
  },
  {
    title: "Data Warehousing",
    description: "A cloud warehouse, lake, or lakehouse as the one place to query.",
    icon: "scale",
  },
  {
    title: "Big Data Engineering",
    description: "Spark-scale processing for volumes a single database job cannot hold.",
    icon: "performance",
  },
  {
    title: "Data Integration",
    description: "APIs, databases, and partner feeds joined onto one model.",
    icon: "maintain",
  },
  {
    title: "Data Quality & Governance",
    description: "Validation, access rules, and an owner before bad records spread.",
    icon: "secure",
  },
  {
    title: "Cloud Data Engineering",
    description: "Pipelines on AWS, Azure, or Google Cloud, including the migration.",
    icon: "mvp",
  },
  {
    title: "Data Analytics & BI",
    description: "Models and automated reports for Power BI, Tableau, and Looker.",
    icon: "seo",
  },
  {
    title: "AI & ML Data Infrastructure",
    description: "Feature tables and vector stores prepared for models.",
    icon: "ai",
  },
];
