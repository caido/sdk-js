import { Client, fetchExchange } from "@urql/core";
import { print } from "graphql";
import { createClient as createWSClient } from "graphql-ws";

import type { AuthApprover } from "./approvers/types.js";
import { AuthenticationError, InstanceError } from "./errors.js";
import {
  CREATED_AUTHENTICATION_TOKEN,
  REFRESH_AUTHENTICATION_TOKEN,
  START_AUTHENTICATION_FLOW,
} from "./queries.js";
import type {
  AuthenticationRequest,
  AuthenticationToken,
  CreatedAuthenticationTokenError,
  CreatedAuthenticationTokenResponse,
  RefreshAuthenticationTokenError,
  RefreshAuthenticationTokenResponse,
  StartAuthenticationFlowError,
  StartAuthenticationFlowResponse,
} from "./types.js";

/**
 * Options for configuring the AuthClient.
 */
export interface AuthClientOptions {
  /** Base URL of the Caido instance (e.g., "http://localhost:8080") */
  instanceUrl: string;
  /** The approver to use for the authentication flow */
  approver: AuthApprover;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Custom fetch implementation */
  fetch?: typeof globalThis.fetch;
}

interface ErrorDetails {
  reason?: string;
  message?: string;
}

/**
 * Client for authenticating with a Caido instance.
 *
 * @example
 * ```typescript
 * import { AuthClient, BrowserApprover } from "@caido/auth";
 *
 * const auth = new AuthClient({
 *   instanceUrl: "http://localhost:8080",
 *   approver: new BrowserApprover((request) => {
 *     console.log(`Visit ${request.verificationUrl}`);
 *   })
 * });
 *
 * const token = await auth.startAuthenticationFlow();
 * console.log("Access token:", token.accessToken);
 * ```
 */
export class AuthClient {
  private readonly instanceUrl: string;
  private readonly graphqlUrl: string;
  private readonly websocketUrl: string;
  private readonly approver: AuthApprover;
  private readonly client: Client;
  private readonly fetchFn: typeof globalThis.fetch | undefined;
  private readonly timeout: number | undefined;

  constructor(options: AuthClientOptions) {
    this.instanceUrl = options.instanceUrl.replace(/\/$/, "");
    this.graphqlUrl = `${this.instanceUrl}/graphql`;
    this.websocketUrl = this.getWebsocketUrl();
    this.approver = options.approver;
    this.fetchFn = options.fetch;
    this.timeout = options.timeout;

    this.client = new Client({
      url: this.graphqlUrl,
      exchanges: [fetchExchange],
      fetchOptions: () => {
        const fetchOptions: RequestInit = {};
        if (this.timeout !== undefined) {
          fetchOptions.signal = AbortSignal.timeout(this.timeout);
        }
        return fetchOptions;
      },
      fetch: this.fetchFn,
    });
  }

  private getWebsocketUrl(): string {
    const url = new URL(this.graphqlUrl);
    const scheme = url.protocol === "https:" ? "wss:" : "ws:";
    return `${scheme}//${url.host}/ws/graphql`;
  }

  private extractErrorDetails(
    error:
      | StartAuthenticationFlowError
      | CreatedAuthenticationTokenError
      | RefreshAuthenticationTokenError,
  ): ErrorDetails {
    if ("reason" in error) {
      return { reason: error.reason };
    }
    if ("message" in error) {
      return { message: error.message };
    }
    return {};
  }

  /**
   * Start the device code authentication flow.
   *
   * This method:
   * 1. Initiates the authentication flow via GraphQL mutation
   * 2. Calls the approver with the authentication request
   * 3. Waits for the user to authorize via WebSocket subscription
   * 4. Returns the authentication token once approved
   *
   * @returns The authentication token
   * @throws {InstanceError} If the flow fails to start
   * @throws {AuthenticationError} If token retrieval fails
   */
  async startAuthenticationFlow(): Promise<AuthenticationToken> {
    // Step 1: Start the authentication flow
    const result = await this.client
      .mutation<StartAuthenticationFlowResponse>(START_AUTHENTICATION_FLOW, {})
      .toPromise();

    if (result.error) {
      throw new InstanceError("GRAPHQL_ERROR", {
        message: result.error.message,
      });
    }

    const payload = result.data?.startAuthenticationFlow;
    if (!payload) {
      throw new InstanceError("NO_RESPONSE", {
        message: "No response from startAuthenticationFlow",
      });
    }

    if (payload.error) {
      const details = this.extractErrorDetails(payload.error);
      throw new InstanceError(payload.error.code, details);
    }

    if (!payload.request) {
      throw new InstanceError("NO_REQUEST", {
        message: "No authentication request returned",
      });
    }

    const authRequest: AuthenticationRequest = {
      id: payload.request.id,
      userCode: payload.request.userCode,
      verificationUrl: payload.request.verificationUrl,
      expiresAt: new Date(payload.request.expiresAt),
    };

    // Step 2: Call the approver
    await this.approver.approve(authRequest);

    // Step 3: Wait for the token via subscription
    const token = await this.waitForToken(authRequest.id);
    return token;
  }

  private async waitForToken(requestId: string): Promise<AuthenticationToken> {
    return new Promise<AuthenticationToken>((resolve, reject) => {
      const wsClient = createWSClient({
        url: this.websocketUrl,
      });

      const unsubscribe =
        wsClient.subscribe<CreatedAuthenticationTokenResponse>(
          {
            query: print(CREATED_AUTHENTICATION_TOKEN),
            variables: { requestId },
          },
          {
            next: (result) => {
              const payload = result.data?.createdAuthenticationToken;

              if (payload?.error) {
                unsubscribe();
                wsClient.dispose();
                const details = this.extractErrorDetails(payload.error);
                reject(new InstanceError(payload.error.code, details));
                return;
              }

              if (payload?.token) {
                unsubscribe();
                wsClient.dispose();
                resolve({
                  accessToken: payload.token.accessToken,
                  refreshToken: payload.token.refreshToken,
                  expiresAt: new Date(payload.token.expiresAt),
                  scopes: payload.token.scopes,
                });
              }
            },
            error: (error) => {
              wsClient.dispose();
              reject(
                new InstanceError("SUBSCRIPTION_ERROR", {
                  message:
                    error instanceof Error ? error.message : String(error),
                }),
              );
            },
            complete: () => {
              wsClient.dispose();
              reject(
                new InstanceError("SUBSCRIPTION_COMPLETE", {
                  message: "Subscription ended without receiving token",
                }),
              );
            },
          },
        );
    });
  }

  /**
   * Refresh an access token using a refresh token.
   *
   * @param refreshToken - The refresh token from a previous authentication
   * @returns New authentication token with updated access and refresh tokens
   * @throws {InstanceError} If the refresh fails
   */
  async refreshToken(refreshToken: string): Promise<AuthenticationToken> {
    const result = await this.client
      .mutation<RefreshAuthenticationTokenResponse>(
        REFRESH_AUTHENTICATION_TOKEN,
        { refreshToken },
      )
      .toPromise();

    if (result.error) {
      throw new InstanceError("GRAPHQL_ERROR", {
        message: result.error.message,
      });
    }

    const payload = result.data?.refreshAuthenticationToken;
    if (!payload) {
      throw new InstanceError("NO_RESPONSE", {
        message: "No response from refreshAuthenticationToken",
      });
    }

    if (payload.error) {
      const details = this.extractErrorDetails(payload.error);
      throw new InstanceError(payload.error.code, details);
    }

    if (!payload.token) {
      throw new InstanceError("NO_TOKEN", {
        message: "No token returned from refresh",
      });
    }

    return {
      accessToken: payload.token.accessToken,
      refreshToken: payload.token.refreshToken,
      expiresAt: new Date(payload.token.expiresAt),
      scopes: payload.token.scopes,
    };
  }
}
