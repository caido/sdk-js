export * from "./user.js";
export * from "./project.js";
export * from "./scope.js";
export * from "./filter.js";
export * from "./environment.js";
export * from "./hostedFile.js";
export * from "./plugin.js";

/**
 * A unique Caido identifier per type.
 */
export type ID = string & {
  __id?: never;
};
