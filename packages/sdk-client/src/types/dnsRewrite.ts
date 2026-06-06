import type { ID } from "./index.js";

/**
 * DNS resolver - either IP-based or upstream resolver-based
 */
export type DNSResolver =
  | { type: "ip"; ip: string }
  | { type: "upstream"; id: ID };

/**
 * DNS rewrite information
 */
export type DNSRewrite = {
  id: ID;
  allowlist: string[];
  denylist: string[];
  enabled: boolean;
  rank: number;
  resolution: DNSResolver;
};

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
