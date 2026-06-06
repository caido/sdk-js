import type { DnsRewriteFullFragment } from "@/graphql/index.js";
import type { DNSResolver, DNSRewrite } from "@/types/index.js";

export const mapToDnsRewrite = (node: DnsRewriteFullFragment): DNSRewrite => {
  return {
    id: node.id,
    allowlist: node.allowlist,
    denylist: node.denylist,
    enabled: node.enabled,
    rank: parseInt(node.rank, 10),
    resolution: mapToDNSResolver(node.resolution),
  };
};

const mapToDNSResolver = (
  resolver: DnsRewriteFullFragment["resolution"],
): DNSResolver => {
  if (resolver.__typename === "DnsIpResolver") {
    return {
      type: "ip",
      ip: resolver.ip,
    };
  }

  if (resolver.__typename === "DnsUpstreamResolver") {
    return {
      type: "upstream",
      id: resolver.id,
    };
  }

  const _exhaustive: never = resolver;
  throw new Error(`Unknown DNS resolver type: ${_exhaustive}`);
};
