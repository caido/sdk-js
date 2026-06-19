import { mapToDnsRewrite } from "@/convert/dnsRewrite.js";
import {
  CreateDnsRewriteDocument,
  type GraphQLClient,
} from "@/graphql/index.js";
import type { CreateDNSRewriteOptions, DNSRewrite } from "@/types/index.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { isPresent } from "@/utils/optional.js";

/**
 * Higher-level SDK for DNS rewrite-related operations.
 */
export class DNSRewriteSDK {
  private readonly graphql: GraphQLClient;

  constructor(graphql: GraphQLClient) {
    this.graphql = graphql;
  }

  /**
   * Create a new DNS rewrite rule.
   */
  async create(options: CreateDNSRewriteOptions): Promise<DNSRewrite> {
    const input = {
      allowlist: options.allowlist,
      denylist: options.denylist,
      resolution:
        options.resolution.kind === "ip"
          ? { ip: { ip: options.resolution.ip } }
          : { upstream: { id: options.resolution.upstreamId as string } },
    };

    const result = await this.graphql.mutation(CreateDnsRewriteDocument, {
      input,
    });

    const payload = result.createDnsRewrite;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    return mapToDnsRewrite(payload.rewrite!);
  }
}
