import type { Client, Project } from "@/index.js";

declare module "vitest" {
  interface Assertion<T = unknown> {
    toContainBytes(expected: Uint8Array): T;
  }

  interface AsymmetricMatchersContaining {
    toContainBytes(expected: Uint8Array): void;
  }
}

declare global {
  var caido: Client;
  var testProject: Project | undefined;
}

export {};
