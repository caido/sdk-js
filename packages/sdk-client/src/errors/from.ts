import type { AllErrors } from "./allErrors.js";
import { PermissionDeniedUserError } from "./authorization.js";
import { CloudUserError } from "./cloud.js";
import {
  AliasTakenUserError,
  InvalidGlobTermsUserError,
  NameTakenUserError,
} from "./form.js";
import { NotFoundUserError, OtherUserError } from "./misc.js";
import { PluginUserError, StoreUserError } from "./plugin.js";
import { ProjectUserError } from "./project.js";
import { NewerVersionUserError } from "./version.js";

// prettier-ignore
type ErrType<T> = InstanceType<
  T extends { __typename: infer E } ?
  E extends "UnknownIdUserError" ? typeof NotFoundUserError :
  E extends "AliasTakenUserError" ? typeof AliasTakenUserError :
  E extends "PermissionDeniedUserError" ? typeof PermissionDeniedUserError :
  E extends "NameTakenUserError" ? typeof NameTakenUserError :
  E extends "InvalidGlobTermsUserError" ? typeof InvalidGlobTermsUserError :
  E extends "OtherUserError" ? typeof OtherUserError :
  E extends "ProjectUserError" ? typeof ProjectUserError :
  E extends "NewerVersionUserError" ? typeof NewerVersionUserError :
  E extends "CloudUserError" ? typeof CloudUserError :
  E extends "PluginUserError" ? typeof PluginUserError :
  E extends "StoreUserError" ? typeof StoreUserError :
  never :
  never
>;

export const from = <T extends AllErrors>(error: T): ErrType<T> => {
  return (() => {
    switch (error.__typename) {
      case "UnknownIdUserError":
        return new NotFoundUserError();

      case "PermissionDeniedUserError":
        return new PermissionDeniedUserError();

      case "OtherUserError":
        return new OtherUserError(error.code);

      case "NameTakenUserError":
        return new NameTakenUserError(error.name);

      case "AliasTakenUserError":
        return new AliasTakenUserError(error);

      case "InvalidGlobTermsUserError":
        return new InvalidGlobTermsUserError(error.terms);

      case "ProjectUserError":
        return new ProjectUserError(error);

      case "NewerVersionUserError":
        return new NewerVersionUserError(error);

      case "CloudUserError":
        return new CloudUserError(error);

      case "PluginUserError":
        return new PluginUserError(error);

      case "StoreUserError":
        return new StoreUserError(error);
    }
  })() as ErrType<T>;
};
