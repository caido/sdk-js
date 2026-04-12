import type { ID } from "./index.js";

export const FilterClauseKind = {
  HTTPQL: "HTTPQL",
  StreamQL: "StreamQL",
} as const;

export type FilterClauseKind =
  (typeof FilterClauseKind)[keyof typeof FilterClauseKind];

/**
 * Filter preset information
 */
export type FilterPreset = {
  id: ID;
  name: string;
  alias: string;
  clause: string;
  kind: FilterClauseKind;
};

/**
 * Options for creating a filter preset
 */
export type CreateFilterPresetOptions = {
  /** The name of the filter preset */
  name: string;
  /** The alias of the filter preset */
  alias: string;
  /** The HTTPQL or StreamQL clause of the filter preset */
  clause: string;
  /** The kind of the filter preset. Defaults to HTTPQL. */
  kind?: FilterClauseKind;
};

/**
 * Options for updating a filter preset
 */
export type UpdateFilterPresetOptions = {
  /** The name of the filter preset */
  name: string;
  /** The alias of the filter preset */
  alias: string;
  /** The HTTPQL clause of the filter preset */
  clause: string;
  /** The kind of the filter preset. Defaults to HTTPQL. */
  kind?: FilterClauseKind;
};
