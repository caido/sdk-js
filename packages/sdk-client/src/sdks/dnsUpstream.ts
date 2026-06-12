import { mapToDNSUpstream } from "@/convert/dnsUpstream.js";
import { DnsUpstreamsDocument, type GraphQLClient } from "@/graphql/index.js";
import type { DNSUpstream } from "@/types/index.js";

/**
 * Higher-level SDK for DNS upstream resolver-related operations.
 */
export class DNSUpstreamSDK {
  private readonly graphql: GraphQLClient;

  constructor(graphql: GraphQLClient) {
    this.graphql = graphql;
  }

  /**
   * List all DNS upstream resolvers.
   */
  async list(): Promise<DNSUpstream[]> {
    const result = await this.graphql.query(DnsUpstreamsDocument);
    return result.dnsUpstreams.map(mapToDNSUpstream);
  }
}
