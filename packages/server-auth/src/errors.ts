/**
 * Base error class for authentication-related errors.
 */
export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

/**
 * Error thrown when the authentication flow fails to start.
 */
export class AuthenticationFlowError extends AuthenticationError {
  /** Error code from the API */
  readonly code: string;

  constructor(code: string, message: string) {
    super(`${code}: ${message}`);
    this.name = "AuthenticationFlowError";
    this.code = code;
  }
}

/**
 * Error thrown when token refresh fails.
 */
export class TokenRefreshError extends AuthenticationError {
  /** Error code from the API */
  readonly code: string;

  constructor(code: string, message: string) {
    super(`${code}: ${message}`);
    this.name = "TokenRefreshError";
    this.code = code;
  }
}

/**
 * Error thrown when device approval fails.
 */
export class DeviceApprovalError extends AuthenticationError {
  /** HTTP status code if available */
  readonly statusCode: number | undefined;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "DeviceApprovalError";
    this.statusCode = statusCode;
  }
}

/**
 * Error thrown when fetching device information fails.
 */
export class DeviceInformationError extends AuthenticationError {
  /** HTTP status code if available */
  readonly statusCode: number | undefined;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "DeviceInformationError";
    this.statusCode = statusCode;
  }
}
