import type { PluginPackageSpec } from "@caido/sdk-shared";

import type { Json } from "@/utils/json.js";

/**
 * Client-side callable surface for a plugin package’s `api` map: each backend
 * function becomes `(...args) => Promise<Awaited<return>>` on the package handle.
 */
export type PluginPackageApiCallers<T extends PluginPackageSpec> = {
  [K in keyof T["api"]]: T["api"][K] extends (...args: infer Args) => infer Ret
    ? (...args: Args) => Promise<Awaited<Ret>>
    : never;
};

/**
 * Valid event names for a plugin package. When the package spec is unknown
 * (the default), any string is accepted.
 */
export type SubscribeEventName<T extends PluginPackageSpec> = [T] extends [
  never,
]
  ? string
  : Extract<keyof T["events"], string>;

/**
 * Args tuple yielded by `subscribeEvent` for a given event name. Falls back to
 * raw JSON when no spec is provided.
 */
export type SubscribeEventArgs<T extends PluginPackageSpec, K> = [T] extends [
  never,
]
  ? Json[]
  : K extends keyof T["events"]
    ? Parameters<Extract<T["events"][K], (...args: never) => unknown>>
    : never;

/**
 * Input object accepted by `subscribeEvent` when more than just the event name
 * is needed (e.g. to disambiguate between multiple backend plugins).
 */
export type SubscribeEventInput<
  T extends PluginPackageSpec,
  K extends SubscribeEventName<T>,
> = {
  name: K;
  manifestId?: string;
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
