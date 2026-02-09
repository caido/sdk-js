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
 *
 * @example
 * ```typescript
 * // Authenticate with a direct access token
 * const client = new Caido({
 *   url: "http://localhost:8080",
 *   auth: { token: "my-access-token" },
 * });
 * await client.connect();
 * ```
 *
 * @example
 * ```typescript
 * // Browser-based authentication (interactive)
 * const client = new Caido({
 *   url: "http://localhost:8080",
 *   auth: { onRequest: (req) => showAuthDialog(req.verificationUrl) },
 * });
 * await client.connect();
 * ```
 *
 * @example
 * ```typescript
 * // With file-based token caching
 * const client = new Caido({
 *   url: "http://localhost:8080",
 *   auth: { pat: "caido_xxxxx", cache: { file: ".caido-token.json" } },
 * });
 * await client.connect();
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
}
