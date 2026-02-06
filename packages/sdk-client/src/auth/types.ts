import type { AuthenticationRequest } from "@caido/server-auth";

import type { TokenCache } from "@/index.js";

/**
 * File-based cache configuration.
 * Path is relative to the current working directory.
 */
export type AuthCacheFile = { file: string };

/**
 * LocalStorage-based cache configuration.
 * Key is used to store the cache in LocalStorage.
 */
export type AuthCacheLocalStorage = { localstorage: string };

/**
 * Cache configuration for persisting authentication tokens.
 *
 * - `{ file: "<path>" }` — File-based cache (Node.js), path is relative to cwd or absolute.
 * - `{ localstorage: "<key>" }` — LocalStorage-based cache (browser).
 * - `TokenCache` — Custom cache implementation.
 */
export type AuthCacheOptions =
  | AuthCacheFile
  | AuthCacheLocalStorage
  | TokenCache;

/**
 * A pair of access and refresh tokens.
 */
export interface TokenPair {
  accessToken: string;
  refreshToken?: string;
}

interface AuthBaseOptions {
  /** Token cache configuration. Defaults to no caching. */
  cache?: AuthCacheOptions;
}

/**
 * Authenticate using a Personal Access Token (PAT).
 * The PAT is used to automatically approve a device code flow.
 */
export interface PATAuthOptions extends AuthBaseOptions {
  pat: string;
}

/**
 * Authenticate with a direct access token or token pair.
 *
 * - `string` — Static access token (no refresh capability).
 * - `TokenPair` — Access token with optional refresh token.
 */
export interface TokenAuthOptions extends AuthBaseOptions {
  token: string | TokenPair;
}

/**
 * Authenticate via browser-based device code flow.
 *
 * The `onRequest` callback receives the verification URL to present to the user.
 * Defaults to logging the URL via the logger if not provided.
 */
export interface BrowserAuthOptions extends AuthBaseOptions {
  onRequest?: (request: AuthenticationRequest) => void;
}

/**
 * Authentication options.
 *
 * Exactly one authentication method must be chosen:
 * - `PATAuthOptions` — Automatic authentication with a Personal Access Token.
 * - `TokenAuthOptions` — Direct access token or token pair.
 * - `BrowserAuthOptions` — Interactive browser-based device code flow.
 */
export type AuthOptions =
  | PATAuthOptions
  | TokenAuthOptions
  | BrowserAuthOptions;
