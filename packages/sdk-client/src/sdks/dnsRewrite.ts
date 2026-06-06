import { mapToDnsRewrite } from "@/convert/dnsRewrite.js";
import {
  CreateDnsRewriteDocument,
  type CreateDnsRewriteMutation,
  type GraphQLClient,
} from "@/graphql/index.js";
import type { CreateDNSRewriteOptions, DNSRewrite } from "@/types/index.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { isAbsent, isPresent } from "@/utils/optional.js";

/**
 * Higher-level SDK for DNS rewrite-related operations.
 */
export class DNSRewriteSDK {
  private readonly graphql: GraphQLClient;

  constructor(graphql: GraphQLClient) {
    this.graphql = graphql;
  }

  /**
   * Create a new DNS rewrite.
   */
  async create(options: CreateDNSRewriteOptions): Promise<DNSRewrite> {
    const resolution = mapFromDNSResolver(options.resolution);
    const result: CreateDnsRewriteMutation = await this.graphql.mutation(
      CreateDnsRewriteDocument,
      {
        input: {
          allowlist: options.allowlist,
          denylist: options.denylist,
          resolution,
        },
      },
    );

    const payload = result.createDnsRewrite;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    const rewrite = payload.rewrite;
    if (isAbsent(rewrite)) {
      throw new Error("createDnsRewrite returned no rewrite");
    }
    return mapToDnsRewrite(rewrite);
  }
}

const mapFromDNSResolver = (
  resolver: CreateDNSRewriteOptions["resolution"],
) => {
  if (resolver.type === "ip") {
    return {
      ip: { ip: resolver.ip },
    };
  }

  return {
    upstream: { id: resolver.id as string },
  };
};
