import type { GraphQLClient } from "@/graphql/index.js";
import { AISettingsSDK } from "@/sdks/aiSettings.js";
import { CertificateSDK } from "@/sdks/certificate.js";
import { InstanceSettingsSDK } from "@/sdks/instanceSettings.js";
import type { Version } from "@/version.js";

/**
 * Top-level SDK for instance-wide features.
 */
export class InstanceSDK {
  readonly ai: AISettingsSDK;
  readonly certificate: CertificateSDK;
  readonly settings: InstanceSettingsSDK;

  constructor(graphql: GraphQLClient, version: Version) {
    this.ai = new AISettingsSDK(graphql, version);
    this.certificate = new CertificateSDK(graphql);
    this.settings = new InstanceSettingsSDK(graphql);
  }
}
