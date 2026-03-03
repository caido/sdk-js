import { BaseError } from "./base.js";

import type { ID } from "@/types/index.js";

export class TaskInProgressUserError extends BaseError {
  readonly __typename = "TaskInProgressUserError";
  readonly taskId: ID;

  constructor(taskId: ID) {
    super(`Could not perform operation, task ${taskId} is still in progress`);
    this.taskId = taskId;
  }
}
