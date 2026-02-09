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
 * Error thrown for errors coming from the Caido cloud API.
 * Used for device approval and device information operations.
 */
export class CloudError extends AuthenticationError {
  /** HTTP status code if available */
  readonly statusCode: number | undefined;
  /** Error code from the API if available */
  readonly code: string | undefined;
  /** Reason for the error if available */
  readonly reason: string | undefined;

  constructor(
    message: string,
    options?: {
      statusCode?: number;
      code?: string;
      reason?: string;
    },
  ) {
    super(message);
    this.name = "CloudError";
    this.statusCode = options?.statusCode;
    this.code = options?.code;
    this.reason = options?.reason;
  }
}

/**
 * Error thrown for errors coming from the Caido instance.
 * Used for authentication flow and token refresh operations.
 */
export class InstanceError extends AuthenticationError {
  /** Error code from the API */
  readonly code: string;
  /** Reason for the error if available */
  readonly reason: string | undefined;
  /** Error message if available */
  readonly errorMessage: string | undefined;

  constructor(
    code: string,
    options?: {
      reason?: string;
      message?: string;
    },
  ) {
    const message = options?.reason ?? options?.message ?? code;
    super(message);
    this.name = "InstanceError";
    this.code = code;
    this.reason = options?.reason;
    this.errorMessage = options?.message;
  }
}
