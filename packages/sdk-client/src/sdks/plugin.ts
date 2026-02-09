import {
  type GraphQLClient,
  type PluginPackageMetaFragment,
  PluginPackagesDocument,
} from "@/graphql/index.js";
import type {
  FunctionInput,
  FunctionPayload,
  RestClient,
} from "@/rest/index.js";
import type { Json } from "@/utils/json.js";
import { isAbsent, isPresent } from "@/utils/optional.js";

/**
 * Higher-level SDK for plugin-related operations.
 */
export class PluginSDK {
  private readonly graphql: GraphQLClient;
  private readonly rest: RestClient;

  constructor(graphql: GraphQLClient, rest: RestClient) {
    this.graphql = graphql;
    this.rest = rest;
  }

  async pluginPackage(manifestId: string): Promise<PluginPackage | undefined> {
    const result = await this.graphql.query(PluginPackagesDocument, {});

    const pluginPackage = result.pluginPackages.find(
      (p) => p.manifestId === manifestId,
    );
    if (!pluginPackage) {
      return undefined;
    }

    return new PluginPackage(this.rest, pluginPackage);
  }
}

type CallFunctionInput = {
  /**
   * The name of the function to call.
   */
  name: string;
  /**
   * If provided, the plugin must have this manifest ID.
   * Only required if you have multiple backend plugins.
   */
  manifestId?: string;
  /**
   * The arguments to pass to the function.
   */
  arguments?: Array<Json>;
};

export class PluginPackage {
  private readonly rest: RestClient;
  private readonly definition: PluginPackageMetaFragment;

  constructor(rest: RestClient, definition: PluginPackageMetaFragment) {
    this.rest = rest;
    this.definition = definition;
  }

  get id(): string {
    return this.definition.id;
  }

  get manifestId(): string {
    return this.definition.manifestId;
  }

  async callFunction<T>(input: CallFunctionInput): Promise<T> {
    const plugin = this.definition.plugins.find((p) => {
      if (p.__typename !== "PluginBackend") {
        return false;
      }

      if (isPresent(input.manifestId) && p.manifestId !== input.manifestId) {
        return false;
      }

      return true;
    });

    if (isAbsent(plugin)) {
      throw new Error(`Plugin not found: ${input.name}`);
    }

    const body: FunctionInput = {
      name: input.name,
      args: input.arguments?.map((arg) => JSON.stringify(arg)) ?? [],
    };

    const payload = await this.rest.post<FunctionPayload>(
      `/plugin/backend/${plugin.id}/function`,
      body,
    );

    switch (payload.kind) {
      case "success": {
        const { returns } = payload;
        if (isAbsent(returns)) return undefined as T;
        return JSON.parse(returns) as T;
      }
      case "error":
        throw new Error(
          `Function call failed: ${JSON.stringify(payload.error)}`,
        );
    }
  }
}
