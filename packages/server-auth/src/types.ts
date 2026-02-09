/**
 * Represents an authentication request from the device code flow.
 * Contains the information needed for the user to authorize the device.
 */
export interface AuthenticationRequest {
  /** Unique identifier for this authentication request */
  id: string;
  /** The code the user must enter to authorize */
  userCode: string;
  /** The URL where the user should go to authorize */
  verificationUrl: string;
  /** When this request expires */
  expiresAt: Date;
}

/**
 * Represents an authentication token obtained after successful authorization.
 */
export interface AuthenticationToken {
  /** The access token for API requests */
  accessToken: string;
  /** The refresh token to obtain new access tokens */
  refreshToken: string;
  /** When the access token expires */
  expiresAt: Date;
  /** The scopes granted to this token */
  scopes: string[];
}

/**
 * Scope information returned from device information endpoint.
 */
export interface DeviceScope {
  /** The scope identifier */
  name: string;
  /** Human-readable description of the scope */
  description?: string;
}

/**
 * Device information response from the API.
 */
export interface DeviceInformation {
  /** The user code associated with this device request */
  userCode: string;
  /** List of scopes requested by the device */
  scopes: DeviceScope[];
}

/**
 * Base error type with code
 */
interface BaseError {
  code: string;
}

/**
 * Authentication user error with code and reason
 */
export interface AuthenticationUserError extends BaseError {
  reason: string;
}

/**
 * Cloud user error with code and reason
 */
export interface CloudUserError extends BaseError {
  reason: string;
}

/**
 * Internal user error with code and message
 */
export interface InternalUserError extends BaseError {
  message: string;
}

/**
 * Other user error with just code
 */
export interface OtherUserError extends BaseError {}

/**
 * Union type for all possible authentication flow errors
 */
export type StartAuthenticationFlowError =
  | AuthenticationUserError
  | CloudUserError
  | InternalUserError
  | OtherUserError;

/**
 * Union type for authentication token creation errors
 */
export type CreatedAuthenticationTokenError =
  | AuthenticationUserError
  | InternalUserError
  | OtherUserError;

/**
 * Union type for token refresh errors
 */
export type RefreshAuthenticationTokenError =
  | AuthenticationUserError
  | CloudUserError
  | InternalUserError
  | OtherUserError;

export interface StartAuthenticationFlowResponse {
  startAuthenticationFlow: {
    request?: {
      id: string;
      userCode: string;
      verificationUrl: string;
      expiresAt: string;
    };
    error?: StartAuthenticationFlowError;
  };
}

export interface CreatedAuthenticationTokenResponse {
  createdAuthenticationToken: {
    token?: {
      accessToken: string;
      expiresAt: string;
      refreshToken: string;
      scopes: string[];
    };
    error?: CreatedAuthenticationTokenError;
  };
}

export interface RefreshAuthenticationTokenResponse {
  refreshAuthenticationToken: {
    token?: {
      accessToken: string;
      expiresAt: string;
      refreshToken: string;
      scopes: string[];
    };
    error?: RefreshAuthenticationTokenError;
  };
}
