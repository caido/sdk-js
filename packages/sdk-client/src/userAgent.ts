import packageJson from "../package.json" with { type: "json" };

import type { AppInfo } from "@/options.js";
import { isAbsent, isPresent } from "@/utils/optional.js";

const SDK_NAME = "caido-sdk-client";
const MAX_TOKEN_LENGTH = 64;

type Env = Record<string, string | undefined>;

type RuntimeVersions = {
  node?: string;
  bun?: string;
  deno?: string;
};

type Product = {
  name: string;
  version?: string;
};

type AgentSignal = {
  name: string;
  variables: string[];
  requiresNonInteractive: boolean;
};

const AGENT_SIGNALS: AgentSignal[] = [
  {
    name: "claude-code",
    variables: ["CLAUDE_CODE_CHILD_SESSION"],
    requiresNonInteractive: false,
  },
  {
    name: "claude-code",
    variables: ["CLAUDECODE"],
    requiresNonInteractive: true,
  },
  {
    name: "codex",
    variables: ["CODEX_THREAD_ID", "CODEX_CI", "CODEX_SANDBOX"],
    requiresNonInteractive: false,
  },
  {
    name: "gemini-cli",
    variables: ["GEMINI_CLI"],
    requiresNonInteractive: false,
  },
  {
    name: "cursor",
    variables: ["CURSOR_AGENT"],
    requiresNonInteractive: false,
  },
  {
    name: "cursor",
    variables: ["CURSOR_TRACE_ID"],
    requiresNonInteractive: true,
  },
  {
    name: "opencode",
    variables: ["OPENCODE", "OPENCODE_CLIENT"],
    requiresNonInteractive: false,
  },
  {
    name: "augment",
    variables: ["AUGMENT_AGENT"],
    requiresNonInteractive: false,
  },
  {
    name: "antigravity",
    variables: ["ANTIGRAVITY_AGENT"],
    requiresNonInteractive: false,
  },
];

const UNNAMED_AGENT_VALUES = new Set(["1", "true"]);
const DISABLED_AGENT_VALUES = new Set(["0", "false"]);

const sanitizeToken = (value: string): string | undefined => {
  const token = value
    .trim()
    .replace(/[^A-Za-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_TOKEN_LENGTH);
  return token.length > 0 ? token : undefined;
};

const isSet = (value: string | undefined): value is string => {
  return (
    isPresent(value) &&
    value.trim().length > 0 &&
    !DISABLED_AGENT_VALUES.has(value.trim().toLowerCase())
  );
};

const readNamedAgent = (value: string | undefined): string | undefined => {
  if (!isSet(value)) {
    return undefined;
  }
  if (UNNAMED_AGENT_VALUES.has(value.trim().toLowerCase())) {
    return "unknown";
  }
  return sanitizeToken(value);
};

const matchesSignal = (
  signal: AgentSignal,
  env: Env,
  isInteractive: boolean,
): boolean => {
  if (signal.requiresNonInteractive && isInteractive) {
    return false;
  }
  return signal.variables.some((variable) => isSet(env[variable]));
};

export const detectAgent = (
  env: Env,
  isInteractive: boolean,
): string | undefined => {
  const explicitAgent = readNamedAgent(env["AI_AGENT"]);
  if (isPresent(explicitAgent)) {
    return explicitAgent;
  }

  const signal = AGENT_SIGNALS.find((candidate) =>
    matchesSignal(candidate, env, isInteractive),
  );
  if (isPresent(signal)) {
    return signal.name;
  }

  return readNamedAgent(env["AGENT"]);
};

export const detectRuntime = (
  versions: RuntimeVersions | undefined,
): Product | undefined => {
  if (isAbsent(versions)) {
    return undefined;
  }
  if (isPresent(versions.bun)) {
    return { name: "bun", version: versions.bun };
  }
  if (isPresent(versions.deno)) {
    return { name: "deno", version: versions.deno };
  }
  if (isPresent(versions.node)) {
    return { name: "node", version: versions.node };
  }
  return undefined;
};

const formatProduct = (product: Product): string | undefined => {
  const name = sanitizeToken(product.name);
  if (isAbsent(name)) {
    return undefined;
  }
  const version = isPresent(product.version)
    ? sanitizeToken(product.version)
    : undefined;
  return isPresent(version) ? `${name}/${version}` : name;
};

export const formatUserAgent = (options: {
  app?: AppInfo;
  runtime: Product;
  agent?: string;
}): string => {
  const { app, runtime, agent } = options;
  const products: Product[] = [
    ...(isPresent(app) ? [app] : []),
    { name: SDK_NAME, version: packageJson.version },
    runtime,
    ...(isPresent(agent) ? [{ name: "agent", version: agent }] : []),
  ];
  return products
    .map(formatProduct)
    .filter((product) => isPresent(product))
    .join(" ");
};

export const withUserAgent = (
  fetchFn: typeof globalThis.fetch,
  userAgent: string,
): typeof globalThis.fetch => {
  return (input, init) => {
    const headers = new Headers(init?.headers);
    headers.set("User-Agent", userAgent);
    return fetchFn(input, { ...init, headers });
  };
};

const getProcess = () => {
  return typeof process === "undefined" ? undefined : process;
};

export const buildUserAgent = (app?: AppInfo): string | undefined => {
  const currentProcess = getProcess();
  const runtime = detectRuntime(currentProcess?.versions);
  if (isAbsent(runtime)) {
    return undefined;
  }

  const isInteractive = currentProcess?.stdout?.isTTY === true;
  const agent = detectAgent(currentProcess?.env ?? {}, isInteractive);

  return formatUserAgent({ app, runtime, agent });
};
