import { describe, expect, it } from "vitest";
import { CrawlQueue } from "./queue";

describe("CrawlQueue", () => {
  it("prevents duplicate enqueue and tracks visited vs queued", () => {
    const queue = new CrawlQueue();
    expect(queue.enqueue("https://example.com/", 0)).toBe(true);
    expect(queue.enqueue("https://example.com/", 1)).toBe(false);
    expect(queue.size).toBe(1);
    expect(queue.discovered).toBe(1);

    const first = queue.dequeue();
    expect(first?.url).toBe("https://example.com/");
    expect(queue.hasSeen("https://example.com/")).toBe(true);
    expect(queue.enqueue("https://example.com/", 0)).toBe(false);
    expect(queue.size).toBe(0);
  });
});
