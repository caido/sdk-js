import type { GraphQLClient } from "@/graphql/index.js";
import { InstanceSettingsSDK } from "@/sdks/instanceSettings.js";

/**
 * Top-level SDK for instance-wide features.
 */
export class InstanceSDK {
  readonly settings: InstanceSettingsSDK;

  constructor(graphql: GraphQLClient) {
    this.settings = new InstanceSettingsSDK(graphql);
  }
}
