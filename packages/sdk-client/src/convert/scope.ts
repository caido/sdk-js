import type { ScopeFullFragment } from "@/graphql/index.js";
import type { Scope } from "@/types/index.js";

export const mapToScope = (node: ScopeFullFragment): Scope => {
  return {
    id: node.id,
    name: node.name,
    allowlist: node.allowlist,
    denylist: node.denylist,
    indexed: node.indexed,
  };
};
