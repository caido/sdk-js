import type {
  GraphQLClient,
  ReplayTaskMetaFragment,
  TaskMetaFragment,
} from "@/graphql/index.js";
import {
  CancelTaskDocument,
  FinishedTaskDocument,
  TasksDocument,
} from "@/graphql/index.js";
import type { ID } from "@/types/index.js";
import type { TaskResult, TaskStatus } from "@/types/task.js";
import {
  filterAsyncIterable,
  mapAsyncIterable,
} from "@/utils/asyncIterable.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { isPresent } from "@/utils/optional.js";

/**
 * SDK for the generic task system.
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

  finished(
    filter: (taskResult: TaskResult) => boolean,
  ): AsyncIterable<TaskResult> {
    return filterAsyncIterable(
      filter,
      mapAsyncIterable((event) => {
        const task = new Task(this.graphql, event.finishedTask.task);
        return {
          task,
          status: event.finishedTask.status as TaskStatus,
          error: event.finishedTask.error
            ? { code: event.finishedTask.error.code }
            : undefined,
        };
      }, this.graphql.subscribe(FinishedTaskDocument)),
    );
  }
}

/**
 * A task.
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

export class ReplayTask extends Task {
  readonly replayEntryId: ID;

  constructor(graphql: GraphQLClient, data: ReplayTaskMetaFragment) {
    super(graphql, data);
    this.replayEntryId = data.replayEntry.id;
  }
}
