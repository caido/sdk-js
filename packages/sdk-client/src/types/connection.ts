import type { Cursor } from "./index.js";

/**
 * Information on the current page of paginated data.
 */
export type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: Cursor | undefined;
  endCursor: Cursor | undefined;
};

/**
 * An edge in a connection.
 */
export type Edge<T> = {
  cursor: Cursor;
  node: T;
};

export type ConnectionQueryResult<T> = {
  pageInfo: PageInfo;
  edges: Array<Edge<T>>;
};

export type ConnectionQueryFn<T> = (
  cursor: Cursor,
  direction: "next" | "prev",
) => Promise<ConnectionQueryResult<T>>;

/**
 * A connection of items.
 */
export class Connection<T> {
  readonly pageInfo: PageInfo;
  readonly edges: Array<Edge<T>>;
  private readonly queryFn: ConnectionQueryFn<T>;

  constructor(
    pageInfo: PageInfo,
    edges: Array<Edge<T>>,
    queryFn: ConnectionQueryFn<T>,
  ) {
    this.pageInfo = pageInfo;
    this.edges = edges;
    this.queryFn = queryFn;
  }

  async next(): Promise<Connection<T> | undefined> {
    if (this.pageInfo.hasNextPage && this.pageInfo.endCursor) {
      const result = await this.queryFn(this.pageInfo.endCursor, "next");
      return new Connection(result.pageInfo, result.edges, this.queryFn);
    }
    return undefined;
  }

  async prev(): Promise<Connection<T> | undefined> {
    if (this.pageInfo.hasPreviousPage && this.pageInfo.startCursor) {
      const result = await this.queryFn(this.pageInfo.startCursor, "prev");
      return new Connection(result.pageInfo, result.edges, this.queryFn);
    }
    return undefined;
  }
}
