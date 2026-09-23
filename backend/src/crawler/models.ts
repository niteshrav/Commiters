import mongoose, { Schema, type Document, type Model } from "mongoose";
import type { CrawlJobStatus, CrawledPageStatus } from "./types";

export type CrawlJobDocument = Document & {
  startUrl: string;
  status: CrawlJobStatus;
  maxPages: number;
  maxDepth: number;
  timeout: number;
  retries: number;
  delay: number;
  sameSite: boolean;
  robotsEnabled: boolean;
  sitemapEnabled: boolean;
  pagesDiscovered: number;
  pagesCrawled: number;
  pagesFailed: number;
  pagesSkipped: number;
  currentUrl: string;
  error: string;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

const crawlJobSchema = new Schema<CrawlJobDocument>(
  {
    startUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "running", "completed", "failed", "cancelled"],
      default: "pending",
      index: true,
    },
    maxPages: { type: Number, required: true },
    maxDepth: { type: Number, required: true },
    timeout: { type: Number, required: true },
    retries: { type: Number, required: true },
    delay: { type: Number, required: true },
    sameSite: { type: Boolean, default: true },
    robotsEnabled: { type: Boolean, default: true },
    sitemapEnabled: { type: Boolean, default: false },
    pagesDiscovered: { type: Number, default: 0 },
    pagesCrawled: { type: Number, default: 0 },
    pagesFailed: { type: Number, default: 0 },
    pagesSkipped: { type: Number, default: 0 },
    currentUrl: { type: String, default: "" },
    error: { type: String, default: "" },
    startedAt: { type: Date },
    completedAt: { type: Date },
  },
  { timestamps: true },
);

export const CrawlJob: Model<CrawlJobDocument> =
  mongoose.models.CrawlJob ?? mongoose.model<CrawlJobDocument>("CrawlJob", crawlJobSchema);

export type CrawledPageDocument = Document & {
  crawlJobId: mongoose.Types.ObjectId;
  url: string;
  status: CrawledPageStatus;
  httpStatus: number | null;
  depth: number;
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  headings: { h1: string; h2: string[] };
  textContent: string;
  internalLinks: string[];
  externalLinks: string[];
  images: string[];
  error: string;
  crawledAt: Date;
};

const crawledPageSchema = new Schema<CrawledPageDocument>(
  {
    crawlJobId: { type: Schema.Types.ObjectId, ref: "CrawlJob", required: true, index: true },
    url: { type: String, required: true },
    status: { type: String, enum: ["crawled", "failed", "skipped"], required: true },
    httpStatus: { type: Number, default: null },
    depth: { type: Number, required: true },
    title: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    canonicalUrl: { type: String, default: "" },
    headings: {
      h1: { type: String, default: "" },
      h2: { type: [String], default: [] },
    },
    textContent: { type: String, default: "" },
    internalLinks: { type: [String], default: [] },
    externalLinks: { type: [String], default: [] },
    images: { type: [String], default: [] },
    error: { type: String, default: "" },
    crawledAt: { type: Date, default: Date.now },
  },
  { timestamps: false },
);

crawledPageSchema.index({ crawlJobId: 1, url: 1 }, { unique: true });

export const CrawledPage: Model<CrawledPageDocument> =
  mongoose.models.CrawledPage ?? mongoose.model<CrawledPageDocument>("CrawledPage", crawledPageSchema);
