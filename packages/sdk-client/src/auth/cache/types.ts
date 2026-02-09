import type { Maybe } from "@/utils/optional.js";

export interface CachedToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
}

export interface TokenCache {
  load(): Promise<Maybe<CachedToken>>;
  save(token: CachedToken): Promise<void>;
  clear(): Promise<void>;
}
