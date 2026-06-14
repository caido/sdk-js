import type { BackupFullFragment } from "@/graphql/index.js";
import { BackupStatus as GeneratedBackupStatus } from "@/transport/latest/__generated__/enums.js";
import type { Backup, BackupStatus } from "@/types/index.js";

const backupStatusMap: Record<
  (typeof GeneratedBackupStatus)[keyof typeof GeneratedBackupStatus],
  BackupStatus
> = {
  [GeneratedBackupStatus.Done]: "COMPLETED",
  [GeneratedBackupStatus.Error]: "FAILED",
  [GeneratedBackupStatus.Processing]: "IN_PROGRESS",
};

export const mapToBackup = (node: BackupFullFragment): Backup => {
  return {
    id: node.id,
    name: node.name,
    path: node.path,
    status: backupStatusMap[node.status],
    size: node.size,
    createdAt: new Date(node.createdAt),
    updatedAt: new Date(node.updatedAt),
  };
};
