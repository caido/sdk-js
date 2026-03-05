export * from "./user.js";
export * from "./project.js";
export * from "./scope.js";
export * from "./filter.js";
export * from "./environment.js";
export * from "./hostedFile.js";
export * from "./plugin.js";
export * from "./health.js";
export * from "./finding.js";
export * from "./connection.js";
export * from "./request.js";
export * from "./replaySession.js";
export * from "./replayCollection.js";
export * from "./network.js";
export * from "./workflow.js";

/**
 * A unique Caido identifier per type.
 * @category Shared
 */
export type ID = string & {
  __id?: never;
};

/**
 * A cursor for pagination.
 * @category Shared
 */
export type Cursor = string & { __cursor?: never };

/**
 * An HTTPQL expression.
 * @example `req.method.eq:"POST"`
 * @category Shared
 */
export type HTTPQL = string & {
  __httpql?: never;
};
