import { BaseError } from "./base.js";

import {
  ProjectErrorReason,
  type ProjectUserErrorFullFragment,
} from "@/graphql/index.js";

export class ProjectUserError extends BaseError {
  readonly __typename = "ProjectUserError";
  readonly reason: ProjectErrorReason;

  constructor(error: ProjectUserErrorFullFragment) {
    switch (error.projectReason) {
      case ProjectErrorReason.Deleting:
        super("Project is currently being deleted.");
        this.reason = error.projectReason;
        break;
      case ProjectErrorReason.Exporting:
        super("Project is currently being exported.");
        this.reason = error.projectReason;
        break;
      case ProjectErrorReason.InvalidVersion:
        super("Project doesn't have a valid version.");
        this.reason = error.projectReason;
        break;
      case ProjectErrorReason.NotReady:
        super("Project is not ready yet.");
        this.reason = error.projectReason;
        break;
      case ProjectErrorReason.TooRecent:
        super("The project was created with a newer version of Caido.");
        this.reason = error.projectReason;
        break;
    }
  }
}
