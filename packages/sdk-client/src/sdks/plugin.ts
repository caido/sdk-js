import { NotFoundUserError, PluginFunctionCallError } from "@/errors/index.js";
import {
  type GraphQLClient,
  InstallPluginPackageDocument,
  type InstallPluginPackageInput,
  type PluginPackageMetaFragment,
  PluginPackagesDocument,
} from "@/graphql/index.js";
import type {
  FunctionInput,
  FunctionPayload,
  RestClient,
} from "@/rest/index.js";
import type {
  Plugin,
  PluginBackend,
  PluginFrontend,
  PluginWorkflow,
} from "@/types/plugin.js";
import { handleGraphQLError } from "@/utils/errors.js";
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

  /**
   * Install a plugin package using either a manifest ID or a file upload.
   *
   * @example
   * ```typescript
   * // Install from manifest ID
   * const plugin = await client.plugin.install({ manifestId: "com.example.plugin" });
   *
   * // Install from file
   * const file = new File([buffer], "plugin.zip", { type: "application/zip" });
   * const plugin = await client.plugin.install({ file });
   *
   * // Force install
   * const plugin = await client.plugin.install({ manifestId: "com.example.plugin", force: true });
   * ```
   */
  async install(options: InstallPluginPackageInput): Promise<PluginPackage> {
    const source = isPresent(options.source.file)
      ? { file: options.source.file }
      : { manifestId: options.source.manifestId! };

    const result = await this.graphql.mutation(InstallPluginPackageDocument, {
      input: {
        source,
        force: options.force,
      },
    });

    const payload = result.installPluginPackage;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    return new PluginPackage(this.rest, payload.package!);
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

  get plugins(): Plugin[] {
    return this.definition.plugins
      .map((p) => {
        switch (p.__typename) {
          case "PluginBackend":
            return {
              kind: "PluginBackend",
              id: p.id,
              manifestId: p.manifestId,
              enabled: p.enabled,
            } satisfies PluginBackend;
          case "PluginFrontend":
            return {
              kind: "PluginFrontend",
              id: p.id,
              manifestId: p.manifestId,
              enabled: p.enabled,
            } satisfies PluginFrontend;
          case "PluginWorkflow":
            return {
              kind: "PluginWorkflow",
              id: p.id,
              manifestId: p.manifestId,
              enabled: p.enabled,
            } satisfies PluginWorkflow;
          default:
            return undefined;
        }
      })
      .filter(isPresent);
  }

  /**
   * Calls a function on the plugin backend.
   *
   * You should specify the manifest ID if you have multiple backend plugins.
   *
   * @throws Error if the plugin is not found or not a backend plugin.
   */
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
      throw new NotFoundUserError();
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
        throw new PluginFunctionCallError(input.name, payload.error);
    }
  }
}
