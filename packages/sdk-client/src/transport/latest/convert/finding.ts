import type { FindingFullFragment } from "@/graphql/index.js";
import type { Finding } from "@/types/index.js";

export const mapToFinding = (node: FindingFullFragment): Finding => {
  return {
    id: node.id,
    requestId: node.request.id,
    title: node.title,
    reporter: node.reporter,
    description: node.description ?? undefined,
    dedupeKey: node.dedupeKey ?? undefined,
    host: node.host,
    path: node.path,
    hidden: node.hidden,
    createdAt: new Date(node.createdAt),
  };
};
