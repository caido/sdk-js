import type { ID } from "./index.js";

/**
 * Backup status
 */
export type BackupStatus = "COMPLETED" | "FAILED" | "IN_PROGRESS";

/**
 * Backup information
 */
export type Backup = {
  id: ID;
  name: string;
  path: string;
  status: BackupStatus;
  size: number;
  createdAt: Date;
  updatedAt: Date;
};
