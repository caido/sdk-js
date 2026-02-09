import {
  FileTokenCache,
  LocalStorageTokenCache,
  type TokenCache,
} from "./cache/index.js";
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

const isFileCacheOptions = (
  options: AuthCacheOptions,
): options is AuthCacheFile => {
  return "file" in options;
};

const isLocalStorageCacheOptions = (
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
