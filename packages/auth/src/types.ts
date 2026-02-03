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
 * GraphQL error response structure.
 */
export interface GraphQLError {
  code: string;
  message: string;
}

/**
 * GraphQL response for startAuthenticationFlow mutation.
 */
export interface StartAuthenticationFlowResponse {
  startAuthenticationFlow: {
    request?: {
      id: string;
      userCode: string;
      verificationUrl: string;
      expiresAt: string;
    };
    error?: GraphQLError;
  };
}

/**
 * GraphQL response for createdAuthenticationToken subscription.
 */
export interface CreatedAuthenticationTokenResponse {
  createdAuthenticationToken: {
    token?: {
      accessToken: string;
      refreshToken: string;
      expiresAt: string;
    };
    error?: GraphQLError;
  };
}

/**
 * GraphQL response for refreshAuthenticationToken mutation.
 */
export interface RefreshAuthenticationTokenResponse {
  refreshAuthenticationToken: {
    token?: {
      accessToken: string;
      refreshToken: string;
      expiresAt: string;
    };
    error?: GraphQLError;
  };
}
