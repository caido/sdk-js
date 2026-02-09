import { type GraphQLError } from "graphql";
import { z } from "zod";

import {
  AuthorizationErrorReason,
  CloudErrorReason,
} from "./__generated__/enums.js";

import {
  AuthorizationUserError,
  CloudUserError,
  OtherUserError,
} from "@/errors/index.js";
import { isPresent } from "@/utils/optional.js";

const ErrorCodes = {
  AUTHORIZATION: "AUTHORIZATION",
  CLOUD: "CLOUD",
  INTERNAL: "INTERNAL",
} as const;

const caidoExtensionSchema = z.discriminatedUnion("code", [
  z.object({
    code: z.literal(ErrorCodes.AUTHORIZATION),
    reason: z.enum(AuthorizationErrorReason),
  }),
  z.object({
    code: z.literal(ErrorCodes.CLOUD),
    reason: z.enum(CloudErrorReason),
  }),
  z.object({
    code: z.literal(ErrorCodes.INTERNAL),
    message: z.string(),
  }),
]);

/**
 * Parse a GraphQL error's CAIDO extension into a typed user error.
 * Returns `undefined` if the error doesn't have a recognized CAIDO extension.
 */
export function toUserError(
  error: GraphQLError,
): AuthorizationUserError | CloudUserError | OtherUserError | undefined {
  const caidoExtension = error.extensions["CAIDO"];
  const parsed = caidoExtensionSchema.safeParse(caidoExtension);

  if (parsed.success) {
    switch (parsed.data.code) {
      case ErrorCodes.AUTHORIZATION:
        return new AuthorizationUserError(parsed.data);
      case ErrorCodes.CLOUD:
        return new CloudUserError({
          ...parsed.data,
          cloudReason: parsed.data.reason,
        });
      case ErrorCodes.INTERNAL:
        return new OtherUserError(parsed.data.code, parsed.data.message);
    }
  }

  return undefined;
}
/**
 * Check if a list of GraphQL errors contains an authorization error.
 */
export function hasAuthorizationError(
  errors: readonly GraphQLError[],
): boolean {
  return errors.some((e) => {
    const userError = toUserError(e);
    return isPresent(userError) && userError instanceof AuthorizationUserError;
  });
}
