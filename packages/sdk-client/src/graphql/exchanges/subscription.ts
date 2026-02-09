import { type Exchange, subscriptionExchange } from "@urql/core";
import type { Client } from "graphql-ws";

export const createSubscriptionExchange = (options: {
  client: Client;
}): Exchange => {
  const { client } = options;

  return subscriptionExchange({
    forwardSubscription(request) {
      const input = { ...request, query: request.query ?? "" };
      return {
        subscribe: (sink) => {
          const dispose = client.subscribe(input, sink);
          return {
            unsubscribe: dispose,
          };
        },
      };
    },
  });
};
