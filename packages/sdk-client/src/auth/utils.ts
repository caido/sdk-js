import { FileTokenCache } from "./cache/file.js";
import { LocalStorageTokenCache } from "./cache/localstorage.js";
import type { TokenCache } from "./cache/types.js";
import type {
  AuthCacheFile,
  AuthCacheLocalStorage,
  AuthCacheOptions,
  AuthOptions,
  PATAuthOptions,
  TokenAuthOptions,
} from "./types.js";

import type { Logger } from "@/logger.js";

export const isPATAuth = (auth: AuthOptions): auth is PATAuthOptions => {
  return "pat" in auth;
};

export const isTokenAuth = (auth: AuthOptions): auth is TokenAuthOptions => {
  return "token" in auth;
};

export const isFileCacheOptions = (
  options: AuthCacheOptions,
): options is AuthCacheFile => {
  return "file" in options;
};

export const isLocalStorageCacheOptions = (
  options: AuthCacheOptions,
): options is AuthCacheLocalStorage => {
  return "localstorage" in options;
};

export const resolveCache = (
  options: AuthCacheOptions,
  logger: Logger,
): TokenCache => {
  if (isFileCacheOptions(options)) {
    return new FileTokenCache({ path: options.file, logger });
  }
  if (isLocalStorageCacheOptions(options)) {
    return new LocalStorageTokenCache({ key: options.localstorage, logger });
  }
  return options;
};
