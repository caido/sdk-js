import type { AuthOptions } from "@/auth/types.js";
import type { Logger } from "@/logger.js";

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
