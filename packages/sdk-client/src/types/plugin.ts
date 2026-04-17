import type { PluginPackageSpec } from "@caido/sdk-shared";

/**
 * Client-side callable surface for a plugin package’s `api` map: each backend
 * function becomes `(...args) => Promise<Awaited<return>>` on the package handle.
 */
export type PluginPackageApiCallers<T extends PluginPackageSpec> = {
  [K in keyof T["api"]]: T["api"][K] extends (...args: infer Args) => infer Ret
    ? (...args: Args) => Promise<Awaited<Ret>>
    : never;
};

export type InstallPluginPackageInput = {
  source:
    | {
        file: File;
      }
    | {
        manifestId: string;
      };
  force?: boolean;
};

export type PluginBackend = {
  kind: "PluginBackend";
  id: string;
  manifestId: string;
  enabled: boolean;
};

export type PluginFrontend = {
  kind: "PluginFrontend";
  id: string;
  manifestId: string;
  enabled: boolean;
};

export type PluginWorkflow = {
  kind: "PluginWorkflow";
  id: string;
  manifestId: string;
  enabled: boolean;
};

export type Plugin = PluginBackend | PluginFrontend | PluginWorkflow;
