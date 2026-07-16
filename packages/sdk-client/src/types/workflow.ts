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

/**
 * Options for testing a convert workflow
 */
export type TestWorkflowConvertOptions = {
  /** The workflow definition payload */
  definition: Record<string, unknown>;
  /** The input data to run through the workflow */
  data: string | Uint8Array;
};

/**
 * Result of testing a convert workflow
 */
export type TestWorkflowConvertResult = {
  /** The output data produced by the workflow, if any */
  output?: Uint8Array;
  /** The run state of the workflow execution, if any */
  runState?: Record<string, unknown>;
};
