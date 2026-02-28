import type { HostedFileFullFragment } from "@/graphql/index.js";
import type { HostedFile } from "@/types/index.js";

export const mapToHostedFile = (node: HostedFileFullFragment): HostedFile => {
  return {
    id: node.id,
    name: node.name,
    path: node.path,
    size: node.size,
    status: node.status,
    createdAt: node.createdAt,
    updatedAt: node.updatedAt,
  };
};
