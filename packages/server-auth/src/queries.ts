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
        ... on AuthenticationUserError {
          code
          reason
        }
        ... on CloudUserError {
          code
          reason
        }
        ... on InternalUserError {
          code
          message
        }
        ... on OtherUserError {
          code
        }
      }
    }
  }
`;

export const CREATED_AUTHENTICATION_TOKEN: DocumentNode = gql`
  subscription CreatedAuthenticationToken($requestId: ID!) {
    createdAuthenticationToken(requestId: $requestId) {
      token {
        accessToken
        expiresAt
        refreshToken
        scopes
      }
      error {
        ... on AuthenticationUserError {
          code
          reason
        }
        ... on InternalUserError {
          code
          message
        }
        ... on OtherUserError {
          code
        }
      }
    }
  }
`;

export const REFRESH_AUTHENTICATION_TOKEN: DocumentNode = gql`
  mutation RefreshAuthenticationToken($refreshToken: Token!) {
    refreshAuthenticationToken(refreshToken: $refreshToken) {
      token {
        accessToken
        expiresAt
        refreshToken
        scopes
      }
      error {
        ... on AuthenticationUserError {
          code
          reason
        }
        ... on CloudUserError {
          code
          reason
        }
        ... on InternalUserError {
          code
          message
        }
        ... on OtherUserError {
          code
        }
      }
    }
  }
`;
