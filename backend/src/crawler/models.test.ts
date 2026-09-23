import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  create: vi.fn(),
  findById: vi.fn(),
  findByIdAndUpdate: vi.fn(),
  updateMany: vi.fn(),
  countDocuments: vi.fn(),
  find: vi.fn(),
  findOneAndUpdate: vi.fn(),
  findOne: vi.fn(),
  isMongoConnected: vi.fn(() => true),
  assertPublicHttpUrl: vi.fn(async () => new URL("https://example.com/")),
}));

vi.mock("./models", () => ({
  CrawlJob: {
    create: mocks.create,
    findById: mocks.findById,
    findByIdAndUpdate: mocks.findByIdAndUpdate,
    updateMany: mocks.updateMany,
    countDocuments: mocks.countDocuments,
    find: mocks.find,
  },
  CrawledPage: {
    findOneAndUpdate: mocks.findOneAndUpdate,
    find: mocks.find,
    countDocuments: mocks.countDocuments,
    findOne: mocks.findOne,
  },
}));

vi.mock("../cms/config/database", () => ({
  isMongoConnected: mocks.isMongoConnected,
}));

vi.mock("./ssrf", () => ({
  assertPublicHttpUrl: mocks.assertPublicHttpUrl,
}));

vi.mock("./runner", () => ({
  runCrawl: vi.fn(async () => undefined),
}));

vi.mock("./httpClient", () => ({
  createFetchPage: vi.fn(() => vi.fn()),
}));

import { cancelCrawlJob, failInterruptedJobs, persistPage, startCrawlJob } from "./service";

describe("crawler database layer", () => {
  beforeEach(() => {
    mocks.create.mockReset();
    mocks.findById.mockReset();
    mocks.findById.mockResolvedValue(null);
    mocks.updateMany.mockReset();
    mocks.countDocuments.mockReset();
    mocks.findByIdAndUpdate.mockReset();
    mocks.findOneAndUpdate.mockReset();
  });

  it("creates a pending crawl job", async () => {
    mocks.countDocuments.mockResolvedValue(0);
    mocks.create.mockResolvedValue({
      _id: "job1",
      startUrl: "https://example.com/",
      status: "pending",
    });

    const job = await startCrawlJob({ startUrl: "https://example.com/", maxPages: 5, maxDepth: 1 });
    await new Promise((resolve) => setImmediate(resolve));
    expect(mocks.create).toHaveBeenCalledWith(
      expect.objectContaining({
        startUrl: "https://example.com/",
        status: "pending",
        maxPages: 5,
        maxDepth: 1,
      }),
    );
    expect(job.status).toBe("pending");
  });

  it("updates interrupted jobs to failed", async () => {
    mocks.updateMany.mockResolvedValue({ modifiedCount: 2 });
    await expect(failInterruptedJobs()).resolves.toBe(2);
    expect(mocks.updateMany).toHaveBeenCalledWith(
      { status: { $in: ["pending", "running"] } },
      expect.objectContaining({ status: "failed" }),
    );
  });

  it("cancels a running job", async () => {
    const job = {
      _id: "job1",
      status: "running",
      error: "",
      save: vi.fn(async function save(this: { status: string }) {
        return this;
      }),
    };
    mocks.findById.mockResolvedValue(job);
    const cancelled = await cancelCrawlJob("job1");
    expect(cancelled?.status).toBe("cancelled");
    expect(job.save).toHaveBeenCalled();
  });

  it("upserts crawled pages for a job", async () => {
    mocks.findOneAndUpdate.mockResolvedValue({ _id: "p1", url: "https://example.com/" });
    await persistPage("job1", {
      url: "https://example.com/",
      status: "crawled",
      httpStatus: 200,
      depth: 0,
      title: "Example",
      metaDescription: "",
      canonicalUrl: "",
      headings: { h1: "Example", h2: [] },
      textContent: "Hello",
      internalLinks: [],
      externalLinks: [],
      images: [],
      error: "",
    });
    expect(mocks.findOneAndUpdate).toHaveBeenCalledWith(
      { crawlJobId: "job1", url: "https://example.com/" },
      expect.objectContaining({ status: "crawled", httpStatus: 200, title: "Example" }),
      { upsert: true, returnDocument: "after" },
    );
  });
});
