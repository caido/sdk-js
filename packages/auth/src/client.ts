import { Client, fetchExchange } from "@urql/core";
import { createClient as createWSClient } from "graphql-ws";

import type { AuthApprover } from "./approvers/types.js";
import { AuthenticationError, AuthenticationFlowError, TokenRefreshError } from "./errors.js";
import {
  CREATED_AUTHENTICATION_TOKEN,
  REFRESH_AUTHENTICATION_TOKEN,
  START_AUTHENTICATION_FLOW,
} from "./queries.js";
import type {
  AuthenticationRequest,
  AuthenticationToken,
  CreatedAuthenticationTokenResponse,
  RefreshAuthenticationTokenResponse,
  StartAuthenticationFlowResponse,
} from "./types.js";

/**
 * Client for authenticating with a Caido instance.
 *
 * @example
 * ```typescript
 * import { CaidoAuth, BrowserApprover } from "@caido/auth";
 *
 * const auth = new CaidoAuth(
 *   "http://localhost:8080",
 *   new BrowserApprover((request) => {
 *     console.log(`Visit ${request.verificationUrl}`);
 *   })
 * );
 *
 * const token = await auth.startAuthenticationFlow();
 * console.log("Access token:", token.accessToken);
 * ```
 */
export class CaidoAuth {
  private readonly instanceUrl: string;
  private readonly graphqlUrl: string;
  private readonly websocketUrl: string;
  private readonly approver: AuthApprover;
  private readonly client: Client;

  /**
   * Create a new CaidoAuth client.
   *
   * @param instanceUrl - Base URL of the Caido instance (e.g., "http://localhost:8080")
   * @param approver - The approver to use for the authentication flow
   */
  constructor(instanceUrl: string, approver: AuthApprover) {
    this.instanceUrl = instanceUrl.replace(/\/$/, "");
    this.graphqlUrl = `${this.instanceUrl}/graphql`;
    this.websocketUrl = this.getWebsocketUrl();
    this.approver = approver;

    this.client = new Client({
      url: this.graphqlUrl,
      exchanges: [fetchExchange],
    });
  }

  /**
   * Convert HTTP(S) URL to WS(S) URL for subscriptions.
   */
  private getWebsocketUrl(): string {
    const url = new URL(this.graphqlUrl);
    const scheme = url.protocol === "https:" ? "wss:" : "ws:";
    return `${scheme}//${url.host}/ws/graphql`;
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
   * @throws {AuthenticationFlowError} If the flow fails to start
   * @throws {AuthenticationError} If token retrieval fails
   */
  async startAuthenticationFlow(): Promise<AuthenticationToken> {
    // Step 1: Start the authentication flow
    const result = await this.client.mutation<StartAuthenticationFlowResponse>(
      START_AUTHENTICATION_FLOW,
      {}
    ).toPromise();

    if (result.error) {
      throw new AuthenticationFlowError(
        "GRAPHQL_ERROR",
        result.error.message
      );
    }

    const payload = result.data?.startAuthenticationFlow;
    if (!payload) {
      throw new AuthenticationFlowError(
        "NO_RESPONSE",
        "No response from startAuthenticationFlow"
      );
    }

    if (payload.error) {
      throw new AuthenticationFlowError(
        payload.error.code,
        payload.error.message
      );
    }

    if (!payload.request) {
      throw new AuthenticationFlowError(
        "NO_REQUEST",
        "No authentication request returned"
      );
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

  /**
   * Subscribe and wait for the authentication token.
   *
   * @param requestId - The authentication request ID
   * @returns The authentication token once the user authorizes
   * @throws {AuthenticationError} If subscription fails or returns an error
   */
  private async waitForToken(requestId: string): Promise<AuthenticationToken> {
    return new Promise<AuthenticationToken>((resolve, reject) => {
      const wsClient = createWSClient({
        url: this.websocketUrl,
      });

      const unsubscribe = wsClient.subscribe<CreatedAuthenticationTokenResponse>(
        {
          query:
            CREATED_AUTHENTICATION_TOKEN.loc?.source.body ??
            `subscription CreatedAuthenticationToken($requestId: ID!) {
              createdAuthenticationToken(requestId: $requestId) {
                token { accessToken refreshToken expiresAt }
                error { code message }
              }
            }`,
          variables: { requestId },
        },
        {
          next: (result) => {
            const payload = result.data?.createdAuthenticationToken;

            if (payload?.error) {
              unsubscribe();
              wsClient.dispose();
              reject(
                new AuthenticationError(
                  `${payload.error.code}: ${payload.error.message}`
                )
              );
              return;
            }

            if (payload?.token) {
              unsubscribe();
              wsClient.dispose();
              resolve({
                accessToken: payload.token.accessToken,
                refreshToken: payload.token.refreshToken,
                expiresAt: new Date(payload.token.expiresAt),
              });
            }
          },
          error: (error) => {
            wsClient.dispose();
            reject(
              new AuthenticationError(
                error instanceof Error ? error.message : String(error)
              )
            );
          },
          complete: () => {
            wsClient.dispose();
            reject(
              new AuthenticationError(
                "Subscription ended without receiving token"
              )
            );
          },
        }
      );
    });
  }

  /**
   * Refresh an access token using a refresh token.
   *
   * @param refreshToken - The refresh token from a previous authentication
   * @returns New authentication token with updated access and refresh tokens
   * @throws {TokenRefreshError} If the refresh fails
   */
  async refreshToken(refreshToken: string): Promise<AuthenticationToken> {
    const result = await this.client.mutation<RefreshAuthenticationTokenResponse>(
      REFRESH_AUTHENTICATION_TOKEN,
      { refreshToken }
    ).toPromise();

    if (result.error) {
      throw new TokenRefreshError("GRAPHQL_ERROR", result.error.message);
    }

    const payload = result.data?.refreshAuthenticationToken;
    if (!payload) {
      throw new TokenRefreshError(
        "NO_RESPONSE",
        "No response from refreshAuthenticationToken"
      );
    }

    if (payload.error) {
      throw new TokenRefreshError(payload.error.code, payload.error.message);
    }

    if (!payload.token) {
      throw new TokenRefreshError("NO_TOKEN", "No token returned from refresh");
    }

    return {
      accessToken: payload.token.accessToken,
      refreshToken: payload.token.refreshToken,
      expiresAt: new Date(payload.token.expiresAt),
    };
  }
}
