import { Client } from "@caido/sdk-client";
import { afterEach, beforeAll, beforeEach } from "vitest";

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
