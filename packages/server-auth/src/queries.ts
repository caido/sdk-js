import type { DocumentNode } from "graphql";
import { gql } from "graphql-tag";

export const START_AUTHENTICATION_FLOW: DocumentNode = gql`
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

export const CREATED_AUTHENTICATION_TOKEN: DocumentNode = gql`
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

export const REFRESH_AUTHENTICATION_TOKEN: DocumentNode = gql`
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
