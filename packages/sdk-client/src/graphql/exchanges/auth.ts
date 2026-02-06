/* eslint-disable @typescript-eslint/require-await */
import type { Exchange } from "@urql/core";
import { type AuthConfig, authExchange } from "@urql/exchange-auth";

import type { AuthManager } from "@/auth.js";
import { type GraphQLErrorEntry, hasAuthorizationError } from "@/errors.js";
import { isAbsent } from "@/utils/optional.js";

export const createAuthExchange = (options: {
  auth: AuthManager;
}): Exchange => {
  const { auth } = options;

  return authExchange(
    async (utils): Promise<AuthConfig> => ({
      addAuthToOperation(operation) {
        const accessToken = auth.getAccessToken();
        if (isAbsent(accessToken)) {
          return operation;
        }
        return utils.appendHeaders(operation, {
          Authorization: `Bearer ${accessToken}`,
        });
      },

      didAuthError(error) {
        const graphqlErrors: GraphQLErrorEntry[] = error.graphQLErrors.map(
          (e) => ({
            message: e.message,
            locations: e.locations as
              | { line: number; column: number }[]
              | undefined,
            path: e.path,
            extensions: e.extensions as Record<string, unknown> | undefined,
          }),
        );
        return hasAuthorizationError(graphqlErrors);
      },

      async refreshAuth() {
        await auth.refresh();
      },
    }),
  );
};
