import { BaseError } from "./base.js";

import type { WorkflowErrorReason } from "@/graphql/index.js";

export class WorkflowUserError extends BaseError {
  readonly __typename = "WorkflowUserError";
  readonly code: string;
  readonly reason: WorkflowErrorReason;
  readonly node: string | null | undefined;

  constructor(
    code: string,
    reason: WorkflowErrorReason,
    message: string,
    node?: string | null,
  ) {
    super(message);
    this.code = code;
    this.reason = reason;
    this.node = node;
  }
}
