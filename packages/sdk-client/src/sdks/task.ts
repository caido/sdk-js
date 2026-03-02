import type { GraphQLClient, TaskMetaFragment } from "@/graphql/index.js";
import { CancelTaskDocument, TasksDocument } from "@/graphql/index.js";
import type { ID } from "@/types/index.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { isPresent } from "@/utils/optional.js";

/**
 * SDK for the generic task system: list tasks, get by id (from list), cancel.
 */
export class TaskSDK {
  constructor(private readonly graphql: GraphQLClient) {}

  /**
   * List all tasks.
   */
  async list(): Promise<Task[]> {
    const result = await this.graphql.query(TasksDocument);
    return result.tasks.map((task) => new Task(this.graphql, task));
  }

  /**
   * Cancel a task by ID.
   */
  async cancel(id: ID): Promise<void> {
    await this.graphql.mutation(CancelTaskDocument, {
      id: id as string,
    });
  }
}

/**
 * Handle to a task; supports cancel() and refresh(). Returned by startTask-style methods.
 */
export class Task {
  readonly id: ID;
  readonly createdAt: Date;

  private readonly graphql: GraphQLClient;

  constructor(graphql: GraphQLClient, data: TaskMetaFragment) {
    this.graphql = graphql;
    this.id = data.id;
    this.createdAt = new Date(data.createdAt);
  }

  async cancel(): Promise<void> {
    const result = await this.graphql.mutation(CancelTaskDocument, {
      id: this.id,
    });
    if (isPresent(result.cancelTask.error)) {
      handleGraphQLError(result.cancelTask.error);
    }
  }
}
