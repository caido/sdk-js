import type { ID } from "./index.js";

/**
 * Tamper rule information
 */
export type TamperRule = {
  id: ID;
  name: string;
};

/**
 * Tamper rule collection information
 */
export type TamperRuleCollection = {
  id: ID;
  name: string;
  rules: TamperRule[];
};

/**
 * Options for creating a tamper rule collection
 */
export type CreateTamperRuleCollectionInput = {
  /** The name of the tamper rule collection */
  name: string;
};
