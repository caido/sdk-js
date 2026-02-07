import {
  type AuthenticationToken,
  BrowserApprover,
  CaidoAuth,
  PATApprover,
} from "@caido/server-auth";

import type { CachedToken, TokenCache } from "./cache/types.js";
import type { AuthOptions, BrowserAuthOptions } from "./types.js";
import { isPATAuth, isTokenAuth, resolveCache } from "./utils.js";

import type { Logger } from "@/logger.js";
import type { RequestOptions } from "@/options.js";
import { isAbsent, isPresent } from "@/utils/optional.js";

interface TokenState {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
}

export class AuthManager {
  private readonly instanceUrl: string;
  private readonly authOptions: AuthOptions | undefined;
  private readonly requestOptions: RequestOptions | undefined;
  private readonly cache: TokenCache | undefined;
  private readonly logger: Logger;

  private tokenState: TokenState | undefined;
  private caidoAuth: CaidoAuth | undefined;
  private onTokenRefreshCallbacks: Set<() => void> = new Set();

  constructor(
    instanceUrl: string,
    logger: Logger,
    authOptions?: AuthOptions,
    requestOptions?: RequestOptions,
  ) {
    this.instanceUrl = instanceUrl;
    this.logger = logger;
    this.authOptions = authOptions;
    this.requestOptions = requestOptions;
    this.cache = isPresent(authOptions?.cache)
      ? resolveCache(authOptions.cache, logger)
      : undefined;
  }

  getAccessToken(): string | undefined {
    return this.tokenState?.accessToken;
  }

  canRefresh(): boolean {
    return isPresent(this.tokenState?.refreshToken);
  }

  /**
   * Subscribe to token refresh events.
   * The callback will be called whenever the token is refreshed.
   *
   * @param callback - Function to call when token is refreshed
   * @returns Unsubscribe function
   */
  onTokenRefresh(callback: () => void): () => void {
    this.onTokenRefreshCallbacks.add(callback);
    return () => {
      this.onTokenRefreshCallbacks.delete(callback);
    };
  }

  private notifyTokenRefresh(): void {
    for (const callback of this.onTokenRefreshCallbacks) {
      try {
        callback();
      } catch (error) {
        this.logger.warn("Error in token refresh callback", error);
      }
    }
  }

  async authenticate(): Promise<void> {
    const auth = this.authOptions;

    if (isPresent(this.cache)) {
      this.logger.debug("Attempting to load cached token");
      const cached = await this.cache.load();
      if (isPresent(cached)) {
        this.logger.info("Loaded token from cache");
        this.tokenState = fromCachedToken(cached);
        return;
      }
    }

    if (isPresent(auth) && isTokenAuth(auth)) {
      this.logger.debug("Using provided token");
      if (typeof auth.token === "string") {
        this.tokenState = { accessToken: auth.token };
      } else {
        this.tokenState = {
          accessToken: auth.token.accessToken,
          refreshToken: auth.token.refreshToken,
        };
      }
      await this.maybeCacheToken();
      return;
    }

    this.logger.info("Starting authentication flow");
    const caidoAuth = this.getOrCreateCaidoAuth();
    const token = await caidoAuth.startAuthenticationFlow();
    this.applyAuthToken(token);
    this.logger.info("Authentication flow completed");
    await this.maybeCacheToken();
  }

  async refresh(): Promise<void> {
    const refreshToken = this.tokenState?.refreshToken;
    if (isAbsent(refreshToken)) {
      throw new Error(
        "Cannot refresh token: no refresh token available. " +
          "Provide a token pair with a refresh token, or use PAT/browser authentication.",
      );
    }

    this.logger.debug("Refreshing access token");
    const caidoAuth = this.getOrCreateCaidoAuth();
    const token = await caidoAuth.refreshToken(refreshToken);
    this.applyAuthToken(token);
    this.logger.info("Access token refreshed");
    await this.maybeCacheToken();
    this.notifyTokenRefresh();
  }

  private getOrCreateCaidoAuth(): CaidoAuth {
    if (isAbsent(this.caidoAuth)) {
      const approver = this.createApprover();
      this.caidoAuth = new CaidoAuth(this.instanceUrl, approver);
    }
    return this.caidoAuth;
  }

  private createApprover() {
    const auth = this.authOptions;

    if (isPresent(auth) && isPATAuth(auth)) {
      return new PATApprover({ pat: auth.pat });
    }

    const logger = this.logger;
    const browserAuth = auth as BrowserAuthOptions | undefined;
    const onRequest =
      browserAuth?.onRequest ??
      ((request) => {
        logger.info(
          `Please visit the following URL to authenticate: ${request.verificationUrl}`,
        );
      });

    return new BrowserApprover(onRequest);
  }

  private applyAuthToken(token: AuthenticationToken): void {
    this.tokenState = {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      expiresAt: token.expiresAt,
    };
  }

  private async maybeCacheToken(): Promise<void> {
    if (isAbsent(this.cache) || isAbsent(this.tokenState)) return;

    this.logger.debug("Saving token to cache");
    await this.cache.save(toCachedToken(this.tokenState));
  }
}

function toCachedToken(state: TokenState): CachedToken {
  return {
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
    expiresAt: state.expiresAt?.toISOString(),
  };
}

function fromCachedToken(cached: CachedToken): TokenState {
  return {
    accessToken: cached.accessToken,
    refreshToken: cached.refreshToken,
    expiresAt: isPresent(cached.expiresAt)
      ? new Date(cached.expiresAt)
      : undefined,
  };
}
