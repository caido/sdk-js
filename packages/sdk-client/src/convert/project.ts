import type { ProjectFullFragment } from "@/graphql/index.js";
import type { Project } from "@/types/index.js";

export const mapToProject = (node: ProjectFullFragment): Project => {
  return {
    id: node.id,
    name: node.name,
    path: node.path,
    readOnly: node.readOnly,
    size: node.size,
    status: node.status,
    temporary: node.temporary,
    createdAt: node.createdAt,
    updatedAt: node.updatedAt,
    version: node.version,
  };
};
