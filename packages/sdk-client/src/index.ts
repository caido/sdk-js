export { Caido } from "@/client.js";

export type {
  CaidoOptions,
  RequestOptions,
} from "@/options.js";
export type {
  AuthCacheOptions,
  AuthOptions,
  BrowserAuthOptions,
  PATAuthOptions,
  TokenAuthOptions,
  TokenPair,
} from "@/auth/types.js";
export * from "@/types/index.js";

export {
  AuthorizationUserError,
  CaidoError,
  CloudUserError,
  ErrorCodes,
  GraphQLRequestError,
  OtherUserError,
  toUserError,
} from "@/errors.js";

export { ConsoleLogger, type Logger } from "@/logger.js";

export type { CachedToken, TokenCache } from "@/auth/cache/types.js";
export {
  FileTokenCache,
  type FileTokenCacheOptions,
} from "@/auth/cache/file.js";
export {
  LocalStorageTokenCache,
  type LocalStorageTokenCacheOptions,
} from "@/auth/cache/localstorage.js";

export { GraphQLClient } from "@/graphql/index.js";
export { RestClient, type RestRequestOptions } from "@/rest/index.js";

export * from "@/sdks/index.js";
