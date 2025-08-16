declare module "caido:utils" {
  export type GraphQLPathSegment = string | number;

  export type GraphQLLocation = {
    line: number;
    column: number;
  };

  export type GraphQLError = {
    message: string;
    locations: GraphQLLocation[];
    path: GraphQLPathSegment[];
    extensions: Record<string, any>;
  };

  export type GraphQLResponse<T> = {
    data?: T;
    errors?: GraphQLError[];
  };

  /**
   * The SDK for the GraphQL service.
   * @category GraphQL
   */
  export type GraphQLSDK = {
    /**
     * Executes a GraphQL query.
     *
     * @example
     * ```js
     * await sdk.graphql.execute(`
     *   query {
     *     viewer
     *   }
     * `);
     * ```
     */
    execute<T>(
      query: string,
      variables?: Record<string, any>,
    ): Promise<GraphQLResponse<T>>;
  };
}
