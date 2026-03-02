import { BaseError } from "./base.js";

export class TaskInProgressUserError extends BaseError {
  readonly __typename = "TaskInProgressUserError";

  constructor() {
    super("Could not perform operation, task is still in progress");
  }
}
