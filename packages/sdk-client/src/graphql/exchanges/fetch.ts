import { type Exchange, fetchExchange } from "@urql/core";

export const createFetchExchange = (): Exchange => {
  return fetchExchange;
};
