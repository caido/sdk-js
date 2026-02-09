import { BaseError } from "./base.js";

import { AuthorizationErrorReason } from "@/graphql/index.js";

export class PermissionDeniedUserError extends BaseError {
  readonly __typename = "PermissionDeniedUserError";

  constructor() {
    super("You don't have the required permissions for this action.");
  }

  static isPermissionDeniedUserError(
    error: BaseError,
  ): error is PermissionDeniedUserError {
    return error instanceof PermissionDeniedUserError;
  }
}

export class AuthorizationUserError extends BaseError {
  readonly __typename = "AuthorizationUserError";
  readonly reason: AuthorizationErrorReason;

  constructor(error: { reason: AuthorizationErrorReason }) {
    switch (error.reason) {
      case AuthorizationErrorReason.Forbidden:
        super("You don't have the required permissions for this action.");
        this.reason = AuthorizationErrorReason.Forbidden;
        break;
      case AuthorizationErrorReason.InvalidToken:
        super(
          "Your session has expired or is invalid. Please try signing in again.",
        );
        this.reason = AuthorizationErrorReason.InvalidToken;
        break;
      case AuthorizationErrorReason.MissingScope:
        super(
          "Your account is missing the required permissions for this action.",
        );
        this.reason = AuthorizationErrorReason.MissingScope;
        break;
    }
  }
}
