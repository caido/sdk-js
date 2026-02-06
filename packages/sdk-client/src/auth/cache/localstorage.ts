import type { CachedToken, TokenCache } from "./types.js";

import type { Maybe } from "@/utils/optional.js";
import { isAbsent } from "@/utils/optional.js";

export interface LocalStorageTokenCacheOptions {
  key?: string;
}

const DEFAULT_KEY = "caido-token";

export class LocalStorageTokenCache implements TokenCache {
  private readonly key: string;

  constructor(options?: LocalStorageTokenCacheOptions) {
    this.key = options?.key ?? DEFAULT_KEY;
  }

  async load(): Promise<Maybe<CachedToken>> {
    try {
      const data = localStorage.getItem(this.key);
      if (isAbsent(data)) return undefined;

      const parsed = JSON.parse(data) as {
        accessToken?: string;
        refreshToken?: string;
        expiresAt?: string;
      };

      if (isAbsent(parsed.accessToken)) return undefined;

      return {
        accessToken: parsed.accessToken,
        refreshToken: parsed.refreshToken,
        expiresAt: parsed.expiresAt,
      };
    } catch {
      return undefined;
    }
  }

  async save(token: CachedToken): Promise<void> {
    try {
      const data = JSON.stringify(token);
      localStorage.setItem(this.key, data);
    } catch {
      // Silently fail on cache write errors
    }
  }

  async clear(): Promise<void> {
    try {
      localStorage.removeItem(this.key);
    } catch {
      // Silently fail
    }
  }
}
