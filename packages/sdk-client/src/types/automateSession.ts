import type { ID } from "./index.js";

/**
 * Automate session information
 */
export type AutomateSession = {
  id: ID;
  name: string;
  createdAt: string;
  raw: Uint8Array;
};

/**
 * Options for creating an automate session
 */
export type CreateAutomateSessionOptions = {
  /** The request source to use for creating the session */
  requestSource?: {
    /** Request ID to use as the source */
    id?: ID;
  };
};

/**
 * Options for renaming an automate session
 */
export type RenameAutomateSessionOptions = {
  /** The new name for the session */
  name: string;
};
