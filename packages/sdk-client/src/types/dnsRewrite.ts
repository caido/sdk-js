import type { ID } from "./index.js";

/**
 * DNS rewrite rule
 */
export type DNSRewrite = {
  id: ID;
  allowlist: string[];
  denylist: string[];
  enabled: boolean;
  rank: string;
  resolution: DNSResolver;
};

/**
 * DNS resolver configuration (IP or upstream)
 */
export type DNSResolver =
  | { kind: "ip"; ip: string }
  | { kind: "upstream"; upstreamId: ID };

/**
 * Options for creating a DNS rewrite
 */
export type CreateDNSRewriteOptions = {
  /** The allowlist of glob patterns */
  allowlist: string[];
  /** The denylist of glob patterns */
  denylist: string[];
  /** The DNS resolver configuration */
  resolution: DNSResolver;
};
