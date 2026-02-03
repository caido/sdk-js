import gql from "graphql-tag";

/**
 * Mutation to start the device code authentication flow.
 */
export const START_AUTHENTICATION_FLOW = gql`
  mutation StartAuthenticationFlow {
    startAuthenticationFlow {
      request {
        id
        userCode
        verificationUrl
        expiresAt
      }
      error {
        code
        message
      }
    }
  }
`;

/**
 * Subscription to receive the authentication token once the user approves.
 */
export const CREATED_AUTHENTICATION_TOKEN = gql`
  subscription CreatedAuthenticationToken($requestId: ID!) {
    createdAuthenticationToken(requestId: $requestId) {
      token {
        accessToken
        refreshToken
        expiresAt
      }
      error {
        code
        message
      }
    }
  }
`;

/**
 * Mutation to refresh an authentication token.
 */
export const REFRESH_AUTHENTICATION_TOKEN = gql`
  mutation RefreshAuthenticationToken($refreshToken: String!) {
    refreshAuthenticationToken(refreshToken: $refreshToken) {
      token {
        accessToken
        refreshToken
        expiresAt
      }
      error {
        code
        message
      }
    }
  }
`;
