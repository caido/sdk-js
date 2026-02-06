import type { AuthManager } from "@/auth/index.js";
import { AuthorizationUserError } from "@/errors.js";
import type { Logger } from "@/logger.js";
import type { ResolvedRetryConfig } from "@/retry.js";
import { withRetry } from "@/retry.js";
import type { RequestOptions } from "@/types.js";
import { isPresent } from "@/utils/optional.js";

/**
 * Options for a single REST request.
 */
export interface RestRequestOptions {
  /** Additional headers to include */
  headers?: Record<string, string>;

  /** Override the timeout for this request */
  timeout?: number;

  /** Query parameters */
  params?: Record<string, string>;
}

/**
 * Low-level REST client for interacting with the Caido REST API.
 */
export class RestClient {
  private readonly baseUrl: string;
  private readonly auth: AuthManager;
  private readonly retryConfig: ResolvedRetryConfig;
  private readonly fetchFn: typeof globalThis.fetch;
  private readonly timeout: number | undefined;
  private readonly logger: Logger;

  constructor(
    baseUrl: string,
    auth: AuthManager,
    retryConfig: ResolvedRetryConfig,
    logger: Logger,
    requestOptions?: RequestOptions,
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.auth = auth;
    this.retryConfig = retryConfig;
    this.logger = logger;
    this.fetchFn = requestOptions?.fetch ?? globalThis.fetch;
    this.timeout = requestOptions?.timeout;
  }

  /**
   * Perform a GET request against the Caido REST API.
   *
   * @param path - The path relative to the base URL (e.g., "/health")
   * @param options - Optional request configuration
   * @returns The parsed JSON response
   */
  async get<T = unknown>(
    path: string,
    options?: RestRequestOptions,
  ): Promise<T> {
    return this.request<T>("GET", path, undefined, options);
  }

  /**
   * Perform a POST request against the Caido REST API.
   *
   * @param path - The path relative to the base URL
   * @param body - The request body (will be JSON-serialized)
   * @param options - Optional request configuration
   * @returns The parsed JSON response
   */
  async post<T = unknown>(
    path: string,
    body?: unknown,
    options?: RestRequestOptions,
  ): Promise<T> {
    return this.request<T>("POST", path, body, options);
  }

  private async request<T>(
    method: string,
    requestPath: string,
    body?: unknown,
    options?: RestRequestOptions,
  ): Promise<T> {
    let hasRefreshed = false;

    const operation = async (): Promise<T> => {
      const url = new URL(`${this.baseUrl}${requestPath}`);

      if (isPresent(options?.params)) {
        for (const [key, value] of Object.entries(options.params)) {
          url.searchParams.set(key, value);
        }
      }

      const headers: Record<string, string> = {
        Accept: "application/json",
        ...options?.headers,
      };

      const accessToken = this.auth.getAccessToken();
      if (isPresent(accessToken)) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      if (body !== undefined) {
        headers["Content-Type"] = "application/json";
      }

      const fetchOptions: RequestInit = {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
      };

      const timeout = options?.timeout ?? this.timeout;
      if (isPresent(timeout)) {
        fetchOptions.signal = AbortSignal.timeout(timeout);
      }

      const response = await this.fetchFn(url.toString(), fetchOptions);

      if (!response.ok) {
        if (
          response.status === 401 &&
          !hasRefreshed &&
          this.auth.canRefresh()
        ) {
          this.logger.debug("Received 401, attempting token refresh");
          hasRefreshed = true;
          await this.auth.refresh();
          return operation();
        }

        const errorText = await response.text().catch((error: unknown) => {
          this.logger.warn("Failed to read error response body", error);
          return "Unknown error";
        });
        throw new Error(
          `REST request failed: ${method} ${requestPath} - ${response.status}: ${errorText}`,
        );
      }

      const contentType = response.headers.get("content-type");
      if (isPresent(contentType) && contentType.includes("application/json")) {
        return (await response.json()) as T;
      }

      return undefined as T;
    };

    return withRetry(
      operation,
      this.retryConfig,
      { url: `${this.baseUrl}${requestPath}`, method, body },
      this.logger,
      (error) => !(error instanceof AuthorizationUserError),
    );
  }
}
