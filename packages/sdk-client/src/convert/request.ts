import { decodeBlob } from "./blob.js";

import type {
  RequestFullFragment,
  ResponseFullFragment,
} from "@/graphql/index.js";
import type {
  ID,
  Request,
  RequestResponseOpt,
  Response,
} from "@/types/index.js";
import { isPresent } from "@/utils/optional.js";

export const mapToRequest = (node: RequestFullFragment): Request => {
  return {
    id: node.id as ID,
    host: node.host,
    port: node.port,
    method: node.method,
    path: node.path,
    query: node.query,
    isTls: node.isTls,
    metadata: {
      id: node.metadata.id as ID,
      color: node.metadata.color ?? undefined,
    },
    createdAt: new Date(node.createdAt),
    raw: decodeBlob(node.raw),
  };
};

export const mapToResponse = (node: ResponseFullFragment): Response => {
  return {
    id: node.id as ID,
    statusCode: node.statusCode,
    roundtripTime: node.roundtripTime,
    length: node.length,
    createdAt: new Date(node.createdAt),
    raw: decodeBlob(node.raw),
  };
};

export const mapToRequestResponseOpt = (
  node: RequestFullFragment,
): RequestResponseOpt => {
  return {
    request: mapToRequest(node),
    response: isPresent(node.response)
      ? mapToResponse(node.response)
      : undefined,
  };
};
