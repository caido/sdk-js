import { mapToTamperRuleCollection } from "@/convert/tamperRuleCollection.js";
import {
  CreateTamperRuleCollectionDocument,
  type GraphQLClient,
} from "@/graphql/index.js";
import type {
  CreateTamperRuleCollectionInput,
  TamperRuleCollection,
} from "@/types/index.js";

/**
 * Higher-level SDK for tamper rule collection-related operations.
 */
export class TamperRuleCollectionSDK {
  private readonly graphql: GraphQLClient;

  constructor(graphql: GraphQLClient) {
    this.graphql = graphql;
  }

  /**
   * Create a new tamper rule collection.
   */
  async create(
    input: CreateTamperRuleCollectionInput,
  ): Promise<TamperRuleCollection> {
    const result = await this.graphql.mutation(
      CreateTamperRuleCollectionDocument,
      {
        input: {
          name: input.name,
        },
      },
    );

    const collection = result.createTamperRuleCollection.collection!;
    return mapToTamperRuleCollection(collection);
  }
}
