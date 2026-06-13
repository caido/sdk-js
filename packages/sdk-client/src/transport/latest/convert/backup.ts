import type { BackupFullFragment } from "@/graphql/index.js";
import type { Backup } from "@/types/index.js";

export const mapToBackup = (node: BackupFullFragment): Backup => {
  return {
    id: node.id,
    name: node.name,
    path: node.path,
    size: node.size,
    status: node.status,
    createdAt: new Date(node.createdAt),
    updatedAt: new Date(node.updatedAt),
  };
};
