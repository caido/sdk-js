import {
  CreateScopeDocument,
  DeleteScopeDocument,
  type GraphQLClient,
  ScopeDocument,
  ScopesDocument,
  UpdateScopeDocument,
} from "@/graphql/index.js";
import type {
  CreateScopeOptions,
  ID,
  Scope,
  UpdateScopeOptions,
} from "@/types/index.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { isPresent } from "@/utils/optional.js";

/**
 * Higher-level SDK for scope-related operations.
 */
export class ScopeSDK {
  private readonly graphql: GraphQLClient;

  constructor(graphql: GraphQLClient) {
    this.graphql = graphql;
  }

  /**
   * List all scopes.
   */
  async list(): Promise<Scope[]> {
    const result = await this.graphql.query(ScopesDocument);
    return result.scopes.map((s) => ({
      id: s.id as ID,
      name: s.name,
      allowlist: s.allowlist,
      denylist: s.denylist,
      indexed: s.indexed,
    }));
  }

  /**
   * Get a scope by ID.
   */
  async get(id: ID): Promise<Scope | undefined> {
    const result = await this.graphql.query(ScopeDocument, {
      id: id as string,
    });

    if (!result.scope) {
      return undefined;
    }

    return {
      id: result.scope.id as ID,
      name: result.scope.name,
      allowlist: result.scope.allowlist,
      denylist: result.scope.denylist,
      indexed: result.scope.indexed,
    };
  }

  /**
   * Create a new scope.
   */
  async create(options: CreateScopeOptions): Promise<Scope> {
    const result = await this.graphql.mutation(CreateScopeDocument, {
      input: {
        name: options.name,
        allowlist: options.allowlist,
        denylist: options.denylist,
      },
    });

    const payload = result.createScope;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    const scope = payload.scope!;
    return {
      id: scope.id as ID,
      name: scope.name,
      allowlist: scope.allowlist,
      denylist: scope.denylist,
      indexed: scope.indexed,
    };
  }

  /**
   * Update a scope.
   */
  async update(id: ID, options: UpdateScopeOptions): Promise<Scope> {
    const result = await this.graphql.mutation(UpdateScopeDocument, {
      id: id as string,
      input: {
        name: options.name,
        allowlist: options.allowlist,
        denylist: options.denylist,
      },
    });

    const payload = result.updateScope;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    const scope = payload.scope!;
    return {
      id: scope.id as ID,
      name: scope.name,
      allowlist: scope.allowlist,
      denylist: scope.denylist,
      indexed: scope.indexed,
    };
  }

  /**
   * Delete a scope by ID.
   */
  async delete(id: ID): Promise<void> {
    await this.graphql.mutation(DeleteScopeDocument, {
      id: id as string,
    });
  }
}
