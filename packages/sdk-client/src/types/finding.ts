import type { ID } from "./index.js";

/**
 * Finding (security finding attached to a request).
 * @category Finding
 */
export type Finding = {
  id: ID;
  requestId: ID;
  title: string;
  reporter: string;
  description: string | undefined;
  dedupeKey: string | undefined;
  host: string;
  path: string;
  hidden: boolean;
  createdAt: Date;
};

/**
 * Options for creating a finding.
 * @category Finding
 */
export type CreateFindingOptions = {
  /** The title of the finding. */
  title: string;
  /** The reporter of the finding. */
  reporter: string;
  /** The description of the finding. */
  description?: string;
  /** The deduplication key of the finding. */
  dedupeKey?: string;
};

/**
 * Options for updating a finding.
 * @category Finding
 */
export type UpdateFindingOptions = {
  /** The title of the finding. */
  title: string;
  /** The description of the finding. */
  description: string;
  /** Whether the finding is hidden. */
  hidden: boolean;
};

/**
 * Options for deleting findings.
 * This is a discriminated union that allows deleting either by specific IDs or by reporter name.
 * @category Finding
 */
export type DeleteFindingOptions =
  | {
      /** Array of finding IDs to delete. */
      ids: ID[];
      reporter?: never;
    }
  | {
      ids?: never;
      /** Reporter name to delete all findings by. */
      reporter: string;
    };
