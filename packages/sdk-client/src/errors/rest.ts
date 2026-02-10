import { BaseError } from "./base.js";

/**
 * Error thrown when a REST request fails.
 */
export class RestRequestError extends BaseError {
  readonly __typename = "RestRequestError";
  readonly method: string;
  readonly path: string;
  readonly status: number;
  readonly errorText: string;

  constructor(method: string, path: string, status: number, errorText: string) {
    super(`REST request failed: ${method} ${path} - ${status}: ${errorText}`);
    this.method = method;
    this.path = path;
    this.status = status;
    this.errorText = errorText;
  }
}
