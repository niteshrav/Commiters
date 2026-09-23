import type { QueueItem } from "./types";

export class CrawlQueue {
  private readonly pending: QueueItem[] = [];
  private readonly queued = new Set<string>();
  private readonly visited = new Set<string>();

  get size(): number {
    return this.pending.length;
  }

  get discovered(): number {
    return this.queued.size;
  }

  get visitedCount(): number {
    return this.visited.size;
  }

  hasSeen(url: string): boolean {
    return this.queued.has(url) || this.visited.has(url);
  }

  enqueue(url: string, depth: number): boolean {
    if (this.hasSeen(url)) return false;
    this.queued.add(url);
    this.pending.push({ url, depth });
    return true;
  }

  dequeue(): QueueItem | undefined {
    const item = this.pending.shift();
    if (item) this.visited.add(item.url);
    return item;
  }

  markVisited(url: string): void {
    this.visited.add(url);
    this.queued.add(url);
  }
}
