import * as fs from "node:fs";
import * as path from "node:path";

import {
  type AuthenticationToken,
  BrowserApprover,
  CaidoAuth,
  PATApprover,
} from "@caido/server-auth";

import type { AuthOptions, RequestOptions, TokenPair } from "@/types.js";
import { isAbsent, isPresent } from "@/utils/optional.js";

interface TokenState {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
}

/**
 * Manages authentication lifecycle: initial auth, token storage, refresh, and caching.
 */
export class AuthManager {
  private readonly instanceUrl: string;
  private readonly authOptions: AuthOptions | undefined;
  private readonly requestOptions: RequestOptions | undefined;

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
  }

  getAccessToken(): string | undefined {
    return this.tokenState?.accessToken;
  }

  canRefresh(): boolean {
    return isPresent(this.tokenState?.refreshToken);
  }

  /**
   * Perform initial authentication based on the provided options.
   *
   * - If `token` is provided, use it directly.
   * - If `pat` is provided, use PAT-based device code flow.
   * - Otherwise, fall back to browser-based device code flow.
   *
   * If caching is enabled, attempts to load a cached token first.
   */
  async authenticate(): Promise<void> {
    const auth = this.authOptions;

    if (auth?.cache) {
      const cached = this.loadCachedToken();
      if (isPresent(cached)) {
        this.tokenState = cached;
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
      this.maybeCacheToken();
      return;
    }

    const caidoAuth = this.getOrCreateCaidoAuth();
    const token = await caidoAuth.startAuthenticationFlow();
    this.applyAuthToken(token);
    this.maybeCacheToken();
  }

  /**
   * Refresh the current access token using the refresh token.
   * Throws if no refresh token is available.
   */
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
    this.maybeCacheToken();
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

  private getCachePath(): string | undefined {
    const auth = this.authOptions;
    if (!auth?.cache) return undefined;
    return auth.cachePath ?? path.join(process.cwd(), ".caido-token.json");
  }

  private loadCachedToken(): TokenState | undefined {
    const cachePath = this.getCachePath();
    if (isAbsent(cachePath)) return undefined;

    try {
      const data = fs.readFileSync(cachePath, "utf-8");
      const parsed = JSON.parse(data) as {
        accessToken?: string;
        refreshToken?: string;
        expiresAt?: string;
      };

      if (isAbsent(parsed.accessToken)) return undefined;

      return {
        accessToken: parsed.accessToken,
        refreshToken: parsed.refreshToken,
        expiresAt: isPresent(parsed.expiresAt)
          ? new Date(parsed.expiresAt)
          : undefined,
      };
    } catch {
      return undefined;
    }
  }

  private maybeCacheToken(): void {
    const cachePath = this.getCachePath();
    if (isAbsent(cachePath) || isAbsent(this.tokenState)) return;

    try {
      const dir = path.dirname(cachePath);
      fs.mkdirSync(dir, { recursive: true });

      const data = JSON.stringify(
        {
          accessToken: this.tokenState.accessToken,
          refreshToken: this.tokenState.refreshToken,
          expiresAt: this.tokenState.expiresAt?.toISOString(),
        },
        null,
        2,
      );

      fs.writeFileSync(cachePath, data, { mode: 0o600 });
    } catch {
      // Silently fail on cache write errors
    }
  }
}
