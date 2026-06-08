import type { BackupFullFragment } from "@/graphql/index.js";
import type { Backup } from "@/types/index.js";

export const mapToBackup = (node: BackupFullFragment): Backup => {
  return {
    id: node.id,
    name: node.name,
    status: node.status,
    size: node.size,
    path: node.path,
    createdAt: new Date(node.createdAt),
    updatedAt: new Date(node.updatedAt),
  };
};
