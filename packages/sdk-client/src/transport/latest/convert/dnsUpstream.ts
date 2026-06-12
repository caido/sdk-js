import type { DnsUpstreamFullFragment } from "@/graphql/index.js";
import type { DNSUpstream } from "@/types/index.js";

export const mapToDNSUpstream = (
  node: DnsUpstreamFullFragment,
): DNSUpstream => {
  return {
    id: node.id,
    ip: node.ip,
    name: node.name,
  };
};
