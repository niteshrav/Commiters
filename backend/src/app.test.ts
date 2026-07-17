import request from "supertest";
import { createApp } from "./app";
import { registerNotificationMedia } from "./lib/notificationMediaStore";

const mocks = vi.hoisted(() => ({
  notifyMock: vi.fn(),
  submissionRefMock: vi.fn(),
}));

vi.mock("./lib/inquirySubmissionRef", () => ({
  createSubmissionRef: mocks.submissionRefMock,
}));

vi.mock("./lib/inquiryNotifications", () => ({
  dispatchInquiryNotifications: mocks.notifyMock,
}));

describe("API", () => {
  const originalCorsOrigin = process.env.CORS_ORIGIN;

  beforeEach(() => {
    process.env.CORS_ORIGIN = originalCorsOrigin;
    mocks.notifyMock.mockReset();
    mocks.submissionRefMock.mockReset();
    mocks.submissionRefMock.mockReturnValue({
      id: "lead_123",
      submittedAt: new Date("2026-04-15T10:30:00.000Z"),
    });
    mocks.notifyMock.mockResolvedValue(undefined);
  });

  afterAll(() => {
    process.env.CORS_ORIGIN = originalCorsOrigin;
  });

  it("returns health payload", async () => {
    const app = createApp();
    const res = await request(app).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it("allows CORS preflight from local loopback frontend origin", async () => {
    delete process.env.CORS_ORIGIN;
    const app = createApp();
    const res = await request(app)
      .options("/api/leads")
      .set("Origin", "http://127.0.0.1:5173")
      .set("Access-Control-Request-Method", "POST");

    expect(res.status).toBe(204);
    expect(res.headers["access-control-allow-origin"]).toBe("http://127.0.0.1:5173");
  });

  it("allows loopback alias even when CORS_ORIGIN is set to localhost only", async () => {
    process.env.CORS_ORIGIN = "http://localhost:5173";
    const app = createApp();
    const res = await request(app)
      .options("/api/leads")
      .set("Origin", "http://127.0.0.1:5173")
      .set("Access-Control-Request-Method", "POST");

    expect(res.status).toBe(204);
    expect(res.headers["access-control-allow-origin"]).toBe("http://127.0.0.1:5173");
  });

  it("allows apex domain when CORS_ORIGIN includes the www production site", async () => {
    process.env.CORS_ORIGIN = "https://www.commiters.com";
    const app = createApp();
    const res = await request(app)
      .options("/api/job-applications")
      .set("Origin", "https://commiters.com")
      .set("Access-Control-Request-Method", "POST");

    expect(res.status).toBe(204);
    expect(res.headers["access-control-allow-origin"]).toBe("https://commiters.com");
  });

  it("allows www domain when CORS_ORIGIN includes the apex production site", async () => {
    process.env.CORS_ORIGIN = "https://commiters.com";
    const app = createApp();
    const res = await request(app)
      .options("/api/job-applications")
      .set("Origin", "https://www.commiters.com")
      .set("Access-Control-Request-Method", "POST");

    expect(res.status).toBe(204);
    expect(res.headers["access-control-allow-origin"]).toBe("https://www.commiters.com");
  });

  it("rejects non-json payload for lead submission", async () => {
    const app = createApp();
    const res = await request(app).post("/api/leads").send("name=test");

    expect(res.status).toBe(415);
    expect(res.body.error).toMatch(/Content-Type must be application\/json/i);
  });

  it("accepts a project inquiry and dispatches email notification", async () => {
    const app = createApp();
    const payload = {
      name: "Nitesh",
      email: "hello@example.com",
      serviceNeeded: "Website Development",
      budgetRange: "$5,000 – $15,000",
      timeline: "2-4 weeks",
      referenceLinks: "https://example.com",
      message: "Need a modern business website.",
    };

    const res = await request(app).post("/api/leads").set("Content-Type", "application/json").send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ ok: true, id: "lead_123" });
    expect(mocks.notifyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "lead_123",
        kind: "project_inquiry",
        name: "Nitesh",
        email: "hello@example.com",
        serviceOrPosition: "Website Development",
        submittedAt: new Date("2026-04-15T10:30:00.000Z"),
      }),
    );
  });

  it("accepts a project inquiry when service is Automation Tools", async () => {
    const app = createApp();
    const payload = {
      name: "Nitesh",
      email: "hello@example.com",
      serviceNeeded: "Automation Tools",
      budgetRange: "",
      timeline: "4 weeks",
      message: "Need workflow automation.",
    };

    const res = await request(app).post("/api/leads").set("Content-Type", "application/json").send(payload);

    expect(res.status).toBe(201);
    expect(mocks.notifyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        kind: "project_inquiry",
        serviceOrPosition: "Automation Tools",
      }),
    );
  });

  it("returns 503 when project inquiry email notification fails", async () => {
    const app = createApp();
    mocks.notifyMock.mockRejectedValue(new Error("SMTP connection failed"));
    const payload = {
      name: "Nitesh",
      email: "hello@example.com",
      serviceNeeded: "Website Development",
      budgetRange: "$5,000 – $15,000",
      timeline: "2-4 weeks",
      referenceLinks: "https://example.com",
      message: "Need a modern business website.",
    };

    const res = await request(app).post("/api/leads").set("Content-Type", "application/json").send(payload);

    expect(res.status).toBe(503);
    expect(res.body).toEqual({
      error: "Lead service is temporarily unavailable. Please try again shortly.",
    });
  });

  it("rejects lead when name contains non-letters", async () => {
    const app = createApp();
    const payload = {
      name: "John123",
      email: "hello@example.com",
      serviceNeeded: "Website Development",
      budgetRange: "$5,000 – $15,000",
      timeline: "2-4 weeks",
      message: "Hello.",
    };

    const res = await request(app).post("/api/leads").set("Content-Type", "application/json").send(payload);

    expect(res.status).toBe(400);
    expect(mocks.notifyMock).not.toHaveBeenCalled();
  });

  it("accepts a job application and dispatches email notification", async () => {
    const app = createApp();
    const resumePdfBase64 = Buffer.from("%PDF-1.4 test resume").toString("base64");
    const payload = {
      name: "Jane Doe",
      email: "jane@company.com",
      phone: "+91 98765 43210",
      positionAppliedFor: "AI Engineer",
      linkedinProfile: "https://linkedin.com/in/jane",
      portfolioGitHub: "https://github.com/jane",
      coverLetter: "I build reliable systems and want to join Commiters.",
      resumeFileName: "jane-resume.pdf",
      resumePdfBase64,
    };

    const res = await request(app).post("/api/job-applications").set("Content-Type", "application/json").send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ ok: true, id: "lead_123" });
    expect(mocks.notifyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        kind: "job_application",
        name: "Jane Doe",
        phone: "+91 98765 43210",
        serviceOrPosition: "AI Engineer",
        resumeAttachment: expect.objectContaining({
          filename: "jane-resume.pdf",
          content: expect.any(Buffer),
        }),
      }),
    );
  });

  it("returns 503 when job application email notification fails", async () => {
    const app = createApp();
    mocks.notifyMock.mockRejectedValue(new Error("SMTP connection failed"));
    const resumePdfBase64 = Buffer.from("%PDF-1.4 test resume").toString("base64");
    const payload = {
      name: "Jane Doe",
      email: "jane@company.com",
      phone: "+91 98765 43210",
      positionAppliedFor: "AI Engineer",
      coverLetter: "I want to join Commiters.",
      resumeFileName: "resume.pdf",
      resumePdfBase64,
    };

    const res = await request(app).post("/api/job-applications").set("Content-Type", "application/json").send(payload);

    expect(res.status).toBe(503);
    expect(res.body).toEqual({
      error: "Application service is temporarily unavailable. Please try again shortly.",
    });
  });

  it("rejects job application when resume is not a valid PDF", async () => {
    const app = createApp();
    const payload = {
      name: "Jane Doe",
      email: "jane@company.com",
      phone: "+91 98765 43210",
      positionAppliedFor: "AI Engineer",
      coverLetter: "I want to join Commiters.",
      resumeFileName: "resume.pdf",
      resumePdfBase64: Buffer.from("not-a-pdf").toString("base64"),
    };

    const res = await request(app).post("/api/job-applications").set("Content-Type", "application/json").send(payload);

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/valid PDF/i);
    expect(mocks.notifyMock).not.toHaveBeenCalled();
  });

  it("rejects job application when position is empty", async () => {
    const app = createApp();
    const payload = {
      name: "Jane Doe",
      email: "jane@company.com",
      phone: "+91 98765 43210",
      positionAppliedFor: "",
    };

    const res = await request(app).post("/api/job-applications").set("Content-Type", "application/json").send(payload);

    expect(res.status).toBe(400);
    expect(mocks.notifyMock).not.toHaveBeenCalled();
  });

  it("rejects lead when budget contains letters", async () => {
    const app = createApp();
    const payload = {
      name: "Nitesh",
      email: "hello@example.com",
      serviceNeeded: "Website Development",
      budgetRange: "50k",
      timeline: "2-4 weeks",
      message: "Hello.",
    };

    const res = await request(app).post("/api/leads").set("Content-Type", "application/json").send(payload);

    expect(res.status).toBe(400);
    expect(mocks.notifyMock).not.toHaveBeenCalled();
  });

  it("serves registered notification PDF media for WhatsApp delivery", async () => {
    const app = createApp();
    const token = registerNotificationMedia(Buffer.from("%PDF-test"));

    const res = await request(app).get(`/api/notification-media/${token}`);

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toBe("application/pdf");
    expect(res.body.toString()).toBe("%PDF-test");
  });
});
