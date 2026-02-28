import type { ID } from "./index.js";

/**
 * Field to order requests by.
 * @category Requests
 */
export type RequestOrderField =
  | "ext"
  | "host"
  | "id"
  | "method"
  | "path"
  | "query"
  | "created_at"
  | "source";

/**
 * Field to order responses by.
 * @category Requests
 */
export type ResponseOrderField = "length" | "roundtrip" | "code";

/**
 * Request metadata (color, id).
 * @category Request
 */
export type RequestMetadata = {
  id: ID;
  color?: string;
};

/**
 * Request (without raw when not requested).
 * @category Request
 */
export type Request = {
  id: ID;
  host: string;
  port: number;
  method: string;
  path: string;
  query: string;
  isTls: boolean;
  metadata: RequestMetadata;
  createdAt: Date;
  /** Present when includeRaw was true. */
  raw?: string;
};

/**
 * Response (without raw when not requested).
 * @category Request
 */
export type Response = {
  id: ID;
  statusCode: number;
  roundtripTime: number;
  length: number;
  createdAt: Date;
  /** Present when includeRaw was true. */
  raw?: string;
};

/**
 * Request and optional response pair.
 * @category Request
 */
export type RequestResponseOpt = {
  request: Request;
  response?: Response;
};

/**
 * One item in a requests list page.
 * @category Request
 */
export type RequestsConnectionItem = {
  cursor: string;
  request: Request;
  response?: Response;
};

/**
 * Options for request list inclusion.
 * @category Request
 */
export type IncludeRequestOptions = {
  /** Include request raw body. Default true. */
  raw?: boolean;
};

/**
 * Options for response inclusion.
 * @category Request
 */
export type IncludeResponseOptions = {
  /** Include response raw body. Default true. */
  raw?: boolean;
};

/**
 * Options for getting a request and its response.
 * @category Request
 */
export type RequestGetOptions = {
  /**
   * Include request and response raw body. Deprecated in favor of requestRaw/responseRaw.
   * Default true.
   */
  raw?: boolean;
  /** Include request raw body. Default true. */
  requestRaw?: boolean;
  /** Include response raw body. Default true. */
  responseRaw?: boolean;
};
