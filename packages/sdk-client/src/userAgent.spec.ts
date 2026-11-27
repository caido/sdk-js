import { afterEach, describe, expect, it, vi } from "vitest";

import packageJson from "../package.json" with { type: "json" };

import {
  buildUserAgent,
  detectAgent,
  detectRuntime,
  formatUserAgent,
} from "@/userAgent.js";

const SDK = `caido-sdk-client/${packageJson.version}`;
const NODE = { name: "node", version: "22.23.2" };

describe("detectAgent", () => {
  it("returns undefined when no agent variable is set", () => {
    expect(detectAgent({}, false)).toBeUndefined();
  });

  it("uses the AI_AGENT value over tool-specific variables", () => {
    const env = { AI_AGENT: "claude-code_2-1-322_agent", CODEX_CI: "1" };

    expect(detectAgent(env, false)).toBe("claude-code_2-1-322_agent");
  });

  it("reports an unnamed agent when AI_AGENT is only a flag", () => {
    expect(detectAgent({ AI_AGENT: "1" }, false)).toBe("unknown");
    expect(detectAgent({ AI_AGENT: "true" }, false)).toBe("unknown");
  });

  it("ignores AI_AGENT when it is disabled or blank", () => {
    expect(detectAgent({ AI_AGENT: "0" }, false)).toBeUndefined();
    expect(detectAgent({ AI_AGENT: "false" }, false)).toBeUndefined();
    expect(detectAgent({ AI_AGENT: "  " }, false)).toBeUndefined();
  });

  it("replaces characters that are not allowed in a header token", () => {
    const env = { AI_AGENT: "my agent\r\nX-Injected: 1 🤖" };

    expect(detectAgent(env, false)).toBe("my-agent-X-Injected-1");
  });

  it("caps the agent name length", () => {
    const agent = detectAgent({ AI_AGENT: "a".repeat(500) }, false);

    expect(agent).toBe("a".repeat(64));
  });

  it.each([
    [{ CLAUDE_CODE_CHILD_SESSION: "1" }, "claude-code"],
    [{ CODEX_THREAD_ID: "019a-thread" }, "codex"],
    [{ CODEX_CI: "1" }, "codex"],
    [{ GEMINI_CLI: "1" }, "gemini-cli"],
    [{ CURSOR_AGENT: "1" }, "cursor"],
    [{ OPENCODE: "1" }, "opencode"],
    [{ AUGMENT_AGENT: "1" }, "augment"],
    [{ ANTIGRAVITY_AGENT: "1" }, "antigravity"],
  ])("detects %o as %s in a terminal", (env, agent) => {
    expect(detectAgent(env, true)).toBe(agent);
  });

  it.each([
    [{ CLAUDECODE: "1" }, "claude-code"],
    [{ CURSOR_TRACE_ID: "trace" }, "cursor"],
  ])("detects %o as %s only without a terminal", (env, agent) => {
    expect(detectAgent(env, false)).toBe(agent);
    expect(detectAgent(env, true)).toBeUndefined();
  });

  it("falls back to the generic AGENT variable", () => {
    expect(detectAgent({ AGENT: "goose" }, false)).toBe("goose");
    expect(detectAgent({ AGENT: "1" }, false)).toBe("unknown");
    expect(detectAgent({ AGENT: "0" }, false)).toBeUndefined();
  });

  it("prefers a tool-specific variable over the generic AGENT variable", () => {
    const env = { AGENT: "1", GEMINI_CLI: "1" };

    expect(detectAgent(env, false)).toBe("gemini-cli");
  });
});

describe("detectRuntime", () => {
  it("returns undefined without process versions", () => {
    expect(detectRuntime(undefined)).toBeUndefined();
    expect(detectRuntime({})).toBeUndefined();
  });

  it("detects node", () => {
    expect(detectRuntime({ node: "22.23.2" })).toEqual(NODE);
  });

  it("detects bun before its node compatibility version", () => {
    expect(detectRuntime({ node: "24.3.0", bun: "1.3.2" })).toEqual({
      name: "bun",
      version: "1.3.2",
    });
  });

  it("detects deno before its node compatibility version", () => {
    expect(detectRuntime({ node: "22.20.0", deno: "2.5.6" })).toEqual({
      name: "deno",
      version: "2.5.6",
    });
  });
});

describe("formatUserAgent", () => {
  it("formats the SDK and the runtime", () => {
    expect(formatUserAgent({ runtime: NODE })).toBe(`${SDK} node/22.23.2`);
  });

  it("puts the app first and the agent last", () => {
    const userAgent = formatUserAgent({
      app: { name: "caido-mode", version: "3.3.0" },
      runtime: NODE,
      agent: "claude-code",
    });

    expect(userAgent).toBe(
      `caido-mode/3.3.0 ${SDK} node/22.23.2 agent/claude-code`,
    );
  });

  it("sanitizes the app name and version", () => {
    const userAgent = formatUserAgent({
      app: { name: "@scope/my tool", version: "1.0.0 beta" },
      runtime: NODE,
    });

    expect(userAgent).toBe(`scope-my-tool/1.0.0-beta ${SDK} node/22.23.2`);
  });

  it("drops the app when its name has no allowed characters", () => {
    const userAgent = formatUserAgent({
      app: { name: "🤖", version: "1.0.0" },
      runtime: NODE,
    });

    expect(userAgent).toBe(`${SDK} node/22.23.2`);
  });

  it("produces a value accepted as a header", () => {
    const userAgent = formatUserAgent({
      app: { name: "tool\r\n", version: "1\n" },
      runtime: NODE,
      agent: "agent",
    });

    expect(() => new Headers({ "User-Agent": userAgent })).not.toThrow();
  });
});

describe("buildUserAgent", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("describes the current Node runtime and detected agent", () => {
    vi.stubEnv("AI_AGENT", "test-agent");

    expect(buildUserAgent({ name: "my-tool", version: "1.2.0" })).toBe(
      `my-tool/1.2.0 ${SDK} node/${process.versions.node} agent/test-agent`,
    );
  });
});
