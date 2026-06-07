import type { BackupFullFragment } from "@/graphql/index.js";
import type { Backup } from "@/types/index.js";

export const mapToBackup = (node: BackupFullFragment): Backup => {
  return {
    id: node.id,
    name: node.name,
    createdAt: new Date(node.createdAt),
    status: node.status,
  };
};
