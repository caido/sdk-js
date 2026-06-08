import type { AuthOptions } from "@/auth/types.js";
import type { Logger } from "@/logger.js";
import type { Version } from "@/version.js";

/**
 * Options for creating a new Caido client.
 */
export interface ClientOptions {
  /** Base URL of the Caido instance (e.g., "http://localhost:8080") */
  url: string;

  /** Authentication options */
  auth?: AuthOptions;

  /** Request configuration */
  request?: RequestOptions;

  /**
   * Known instance version. Skips lazy `/health` fetch for version resolution.
   * @example Version.of("0.55.0")
   */
  version?: Version;

  /**
   * Logger instance for debug/info/warn/error output.
   * Defaults to `ConsoleLogger`.
   */
  logger?: Logger;
}

/**
 * Request-level configuration.
 */
export interface RequestOptions {
  /** Request timeout in milliseconds */
  timeout?: number;

  /** Custom fetch implementation */
  fetch?: typeof globalThis.fetch;
}
