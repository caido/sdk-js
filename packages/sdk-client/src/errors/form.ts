import { BaseError } from "./base.js";

import type { AliasTakenUserErrorFullFragment } from "@/graphql/index.js";

export class NameTakenUserError extends BaseError {
  readonly __typename = "NameTakenUserError";

  constructor(name: string) {
    super(`The name ${name} is already in use.`);
  }
}

export class InvalidGlobTermsUserError extends BaseError {
  readonly __typename = "InvalidGlobTermsUserError";

  constructor(terms: string[]) {
    super(`Invalid glob terms: ${JSON.stringify(terms)}`);
  }
}

export class AliasTakenUserError extends BaseError {
  readonly __typename = "AliasTakenUserError";

  constructor(error: AliasTakenUserErrorFullFragment) {
    super(`Alias already exists: ${error.alias}`);
  }
}
