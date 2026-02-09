import type { ID } from "./index.js";

/**
 * Scope information
 */
export type Scope = {
  id: ID;
  name: string;
  allowlist: string[];
  denylist: string[];
  indexed: boolean;
};

/**
 * Options for creating a scope
 */
export type CreateScopeOptions = {
  /** The name of the scope */
  name: string;
  /** The allowlist of glob patterns */
  allowlist: string[];
  /** The denylist of glob patterns */
  denylist: string[];
};

/**
 * Options for updating a scope
 */
export type UpdateScopeOptions = {
  /** The name of the scope */
  name: string;
  /** The allowlist of glob patterns */
  allowlist: string[];
  /** The denylist of glob patterns */
  denylist: string[];
};
