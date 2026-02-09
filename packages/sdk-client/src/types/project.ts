import type { ID } from "./index.js";

/**
 * Project status
 */
export type ProjectStatus = "ERROR" | "READY" | "RESTORING";

/**
 * Project information
 */
export type Project = {
  id: ID;
  name: string;
  path: string;
  status: ProjectStatus;
  temporary: boolean;
  createdAt: Date;
  updatedAt: Date;
  version: string;
  size: number;
  readOnly: boolean;
};

/**
 * Options for creating a project
 */
export type CreateProjectOptions = {
  /** The name of the project */
  name: string;
  /** Whether the project is temporary */
  temporary: boolean;
};
