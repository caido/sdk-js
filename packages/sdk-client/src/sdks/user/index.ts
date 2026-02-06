import {
  type GraphQLClient,
  type UserFragment,
  ViewerDocument,
} from "@/graphql/index.js";

/**
 * Higher-level SDK for user-related operations.
 */
export class UserSDK {
  private readonly graphql: GraphQLClient;

  constructor(graphql: GraphQLClient) {
    this.graphql = graphql;
  }

  /**
   * Get the currently authenticated user (viewer).
   */
  async viewer(): Promise<UserFragment> {
    const result = await this.graphql.query(ViewerDocument);
    return result.viewer;
  }
}
