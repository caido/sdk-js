import { BaseError } from "./base.js";

import type { NewerVersionUserErrorFullFragment } from "@/graphql/index.js";

export class NewerVersionUserError extends BaseError {
  readonly __typename = "NewerVersionUserError";
  readonly version: number;

  constructor(error: NewerVersionUserErrorFullFragment) {
    super(`Stale data, please refresh`);
    this.version = error.version;
  }
}
