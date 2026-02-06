import { GraphQLError } from "graphql";

import { isAbsent, isPresent } from "@/utils/optional.js";

/**
 * Base error class for all Caido client errors.
 */
export class CaidoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CaidoError";
  }
}

export const ErrorCodes = {
  AUTHORIZATION: "AUTHORIZATION",
  CLOUD: "CLOUD",
  INTERNAL: "INTERNAL",
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

/**
 * Error thrown when the server returns an authorization error.
 * This typically means the access token is expired or invalid.
 */
export class AuthorizationUserError extends CaidoError {
  readonly code = ErrorCodes.AUTHORIZATION;
  readonly reason: string;

  constructor(data: { reason: string }) {
    super(`Authorization error: ${data.reason}`);
    this.name = "AuthorizationUserError";
    this.reason = data.reason;
  }
}

/**
 * Error thrown when the server returns a cloud-related error.
 */
export class CloudUserError extends CaidoError {
  readonly code = ErrorCodes.CLOUD;
  readonly cloudReason: string;

  constructor(data: { cloudReason: string }) {
    super(`Cloud error: ${data.cloudReason}`);
    this.name = "CloudUserError";
    this.cloudReason = data.cloudReason;
  }
}

/**
 * Error thrown when the server returns an internal error.
 */
export class OtherUserError extends CaidoError {
  readonly code: string;

  constructor(code: string, message: string) {
    super(`${code}: ${message}`);
    this.name = "OtherUserError";
    this.code = code;
  }
}

/**
 * Error wrapping a full GraphQL error response.
 */
export class GraphQLRequestError extends CaidoError {
  readonly errors: readonly GraphQLError[];

  constructor(errors: readonly GraphQLError[]) {
    const messages = errors.map((e) => e.message).join("; ");
    super(`GraphQL error: ${messages}`);
    this.name = "GraphQLRequestError";
    this.errors = errors;
  }
}

interface CaidoExtension {
  code: string;
  reason?: string;
  message?: string;
}

/**
 * Parse a GraphQL error's CAIDO extension into a typed user error.
 * Returns `undefined` if the error doesn't have a recognized CAIDO extension.
 */
export function toUserError(
  error: GraphQLError,
): AuthorizationUserError | CloudUserError | OtherUserError | undefined {
  const caidoExtension = error.extensions?.["CAIDO"] as
    | CaidoExtension
    | undefined;
  if (isAbsent(caidoExtension) || typeof caidoExtension.code !== "string") {
    return undefined;
  }

  switch (caidoExtension.code) {
    case ErrorCodes.AUTHORIZATION:
      return new AuthorizationUserError({
        reason: caidoExtension.reason ?? "unknown",
      });
    case ErrorCodes.CLOUD:
      return new CloudUserError({
        cloudReason: caidoExtension.reason ?? "unknown",
      });
    case ErrorCodes.INTERNAL:
      return new OtherUserError(
        caidoExtension.code,
        caidoExtension.message ?? "unknown",
      );
    default:
      return undefined;
  }
}

/**
 * Check if a list of GraphQL errors contains an authorization error.
 */
export function hasAuthorizationError(
  errors: readonly GraphQLError[],
): boolean {
  return errors.some((e) => {
    const userError = toUserError(e);
    return isPresent(userError) && userError instanceof AuthorizationUserError;
  });
}
