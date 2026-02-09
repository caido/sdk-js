import { BaseError } from "./base.js";

import { isPresent } from "@/utils/optional.js";

export class NotFoundUserError extends BaseError {
  readonly __typename = "RequestNotFoundUserError";

  constructor() {
    super("This resource does not exist");
  }
}

export class ReadOnlyUserError extends BaseError {
  readonly __typename = "ReadOnlyUserError";

  constructor() {
    super("This resource is read-only");
  }
}

export class OtherUserError extends BaseError {
  readonly __typename = "OtherUserError";

  constructor(code: string, message?: string) {
    if (isPresent(message)) {
      super(message);
    } else {
      super(`An unknown user error occured: ${JSON.stringify(code)}`);
    }
  }
}
