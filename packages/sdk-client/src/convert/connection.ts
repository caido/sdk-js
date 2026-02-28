import type { PageInfo as GraphQLPageInfo } from "@/graphql/index.js";
import type { PageInfo } from "@/types/connection.js";

export const mapToPageInfo = (pageInfo: GraphQLPageInfo): PageInfo => {
  return {
    hasNextPage: pageInfo.hasNextPage,
    hasPreviousPage: pageInfo.hasPreviousPage,
    startCursor: pageInfo.startCursor ?? undefined,
    endCursor: pageInfo.endCursor ?? undefined,
  };
};
