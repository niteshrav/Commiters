import request from "supertest";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  startCrawlJob: vi.fn(),
  listCrawlJobs: vi.fn(),
  getCrawlJob: vi.fn(),
  listCrawlPages: vi.fn(),
  getCrawlPage: vi.fn(),
  cancelCrawlJob: vi.fn(),
  isMongoConnected: vi.fn(() => true),
}));

vi.mock("./service", () => ({
  startCrawlJob: mocks.startCrawlJob,
  listCrawlJobs: mocks.listCrawlJobs,
  getCrawlJob: mocks.getCrawlJob,
  listCrawlPages: mocks.listCrawlPages,
  getCrawlPage: mocks.getCrawlPage,
  cancelCrawlJob: mocks.cancelCrawlJob,
  serializeJob: (job: { _id: string; startUrl: string; status: string }) => ({
    id: String(job._id),
    startUrl: job.startUrl,
    status: job.status,
  }),
  serializePage: (page: { _id: string; url: string; status: string }) => ({
    id: String(page._id),
    url: page.url,
    status: page.status,
  }),
}));

vi.mock("../cms/config/database", () => ({
  isMongoConnected: mocks.isMongoConnected,
}));

import { signAuthToken } from "../cms/middleware/auth";
import { createApp } from "../app";

describe("crawler API", () => {
  const originalSecret = process.env.JWT_SECRET;

  beforeEach(() => {
    process.env.JWT_SECRET = "test-crawler-secret";
    mocks.isMongoConnected.mockReturnValue(true);
    mocks.startCrawlJob.mockReset();
    mocks.listCrawlJobs.mockReset();
    mocks.getCrawlJob.mockReset();
    mocks.listCrawlPages.mockReset();
    mocks.getCrawlPage.mockReset();
    mocks.cancelCrawlJob.mockReset();
  });

  afterAll(() => {
    process.env.JWT_SECRET = originalSecret;
  });

  it("requires authentication", async () => {
    const app = createApp();
    const res = await request(app).get("/api/admin/crawls");
    expect(res.status).toBe(401);
  });

  it("starts, lists, details, pages, and cancels a crawl", async () => {
    const token = signAuthToken({ sub: "admin-1", email: "admin@test.com", role: "admin" });
    mocks.startCrawlJob.mockResolvedValue({ _id: "job1", startUrl: "https://example.com/", status: "pending" });
    mocks.listCrawlJobs.mockResolvedValue({
      items: [{ _id: "job1", startUrl: "https://example.com/", status: "running" }],
      total: 1,
    });
    mocks.getCrawlJob.mockResolvedValue({ _id: "job1", startUrl: "https://example.com/", status: "running" });
    mocks.listCrawlPages.mockResolvedValue({
      items: [{ _id: "p1", url: "https://example.com/", status: "crawled" }],
      total: 1,
    });
    mocks.getCrawlPage.mockResolvedValue({ _id: "p1", url: "https://example.com/", status: "crawled" });
    mocks.cancelCrawlJob.mockResolvedValue({ _id: "job1", startUrl: "https://example.com/", status: "cancelled" });

    const app = createApp();
    const auth = { Authorization: `Bearer ${token}` };

    const started = await request(app)
      .post("/api/admin/crawls")
      .set(auth)
      .send({ startUrl: "https://example.com/", maxPages: 5, maxDepth: 1 });
    expect(started.status).toBe(202);
    expect(started.body.job.id).toBe("job1");

    const list = await request(app).get("/api/admin/crawls").set(auth);
    expect(list.status).toBe(200);
    expect(list.body.items).toHaveLength(1);

    const detail = await request(app).get("/api/admin/crawls/job1").set(auth);
    expect(detail.status).toBe(200);

    const pages = await request(app).get("/api/admin/crawls/job1/pages?status=crawled").set(auth);
    expect(pages.status).toBe(200);
    expect(pages.body.items[0].url).toBe("https://example.com/");

    const page = await request(app).get("/api/admin/crawls/job1/pages/p1").set(auth);
    expect(page.status).toBe(200);

    const cancelled = await request(app).post("/api/admin/crawls/job1/cancel").set(auth);
    expect(cancelled.status).toBe(200);
    expect(cancelled.body.job.status).toBe("cancelled");
  });
});
