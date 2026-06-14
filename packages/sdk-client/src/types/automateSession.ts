import type { ConnectionInfo, ID } from "./index.js";

/**
 * An automate entry within a session
 */
export type AutomateEntry = {
  id: ID;
  name: string;
  createdAt: number;
  raw: Uint8Array;
};

/**
 * AutomateSession information
 */
export type AutomateSession = {
  id: ID;
  name: string;
  createdAt: number;
  connection: ConnectionInfo;
  entries: AutomateEntry[];
  settings: unknown;
  raw: Uint8Array;
};

/**
 * Options for creating an automate session
 */
export type CreateAutomateSessionOptions = {
  /** The request source for the session */
  requestSource?: {
    host?: string;
    port?: number;
    isTLS?: boolean;
    SNI?: string;
  };
};
