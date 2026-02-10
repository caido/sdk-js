import { BaseError } from "./base.js";

/**
 * Error thrown when attempting to refresh a token but no refresh token is available.
 */
export class TokenRefreshError extends BaseError {
  readonly __typename = "TokenRefreshError";

  constructor() {
    super(
      "Cannot refresh token: no refresh token available. " +
        "Provide a token pair with a refresh token, or use PAT/browser authentication.",
    );
  }
}
