import type { Logger } from "@/logger.js";
import type { RetryOptions, RetryRequest } from "@/types.js";
import { isPresent } from "@/utils/optional.js";

export interface ResolvedRetryConfig {
  enabled: boolean;
  retries: number;
  callback?: (request: RetryRequest) => boolean;
}

export function resolveRetryConfig(
  options?: RetryOptions,
): ResolvedRetryConfig {
  return {
    enabled: options?.enabled ?? true,
    retries: options?.retries ?? 3,
    callback: options?.callback,
  };
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  retryConfig: ResolvedRetryConfig,
  requestInfo: { url: string; method: string; body?: unknown },
  logger: Logger,
  shouldRetry: (error: Error) => boolean = () => true,
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= retryConfig.retries; attempt++) {
    try {
      return await operation();
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error(String(error));
      lastError = err;

      if (!retryConfig.enabled) {
        throw err;
      }

      if (attempt >= retryConfig.retries) {
        throw err;
      }

      if (!shouldRetry(err)) {
        throw err;
      }

      if (isPresent(retryConfig.callback)) {
        const retryRequest: RetryRequest = {
          url: requestInfo.url,
          method: requestInfo.method,
          body: requestInfo.body,
          attempt,
          error: err,
        };

        if (!retryConfig.callback(retryRequest)) {
          throw err;
        }
      }

      logger.warn(
        `Retrying request ${requestInfo.method} ${requestInfo.url} (attempt ${attempt + 1}/${retryConfig.retries})`,
        err,
      );
    }
  }

  throw lastError ?? new Error("Retry exhausted");
}
