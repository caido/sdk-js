import { mapToPageInfo } from "@/convert/connection.js";
import type { GraphQLClient } from "@/graphql/index.js";
import { Connection, type ConnectionQueryResult } from "@/types/index.js";

export type ListBuilderVars<Filter, Order> = {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
  filter?: Filter;
  order?: Order;
};

/**
 * List builder. Chain methods and await to execute.
 */
// eslint-disable-next-line prettier/prettier
export abstract class ListBuilder<Type, Filter, Order>
  implements PromiseLike<Connection<Type>>
{
  protected readonly graphql: GraphQLClient;
  protected vars: ListBuilderVars<Filter, Order>;

  constructor(graphql: GraphQLClient) {
    this.graphql = graphql;
    this.vars = {};
  }

  after(cursor: string): this {
    this.vars.after = cursor;
    return this;
  }

  before(cursor: string): this {
    this.vars.before = cursor;
    return this;
  }

  first(n: number): this {
    this.vars.first = n;
    return this;
  }

  last(n: number): this {
    this.vars.last = n;
    return this;
  }

  filter(filter: Filter): this {
    this.vars.filter = filter;
    return this;
  }

  order(order: Order): this {
    this.vars.order = order;
    return this;
  }

  then<T1 = Connection<Type>, T2 = never>(
    onfulfilled?: ((value: Connection<Type>) => T1 | PromiseLike<T1>) | null,
    onrejected?: ((reason: unknown) => T2 | PromiseLike<T2>) | null,
  ): Promise<T1 | T2> {
    return this.execute().then(onfulfilled, onrejected);
  }

  catch<T = never>(
    onrejected?: ((reason: unknown) => T | PromiseLike<T>) | null,
  ): Promise<Connection<Type> | T> {
    return this.execute().catch(onrejected);
  }

  finally(onfinally?: (() => void) | null): Promise<Connection<Type>> {
    return this.execute().finally(onfinally);
  }

  async execute(): Promise<Connection<Type>> {
    const result = await this.query(this.vars);
    return new Connection(
      result.pageInfo,
      result.edges,
      async (cursor, direction) => {
        const vars = {
          first: this.vars.first ?? 100,
          after: this.vars.after,
          last: this.vars.last,
          before: this.vars.before,
          filter: this.vars.filter,
          order: this.vars.order,
        };
        if (direction === "next") {
          vars.after = cursor;
        } else {
          vars.before = cursor;
        }
        const result = await this.query(vars);
        return result;
      },
    );
  }

  abstract query(
    vars: ListBuilderVars<Filter, Order>,
  ): Promise<ConnectionQueryResult<Type>>;
}
