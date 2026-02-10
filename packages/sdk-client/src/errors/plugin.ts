import { BaseError } from "./base.js";

import {
  PluginErrorReason,
  type PluginUserErrorFullFragment,
  StoreErrorReason,
  type StoreUserErrorFullFragment,
} from "@/graphql/index.js";

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
