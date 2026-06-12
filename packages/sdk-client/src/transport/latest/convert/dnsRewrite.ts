import type { DnsRewriteFullFragment } from "@/graphql/index.js";
import type { DNSResolver, DNSRewrite } from "@/types/index.js";

export const mapToDnsRewrite = (node: DnsRewriteFullFragment): DNSRewrite => {
  const resolution: DNSResolver =
    node.resolution.__typename === "DnsIpResolver"
      ? { kind: "ip", ip: node.resolution.ip }
      : { kind: "upstream", upstreamId: node.resolution.id };

  return {
    id: node.id,
    allowlist: node.allowlist,
    denylist: node.denylist,
    enabled: node.enabled,
    rank: node.rank,
    resolution,
  };
};
