import type { AuthOptions } from "@/auth/types.js";
import type { Logger } from "@/logger.js";

/**
 * Options for creating a new Caido client.
 */
export interface CaidoOptions {
  /** Base URL of the Caido instance (e.g., "http://localhost:8080") */
  url: string;

  /** Authentication options */
  auth?: AuthOptions;

  /** Retry configuration */
  retry?: RetryOptions | boolean;

  /** Request configuration */
  request?: RequestOptions;

  /**
   * Logger instance for debug/info/warn/error output.
   * Defaults to `ConsoleLogger`.
   */
  logger?: Logger;
}

/**
 * Retry configuration for failed requests.
 */
export interface RetryOptions {
  /** Whether retry is enabled (default: true) */
  enabled?: boolean;

  /** Maximum number of retries (default: 3) */
  retries?: number;

  /**
   * Custom callback to determine whether a request should be retried.
   * Receives the request info and should return `true` to retry.
   */
  callback?: (request: RetryRequest) => boolean;
}

/**
 * Information about a request that can be retried.
 */
export interface RetryRequest {
  /** The URL of the request */
  url: string;

  /** The HTTP method */
  method: string;

  /** The request body, if any */
  body?: unknown;

  /** The number of retries already attempted */
  attempt: number;

  /** The error that caused the retry */
  error: Error;
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
