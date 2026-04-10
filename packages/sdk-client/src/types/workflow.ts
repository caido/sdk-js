import type { ID } from "./index.js";

import type { WorkflowKind } from "@/graphql/index.js";

/**
 * Workflow information
 */
export type Workflow = {
  id: ID;
  name: string;
  kind: WorkflowKind;
  definition: Record<string, unknown>;
  enabled: boolean;
  global: boolean;
  readOnly: boolean;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Options for creating a workflow
 */
export type CreateWorkflowOptions = {
  /** The workflow definition payload */
  definition: Record<string, unknown>;
  /** Whether the workflow is global */
  global: boolean;
};

/**
 * Options for updating a workflow
 */
export type UpdateWorkflowOptions = {
  /** The workflow definition payload */
  definition: Record<string, unknown>;
};
