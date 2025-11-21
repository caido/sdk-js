declare module "caido:utils" {
  /**
   * A segment of a path in a GraphQL query.
   * @category GraphQL
   */
  export type GraphQLPathSegment = string | number;

  /**
   * A location in a GraphQL query.
   * @category GraphQL
   */
  export type GraphQLLocation = {
    line: number;
    column: number;
  };

  /**
   * An error from a GraphQL query.
   * @category GraphQL
   */
  export type GraphQLError = {
    message: string;
    locations: GraphQLLocation[];
    path: GraphQLPathSegment[];
    extensions: Record<string, any>;
  };

  /**
   * The response from a GraphQL query.
   * @category GraphQL
   */
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
