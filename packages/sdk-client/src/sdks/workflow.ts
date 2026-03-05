import { mapToWorkflow } from "@/convert/workflow.js";
import {
  CreateWorkflowDocument,
  DeleteWorkflowDocument,
  type GraphQLClient,
  UpdateWorkflowDocument,
  WorkflowDocument,
  WorkflowsDocument,
} from "@/graphql/index.js";
import type {
  CreateWorkflowOptions,
  ID,
  UpdateWorkflowOptions,
} from "@/types/index.js";
import type { Workflow as WorkflowType } from "@/types/workflow.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { isAbsent, isPresent } from "@/utils/optional.js";

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
}
