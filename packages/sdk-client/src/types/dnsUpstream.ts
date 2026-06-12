import type { ID } from "./index.js";

/**
 * DNS upstream resolver configuration
 */
export type DNSUpstream = {
  id: ID;
  ip: string;
  name: string;
};
