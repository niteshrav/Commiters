import "@testing-library/jest-dom/vitest";
import "../styles.css";

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
  window.IntersectionObserver = MockIntersectionObserver;
}
