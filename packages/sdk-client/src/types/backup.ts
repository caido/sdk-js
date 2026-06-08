import type { ID } from "./index.js";

import type { BackupStatus } from "@/graphql/index.js";

/**
 * Backup information
 */
export type Backup = {
  id: ID;
  name: string;
  status: BackupStatus;
  size: number;
  path: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Options for creating a backup
 */
export type CreateBackupOptions = {
  /** The project ID to create a backup for */
  projectId: ID;
};
