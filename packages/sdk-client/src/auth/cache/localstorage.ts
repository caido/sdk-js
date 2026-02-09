import type { CachedToken, TokenCache } from "./types.js";

import type { Logger } from "@/logger.js";
import type { Maybe } from "@/utils/optional.js";
import { isAbsent } from "@/utils/optional.js";

interface LocalStorageTokenCacheOptions {
  key?: string;
  logger?: Logger;
}

const DEFAULT_KEY = "caido-token";

export class LocalStorageTokenCache implements TokenCache {
  private readonly key: string;
  private readonly logger: Logger | undefined;

  constructor(options?: LocalStorageTokenCacheOptions) {
    this.key = options?.key ?? DEFAULT_KEY;
    this.logger = options?.logger;
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
    } catch (error) {
      this.logger?.debug(
        "Failed to load cached token from localStorage",
        error,
      );
      return undefined;
    }
  }

  async save(token: CachedToken): Promise<void> {
    try {
      const data = JSON.stringify(token);
      localStorage.setItem(this.key, data);
    } catch (error) {
      this.logger?.warn("Failed to save token cache to localStorage", error);
    }
  }

  async clear(): Promise<void> {
    try {
      localStorage.removeItem(this.key);
    } catch (error) {
      this.logger?.warn("Failed to clear token cache from localStorage", error);
    }
  }
}
