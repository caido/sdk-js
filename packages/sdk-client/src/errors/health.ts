import { BaseError } from "./base.js";

/**
 * Error thrown when the instance is not ready after exhausting all retry attempts.
 */
export class InstanceNotReadyError extends BaseError {
  readonly __typename = "InstanceNotReadyError";
  readonly attempts: number;

  constructor(attempts: number) {
    super(`Instance not ready after ${attempts} attempts`);
    this.attempts = attempts;
  }
}
