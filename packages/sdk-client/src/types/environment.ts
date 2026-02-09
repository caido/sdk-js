import type { ID } from "./index.js";

import type { EnvironmentVariableKind } from "@/graphql/index.js";

/**
 * Environment variable information
 */
export type EnvironmentVariable = {
  name: string;
  value: string;
  kind: EnvironmentVariableKind;
};

/**
 * Environment information
 */
export type Environment = {
  id: ID;
  name: string;
  version: number;
  variables: EnvironmentVariable[];
};

/**
 * Options for creating an environment
 */
export type CreateEnvironmentOptions = {
  /** The name of the environment */
  name: string;
  /** The initial variables for the environment */
  variables: EnvironmentVariable[];
};

/**
 * Options for updating an environment
 */
export type UpdateEnvironmentOptions = {
  /** The name of the environment */
  name: string;
  /** The variables for the environment */
  variables: EnvironmentVariable[];
};
