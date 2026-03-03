import { Client } from "@caido/sdk-client";
import { afterEach, beforeAll, beforeEach, expect } from "vitest";

const findSubarrayIndex = (source: Uint8Array, target: Uint8Array): number => {
  if (target.length === 0) {
    return 0;
  }

  for (let start = 0; start <= source.length - target.length; start += 1) {
    let isMatch = true;
    for (let offset = 0; offset < target.length; offset += 1) {
      if (source[start + offset] !== target[offset]) {
        isMatch = false;
        break;
      }
    }
    if (isMatch) {
      return start;
    }
  }

  return -1;
};

expect.extend({
  toContainBytes(received: unknown, needle: unknown) {
    if (!(received instanceof Uint8Array)) {
      return {
        pass: false,
        message: () =>
          `Expected received value to be Uint8Array, got ${typeof received}`,
      };
    }
    if (!(needle instanceof Uint8Array)) {
      return {
        pass: false,
        message: () => `Expected needle to be Uint8Array, got ${typeof needle}`,
      };
    }

    const index = findSubarrayIndex(received, needle);
    const pass = index !== -1;
    return {
      pass,
      message: () =>
        pass
          ? `Expected byte sequence to not be contained in response bytes`
          : `Expected byte sequence to be contained in response bytes`,
    };
  },
});

beforeAll(async () => {
  const instanceUrl =
    process.env["CAIDO_INSTANCE_URL"] ?? "http://localhost:8080";
  const pat = process.env["CAIDO_PAT"];

  if (pat === undefined || pat === "") {
    throw new Error(
      "CAIDO_PAT environment variable is required for integration tests.",
    );
  }

  const client = new Client({
    url: instanceUrl,
    auth: {
      pat,
      cache: {
        file: ".secrets.json",
      },
    },
  });

  await client.connect();
  globalThis.caido = client;
});

beforeEach(async () => {
  const project = await globalThis.caido.project.create({
    name: `sdk-test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    temporary: true,
  });

  await globalThis.caido.project.select(project.id);
  globalThis.testProject = project;
});

afterEach(async () => {
  if (globalThis.testProject === undefined) {
    return;
  }

  await globalThis.caido.project.delete(globalThis.testProject.id);
  globalThis.testProject = undefined;
});
