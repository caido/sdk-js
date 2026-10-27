import type { GraphQLClient } from "@/graphql/index.js";
import { CertificateSDK } from "@/sdks/certificate.js";
import { InstanceSettingsSDK } from "@/sdks/instanceSettings.js";
import type { Version } from "@/version.js";

/**
 * Top-level SDK for instance-wide features.
 */
export class InstanceSDK {
  readonly certificate: CertificateSDK;
  readonly settings: InstanceSettingsSDK;

  constructor(graphql: GraphQLClient, version: Version) {
    this.certificate = new CertificateSDK(graphql);
    this.settings = new InstanceSettingsSDK(graphql, version);
  }
}
