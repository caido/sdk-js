import type { ConnectionInfoInput, ID } from "./index.js";

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
  /** Discriminator for the workflow kind */
  kind: "convert";
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

/**
 * Options for testing a passive workflow
 */
export type TestWorkflowPassiveOptions = {
  /** Discriminator for the workflow kind */
  kind: "passive";
  /** The workflow definition payload */
  definition: Record<string, unknown>;
  /** The request to run through the workflow */
  request: {
    /** The connection info of the request */
    connection: ConnectionInfoInput;
    /** The raw request bytes */
    raw: string | Uint8Array;
  };
  /** The optional response to run through the workflow */
  response?: {
    /** The raw response bytes */
    raw: string | Uint8Array;
  };
};

/**
 * Options for testing an active workflow
 */
export type TestWorkflowActiveOptions = {
  /** Discriminator for the workflow kind */
  kind: "active";
  /** The workflow definition payload */
  definition: Record<string, unknown>;
  /** The request to run through the workflow */
  request: {
    /** The connection info of the request */
    connection: ConnectionInfoInput;
    /** The raw request bytes */
    raw: string | Uint8Array;
  };
  /** The optional response to run through the workflow */
  response?: {
    /** The raw response bytes */
    raw: string | Uint8Array;
  };
};

/**
 * Result of testing a passive or active workflow
 */
export type TestWorkflowHttpResult = {
  /** The run state of the workflow execution, if any */
  runState?: Record<string, unknown>;
};

/**
 * Result of running a convert workflow
 */
export type RunConvertWorkflowResult = {
  /** The output data produced by the workflow, if any */
  output?: Uint8Array;
};

/**
 * Options for running a convert workflow
 */
export type RunConvertWorkflowOptions = {
  /** Discriminator for the workflow kind */
  kind: "convert";
  /** The ID of the workflow to run */
  id: ID;
  /** The input data to run through the workflow */
  data: string | Uint8Array;
};

/**
 * Options for running an active workflow
 */
export type RunActiveWorkflowOptions = {
  /** Discriminator for the workflow kind */
  kind: "active";
  /** The ID of the workflow to run */
  id: ID;
  /** The ID of an existing request to run the workflow against */
  requestId: ID;
};
