import { decodeBlob } from "./blob.js";

import type { AutomateSessionFullFragment } from "@/graphql/index.js";
import type { AutomateSession } from "@/types/index.js";

export const mapToAutomateSession = (
  node: AutomateSessionFullFragment,
): AutomateSession => {
  return {
    id: node.id,
    name: node.name,
    createdAt: node.createdAt,
    raw: decodeBlob(node.raw)!,
  };
};
