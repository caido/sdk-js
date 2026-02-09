import {
  CreateEnvironmentDocument,
  DeleteEnvironmentDocument,
  EnvironmentQueryDocument,
  EnvironmentsDocument,
  type GraphQLClient,
  SelectEnvironmentDocument,
  UpdateEnvironmentDocument,
} from "@/graphql/index.js";
import type {
  CreateEnvironmentOptions,
  Environment,
  EnvironmentVariable,
  ID,
  UpdateEnvironmentOptions,
} from "@/types/index.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { isAbsent, isPresent } from "@/utils/optional.js";

function mapEnvironment(env: {
  id: string;
  name: string;
  version: number;
  variables: Array<{ name: string; value: string; kind: string }>;
}): Environment {
  return {
    id: env.id as ID,
    name: env.name,
    version: env.version,
    variables: env.variables.map((v) => ({
      name: v.name,
      value: v.value,
      kind: v.kind as EnvironmentVariable["kind"],
    })),
  };
}

/**
 * Higher-level SDK for environment-related operations.
 */
export class EnvironmentSDK {
  private readonly graphql: GraphQLClient;

  constructor(graphql: GraphQLClient) {
    this.graphql = graphql;
  }

  /**
   * List all environments.
   */
  async list(): Promise<Environment[]> {
    const result = await this.graphql.query(EnvironmentsDocument);
    return result.environments.map(mapEnvironment);
  }

  /**
   * Get an environment by ID.
   * Returns an `EnvironmentInstance` for managing variables, or `undefined` if not found.
   */
  async get(id: ID): Promise<EnvironmentInstance | undefined> {
    const result = await this.graphql.query(EnvironmentQueryDocument, {
      id: id as string,
    });

    if (isAbsent(result.environment)) {
      return undefined;
    }

    return new EnvironmentInstance(
      this.graphql,
      mapEnvironment(result.environment),
    );
  }

  /**
   * Create a new environment.
   * Returns an `EnvironmentInstance` for managing variables.
   */
  async create(
    options: CreateEnvironmentOptions,
  ): Promise<EnvironmentInstance> {
    const result = await this.graphql.mutation(CreateEnvironmentDocument, {
      input: {
        name: options.name,
        variables: options.variables.map((v) => ({
          name: v.name,
          value: v.value,
          kind: v.kind,
        })),
      },
    });

    const payload = result.createEnvironment;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    return new EnvironmentInstance(
      this.graphql,
      mapEnvironment(payload.environment!),
    );
  }

  /**
   * Update an environment.
   * Returns an `EnvironmentInstance` for managing variables.
   */
  async update(
    id: ID,
    options: UpdateEnvironmentOptions & { version: number },
  ): Promise<EnvironmentInstance> {
    const result = await this.graphql.mutation(UpdateEnvironmentDocument, {
      id: id as string,
      input: {
        name: options.name,
        variables: options.variables.map((v) => ({
          name: v.name,
          value: v.value,
          kind: v.kind,
        })),
        version: options.version,
      },
    });

    const payload = result.updateEnvironment;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    return new EnvironmentInstance(
      this.graphql,
      mapEnvironment(payload.environment!),
    );
  }

  /**
   * Delete an environment by ID.
   */
  async delete(id: ID): Promise<void> {
    const result = await this.graphql.mutation(DeleteEnvironmentDocument, {
      id: id as string,
    });

    const payload = result.deleteEnvironment;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }
  }

  /**
   * Select an environment as the current environment.
   * Pass `undefined` to deselect the current environment.
   */
  async select(id?: ID): Promise<EnvironmentInstance | undefined> {
    const result = await this.graphql.mutation(SelectEnvironmentDocument, {
      id: id as string | undefined,
    });

    const payload = result.selectEnvironment;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    if (!payload.environment) {
      return undefined;
    }

    return new EnvironmentInstance(
      this.graphql,
      mapEnvironment(payload.environment),
    );
  }
}

/**
 * An environment instance that provides methods for managing variables.
 *
 * Similar to `PluginPackage`, this class holds state and provides
 * higher-level methods for variable manipulation on a specific environment.
 *
 * @example
 * ```typescript
 * const env = await client.environment.get(envId);
 * if (env) {
 *   await env.addVariable({ name: "API_KEY", value: "secret", kind: "PLAIN" });
 *   await env.updateVariable("API_KEY", { value: "new_secret" });
 *   await env.deleteVariable("API_KEY");
 * }
 * ```
 */
export class EnvironmentInstance {
  private readonly graphql: GraphQLClient;
  private state: Environment;

  constructor(graphql: GraphQLClient, environment: Environment) {
    this.graphql = graphql;
    this.state = environment;
  }

  /** The environment ID. */
  get id(): ID {
    return this.state.id;
  }

  /** The environment name. */
  get name(): string {
    return this.state.name;
  }

  /** The environment version (for optimistic concurrency). */
  get version(): number {
    return this.state.version;
  }

  /** The environment variables. */
  get variables(): EnvironmentVariable[] {
    return [...this.state.variables];
  }

  /**
   * Add a variable to the environment.
   */
  async addVariable(variable: EnvironmentVariable): Promise<void> {
    const newVariables = [...this.state.variables, variable];
    await this.performUpdate({
      name: this.state.name,
      variables: newVariables,
    });
  }

  /**
   * Delete a variable from the environment by name.
   */
  async deleteVariable(name: string): Promise<void> {
    const newVariables = this.state.variables.filter((v) => v.name !== name);
    await this.performUpdate({
      name: this.state.name,
      variables: newVariables,
    });
  }

  /**
   * Update a variable in the environment by name.
   */
  async updateVariable(
    name: string,
    updates: Partial<EnvironmentVariable>,
  ): Promise<void> {
    const newVariables = this.state.variables.map((v) =>
      v.name === name ? { ...v, ...updates } : v,
    );
    await this.performUpdate({
      name: this.state.name,
      variables: newVariables,
    });
  }

  private async performUpdate(
    options: UpdateEnvironmentOptions,
  ): Promise<void> {
    const result = await this.graphql.mutation(UpdateEnvironmentDocument, {
      id: this.state.id as string,
      input: {
        name: options.name,
        variables: options.variables.map((v) => ({
          name: v.name,
          value: v.value,
          kind: v.kind,
        })),
        version: this.state.version,
      },
    });

    const payload = result.updateEnvironment;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    this.state = mapEnvironment(payload.environment!);
  }
}
