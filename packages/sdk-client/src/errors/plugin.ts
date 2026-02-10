import { BaseError } from "./base.js";

import {
  PluginErrorReason,
  type PluginUserErrorFullFragment,
  StoreErrorReason,
  type StoreUserErrorFullFragment,
} from "@/graphql/index.js";
import type { FunctionErrorPayload } from "@/rest/index.js";

/**
 * Error thrown when a plugin function call fails.
 */
export class PluginFunctionCallError extends BaseError {
  readonly __typename = "PluginFunctionCallError";
  readonly kind: FunctionErrorPayload["kind"];

  constructor(name: string, error: FunctionErrorPayload) {
    switch (error.kind) {
      case "invalid_procedure":
        super(`Could not call plugin function with name '${error.name}'.`);
        this.kind = error.kind;
        break;
      case "invalid_output":
        super(
          `Invalid output type for plugin function. Expected ${error.expected} but got ${error.found}.`,
        );
        this.kind = error.kind;
        break;
      case "thrown": {
        const message = error.message ?? "Unknown error";
        const stack = error.stack ?? "";
        const stackText = stack !== "" ? `\n\n${stack}` : "";
        super(
          `Plugin function '${name}' threw an error: ${message}${stackText}`,
        );
        this.kind = error.kind;
        break;
      }
    }
  }
}

export class PluginUserError extends BaseError {
  readonly __typename = "PluginUserError";
  reason: PluginErrorReason;

  constructor(error: PluginUserErrorFullFragment) {
    switch (error.reason) {
      case PluginErrorReason.InvalidManifest:
        super("The plugin manifest is invalid");
        this.reason = error.reason;
        break;

      case PluginErrorReason.InvalidPackage:
        super("The plugin package is invalid");
        this.reason = error.reason;
        break;

      case PluginErrorReason.MissingFile:
        super("The plugin package is missing a file");
        this.reason = error.reason;
        break;

      case PluginErrorReason.AlreadyInstalled:
        super("The plugin is already installed");
        this.reason = error.reason;
        break;

      case PluginErrorReason.InvalidOperation:
        super("This operation cannot be performed on this type of plugin");
        this.reason = error.reason;
        break;
    }
  }
}

export class StoreUserError extends BaseError {
  readonly __typename = "StoreUserError";

  constructor(error: StoreUserErrorFullFragment) {
    switch (error.storeReason) {
      case StoreErrorReason.FileUnavailable:
        super("The plugin package files are unavailable");
        break;
      case StoreErrorReason.InvalidPublicKey:
        super("The plugin package public key is invalid");
        break;

      case StoreErrorReason.InvalidSignature:
        super("The plugin package signature is invalid");
        break;

      case StoreErrorReason.PackageTooLarge:
        super("The plugin package is too large");
        break;

      case StoreErrorReason.PackageUnknown:
        super("An unknown error occured while installing the plugin package");
        break;
    }
  }
}
