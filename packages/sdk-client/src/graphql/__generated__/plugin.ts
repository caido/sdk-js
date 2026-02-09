import type * as Types from "./types.js";

import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type PluginPackageMetaFragment = {
  id: string;
  manifestId: string;
  plugins: Array<
    | {
        __typename: "PluginBackend";
        id: string;
        manifestId: string;
        enabled: boolean;
      }
    | {
        __typename: "PluginFrontend";
        id: string;
        manifestId: string;
        enabled: boolean;
      }
    | {
        __typename: "PluginWorkflow";
        id: string;
        manifestId: string;
        enabled: boolean;
      }
  >;
};

export type PluginPackagesQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type PluginPackagesQuery = {
  pluginPackages: Array<{
    id: string;
    manifestId: string;
    plugins: Array<
      | {
          __typename: "PluginBackend";
          id: string;
          manifestId: string;
          enabled: boolean;
        }
      | {
          __typename: "PluginFrontend";
          id: string;
          manifestId: string;
          enabled: boolean;
        }
      | {
          __typename: "PluginWorkflow";
          id: string;
          manifestId: string;
          enabled: boolean;
        }
    >;
  }>;
};

export const PluginPackageMetaFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PluginPackageMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PluginPackage" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "manifestId" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "plugins" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "manifestId" } },
                { kind: "Field", name: { kind: "Name", value: "enabled" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PluginPackageMetaFragment, unknown>;
export const PluginPackagesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PluginPackages" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "pluginPackages" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "PluginPackageMeta" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PluginPackageMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PluginPackage" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "manifestId" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "plugins" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "manifestId" } },
                { kind: "Field", name: { kind: "Name", value: "enabled" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PluginPackagesQuery, PluginPackagesQueryVariables>;
