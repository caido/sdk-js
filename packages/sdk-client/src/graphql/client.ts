import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { type AnyVariables, Client, type OperationResult } from "@urql/core";
import { GraphQLError } from "graphql";
import {
  createClient as createWSClient,
  type Client as WSClient,
} from "graphql-ws";
import { map, pipe, toAsyncIterable } from "wonka";

import {
  createAuthExchange,
  createFetchExchange,
  createSubscriptionExchange,
} from "./exchanges/index.js";

import type { AuthManager } from "@/auth/index.js";
import {
  AuthorizationUserError,
  GraphQLRequestError,
  toUserError,
} from "@/errors.js";
import type { Logger } from "@/logger.js";
import type { RequestOptions } from "@/options.js";
import { isAbsent, isPresent } from "@/utils/optional.js";

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
  private readonly requestOptions: RequestOptions | undefined;
  private readonly logger: Logger;
  private client: Client;
  private wsClient: WSClient;
  private sockets: WebSocket[] = [];

  constructor(
    baseUrl: string,
    auth: AuthManager,
    logger: Logger,
    requestOptions?: RequestOptions,
  ) {
    const normalizedUrl = baseUrl.replace(/\/$/, "");
    this.graphqlUrl = `${normalizedUrl}/graphql`;
    this.wsUrl = this.toWebSocketUrl(normalizedUrl);
    this.auth = auth;
    this.logger = logger;
    this.requestOptions = requestOptions;
    this.wsClient = this.createWSClient();
    this.client = this.createUrqlClient();

    this.auth.onTokenRefresh(() => this.closeSockets());
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
  subscribe<TData, TVars extends Record<string, unknown>>(
    document: TypedDocumentNode<TData, TVars>,
    variables?: TVars,
  ): AsyncIterable<TData> {
    const vars = variables ?? ({} as TVars);

    return toAsyncIterable(
      pipe(
        this.client.subscription<TData, TVars>(document, vars),
        map((result: OperationResult<TData, TVars>) => {
          if (result.error) {
            const graphqlErrors = result.error.graphQLErrors;

            if (graphqlErrors.length > 0) {
              const firstUserError = graphqlErrors
                .map(toUserError)
                .find((e) => isPresent(e));
              if (isPresent(firstUserError)) {
                throw firstUserError;
              }
              throw new GraphQLRequestError(graphqlErrors);
            }

            throw new GraphQLRequestError([
              new GraphQLError(result.error.message),
            ]);
          }

          if (isAbsent(result.data)) {
            throw new GraphQLRequestError([
              new GraphQLError("No data returned from GraphQL"),
            ]);
          }

          return result.data;
        }),
      ),
    );
  }

  private async executeOperation<TData, TVars extends Record<string, unknown>>(
    document: TypedDocumentNode<TData, TVars>,
    variables: TVars | undefined,
    operationFn: UrqlOperationFn<TData, TVars>,
  ): Promise<TData> {
    const vars = variables ?? ({} as TVars);

    const result = await operationFn(this.client, document, vars);

    if (result.error) {
      const graphqlErrors = result.error.graphQLErrors;

      if (graphqlErrors.length > 0) {
        const firstUserError = graphqlErrors
          .map(toUserError)
          .find((e) => isPresent(e));
        if (isPresent(firstUserError)) {
          throw firstUserError;
        }
        throw new GraphQLRequestError(graphqlErrors);
      }

      throw new GraphQLRequestError([new GraphQLError(result.error.message)]);
    }

    if (isAbsent(result.data)) {
      throw new GraphQLRequestError([
        new GraphQLError("No data returned from GraphQL"),
      ]);
    }

    return result.data;
  }

  private createWSClient(): WSClient {
    const auth = this.auth;
    const logger = this.logger;
    const sockets = this.sockets;

    return createWSClient({
      url: this.wsUrl,
      lazy: true,
      shouldRetry: () => true,
      connectionParams: () => {
        const accessToken = auth.getAccessToken();
        return isPresent(accessToken)
          ? { Authorization: `Bearer ${accessToken}` }
          : {};
      },
      on: {
        connected: (socket) => {
          logger.debug("Websocket connection established");
          if (socket instanceof WebSocket) {
            sockets.push(socket);
          }
        },
        closed: () => {
          logger.debug("Websocket connection closed");
        },
      },
    });
  }

  private closeSockets(): void {
    this.logger.debug("Closing websocket connections due to token refresh");
    this.sockets.forEach((socket) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close(4205, "Client restart");
      }
    });

    this.sockets.length = 0;
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
      requestPolicy: "network-only",
      preferGetMethod: false,
    });
  }

  private toWebSocketUrl(baseUrl: string): string {
    const url = new URL(baseUrl);
    const scheme = url.protocol === "https:" ? "wss:" : "ws:";
    return `${scheme}//${url.host}/ws/graphql`;
  }
}
