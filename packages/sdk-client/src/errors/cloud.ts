import { BaseError } from "./base.js";

import {
  CloudErrorReason,
  type CloudUserErrorFullFragment,
} from "@/graphql/index.js";

export class CloudUserError extends BaseError {
  readonly __typename = "CloudUserError";
  readonly reason: CloudErrorReason;

  constructor(error: Omit<CloudUserErrorFullFragment, "__typename">) {
    switch (error["cloudReason"]) {
      case CloudErrorReason.Unavailable:
        super("Could not communicate with Caido cloud");
        this.reason = error["cloudReason"];
        break;
      case CloudErrorReason.Unexpected:
        super("An unknown error occured while communicating with Caido cloud");
        this.reason = error["cloudReason"];
        break;
    }
  }
}
