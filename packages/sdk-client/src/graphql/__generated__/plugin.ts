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

export type InstallPluginPackageMutationVariables = Types.Exact<{
  input: Types.InstallPluginPackageInput;
}>;

export type InstallPluginPackageMutation = {
  installPluginPackage: {
    package?:
      | {
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
        }
      | undefined
      | null;
    error?:
      | {
          __typename: "CloudUserError";
          code: string;
          cloudReason: Types.CloudErrorReason;
        }
      | { __typename: "OtherUserError"; code: string }
      | {
          __typename: "PluginUserError";
          reason: Types.PluginErrorReason;
          code: string;
        }
      | {
          __typename: "StoreUserError";
          code: string;
          storeReason: Types.StoreErrorReason;
        }
      | undefined
      | null;
  };
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
export const InstallPluginPackageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "InstallPluginPackage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "InstallPluginPackageInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "installPluginPackage" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "package" },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "error" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "PluginUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "PluginUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "StoreUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "StoreUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "CloudUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "CloudUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "OtherUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "OtherUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "UserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "code" } },
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
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PluginUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PluginUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          { kind: "Field", name: { kind: "Name", value: "reason" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StoreUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "StoreUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "storeReason" },
            name: { kind: "Name", value: "reason" },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CloudUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "CloudUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "cloudReason" },
            name: { kind: "Name", value: "reason" },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "OtherUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "OtherUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  InstallPluginPackageMutation,
  InstallPluginPackageMutationVariables
>;
