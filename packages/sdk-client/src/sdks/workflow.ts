import { WorkflowTask } from "./task.js";

import { encodeBlob } from "@/convert/blob.js";
import {
  mapToRunConvertWorkflowResult,
  mapToTestWorkflowConvertResult,
  mapToTestWorkflowHttpResult,
  mapToWorkflow,
} from "@/convert/workflow.js";
import {
  CreateWorkflowDocument,
  DeleteWorkflowDocument,
  type GraphQLClient,
  RunActiveWorkflowDocument,
  RunConvertWorkflowDocument,
  TestWorkflowActiveDocument,
  TestWorkflowConvertDocument,
  TestWorkflowPassiveDocument,
  ToggleWorkflowDocument,
  UpdateWorkflowDocument,
  WorkflowDocument,
  WorkflowsDocument,
} from "@/graphql/index.js";
import type {
  CreateWorkflowOptions,
  ID,
  RunConvertWorkflowResult,
  TestWorkflowConvertOptions,
  TestWorkflowConvertResult,
  TestWorkflowHttpOptions,
  TestWorkflowHttpResult,
  UpdateWorkflowOptions,
} from "@/types/index.js";
import type { Workflow as WorkflowType } from "@/types/workflow.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { isAbsent, isPresent } from "@/utils/optional.js";

const buildTestWorkflowHttpInput = (options: TestWorkflowHttpOptions) => ({
  definition: options.definition,
  request: {
    connectionInfo: {
      host: options.request.connection.host,
      port: options.request.connection.port,
      isTLS: options.request.connection.isTLS,
      SNI: options.request.connection.SNI,
    },
    raw: encodeBlob(options.request.raw),
  },
  response: isPresent(options.response)
    ? { raw: encodeBlob(options.response.raw) }
    : undefined,
});

/**
 * Higher-level SDK for workflow-related operations.
 */
export class WorkflowSDK {
  private readonly graphql: GraphQLClient;

  constructor(graphql: GraphQLClient) {
    this.graphql = graphql;
  }

  /**
   * List all workflows.
   */
  async list(): Promise<WorkflowType[]> {
    const result = await this.graphql.query(WorkflowsDocument);
    return result.workflows.map(mapToWorkflow);
  }

  /**
   * Get a workflow by ID.
   */
  async get(id: ID): Promise<WorkflowType | undefined> {
    const result = await this.graphql.query(WorkflowDocument, {
      id,
    });

    if (isAbsent(result.workflow)) {
      return undefined;
    }

    return mapToWorkflow(result.workflow);
  }

  /**
   * Create a new workflow.
   */
  async create(options: CreateWorkflowOptions): Promise<WorkflowType> {
    const result = await this.graphql.mutation(CreateWorkflowDocument, {
      input: {
        definition: options.definition,
        global: options.global,
      },
    });

    const payload = result.createWorkflow;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    if (isAbsent(payload.workflow)) {
      throw new Error("Create workflow returned no workflow");
    }

    return mapToWorkflow(payload.workflow);
  }

  /**
   * Update a workflow.
   */
  async update(id: ID, options: UpdateWorkflowOptions): Promise<WorkflowType> {
    const result = await this.graphql.mutation(UpdateWorkflowDocument, {
      id,
      input: {
        definition: options.definition,
      },
    });

    const payload = result.updateWorkflow;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    if (isAbsent(payload.workflow)) {
      throw new Error("Update workflow returned no workflow");
    }

    return mapToWorkflow(payload.workflow);
  }

  /**
   * Delete a workflow by ID.
   */
  async delete(id: ID): Promise<void> {
    const result = await this.graphql.mutation(DeleteWorkflowDocument, {
      id,
    });

    const payload = result.deleteWorkflow;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }
  }

  /**
   * Toggle a workflow's enabled state.
   */
  async toggle(id: ID, enabled: boolean): Promise<WorkflowType> {
    const result = await this.graphql.mutation(ToggleWorkflowDocument, {
      id,
      enabled,
    });

    const payload = result.toggleWorkflow;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    if (isAbsent(payload.workflow)) {
      throw new Error("Toggle workflow returned no workflow");
    }

    return mapToWorkflow(payload.workflow);
  }

  /**
   * Test a convert workflow against input data without saving it.
   */
  async testConvert(
    options: TestWorkflowConvertOptions,
  ): Promise<TestWorkflowConvertResult> {
    const result = await this.graphql.mutation(TestWorkflowConvertDocument, {
      input: {
        definition: options.definition,
        data: encodeBlob(options.data),
      },
    });

    const payload = result.testWorkflowConvert;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    return mapToTestWorkflowConvertResult(payload);
  }

  /**
   * Test a passive workflow against a request and optional response without
   * saving it.
   */
  async testPassive(
    options: TestWorkflowHttpOptions,
  ): Promise<TestWorkflowHttpResult> {
    const result = await this.graphql.mutation(TestWorkflowPassiveDocument, {
      input: buildTestWorkflowHttpInput(options),
    });

    const payload = result.testWorkflowPassive;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    return mapToTestWorkflowHttpResult(payload);
  }

  /**
   * Test an active workflow against a request and optional response without
   * saving it.
   */
  async testActive(
    options: TestWorkflowHttpOptions,
  ): Promise<TestWorkflowHttpResult> {
    const result = await this.graphql.mutation(TestWorkflowActiveDocument, {
      input: buildTestWorkflowHttpInput(options),
    });

    const payload = result.testWorkflowActive;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    return mapToTestWorkflowHttpResult(payload);
  }

  /**
   * Run a convert workflow against input data.
   */
  async runConvert(
    id: ID,
    data: string | Uint8Array,
  ): Promise<RunConvertWorkflowResult> {
    const result = await this.graphql.mutation(RunConvertWorkflowDocument, {
      id,
      input: encodeBlob(data),
    });

    const payload = result.runConvertWorkflow;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    return mapToRunConvertWorkflowResult(payload);
  }

  /**
   * Run an active workflow against an existing request.
   *
   * Active workflows produce no output; the returned task can be used to track
   * the run.
   */
  async runActive(id: ID, requestId: ID): Promise<WorkflowTask> {
    const result = await this.graphql.mutation(RunActiveWorkflowDocument, {
      id,
      input: { requestId },
    });

    const payload = result.runActiveWorkflow;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    if (isAbsent(payload.task)) {
      throw new Error("Run active workflow returned no task");
    }

    return new WorkflowTask(this.graphql, payload.task);
  }
}
