import type { GraphQLClient } from "@/graphql/index.js";
import { CertificateSDK } from "@/sdks/certificate.js";
import { InstanceSettingsSDK } from "@/sdks/instanceSettings.js";

/**
 * Top-level SDK for instance-wide features.
 */
export class InstanceSDK {
  readonly certificate: CertificateSDK;
  readonly settings: InstanceSettingsSDK;

  constructor(graphql: GraphQLClient) {
    this.certificate = new CertificateSDK(graphql);
    this.settings = new InstanceSettingsSDK(graphql);
  }
}
