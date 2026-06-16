import type { ID } from "./index.js";

/**
 * Backup information
 */
export type Backup = {
  id: ID;
  name: string;
  path: string;
  size: number;
  status: "DONE" | "ERROR" | "PROCESSING";
  createdAt: string;
  updatedAt: string;
  downloadUri?: string | null;
  project?: { id: ID } | null;
};
