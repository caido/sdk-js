import { mapToDNSUpstream } from "@/convert/dnsUpstream.js";
import {
  CreateDnsUpstreamDocument,
  DnsUpstreamsDocument,
  type GraphQLClient,
} from "@/graphql/index.js";
import type { CreateDNSUpstreamOptions, DNSUpstream } from "@/types/index.js";

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

  /**
   * Create a new DNS upstream resolver.
   */
  async create(options: CreateDNSUpstreamOptions): Promise<DNSUpstream> {
    const result = await this.graphql.mutation(CreateDnsUpstreamDocument, {
      input: {
        ip: options.ip,
        name: options.name,
      },
    });

    const upstream = result.createDnsUpstream.upstream;
    return mapToDNSUpstream(upstream);
  }
}
