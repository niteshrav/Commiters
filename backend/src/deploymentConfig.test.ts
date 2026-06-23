import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = resolve(import.meta.dirname, "../..");

function readRepoFile(relativePath: string): string {
  const absolutePath = resolve(repoRoot, relativePath);
  expect(existsSync(absolutePath), `${relativePath} should exist`).toBe(true);
  return readFileSync(absolutePath, "utf8");
}

describe("deployment configuration", () => {
  it("defines frontend and api services in dcdeploy.yaml", () => {
    const manifest = readRepoFile("dcdeploy.yaml");

    expect(manifest).toMatch(/^\s*frontend:/m);
    expect(manifest).toMatch(/^\s*api:/m);
    expect(manifest).toContain("machineType: DCD-1");
    expect(manifest).toContain("machineType: DCD-2");
    expect(manifest).toContain("context: ./frontend");
    expect(manifest).toContain("context: ./backend");
    expect(manifest).toContain("repo: niteshrav/Committers");
    expect(manifest).toContain("ref: main");
    expect(manifest).toMatch(/ports:\s*\n\s*-\s*80/m);
    expect(manifest).toMatch(/api:[\s\S]*ports:\s*\n\s*-\s*4000/m);
  });

  it("builds the frontend with nginx and SPA fallback", () => {
    const dockerfile = readRepoFile("frontend/Dockerfile");
    const nginx = readRepoFile("frontend/nginx.conf");

    expect(dockerfile).toContain("FROM node:");
    expect(dockerfile).toContain("FROM nginx:");
    expect(dockerfile).toContain("ARG VITE_API_BASE_URL");
    expect(dockerfile).toContain("npm run build");
    expect(dockerfile).toContain("EXPOSE 80");
    expect(nginx).toContain("try_files $uri $uri/ /index.html");
    expect(nginx).toContain("listen 80");
  });

  it("builds the backend API as a production Node image on port 4000", () => {
    const dockerfile = readRepoFile("backend/Dockerfile");

    expect(dockerfile).toContain("FROM node:");
    expect(dockerfile).toMatch(/AS build/);
    expect(dockerfile).toContain("npm run build");
    expect(dockerfile).toContain('CMD ["node", "dist/index.js"]');
    expect(dockerfile).toContain("EXPOSE 4000");
  });

  it("ignores local secrets and build artifacts in docker contexts", () => {
    const frontendIgnore = readRepoFile("frontend/.dockerignore");
    const backendIgnore = readRepoFile("backend/.dockerignore");

    expect(frontendIgnore).toContain("node_modules");
    expect(frontendIgnore).toContain("dist");
    expect(frontendIgnore).toContain(".env");
    expect(backendIgnore).toContain("node_modules");
    expect(backendIgnore).toContain("dist");
    expect(backendIgnore).toContain(".env");
  });

  it("documents production API URL for frontend builds", () => {
    const envExample = readRepoFile("frontend/.env.production.example");

    expect(envExample).toContain("VITE_API_BASE_URL=https://api.commiters.com");
  });
});
