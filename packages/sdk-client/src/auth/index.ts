import {
  type AuthenticationToken,
  BrowserApprover,
  CaidoAuth,
  PATApprover,
} from "@caido/server-auth";

import type { CachedToken, TokenCache } from "./cache/types.js";

import type { AuthOptions, RequestOptions } from "@/types.js";
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

  private tokenState: TokenState | undefined;
  private caidoAuth: CaidoAuth | undefined;

  constructor(
    instanceUrl: string,
    authOptions?: AuthOptions,
    requestOptions?: RequestOptions,
  ) {
    this.instanceUrl = instanceUrl;
    this.authOptions = authOptions;
    this.requestOptions = requestOptions;
    this.cache = authOptions?.cache;
  }

  getAccessToken(): string | undefined {
    return this.tokenState?.accessToken;
  }

  canRefresh(): boolean {
    return isPresent(this.tokenState?.refreshToken);
  }

  async authenticate(): Promise<void> {
    const auth = this.authOptions;

    if (isPresent(this.cache)) {
      const cached = await this.cache.load();
      if (isPresent(cached)) {
        this.tokenState = fromCachedToken(cached);
        return;
      }
    }

    if (isPresent(auth?.token)) {
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

    const caidoAuth = this.getOrCreateCaidoAuth();
    const token = await caidoAuth.startAuthenticationFlow();
    this.applyAuthToken(token);
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

    const caidoAuth = this.getOrCreateCaidoAuth();
    const token = await caidoAuth.refreshToken(refreshToken);
    this.applyAuthToken(token);
    await this.maybeCacheToken();
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

    if (isPresent(auth?.pat)) {
      return new PATApprover({ pat: auth.pat });
    }

    const onRequest =
      auth?.onRequest ??
      ((request) => {
        console.log(
          `\nPlease visit the following URL to authenticate:\n${request.verificationUrl}\n\nEnter code: ${request.userCode}\n`,
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
