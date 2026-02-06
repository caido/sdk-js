import type { AuthenticationRequest } from "@caido/server-auth";

/**
 * Options for creating a new Caido client.
 */
export interface CaidoOptions {
  /** Base URL of the Caido instance (e.g., "http://localhost:8080") */
  url: string;

  /** Authentication options */
  auth?: AuthOptions;

  /** Retry configuration */
  retry?: RetryOptions;

  /** Request configuration */
  request?: RequestOptions;
}

/**
 * Authentication options.
 *
 * Provide one of:
 * - `pat` - Personal Access Token for automatic device code approval
 * - `token` - Direct access token (string) or token pair with refresh capability
 * - Neither - falls back to browser-based authentication
 */
export interface AuthOptions {
  /** Personal Access Token for automatic authentication */
  pat?: string;

  /**
   * Direct access token.
   * - `string` - Use as a static access token (no refresh capability)
   * - `{ accessToken, refreshToken }` - Use with refresh capability
   */
  token?: string | TokenPair;

  /** Enable token caching to disk */
  cache?: boolean;

  /** File path for the token cache (requires `cache: true`) */
  cachePath?: string;

  /**
   * Callback for browser-based authentication.
   * Called with the authentication request containing the verification URL.
   * Defaults to `console.log` if not provided.
   */
  onRequest?: (request: AuthenticationRequest) => void;
}

/**
 * A pair of access and refresh tokens.
 */
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
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
