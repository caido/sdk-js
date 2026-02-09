import type { AllErrors } from "@/errors/allErrors.js";
import { from } from "@/errors/from.js";

/**
 * Handle a GraphQL error by throwing the appropriate error class.
 * This is a generic error handler for common error types across the SDK.
 *
 * @param error - The error from a GraphQL payload
 */
export function handleGraphQLError(error: AllErrors): never {
  const errorInstance = from(error);
  // eslint-disable-next-line @typescript-eslint/only-throw-error
  throw errorInstance;
}
