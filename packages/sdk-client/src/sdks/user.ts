import { type GraphQLClient, ViewerDocument } from "@/graphql/index.js";
import type { User } from "@/types/index.js";

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
  async viewer(): Promise<User> {
    const result = await this.graphql.query(ViewerDocument);
    const user = result.viewer;
    switch (user.__typename) {
      case "CloudUser":
        return { kind: "CloudUser", id: user.id, profile: user.profile };
      case "GuestUser":
        return { kind: "GuestUser", id: user.id };
      case "ScriptUser":
        return { kind: "ScriptUser", id: user.id };
    }
  }
}
