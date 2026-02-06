import {
  ViewerDocument,
  type ViewerQuery,
} from "@/graphql/__generated__/operations.js";
import type { GraphQLClient } from "@/graphql/index.js";

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
   *
   * @returns The viewer query result containing user information
   */
  async viewer(): Promise<ViewerQuery["viewer"]> {
    const result = await this.graphql.query(ViewerDocument);
    return result.viewer;
  }
}
