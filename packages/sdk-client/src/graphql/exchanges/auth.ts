import type { Exchange } from "@urql/core";
import { type AuthConfig, authExchange } from "@urql/exchange-auth";

import { hasAuthorizationError } from "../utils.js";

import type { AuthManager } from "@/auth/index.js";
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
        return hasAuthorizationError(error.graphQLErrors);
      },

      async refreshAuth() {
        await auth.refresh();
      },
    }),
  );
};
