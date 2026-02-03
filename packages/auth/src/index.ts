// Main client
export { CaidoAuth } from "./client.js";

// Types
export type {
  AuthenticationRequest,
  AuthenticationToken,
  DeviceInformation,
  DeviceScope,
} from "./types.js";

// Errors
export {
  AuthenticationError,
  AuthenticationFlowError,
  TokenRefreshError,
  DeviceApprovalError,
  DeviceInformationError,
} from "./errors.js";

// Approvers
export type { AuthApprover } from "./approvers/types.js";
export {
  BrowserApprover,
  type OnRequestCallback,
} from "./approvers/browser.js";
export {
  PATApprover,
  type PATApproverOptions,
} from "./approvers/pat.js";
