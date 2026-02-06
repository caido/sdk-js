import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { type AnyVariables, Client, type OperationResult } from "@urql/core";
import {
  createClient as createWSClient,
  type Client as WSClient,
} from "graphql-ws";
import { pipe, subscribe } from "wonka";

import {
  createAuthExchange,
  createFetchExchange,
  createSubscriptionExchange,
} from "./exchanges/index.js";

import type { AuthManager } from "@/auth.js";
import {
  AuthorizationUserError,
  type GraphQLErrorEntry,
  GraphQLRequestError,
  toUserError,
} from "@/errors.js";
import type { ResolvedRetryConfig } from "@/retry.js";
import { withRetry } from "@/retry.js";
import type { RequestOptions } from "@/types.js";
import { isPresent } from "@/utils/optional.js";

type UrqlOperationFn<TData, TVars extends AnyVariables> = (
  client: Client,
  document: TypedDocumentNode<TData, TVars>,
  variables: TVars,
) => Promise<OperationResult<TData, TVars>>;

/**
 * Low-level GraphQL client for queries, mutations, and subscriptions.
 */
export class GraphQLClient {
  private readonly graphqlUrl: string;
  private readonly wsUrl: string;
  private readonly auth: AuthManager;
  private readonly retryConfig: ResolvedRetryConfig;
  private readonly requestOptions: RequestOptions | undefined;
  private client: Client;
  private wsClient: WSClient;

  constructor(
    baseUrl: string,
    auth: AuthManager,
    retryConfig: ResolvedRetryConfig,
    requestOptions?: RequestOptions,
  ) {
    const normalizedUrl = baseUrl.replace(/\/$/, "");
    this.graphqlUrl = `${normalizedUrl}/graphql`;
    this.wsUrl = this.toWebSocketUrl(normalizedUrl);
    this.auth = auth;
    this.retryConfig = retryConfig;
    this.requestOptions = requestOptions;
    this.wsClient = this.createWSClient();
    this.client = this.createUrqlClient();
  }

  /**
   * Execute a GraphQL query.
   */
  async query<TData, TVars extends Record<string, unknown>>(
    document: TypedDocumentNode<TData, TVars>,
    variables?: TVars,
  ): Promise<TData> {
    return this.executeOperation(document, variables, (client, doc, vars) =>
      client.query<TData, TVars>(doc, vars).toPromise(),
    );
  }

  /**
   * Execute a GraphQL mutation.
   */
  async mutation<TData, TVars extends Record<string, unknown>>(
    document: TypedDocumentNode<TData, TVars>,
    variables?: TVars,
  ): Promise<TData> {
    return this.executeOperation(document, variables, (client, doc, vars) =>
      client.mutation<TData, TVars>(doc, vars).toPromise(),
    );
  }

  /**
   * Subscribe to a GraphQL subscription.
   *
   * Returns an async generator that yields results as they arrive.
   * The connection is closed when the generator is returned/thrown.
   */
  async *subscribe<TData, TVars extends Record<string, unknown>>(
    document: TypedDocumentNode<TData, TVars>,
    variables?: TVars,
  ): AsyncGenerator<TData, void, undefined> {
    const vars = variables ?? ({} as TVars);

    const results: OperationResult<TData, TVars>[] = [];
    let resolve: (() => void) | undefined;
    let done = false;

    const { unsubscribe } = pipe(
      this.client.subscription<TData, TVars>(document, vars),
      subscribe((result) => {
        results.push(result);
        resolve?.();
      }),
    );

    try {
      while (!done) {
        if (results.length === 0) {
          await new Promise<void>((r) => {
            resolve = r;
          });
        }

        while (results.length > 0) {
          const result = results.shift()!;

          if (result.error) {
            throw new GraphQLRequestError(
              result.error.graphQLErrors.map((e) => ({
                message: e.message,
                locations: e.locations as
                  | { line: number; column: number }[]
                  | undefined,
                path: e.path,
                extensions: e.extensions as Record<string, unknown> | undefined,
              })),
            );
          }

          if (isPresent(result.data)) {
            yield result.data;
          }
        }
      }
    } finally {
      done = true;
      unsubscribe();
    }
  }

  private async executeOperation<TData, TVars extends Record<string, unknown>>(
    document: TypedDocumentNode<TData, TVars>,
    variables: TVars | undefined,
    operationFn: UrqlOperationFn<TData, TVars>,
  ): Promise<TData> {
    const vars = variables ?? ({} as TVars);

    const operation = async (): Promise<TData> => {
      const result = await operationFn(this.client, document, vars);

      if (result.error) {
        const graphqlErrors: GraphQLErrorEntry[] =
          result.error.graphQLErrors.map((e) => ({
            message: e.message,
            locations: e.locations as
              | { line: number; column: number }[]
              | undefined,
            path: e.path,
            extensions: e.extensions as Record<string, unknown> | undefined,
          }));

        if (graphqlErrors.length > 0) {
          const firstUserError = graphqlErrors
            .map(toUserError)
            .find((e) => isPresent(e));
          if (isPresent(firstUserError)) {
            throw firstUserError;
          }
          throw new GraphQLRequestError(graphqlErrors);
        }

        throw new GraphQLRequestError([{ message: result.error.message }]);
      }

      if (!result.data) {
        throw new GraphQLRequestError([
          { message: "No data returned from GraphQL" },
        ]);
      }

      return result.data;
    };

    return withRetry(
      operation,
      this.retryConfig,
      { url: this.graphqlUrl, method: "POST", body: variables },
      (error) => !(error instanceof AuthorizationUserError),
    );
  }

  private createWSClient(): WSClient {
    const auth = this.auth;

    return createWSClient({
      url: this.wsUrl,
      connectionParams: () => {
        const accessToken = auth.getAccessToken();
        return isPresent(accessToken)
          ? { Authorization: `Bearer ${accessToken}` }
          : {};
      },
    });
  }

  private createUrqlClient(): Client {
    const fetchFn = this.requestOptions?.fetch;
    const timeout = this.requestOptions?.timeout;

    return new Client({
      url: this.graphqlUrl,
      exchanges: [
        createAuthExchange({ auth: this.auth }),
        createFetchExchange(),
        createSubscriptionExchange({ client: this.wsClient }),
      ],
      fetchOptions: () => {
        const options: RequestInit = {};
        if (isPresent(timeout)) {
          options.signal = AbortSignal.timeout(timeout);
        }
        return options;
      },
      fetch: fetchFn,
    });
  }

  private toWebSocketUrl(baseUrl: string): string {
    const url = new URL(baseUrl);
    const scheme = url.protocol === "https:" ? "wss:" : "ws:";
    return `${scheme}//${url.host}/ws/graphql`;
  }
}
