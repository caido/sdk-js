import { AuthManager } from "@/auth/index.js";
import { GraphQLClient } from "@/graphql/index.js";
import { ConsoleLogger } from "@/logger.js";
import type { ClientOptions } from "@/options.js";
import { RestClient } from "@/rest/index.js";
import {
  EnvironmentSDK,
  FilterSDK,
  HostedFileSDK,
  PluginSDK,
  ProjectSDK,
  ScopeSDK,
  UserSDK,
} from "@/sdks/index.js";
import { type Health, healthSchema, type ReadyOptions } from "@/types/index.js";
import { sleep } from "@/utils/misc.js";

/**
 * Caido client for interacting with a Caido instance.
 *
 * Provides access to:
 * - `graphql` - Low-level GraphQL client (execute queries/mutations, subscribe)
 * - `rest` - Low-level REST client (GET, POST)
 * - `user` - Higher-level user SDK
 * - `plugin` - Higher-level plugin SDK
 * - `project` - Higher-level project SDK
 * - `scope` - Higher-level scope SDK
 * - `filter` - Higher-level filter preset SDK
 * - `environment` - Higher-level environment SDK
 * - `hostedFile` - Higher-level hosted file SDK
 *
 * @example
 * ```typescript
 * // Authenticate with a PAT
 * const client = new Caido({
 *   url: "http://localhost:8080",
 *   auth: { pat: "caido_xxxxx" },
 * });
 * await client.connect();
 *
 * const viewer = await client.user.viewer();
 * ```
 */
export class Client {
  /** Low-level GraphQL client for executing queries, mutations, and subscriptions. */
  readonly graphql: GraphQLClient;

  /** Low-level REST client for making HTTP requests. */
  readonly rest: RestClient;

  /** Higher-level user SDK. */
  readonly user: UserSDK;

  /** Higher-level plugin SDK. */
  readonly plugin: PluginSDK;

  /** Higher-level project SDK. */
  readonly project: ProjectSDK;

  /** Higher-level scope SDK. */
  readonly scope: ScopeSDK;

  /** Higher-level filter preset SDK. */
  readonly filter: FilterSDK;

  /** Higher-level environment SDK. */
  readonly environment: EnvironmentSDK;

  /** Higher-level hosted file SDK. */
  readonly hostedFile: HostedFileSDK;

  private readonly auth: AuthManager;

  constructor(options: ClientOptions) {
    const logger = options.logger ?? new ConsoleLogger();

    this.auth = new AuthManager(
      options.url,
      logger,
      options.auth,
      options.request,
    );

    this.graphql = new GraphQLClient(
      options.url,
      this.auth,
      logger,
      options.request,
    );

    this.rest = new RestClient(options.url, this.auth, logger, options.request);

    this.user = new UserSDK(this.graphql);
    this.plugin = new PluginSDK(this.graphql, this.rest);
    this.project = new ProjectSDK(this.graphql);
    this.scope = new ScopeSDK(this.graphql);
    this.filter = new FilterSDK(this.graphql);
    this.environment = new EnvironmentSDK(this.graphql);
    this.hostedFile = new HostedFileSDK(this.graphql);
  }

  /**
   * Connect to the Caido instance and perform authentication.
   *
   * This must be called before making any API requests.
   * It will:
   * - Load cached tokens if caching is enabled
   * - Perform PAT-based or browser-based authentication if needed
   * - Store the resulting tokens
   */
  async connect(): Promise<void> {
    await this.auth.authenticate();
  }

  /**
   * Check the health status of the Caido instance.
   *
   * Pings the `/health` endpoint and returns instance metadata.
   *
   * @returns Instance health metadata including name, version, and ready status
   *
   * @example
   * ```typescript
   * const health = await client.health();
   * console.log(health.name); // "caido"
   * console.log(health.version); // "0.55.3"
   * console.log(health.ready); // true
   * ```
   */
  async health(): Promise<Health> {
    const response = await this.rest.get<unknown>("/health");
    return healthSchema.parse(response);
  }

  /**
   * Wait for the Caido instance to be ready.
   *
   * @param options - Optional configuration for polling behavior
   * @returns Promise that resolves when the instance is ready
   * @throws Error if the instance is not ready within the specified timeout or retries
   *
   * @example
   * ```typescript
   * // Use default options
   * await client.ready();
   *
   * // Custom options
   * await client.ready({
   *   interval: 1000,  // Check every 1 second
   *   retries: 10,      // Try up to 10 times
   *   timeout: 10000,  // Overall timeout of 10 seconds
   * });
   * ```
   */
  async ready(options?: ReadyOptions): Promise<void> {
    const interval = options?.interval ?? 5000;
    const maxRetries = options?.retries ?? 5;
    const timeout = options?.timeout ?? 5000;

    let attempts = 0;

    const checkHealth = async (): Promise<boolean> => {
      try {
        const response = await this.rest.get<unknown>("/health", { timeout });
        return healthSchema.parse(response).ready;
      } catch {
        return false;
      }
    };

    while (attempts < maxRetries) {
      const isReady = await checkHealth();
      if (isReady) {
        return;
      }

      attempts++;
      if (attempts < maxRetries) {
        await sleep(interval);
      }
    }

    throw new Error(`Instance not ready after ${maxRetries} attempts`);
  }
}
