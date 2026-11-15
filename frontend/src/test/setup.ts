import "@testing-library/jest-dom/vitest";
import "../styles.css";

class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  get length() {
    return this.store.size;
  }
  clear() {
    this.store.clear();
  }
  getItem(key: string) {
    return this.store.has(key) ? (this.store.get(key) as string) : null;
  }
  key(index: number) {
    return Array.from(this.store.keys())[index] ?? null;
  }
  removeItem(key: string) {
    this.store.delete(key);
  }
  setItem(key: string, value: string) {
    this.store.set(String(key), String(value));
  }
}

function hasWorkingStorage(name: "localStorage" | "sessionStorage"): boolean {
  try {
    const s = (window as unknown as Record<string, Storage | undefined>)[name];
    return !!s && typeof s.getItem === "function" && typeof s.setItem === "function";
  } catch {
    return false;
  }
}

if (typeof window !== "undefined") {
  for (const name of ["localStorage", "sessionStorage"] as const) {
    if (!hasWorkingStorage(name)) {
      const storage = new MemoryStorage();
      Object.defineProperty(window, name, { configurable: true, writable: true, value: storage });
      Object.defineProperty(globalThis, name, { configurable: true, writable: true, value: storage });
    }
  }
}

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = "";
  readonly thresholds: readonly number[] = [];

  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve() {}
}

if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
  Object.defineProperty(window, "IntersectionObserver", {
    configurable: true,
    writable: true,
    value: MockIntersectionObserver,
  });
}
