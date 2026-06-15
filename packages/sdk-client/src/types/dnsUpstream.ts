import type { ID } from "./index.js";

/**
 * DNS upstream resolver configuration
 */
export type DNSUpstream = {
  id: ID;
  ip: string;
  name: string;
};

/**
 * Options for creating a DNS upstream resolver
 */
export type CreateDNSUpstreamOptions = {
  /** The IP address of the upstream resolver */
  ip: string;
  /** The name of the upstream resolver */
  name: string;
};
