import type { ID } from "./index.js";

/**
 * Filter preset information
 */
export type FilterPreset = {
  id: ID;
  name: string;
  alias: string;
  clause: string;
};

/**
 * Options for creating a filter preset
 */
export type CreateFilterPresetOptions = {
  /** The name of the filter preset */
  name: string;
  /** The alias of the filter preset */
  alias: string;
  /** The HTTPQL clause of the filter preset */
  clause: string;
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
};
