import type { CombinedError } from "@urql/core";

import { BaseError } from "./base.js";

export class NetworkUserError extends BaseError {
  readonly __typename = "NetworkUserError";

  constructor(error: Error) {
    super(`A network error occured: ${error.message}`);
  }
}

export class OperationUserError extends BaseError {
  readonly __typename = "OperationUserError";

  constructor(error: CombinedError) {
    super(error.message);
  }
}

export class NoDataUserError extends BaseError {
  readonly __typename = "NoDataUserError";

  constructor() {
    super(`The operation did not return any data`);
  }
}
